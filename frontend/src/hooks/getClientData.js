import toast from 'react-hot-toast';

const getClientData = () => {
    const getProfile = async (username) => {
        try {
            const response = await fetch(`http://localhost:3000/client/${username}`);
            const data = await response.json();
            return data; // return the fetched data
        } catch (error) {
            toast.error(error.message || "Failed to fetch profile data");
            console.error("Profile fetching error:", error);
            throw error; 
        }
    };

    return { getProfile };
};

export default getClientData;
