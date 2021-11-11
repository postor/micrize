const { disconnect } =require ('micrize')

  ;
(async () => {
  try {
    const { services } = require('./micrized')
    console.log(await services.test.hello('world', 1, 1))
    await disconnect()
  } catch (error) {
    console.log({error})
  }
})()
