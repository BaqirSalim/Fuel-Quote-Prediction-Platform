import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import getFuelHistory from "../hooks/getFuelHistory";

export default function FuelHistory() {
    const { getUser } = useAuth();
    const [fuelQuotes, setFuelQuotes] = useState([]);
    const user = getUser();

    const { fuelHistory } = getFuelHistory();

    useEffect(() => {
        const fetchFuelQuotes = async () => {
            try {
                const data = await fuelHistory(user.username);
                setFuelQuotes(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching fuel history:", error);
            }
        };

        fetchFuelQuotes();
    }, [user.username]);

    return (
        <div>
            <h1>Fuel Quote History</h1>
            <ul>
                {fuelQuotes.map((quote) => (
                    <li key={quote._id}>
                        <p>Gallons Requested: {quote.gallonsRequested}</p>
                        <p>Delivery Address: {quote.deliveryAddress}</p>
                        <p>Delivery Date: {quote.deliveryDate}</p>
                        <p>Suggested Price: {quote.suggestedPrice}</p>
                        <p>Total Amount Due: {quote.totalAmountDue}</p>
                        <p>Created At: {quote.createdAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
