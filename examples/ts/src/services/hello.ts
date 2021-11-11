import { services } from '../micrized'

export const hello = async (name, a, b) => {
  return `hello ${name}, ${a}+${b}=${await services.math.add(a, b)}`
}