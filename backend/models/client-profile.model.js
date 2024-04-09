import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true,
        minlength: 10
    },
    address2: {
        type: String,
        required: false,
        minlength: 10
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    }

}, { timestamps: true });

const ClientProfile = mongoose.model("ClientProfile", clientProfileSchema); // creates a client profile model to allow interaction with all of the client profiles in DB


export default ClientProfile; // exports that User Model