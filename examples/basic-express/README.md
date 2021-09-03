# micrize express example

## dev

- `npm run dev` 开发模式无微服务 | dev mode without microservice

## production

- 本机开启 nats 服务 | start nats on localhost
- `test:micrized:service:math` 启动 `math` 微服务 | start `math` service
- `test:micrized:service:test` 启动 `test` 微服务 | start `test` service
- `test:micrized:service:express` 启动 `express` 微服务 | start `express` service
- open `http://localhost:3000`

## docker

- `docker-compose up -d`
- open `http://localhost:3000`