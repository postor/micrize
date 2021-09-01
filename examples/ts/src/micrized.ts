import { micrize } from 'micrize'

export const services = micrize({
  math: () => import('./services/math'),
  test: () => import('./services/test'),
})