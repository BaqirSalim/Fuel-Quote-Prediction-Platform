import ClientProfile from '../models/client-profile.model.js';
import User from '../models/user.model.js'; // Import the User model to find the current user

class ClientController {
    static async clientProfile(req, res) {
        try {
            const { username, fullName, address1, address2, city, state, zipcode } = req.body; // Destructure profile data from frontend
            
            // Check if required fields are missing
            if (!username || !fullName || !address1 || !city || !state || !zipcode) {
                return res.status(400).json({ error: "One or more required fields is missing" });
            }

            // Find the current user based on their username
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Find the associated ClientProfile using the clientProfile field from the user object
            const clientProfile = await ClientProfile.findOne({ _id: user.clientProfile });

            if (!clientProfile) {
                return res.status(404).json({ error: "ClientProfile not found" });
            }

            // Update the fields of the ClientProfile based on the data received from the frontend
            clientProfile.fullName = fullName;
            clientProfile.address1 = address1;
            clientProfile.address2 = address2;
            clientProfile.city = city;
            clientProfile.state = state;
            clientProfile.zipcode = zipcode;

            // Save the updated ClientProfile
            await clientProfile.save();

            res.status(200).json({ profile: clientProfile });
    
        } catch (error) {
            console.log("Error in client profile controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default ClientController;
