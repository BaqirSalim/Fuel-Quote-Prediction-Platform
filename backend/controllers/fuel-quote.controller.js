import Quote from '../models/fuel-quote.model.js'

class FuelQuoteController {
    static async submitFuelQuote(req, res) {
        try {
            
            const { gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice } = req.body; 

            // Validate parameters
            if (!gallonsRequested || !deliveryAddress || !deliveryDate || !suggestedPrice) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const fuelquote = await Quote.create(req.body);


            // Calculate the fuel rate and total cost based on the provided parameters here

            // Respond with status and data after submitting fuel quote
            res.status(200).json({
                fuelquote
                //totalAmount  // Add calculated fuel rate and total cost here
            });
        } catch (error) {
            console.log("Error in fuel quote submission controller", error.message)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }

    static async getFuelQuoteHistory(req, res) {
        try {
            // Retrieve Fuel Quote history here

            // Respond with status and fuel quote history data
            res.status(200).json({
                // Add fuel quote history data here
            });
        } catch (error) {
            console.log("Error in fuel quote history controller", error.message)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
}

export default FuelQuoteController;
