import axios from "axios";
import { env } from "../config/env";

export const fetcher = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 3000, // 3 seconds
  headers: {
    "content-type": "application/json",
    "x-request-id": window.crypto.randomUUID(),
    accept: "application/json",
  },
});
