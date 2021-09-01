module.exports.hello = async (name, a, b) => {
  const { services } = require('../micrized')
  let { add } = await services.math()
  return `hello ${name}, ${a}+${b}=${await add(a, b)}`
}