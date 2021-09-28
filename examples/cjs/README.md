# micrize commonjs example

## dev

- `npm run dev` 开发模式无微服务 | dev mode without microservice

## production

- 本机开启 nats 服务 | start nats on localhost
- `test:micrized:service:math` 启动 `math` 微服务 | start `math` service
- `test:micrized:service:test` 启动 `test` 微服务 | start `test` service
- `test:micrized:call` 调用 `test` 微服务 | call the `test` service