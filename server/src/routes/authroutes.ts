import express from "express";
import {
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

const router = express.Router();

// auth routes
router.post("/registerUser", registerValidation, registerUser);
router.post("/login", limiter, loginValidation, loginMiddleware, loginUser);
router.patch("/updateUser", updateUserValidation, updateUser);

export default router;
