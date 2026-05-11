import express from "express";
import {
  getLoggedUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/authController.js";
import {
  registerValidation,
  loginValidation,
  updateUserValidation,
} from "../middleware/inputValidation.js";
import { loginMiddleware } from "../middleware/loginMiddleware.js";
import { limiter } from "../middleware/requestRateLimit.js";

import { upload } from "../utils/Multerstorage.js";
import { isAuthenticated } from "../middleware/isAuthenticatedMiddleware.js";

const router = express.Router();

// auth routes
/** @isAuthenticated middleware prevents access to protected pages backend. */
router.get("/getLoggedUser", isAuthenticated, getLoggedUser);
router.post(
  "/registerUser",
  upload.single("avatarUrl"),
  registerValidation,
  registerUser,
);
router.post("/login", limiter, loginValidation, loginMiddleware, loginUser);
router.post("/logout", logoutUser);
router.patch(
  "/updateUser",
  upload.single("avatarUrl"),
  isAuthenticated,
  updateUserValidation,
  updateUser,
);

export default router;
