import express from "express";
import PricingController from "../controllers/pricing.controller.js";

const router = express.Router();

router.get("/getPrice", PricingController.generateSuggestedPrice);

export default router;
