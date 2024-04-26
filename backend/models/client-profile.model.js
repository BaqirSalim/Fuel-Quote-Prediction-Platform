import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  address1: {
    type: String,
    required: true,
    maxlength: 100,
  },
  address2: {
    type: String,
    maxlength: 100,
  },
  city: {
    type: String,
    required: true,
    maxlength: 100,
  },
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2,
  },
  zipcode: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 9,
  },
  orders: [ // contains all of the fuel quote orders for this user
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FuelQuote",
    },
  ],
});

const ClientProfile = mongoose.model("ClientProfile", clientProfileSchema); // creates a client profile model to allow interaction with all of the client profiles in DB


export default ClientProfile; // exports that User Model