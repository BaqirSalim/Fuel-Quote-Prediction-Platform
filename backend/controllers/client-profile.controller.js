export const clientProfile = async (req, res) => {
    try {
        const { fullname, address1, city, state, zipcode, orders  } = req.body;
        
        
        // ADD DATABASE SUBMITTING CODE HERE

        


        



    } catch (error) {
        console.log("Error in client profile controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
};