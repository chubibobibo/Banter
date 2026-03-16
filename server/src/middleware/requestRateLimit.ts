import { rateLimit, RateLimitExceededEventHandler } from "express-rate-limit";
import { ExpressError } from "../expressError/expressError.js";
import { NextFunction, Request, Response } from "express";

/** @handler handles the message to appear if requests exceeds limit */
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  handler: (req: Request, res: Response, next: NextFunction) => {
    throw new ExpressError(
      "Too many attempts to login. Try again in 15 minutes",
      429,
    );
  },
  limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});
