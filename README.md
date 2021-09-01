# micrize

最省代码的类型友好的微服务方案 | type friendly micro service solution with lesser codes

## 使用

```
+ project
+--- index.mjs
+--- services
|      +--- math.mjs
|      +--- test.mjs 

// micrized.mjs
import { micrize } from '@shack-js/micrize'

export const services = micrize({
  math: () => import('./services/math.mjs'),
  test: () => import('./services/test.mjs'),
})

// services/math.mjs
export const add=(a,b)=>a+b

// services/test.mjs
import {services} from '../index.mjs'
export const hello=async (name,a,b)=>{
  let {add}=await services.math()
  return `hello ${name}, ${a}+${b}=${add(a+b)}`
}

```

