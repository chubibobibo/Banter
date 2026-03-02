import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { registerValidation } from "../middleware/inputValidation.js";
import { loginMiddleware } from "../middleware/loginMiddleware.js";

const router = express.Router();

// auth routes
router.post("/registerUser", registerValidation, registerUser);
router.post("/login", loginMiddleware, loginUser);

export default router;
