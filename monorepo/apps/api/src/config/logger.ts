import type { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import pino from "pino";
import { env } from "./env";
import { getHonoContext } from "./hono-context";

const _logger = pino({
  formatters: {
    bindings() {
      return { commitHash: env.COMMIT_HASH };
    },
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
  level: env.IS_TEST ? "silent" : env.LOG_LEVEL,
  mixin() {
    const getStackTrace = () => {
      const obj: { stack: string } = { stack: "" };
      Error.captureStackTrace(obj, getStackTrace);
      return obj.stack;
    };
    const stackLines = getStackTrace().split("\n");
    const callerLine = stackLines[4];
    const callerLineParts = callerLine.trim().split("/");
    const folderIndex = callerLineParts.findIndex((part) => part === "monorepo");
    const filename = callerLineParts
      .slice(folderIndex + 1)
      .join("/")
      .replaceAll(")", "");
    return { filename };
  },
  redact: {
    paths: ["req.headers.cookie", "req.headers.authorization", "res.headers['set-cookie']"],
    censor: "__PINO_REDACTED__",
  },
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
  transport: env.IS_DEVELOPMENT
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "commitHash,filename,req,requestId,res,responseTime",
          translateTime: "yyyy-mm-dd HH:MM:ss",
        },
      }
    : undefined,
});

export const logger = new Proxy(_logger, {
  get(target, property, receiver) {
    if (property === "logger") {
      return target;
    }

    const context = getHonoContext();
    const _target = context.var.logger || target;
    return Reflect.get(_target, property, receiver);
  },
});

export const loggerMiddleware = () =>
  createMiddleware(async (c: Context, next: Next) => {
    const child = _logger.child({ requestId: c.var.requestId });
    c.set("logger", child);

    const startTime = Date.now();
    child.info(`<-- ${c.req.method} ${c.req.url}`);

    await next();

    const responseTime = Date.now() - startTime;
    child.info(
      {
        req: {
          method: c.req.method,
          url: c.req.url,
          query: c.req.query(),
          params: c.req.param(),
          headers: c.req.header(),
          remoteAddress:
            c.req.header("x-forwarded-for") ||
            c.req.header("x-real-ip") ||
            c.req.header("x-client-ip"),
          remotePort: c.req.header("x-forwarded-port"),
        },
        res: {
          statusCode: c.res.status,
          headers: c.res.headers.toJSON(),
        },
        responseTime,
      },
      `--> ${c.req.method} ${c.req.url} ${responseTime}ms`
    );
  });
