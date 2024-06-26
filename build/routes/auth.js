import express from "express";
import { confirmationEmail, getIntCode, login, registerUser, updatePassword, updateUsername } from "../controllers/authController.ts";
const router = express.Router();
router.post("/register-user-authorization", registerUser);
router.post("/login", login);
router.post("/update-password:id", updatePassword);
router.post("/update-username:id", updateUsername);
router.post("/confirm-user", confirmationEmail);
router.get("/get-ic", getIntCode);
export default router;
