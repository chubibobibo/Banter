import { StatusCodes } from "http-status-codes";
import { ExpressError } from "../expressError/expressError.js";
import { UserModel } from "../models/UserModel.js";
import { NextFunction, Request, Response } from "express";

// Registering User
export const registerUser = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }

  try {
    const isAdmin = (await UserModel.countDocuments()) === 0;
    req.body.role = isAdmin ? "admin" : "user";

    const registeredUser = new UserModel(req.body);
    if (!registeredUser) {
      throw new ExpressError(
        "Cannot create user",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    await registeredUser.setPassword(req.body.password);
    await registeredUser.save();
    await UserModel.authenticate()(req.body.username, req.body.password);
    res
      .status(StatusCodes.OK)
      .json({ message: "Registered User", registeredUser });
  } catch (err) {
    console.log(err);
  }
};

// Logging in User
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body) {
    throw new ExpressError("no data received", StatusCodes.BAD_REQUEST);
  }
  try {
    const { username } = req.body.username;
    const loggedUser = await UserModel.findOne(username);
    if (!loggedUser) {
      throw new ExpressError("User not found", StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({ message: `User found ${loggedUser}` });
  } catch (err) {
    console.log(err);
  }
};
