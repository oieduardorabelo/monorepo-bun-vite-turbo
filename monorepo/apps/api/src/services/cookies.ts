import type { Context } from "hono";
import * as honoCookie from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";
import { env } from "../config/env";

const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day
  httpOnly: true,
  path: "/",
  sameSite: "Lax",
  secure: env.IS_PRODUCTION,
};

export async function getCookie(c: Context, key: string) {
  const value = await honoCookie.getSignedCookie(
    c,
    env.APP_SECRET_SIGNING_KEY,
    `${env.APP_NAME}_${key}`
  );
  return value;
}

export async function getCookieOnce(c: Context, key: string) {
  const value = await getCookie(c, key);
  await honoCookie.deleteCookie(c, `${env.APP_NAME}_${key}`);
  return value;
}

export async function setCookie(c: Context, key: string, value: string) {
  await honoCookie.setSignedCookie(
    c,
    `${env.APP_NAME}_${key}`,
    value,
    env.APP_SECRET_SIGNING_KEY,
    cookieOptions
  );
}
