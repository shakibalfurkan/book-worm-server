import type { Response } from "express";
import config from "../config/index.js";

const isProd = config.node_env === "production";

import type { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  path: "/",
};

export const setCookie = (
  res: Response,
  tokenName: string,
  tokenValue: string
) => {
  res.cookie(tokenName, tokenValue, cookieOptions);
};
