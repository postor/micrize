import { micrize } from '../micrize'

const math = {
  add: async (a: number, b: number) => a + b
}

it('wroks in dev mode', async () => {
  process.env.DEV_MODE = 'true'
  let services = micrize({ math: async () => math })
  expect(await services.math.add(1, 1)).toBe(2)
})