import type { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { createHttpError } from "../config/hono-exception";

type ContentTypeProps = {
  mimeTypes: string[];
};

export const contentType = (props: ContentTypeProps) =>
  createMiddleware(async (c: Context, next: Next) => {
    const method = c.req.method;
    const contentType = c.req.header("content-type");
    const accept = c.req.header("accept");

    // skip validation for special methods
    if (["OPTIONS", "TRACE", "CONNECT"].includes(method)) {
      return await next();
    }

    // handle get and head requests - validate accept header
    if (["GET", "HEAD"].includes(method)) {
      if (accept === "*/*") {
        return await next();
      }

      if (accept && !props.mimeTypes.includes(accept)) {
        throw createHttpError(
          400,
          `Invalid Accept header: ${accept}, expected: ${props.mimeTypes.join(", ")}`
        );
      }

      return await next();
    }

    // handle other methods - validate content-type header
    if (!contentType) {
      throw createHttpError(400, "Content-Type header is required");
    }

    if (contentType && !props.mimeTypes.includes(contentType)) {
      throw createHttpError(
        400,
        `Invalid Content-Type header: ${contentType}, expected: ${props.mimeTypes.join(", ")}`
      );
    }

    await next();
  });
