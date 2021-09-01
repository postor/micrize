import express from 'express'
import terminator from 'http-terminator'
import { services } from '../micrized.mjs'

const app = express()
app.get('/', async (req, res) => {
  let { hello } = await services.test()
  try {
    res.json({ hello: await hello('world', 1, 1) })
  } catch (error) {
    res.json({ error })
  }
})

const server = app.listen(3000)

const httpTerminator = terminator.createHttpTerminator({ server })
const onsignal = () => httpTerminator.terminate()
process.on('SIGINT', onsignal)
process.on('SIGTERM', onsignal)