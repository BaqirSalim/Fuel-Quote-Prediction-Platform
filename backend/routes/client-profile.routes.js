import express from "express";
import ClientController from "../controllers/client-profile.controller.js";

const router = express.Router();


router.post('/profile-update', ClientController.updateClientProfile);
router.get("/:username", ClientController.getClientProfile);


export default router;