import toast from 'react-hot-toast'

const useFuelQuote = () => {
    const submitFuelQuote = async (data) => {

        try {
            const res = await fetch("http://localhost:3000/fuelquote/submit-fuel-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data) // Send `data` directly as the request body
            });
            
            const response = await res.json();

            if (res.ok) {
                console.log("Fuel quote submission successful:", response);
                // Handle successful response (if needed)
            } else {
                throw new Error(response.message || "Failed to submit fuel quote");
            }
        } catch (error) {
            toast.error(error.message || "Failed to submit fuel quote");
            console.error("Fuel quote submission error:", error);
        }
    };

    return { submitFuelQuote };
};

export default useFuelQuote;

