import toast from 'react-hot-toast';

const getFuelHistory = () => {
    const fuelHistory = async (username) => {
        try {
            const response = await fetch(`http://localhost:3000/fuelquote/fuel-quote-history?username=${username}`);
            const data = await response.json();
            return data; // return the fetched data
        } catch (error) {
            toast.error(error.message || "Failed to fetch fuel history");
            console.error("Fuel history fetching error:", error);
            throw error; 
        }
    };

    return { fuelHistory };
};

export default getFuelHistory;
