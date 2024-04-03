import users from '../data/users.js'; 

class ClientController {
    static async clientProfile(req, res) {
        try {
            const { username, fullName, address1, address2, city, state, zipcode, orders } = req.body; // destructures data from frontend
            
            // finds the index of the current user in the users array
            const userIndex = users.findIndex(user => user.username === username);
    
            if (!username || !fullName || !address1 || !city || !state || !zipcode) {
                return res.status(400).json({ error: "One or more required fields is missing" });
            }
            
            res.status(200).json({
                username,
                fullName,
                address1,
                address2,
                city,
                state,
                zipcode,
                orders
            })
            
            

            if (userIndex !== -1) {
                // updates the user's data with the new profile information
                users[userIndex] = {
                    ...users[userIndex],
                    username,
                    fullName,
                    address1,
                    address2,
                    city,
                    state,
                    zipcode,
                    orders
            };
                res.status(200).json({ success: true, message: "Profile updated successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
    
        } catch (error) {
            console.log("Error in client profile controller", error.message)
            res.status(500).json({ error: "Internal Server Error" })
        }
    };
    
}


export default ClientController;