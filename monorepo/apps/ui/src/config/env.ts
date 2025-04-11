import { z } from "zod";

const { VITE_API_URL } = import.meta.env;

const envSchema = z.object({
  VITE_API_URL: z.string().default("/api"),
});

export const env = envSchema.parse({
  VITE_API_URL,
});
