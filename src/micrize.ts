import { NatsTransporter } from "./transporters/NatsTransporter"

let serviceStarted = false // service start only once


type Await<T> = T extends PromiseLike<infer U> ? U : T

type ProxiedServices<T extends { [key: string]: () => Promise<any> }> = {
  [P in keyof T]: Await<ReturnType<T[P]>>
}



export function micrize<T extends { [key: string]: () => Promise<any> }>(services: T): ProxiedServices<T> {
  const { SERVICE_NAME, DEV_MODE } = process.env
  if (DEV_MODE) {
    let rtn = {}
    for (let k in services) {
      let t: any = null, p = new Proxy({}, {
        // has: (_, method: string) => method != 'then',
        get: (_, method: string) => method == 'then'
          ? undefined
          : (...params: any[]) => {
            if (!t) t = services[k]()

            return t.then((x: any) => x[method](...params))
          }
      })
      // @ts-ignore
      rtn[k] = p
    }
    //@ts-ignore
    return rtn
  }
  if (SERVICE_NAME && !serviceStarted) {
    serviceStarted = true
      ;
    (async () => await startService(SERVICE_NAME, await services[SERVICE_NAME]()))()
  }
  // @ts-ignore
  return broker(services)
}

export function broker<T extends {
  [key: string]: () => Promise<any>
}>(services: T) {
  // @ts-ignore
  let rtn: T = {}
  Object.keys(services).map(key => {
    // @ts-ignore
    rtn[key] = proxyService(key)
  })
  return rtn
}

export async function startService(name: string, mod: any) {
  let transporter = new NatsTransporter(name, mod)
  await transporter.register()
  console.log(`service ${name} started!`)

  let handle = async (signal: string) => {
    console.log(`${signal} signal received! stopping!`)
    await transporter.unregister()
    await NatsTransporter.conn?.close()
    console.log(`service ${name} stopped!`)
  }
  process.on('SIGTERM', handle)
  process.on('SIGINT', handle)
}

export function proxyService(name: string) {
  let transporter = new NatsTransporter(name)
  let p = new Proxy({}, {
    // has: (_, method: string) => method != 'then',
    get: (_, method: string) => method == 'then'
      ? undefined
      : (...params: any[]) => transporter.invoke(method, params)
  })
  return p
}

export async function disconnect() {
  await NatsTransporter.conn?.close()
}
