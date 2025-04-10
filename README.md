## monorepo setup with bun, vite and turborepo

Sample monorepo structure for bun, vite and turborepo.

- [bun](https://bun.sh/) as package manager
- [vite](https://vite.dev/) as dev server and build tool
- [turborepo](https://turbo.build/) as build system

## overview

This template contains two projects:

- `monorepo/apps/api` - a [Hono.js](https://hono.dev/) API running on `http://localhost:8080`
- `monorepo/apps/ui` - a React SPA using [Vite](https://vite.dev/) running on `http://localhost:3000`

For development:

- The UI URL `http://localhost:3000/api` is proxied to the API URL `http://localhost:8080` using the `vite.config.ts` proxy configuration

For production build:

- The UI built `monorepo/apps/ui/dist` and you need to serve it statically
- The API runs on a Docker and requires a reverse proxy to access it
- You must proxy `{UI_URL}/api` to `{API_URL}`

## production environment simulation

This template includes a `docker-compose.yml` file to simulate a production environment.

```bash
docker compose up
```

This will start the API and UI in Docker containers and proxy the UI to the API using `nginx`.

- The [UI Dockerfile](monorepo/tooling/docker/Dockerfile.ui) is an example of how to serve the UI statically, we do not recommend this approach for production
- The [API Dockerfile](monorepo/tooling/docker/Dockerfile.api) is ready for production build and deployment

## monorepo tasks

We define monorepo tasks in `turbo.json` and run them with `bun turbo <task>`.

- https://turbo.build/docs/crafting-your-repository/configuring-tasks
- https://turbo.build/docs/reference/run

For example:

```bash
bun turbo dev
```

This executes the `dev` script from all `./monorepo/apps/*/package.json` files.

## run apps individually

To run a specific app, you can move to the app directory and run the script directly or use [`bun run --filter`](https://bun.sh/docs/cli/filter).

Directly:

```bash
cd monorepo/apps/ui
bun run dev
```

With `--filter`:

```bash
bun run --filter @monorepo/apps-ui dev
```

You can run each app in a different terminal tab or window.

## run unit tests

To run all unit tests, you can use the following command:

```bash
bun run test:unit
```
