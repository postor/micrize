import { disconnect } from 'micrize';
import { services } from './micrized'

  ;
(async () => {
  try {
    console.log(await services.test.hello('world', 1, 1))
    await disconnect()
  } catch (e) {
    console.log(e)
  }
})()
