import { env } from "./config/env";
import { app } from "./hono";

export default {
  fetch: app.fetch,
  hostname: env.HOSTNAME,
  port: env.PORT,
};
