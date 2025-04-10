import type { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { logger } from "../config/logger";

type DelayProps = {
  ms: number;
  condition: boolean;
};

export const delay = (props: DelayProps) =>
  createMiddleware(async (_c: Context, next: Next) => {
    if (props.condition) {
      const delayMs = Math.floor(Math.random() * props.ms);
      logger.info(`delay of ${delayMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
    await next();
  });
