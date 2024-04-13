import mongoose from 'mongoose';

const fuelQuoteSchema = new mongoose.Schema({
    gallonsRequested: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    suggestedPrice: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const FuelQuote = mongoose.model('FuelQuote', fuelQuoteSchema);

export default FuelQuote;



