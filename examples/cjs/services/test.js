module.exports.hello = async (name, a, b) => {
  const { services } = require('../micrized')
  return `hello ${name}, ${a}+${b}=${await services.math.add(a, b)}`
}