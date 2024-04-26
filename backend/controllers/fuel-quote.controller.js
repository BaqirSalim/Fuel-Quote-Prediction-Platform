import FuelQuote from "../models/fuel-quote.model.js";
import username from "../models/client-profile.model.js";

class FuelQuoteController {
  static async submitFuelQuote(req, res) {
    try {
      const {
        gallonsRequested,
        deliveryAddress,
        deliveryDate,
        suggestedPrice,
      } = req.body;

      // Validate parameters
      if (
        !gallonsRequested ||
        !deliveryAddress ||
        !deliveryDate ||
        !suggestedPrice
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const fuelquote = await FuelQuote.create(req.body);

      res.status(200).json({ fuelquote });
    } catch (error) {
      console.log("Error in fuel quote submission controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getFuelQuoteHistory(req, res) {
    try {
      const fuelQuoteHistory = await FuelQuote.find({ username: username });

      res.status(200).json({ fuelQuoteHistory });
    } catch (error) {
      console.log("Error in fuel quote history controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default FuelQuoteController;
