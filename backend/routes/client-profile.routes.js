import express from "express";
import ClientController from "../controllers/client-profile.controller.js";
import clientProfile from "../controllers/client-profile.controller.js";

const router = express.Router();


router.post('/profile-update', ClientController.clientProfile);


export default router;