export const clientProfile = async (req, res) => {
    try {
        const { fullName, address1, address2, city, state, zipcode, orders  } = req.body; // destructures data from frontend
        
        
        // ADD DATABASE SUBMITTING CODE HERE, must use authUser given from after user logs in

        


        res.status(200).json({ // returns status data after POST request to profile update backend route
            fullName,
            address1,
            address2,
            city,
            state,
            zipcode,
            orders,
        });



    } catch (error) {
        console.log("Error in client profile controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
};