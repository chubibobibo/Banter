import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../expressError/expressError.js";
import { StatusCodes } from "http-status-codes";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new ExpressError(
      "User needs to be logged in",
      StatusCodes.UNAUTHORIZED,
    );
  }
};
