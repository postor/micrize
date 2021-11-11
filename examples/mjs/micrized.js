import { micrize } from 'micrize'

export const services = micrize({
  math: () => import('./services/math.js'),
  test: () => import('./services/test.js'),
})