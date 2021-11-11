# micrize

最省代码的类型友好的微服务方案 | type friendly micro service solution with lesser codes

## 特性 | feature

- 0 成本上手，仍和 Node.JS 一样用 | zero cost adoption, develop as Node.JS 
- 支持 | support： es，commonjs, typescript
- 更好的自动提示 | better IDE hints

## 使用 | usage

```

// micrized.mjs 导出微服务化的服务 | export servcies that micrized
import { micrize } from 'micrize'

export const services = micrize({
  math: () => import('./services/math.mjs'),
})

// services/math.mjs 定义 math 微服务 | define math service
export const add = (a, b) => a + b

// call_test.mjs 调用微服务 | call micro service
import { services } from './micrized.mjs'
  ;
(async () => {  
  console.log(await services.math.add(1, 1))
})()

```

开发模式

```
DEV_MODE=true node call_test.mjs
```

微服务模式

- 启动 nats
- `SERVICE_NAME=math NATS=<nats> node micrized.mjs` 启动 math 服务
- `NATS=<nats> node call_test.mjs`

查看示例 | check examples： [examples](./examples) 