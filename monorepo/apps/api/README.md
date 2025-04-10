## @monorepo/apps-api

## getting started

1. rename `.env-example` to `.env.local` and update the variables
2. run `bun run dev`

## run unit tests

ensure the `.env.local` file is present and populated, execute:

```bash
bun run test:unit
```

## docker build

from the root of the monorepo, execute:

```bash
docker build --tag api:latest --target runtime --file ./monorepo/tooling/docker/Dockerfile.api .
```

to run the container, execute:

```bash
docker run --rm --env-file ./monorepo/apps/api/.env.local --publish 8080:8080 api:latest
```
