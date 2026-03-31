import express from "express";
import {
  getLoggedUser,
  loginUser,
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

const router = express.Router();

// auth routes
router.get("/getLoggedUser", getLoggedUser);
router.post(
  "/registerUser",
  upload.single("avatarUrl"),
  registerValidation,
  registerUser,
);
router.post("/login", limiter, loginValidation, loginMiddleware, loginUser);
router.patch("/updateUser", updateUserValidation, updateUser);

export default router;
