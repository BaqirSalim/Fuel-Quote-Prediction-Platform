import express from "express";
import FuelQuoteController from "../controllers/fuel-quote.controller.js";

const router = express.Router();

// Define routes for fuel quote
router.post('/submit-fuel-quote', FuelQuoteController.submitFuelQuote);
router.get('/fuel-quote-history', FuelQuoteController.getFuelQuoteHistory);

export default router;
