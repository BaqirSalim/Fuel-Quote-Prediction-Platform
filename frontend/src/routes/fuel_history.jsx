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
            <th>Total Amount Due</th>
          </tr>
        </thead>
        <tbody>
          {fuelQuotes.map((quote) => (
            <tr key={quote._id}>
              <td className="table-cell">{quote.gallonsRequested}</td>
              <td className="table-cell">{quote.totalAmountDue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  
}
