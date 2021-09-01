import { micrize } from 'micrize'

export const services = micrize({
  math: () => import('./services/math.mjs'),
  test: () => import('./services/test.mjs'),
  express: () => import('./services/express.mjs'),
})