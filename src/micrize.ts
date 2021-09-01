import { NatsTransporter } from "./transporters/NatsTransporter"

let serviceStarted = false // service start only once

export function micrize<T extends {
  [key: string]: () => Promise<any>
}>(services: T) {
  const { SERVICE_NAME, DEV_MODE } = process.env
  if (DEV_MODE) return services
  if (SERVICE_NAME && !serviceStarted) {
    serviceStarted = true
      ;
    (async () => await startService(SERVICE_NAME, await services[SERVICE_NAME]()))()
  }
  return broker(services)
}

export function broker<T extends {
  [key: string]: () => Promise<any>
}>(services: T) {
  // @ts-ignore
  let rtn: T = {}
  Object.keys(services).map(key => {
    // @ts-ignore
    rtn[key] = () => Promise.resolve(proxyService(key))
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
