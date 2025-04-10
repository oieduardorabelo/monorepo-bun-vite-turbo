import * as Bun from "bun";
import { z } from "zod";

const { APP_NAME, APP_SECRET_SIGNING_KEY, NODE_ENV, PORT, LOG_LEVEL, HOSTNAME } = process.env;

const pkgjsonFile = Bun.file(`${import.meta.dir}/../../package.json`);
const pkgjson = await pkgjsonFile.json();

const APP_VERSION = pkgjson.version;

const fromProcessEnvSchema = z.object({
  APP_NAME: z.string(),
  APP_SECRET_SIGNING_KEY: z.string(),
  APP_VERSION: z.string(),
  HOSTNAME: z.string(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "fatal", "silent"]).default("debug"),
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number(),
});

const fromProcessEnvParsed = fromProcessEnvSchema.parse({
  APP_NAME,
  APP_SECRET_SIGNING_KEY,
  APP_VERSION,
  HOSTNAME,
  LOG_LEVEL,
  NODE_ENV,
  PORT,
});

const internalEnvSchema = fromProcessEnvSchema.extend({
  COMMIT_HASH: z.string(),
  IS_DEVELOPMENT: z.boolean(),
  IS_PRODUCTION: z.boolean(),
  IS_TEST: z.boolean(),
});

const IS_PRODUCTION = fromProcessEnvParsed.NODE_ENV === "production";
const IS_DEVELOPMENT = fromProcessEnvParsed.NODE_ENV === "development";
const IS_TEST = fromProcessEnvParsed.NODE_ENV === "test";

const COMMIT_HASH = IS_DEVELOPMENT
  ? Bun.spawnSync(["git", "rev-parse", "HEAD"]).stdout.toString().trim().slice(0, 8)
  : process.env.COMMIT_HASH;

export const env = internalEnvSchema.parse({
  ...fromProcessEnvParsed,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  IS_TEST,
  COMMIT_HASH,
});
