const { micrize } = require('micrize')

module.exports.services = micrize({
  math: async () => require('./services/math'),
  test: async () => require('./services/test'),
})