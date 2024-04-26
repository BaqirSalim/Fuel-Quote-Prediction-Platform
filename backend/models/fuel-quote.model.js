import mongoose from "mongoose";

const fuelQuoteSchema = new mongoose.Schema({
  clientProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientProfile",
    required: true,
  },
  gallonsRequested: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  suggestedPrice: {
    type: Number,
    required: true,
  },
});

const FuelQuote = mongoose.model("FuelQuote", fuelQuoteSchema);
export default FuelQuote;



