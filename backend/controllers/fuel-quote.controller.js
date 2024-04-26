import ClientProfile from "../models/client-profile.model.js";
import FuelQuote from "../models/fuel-quote.model.js";
import User from "../models/user.model.js";

class FuelQuoteController {
  static async submitFuelQuote(req, res) {
    try {
      const {
        username,
        gallonsRequested,
        deliveryAddress,
        deliveryDate,
        suggestedPrice,
        totalAmountDue,
      } = req.body;

      if (!gallonsRequested || !deliveryAddress || !deliveryDate || !username) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const clientProfileId = user.clientProfile;

      const fuelquote = await FuelQuote.create({
        clientProfile: clientProfileId,
        gallonsRequested,
        deliveryAddress,
        deliveryDate,
        suggestedPrice,
        totalAmountDue,
      });

      const clientProfile = await ClientProfile.findById(clientProfileId);
      if (!clientProfile) {
        return res.status(404).json({ error: "ClientProfile not found" });
      }
      clientProfile.orders.push(fuelquote._id);
      await clientProfile.save();

      res.status(200).json({ fuelquote });
    } catch (error) {
      console.log("Error in fuel quote submission controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getFuelQuoteHistory(req, res) {
    try {
      const { username } = req.query; 
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const clientProfileId = user.clientProfile;
  
      const fuelQuoteHistory = await FuelQuote.find({ clientProfile: clientProfileId });
  
      res.status(200).json({ fuelQuoteHistory });
    } catch (error) {
      console.log("Error in fuel quote history controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
}

export default FuelQuoteController;
