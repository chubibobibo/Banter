import { StatusCodes } from "http-status-codes";
import { ExpressError } from "../expressError/expressError.js";
import { UserModel } from "../models/UserModel.js";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import fs from "fs";

interface UserType {
  user: {
    _id: string;
  };
}

// Registering User
export const registerUser = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  if (req.file) {
    /** NOTE: req.file.path converted req.body from client side forms into objects containing image file */
    const imageResponse = await cloudinary.v2.uploader.upload(req.file.path, {
      quality: 7,
      folder: "Banter",
    });
    //deletes image file from storage
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
    console.log(imageResponse);
    req.body.avatarUrl = imageResponse.secure_url;
    req.body.avatarId = imageResponse.public_id;
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

// Update logged user
export const updateUser = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ExpressError("User is not authorized", StatusCodes.UNAUTHORIZED);
  }
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  console.log(req.body.username);
  const loggedUser = await UserModel.findById(req?.user?._id);
  if (!loggedUser) {
    throw new ExpressError("User does not exist", StatusCodes.NOT_FOUND);
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    loggedUser._id,
    req.body,
    { new: true },
  );
  if (!updatedUser) {
    throw new ExpressError(
      "Problem updating user",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  res.status(StatusCodes.OK).json({ message: "User updated", updatedUser });
};

//get logged user
export const getLoggedUser = async (req: Request, res: Response) => {
  // if (!req.user) {
  //   throw new ExpressError("User is not authorized", StatusCodes.UNAUTHORIZED);
  // }

  const loggedUser = await UserModel.findById(req.user?._id);
  if (!loggedUser) {
    throw new ExpressError("User is Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: `Logged user: ${loggedUser}`, loggedUser });
};
