import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import getFuelHistory from "../hooks/getFuelHistory";
import "../styles/fuelhistory.css";

export default function FuelHistory() {
  const { getUser } = useAuth();
  const [fuelQuotes, setFuelQuotes] = useState([]);
  const user = getUser();

  const { fuelHistory } = getFuelHistory();
  const fetchFuelQuotes = async () => {
    try {
      const data = await fuelHistory(user.username);
      setFuelQuotes(data.fuelQuoteHistory);
      console.log(data);
    } catch (error) {
      console.error("Error fetching fuel history:", error);
    }
  };
  useEffect(() => {
    fetchFuelQuotes();
  }, [user.username]);

  return (
    <div>
      <h1>Fuel Quote History</h1>
      <table>
        <thead>
          <tr>
            <th>Gallons Requested</th>
            <th>Delivery Address</th>
            <th>Delivery Date</th>
            <th>Suggested Price</th>
            <th>Total Amount Due</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {fuelQuotes.map((quote) => (
            <tr key={quote._id}>
              <td>{quote.gallonsRequested}</td>
              <td>{quote.deliveryAddress}</td>
              <td>{quote.deliveryDate}</td>
              <td>${quote.suggestedPrice}</td>
              <td>${quote.totalAmountDue}</td>
              <td>{quote.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
