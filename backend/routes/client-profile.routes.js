import express from "express";
import { clientProfile } from "../controllers/client-profile.controller.js";

const router = express.Router();


router.post('/profile-update', clientProfile);


export default router;