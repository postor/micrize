const { disconnect } =require ('micrize')
const { services } = require('./micrized')

  ;
(async () => {
  try {
    let test = await services.test()
    // console.log(test.hello.toString())
    console.log(await test.hello('world', 1, 1))
    await disconnect()
  } catch (error) {
    console.log({error})
  }
})()
