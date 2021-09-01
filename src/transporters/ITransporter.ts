
export interface ITransporter {
  register(): Promise<void>
  invoke(method: string, params: any[]): Promise<any>
  unregister(): Promise<void | Error>
}