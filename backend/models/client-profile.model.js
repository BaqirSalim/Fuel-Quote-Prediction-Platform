import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        maxlength: 50
    },
    address1: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    address2: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 100
    },
    city: {
        type: String,
        required: true,
        maxlength: 100
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },
    zipcode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 9
    },
    orders: {
        type: [String], // Defines orders as an array of strings
        default: [],    // Default value is an empty array
    }
}, { timestamps: true });

const ClientProfile = mongoose.model("ClientProfile", clientProfileSchema); // creates a client profile model to allow interaction with all of the client profiles in DB


export default ClientProfile; // exports that User Model