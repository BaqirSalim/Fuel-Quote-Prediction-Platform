import React from 'react'
import toast from 'react-hot-toast'

const useClientForm = () => {


    const updateProfile = async (data) => {
        const success = handleInputErrors(data.fullName, data.address1, data.city, data.state, data.zipcode)
        if (!success) return;
        try {
            const res = await fetch("/client/profile-update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({data})

            });
            
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }


        } catch (error) {
            toast.error(error.message)
        } finally {
        }
    }
    return { updateProfile };
}

export default useClientForm


function handleInputErrors(fullName, address1, city, state, zipCode) {
    if ( !fullName || !address1 || !city || !state || !zipCode ) {
        toast.error('Please fill in all the fields')
        return false;
    }

    return true;
}
