import express from "express";
import { login, registerUser, updatePassword, updateUsername } from "../controllers/authController.ts";
const router = express.Router();
router.post("/register-user-authorization", registerUser);
router.post("/login", login);
router.post("/update-password:id", updatePassword);
router.post("/update-username:id", updateUsername);
export default router;
