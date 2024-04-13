import ClientProfile from '../models/client-profile.model.js'

class ClientController {
    static async clientProfile(req, res) {
        try {
            const { username, fullName, address1, address2, city, state, zipcode, orders } = req.body; // destructures profile data from frontend
            
    
            if (!username || !fullName || !address1 || !city || !state || !zipcode) {
                return res.status(400).json({ error: "One or more required fields is missing" });
            }
            
            // add functionality to test if there is a user with this username, then just update that
            // BUT if no user, then do the clientprofile.create
            // might have to use the objectid of the current user by doing .find of the users collection with that username, then using that clientid as a reference.
            // must initially have it to where when a clientprofile is created, it is created by using the username objectid that it finds and add that property in the client profile model!!
            const profile = await ClientProfile.create(req.body);
            
            res.status(200).json({profile})
            
    
        } catch (error) {
            console.log("Error in client profile controller", error.message)
            res.status(500).json({ error: "Internal Server Error" })
        }
    };
    
}


export default ClientController;