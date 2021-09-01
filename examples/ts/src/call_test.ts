import { disconnect } from 'micrize';
import { services } from './micrized'

  ;
(async () => {
  try {
    let test = await services.test()
    console.log(await test.hello('world', 1, 1))
    await disconnect()
  } catch (e) {
    console.log(e)
  }
})()
