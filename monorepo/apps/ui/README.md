## @monorepo/apps-ui

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
docker build --tag ui:latest --target runtime --file ./monorepo/tooling/docker/Dockerfile.ui .
```

to run the container, execute:

```bash
docker run --rm --env-file ./monorepo/apps/ui/.env.local --publish 3000:3000 ui:latest
```
