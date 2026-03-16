import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { loginUser } from "../controllers/authController.js";

/** @user object containing user data if authenticated successfully */
/** @info contains err messages */
export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "local",
    (err: Error, user: Express.User, info: { message: string }) => {
      if (err) {
        return next(err); // pass err to next error handling middleware
      }
      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: info.message || "Username or password incorrect" });
      }
      // Once authenticated, serialize user from authentication
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return loginUser(req, res, next);
      });
    },
  )(req, res, next);
};
