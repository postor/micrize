
import { connect, NatsConnection, StringCodec, Subscription } from 'nats'
import { ITransporter } from './ITransporter'

const servers = process.env.NATS || 'nats://localhost'
const sc = StringCodec()

export class NatsTransporter implements ITransporter {
  static conn?: NatsConnection
  private subscription?: Subscription
  private jobs: { [key: string]: Promise<any> } = {}
  constructor(private serviceName: string, private module?: any) { }

  async register() {
    let conn = await this.getConnection()
    this.subscription = conn.subscribe(this.serviceName)
      // console.log(['subscribe',this.serviceName])
      ;
    (async () => {
      for await (const m of this.subscription as Subscription) {
        this.jobs[m.sid] = (async (m) => {
          let { method, params } = JSON.parse(sc.decode(m.data))
          // console.log({ method, params })
          try {
            // console.log({m:this.module})
            let fn = this.module[method] || this.module.exports[method]
            // console.log({ fn })
            let result = await fn(...params)
            m.respond(sc.encode(JSON.stringify({ result })))
            // console.log({ result })
          } catch (error) {
            m.respond(sc.encode(JSON.stringify({ error })))
              ;
            (!process.env.SERVICE_NAME) && console.log({ error })
            console.log({ error })
          }
          delete this.jobs[m.sid]
        })(m)
      }
    })()
  }

  async invoke(method: string, params: any[] = []) {
    let conn = await this.getConnection()
    let msg = await conn.request(this.serviceName, sc.encode(JSON.stringify({ method, params })))
    let { error, result } = JSON.parse(sc.decode(msg.data))
    // console.log(sc.decode(msg.data))
    if (error) { throw error }
    return result
  }

  async getConnection() {
    if (!NatsTransporter.conn) {
      NatsTransporter.conn = await connect({ servers })
    }
    return NatsTransporter.conn
  }

  async unregister() {
    if (!this.subscription) return
    this.subscription.unsubscribe()
    await Promise.all(Object.values(this.jobs))
  }
}
