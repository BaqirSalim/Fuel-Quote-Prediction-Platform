import React from 'react'
import toast from 'react-hot-toast'

const useClientForm = () => {
    const updateProfile = async (data) => {
        const success = handleInputErrors(data.fullName, data.address1, data.city, data.state, data.zipcode);
        if (!success) return;

        try {
            const res = await fetch("http://localhost:3000/client/profile-update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data) // Send `data` directly as the request body
            });
            
            const response = await res.json();

            if (res.ok) {
                console.log("Profile update successful:", response);
                // Handle successful response (if needed)
            } else {
                throw new Error(response.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error(error.message || "Failed to update profile");
            console.error("Profile update error:", error);
        }
    };

    return { updateProfile };
};

export default useClientForm;


function handleInputErrors(fullName, address1, city, state, zipCode) {
    if ( !fullName || !address1 || !city || !state || !zipCode ) {
        toast.error('Please fill in all the fields')
        return false;
    }

    return true;
}
