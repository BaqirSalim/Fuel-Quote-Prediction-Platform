import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function FuelForm(){
    const {getUser, updateOrders} = useAuth(); //function to append to orders
    const user = getUser();
    const [gallonsRequested, setGallonsRequested] = useState(0)
    const [deliveryAddress, setDeliveryAddress] = useState(user["address1"])
    const [deliveryDate, setDeliveryDate] = useState('')
    const [suggestedPrice, setSuggestedPrice] = useState(50)
    const [totalAmountDue, setTotalAmountDue] = useState(0)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(gallonsRequested == 0)
        {
            setError("You have not requested any gallons of fuel")
        }
        else
        {
            const order = {
                gallonsRequested: gallonsRequested,
                deliveryAddress: deliveryAddress,
                deliveryDate: deliveryDate,
                suggestedPrice: suggestedPrice,
                totalAmountDue: totalAmountDue
            }
            updateOrders(order)
            navigate("/fuel_history")
        }
    }
    
    return (
        <div>
            <h2>Fuel Quote Form</h2>
            {/* later we will change this onSubmit into an action, but that requires implementation on the backend
            which we do not yet have */}
            <form onSubmit={handleSubmit} id="fuel-quote-form">
                <label htmlFor="gallons-requested">Gallons Requested:</label>
                <input
                type="number"
                id="gallons-requested"
                value={gallonsRequested}
                onChange={(e) => {
                    setGallonsRequested(e.target.value)
                    setTotalAmountDue(gallonsRequested * suggestedPrice)
                }}
                required
                /><br/>
                <label htmlFor="delivery-address">Delivery Address:</label>
                <input
                type="text"
                id="delivery-address"
                value={deliveryAddress}
                readOnly
                /><br/>
                <label htmlFor="delivery-date">Delivery Address:</label>
                <input
                type="date"
                id="delivery-date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                /><br/>
                <label htmlFor="suggested-price">Suggested Price:</label>
                <input
                type="number"
                id="suggested-price"
                value={suggestedPrice}
                onChange={(e) => setSuggestedPrice(e.target.value)}
                readOnly
                /><br/>
                <label htmlFor="total-amount-due">Total Amount Due:{suggestedPrice * gallonsRequested}</label><br/>
                {/* <input
                type="number"
                id="total-amount-due"
                value={totalAmountDue}
                readOnly
                /><br/> */}
                <button type="submit">Submit</button>
            </form>
            <p>{error}</p>
        </div>
    );
}