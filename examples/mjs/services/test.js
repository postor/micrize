import { services } from '../micrized.js'

export const hello = async (name, a, b) => {
  return `hello ${name}, ${a}+${b}=${await services.math.add(a, b)}`
}