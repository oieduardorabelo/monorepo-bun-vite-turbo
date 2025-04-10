import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { httpStatusTextByCode } from "http-status-ts";

export function getHttpStatusTextByCode(status: ContentfulStatusCode) {
  return httpStatusTextByCode(status);
}

export function createHttpError(status: ContentfulStatusCode, message?: string) {
  return new HTTPException(status, {
    message: message ?? getHttpStatusTextByCode(status),
  });
}
