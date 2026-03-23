import {
  body,
  param,
  validationResult,
  ValidationChain,
} from "express-validator";
import { ExpressError } from "../expressError/expressError.js";
import { StatusCodes } from "http-status-codes";
import { NextFunction, RequestHandler } from "express";
import { UserModel } from "../models/UserModel.js";
//create a function that will handle the error
//This function will accept an array (validateValues) of values to be validated.
//then this function will return the array we passed as an argument and an error response
// Type ValidationChain[] is used from express validator, This accepts multiple validation
// Using RequestHandler[] type from express to correctly type validation chain. Express expects a request handler and not a union of validationChain and RequestHandlers
const withValidationErrors = (
  validateValues: ValidationChain[],
): RequestHandler[] => {
  return [
    ...validateValues, // spread to treat validateValues as an array of function instead of a single middleware (typescript)
    (req, res, next) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages: string[] = errors
          .array()
          .map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages as any, StatusCodes.BAD_REQUEST); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

export const registerValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters")
    .custom(async (username) => {
      const foundUsername = await UserModel.findOne({ username: username });
      if (foundUsername) {
        throw new ExpressError(
          "Username is already used",
          StatusCodes.CONFLICT,
        );
      }
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 4 })
    .withMessage("First name must be at least 4 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Last name must be at least 4 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid Email address")
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError("Email already exist", StatusCodes.CONFLICT);
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

export const loginValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

export const updateUserValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username Cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters")
    .custom(async (username, { req }) => {
      const foundUsername = await UserModel.findOne({ username: username });
      if (foundUsername && req.user.username !== username) {
        throw new ExpressError(
          "Username is already used",
          StatusCodes.CONFLICT,
        );
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email, { req }) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail && req.user?.email !== email) {
        throw new ExpressError("Email is already in use", StatusCodes.CONFLICT);
      }
    }),
]);
