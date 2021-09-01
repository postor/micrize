import { services } from '../micrized'

export const hello = async (name, a, b) => {
  let { add } = await services.math()
  return `hello ${name}, ${a}+${b}=${await add(a, b)}`
}