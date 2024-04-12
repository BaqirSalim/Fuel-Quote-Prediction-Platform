import ClientProfile from '../models/client-profile.model.js'

class ClientController {
    static async clientProfile(req, res) {
        try {
            const { username, fullName, address1, address2, city, state, zipcode, orders } = req.body; // destructures profile data from frontend
            
    
            if (!username || !fullName || !address1 || !city || !state || !zipcode) {
                return res.status(400).json({ error: "One or more required fields is missing" });
            }
            
            const profile = await ClientProfile.create(req.body);

            res.status(200).json({profile})
            
    
        } catch (error) {
            console.log("Error in client profile controller", error.message)
            res.status(500).json({ error: "Internal Server Error" })
        }
    };
    
}


export default ClientController;