import express from "express";
// import { login } from "../controllers/login.controller.js";
import LoginController from "../controllers/login.controller.js";
const router = express.Router();

router.post("/login", LoginController.login);
router.post("/register", LoginController.register);

export default router;
