import { getContext } from "hono/context-storage";
import type pino from "pino";

export type HonoVariables = {
  _: string;
  logger: pino.Logger;
};

export type HonoEnv = {
  Variables: HonoVariables;
};

export const getHonoContext = () => getContext<HonoEnv>();
