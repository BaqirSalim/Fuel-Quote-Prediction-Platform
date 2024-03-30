import users from '../data/users.js'; // Import the users array

export const clientProfile = async (req, res) => {
    try {
        const { username, fullName, address1, address2, city, state, zipcode, orders } = req.body; // Destructure data from frontend
        
        // Find the index of the current user in the users array
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex !== -1) {
            // Update the user's data with the new profile information
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
