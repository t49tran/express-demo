# Express demo

An express API server that written in Typescript, used together with the FE demo https://github.com/t49tran/mobx-react-demo-rmit

# Getting Started

### Docker build

You can build and run this project locally using docker

```bash
docker compose build # Build
docker compose up # Up and running
```

### Seeding data

After the docker containers are up, run the seeding script

```bash
docker run -it --rm --entrypoint node --env-file config.env.local --network express-demo_default express-demo_app dist/seed.js
```
