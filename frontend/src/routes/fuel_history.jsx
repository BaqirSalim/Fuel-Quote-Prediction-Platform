import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import getFuelHistory from "../hooks/getFuelHistory";
import React from "react";

export default function FuelHistory() {
  const { getUser } = useAuth();
  const [fuelQuotes, setFuelQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = getUser();
  const { fuelHistory } = getFuelHistory();

  useEffect(() => {
    const fetchFuelQuotes = async () => {
      setIsLoading(true);
      try {
        const data = await fuelHistory(user.username);
        console.log("Fetched fuel quotes:", data);
        setFuelQuotes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching fuel history:", error);
        setFuelQuotes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFuelQuotes();
  }, [user.username]);

  return (
    <div>
      <h1>Fuel Quote History</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : Array.isArray(fuelQuotes) && fuelQuotes.length === 0 ? (
        <p>No fuel quotes found.</p>
      ) : (
        <ul>
          {Array.isArray(fuelQuotes) &&
            fuelQuotes.map((quote) => (
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
      )}
    </div>
  );
}