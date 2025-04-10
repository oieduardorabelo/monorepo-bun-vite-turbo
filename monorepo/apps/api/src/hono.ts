import { ranStr } from "@monorepo/packages-some-example";
import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { HTTPException } from "hono/http-exception";
import { requestId } from "hono/request-id";

import { env } from "./config/env";
import type { HonoEnv } from "./config/hono-context";
import { createHttpError } from "./config/hono-exception";
import { logger, loggerMiddleware } from "./config/logger";

import { contentType } from "./middlewares/content-type";
import { delay } from "./middlewares/delay";

import { secureHeaders } from "hono/secure-headers";
import * as cookies from "./services/cookies";

export const app = new Hono<HonoEnv>();

app.use(
  contextStorage(),
  requestId({
    headerName: "x-request-id",
  }),
  loggerMiddleware(),
  contentType({
    mimeTypes: ["application/json"],
  }),
  delay({
    ms: Math.random() * 1000,
    condition: env.IS_DEVELOPMENT,
  }),
  secureHeaders()
);

app.use(async (c, next) => {
  const pageView = Number.parseInt((await cookies.getCookie(c, "pageView")) || "1", 10);
  await cookies.setCookie(c, "pageView", String(pageView + 1));
  await next();
});

app.get("/", (c) => {
  const now = Date.now();
  logger.info("log example at=%s", ranStr());
  logger.info("log now at=%s", now);
  return c.json({ status: 200, message: "ok", now });
});

app.get("/pageview", async (c) => {
  const pageView = (await cookies.getCookie(c, "pageView")) ?? "1";
  return c.json({
    pageView,
  });
});

app.get("/echo", (c) => {
  console.log("Headers in echo route:", c.req.header());
  return c.json(c.req.raw);
});

app.post("/echo", async (c) => {
  const body = await c.req.json();
  return c.json({
    ...body,
    message: "Echoed successfully",
  });
});

app.onError((err, c) => {
  logger.error(err);

  if (err instanceof HTTPException) {
    return c.json(
      {
        code: err.status,
        message: err.message,
      },
      err.status
    );
  }

  const catchAll = createHttpError(500);
  return c.json(
    {
      code: catchAll.status,
      message: catchAll.message,
    },
    catchAll.status
  );
});
