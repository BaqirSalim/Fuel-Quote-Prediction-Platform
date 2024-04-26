import express from "express";
import PricingController from "../controllers/pricing.controller";

const router = express.Router();

router.get("/getPrice", PricingController.generateSuggestedPrice);

export default router;
