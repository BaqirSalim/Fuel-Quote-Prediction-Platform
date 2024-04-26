import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import "../styles/fuelform.css";
import getClientData from "../hooks/getClientData";

export default function FuelForm() {
  const { getUser, updateOrders } = useAuth();
  const user = getUser();
  const [gallonsRequested, setGallonsRequested] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [totalAmountDue, setTotalAmountDue] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getProfile } = getClientData();

  useEffect(() => {}, []);

  const handleGetQuote = async () => {
    try {
      const userData = await getProfile(user.username);
      const response = await axios.post(
        "http://localhost:3000/pricing/getprice",
        {
          location: userData.clientProfile.state,
          recurringClient: false, // Assuming no information available for recurring client
          gallonsRequested: gallonsRequested,
        }
      );
      setSuggestedPrice(response.data.suggestedPrice);
      setTotalAmountDue(response.data.totalAmount);
    } catch (error) {
      setError("Error retrieving quote");
      console.error("Error retrieving quote", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gallonsRequested === 0) {
      setError("You have not requested any gallons of fuel");
    } else {
      const order = {
        gallonsRequested: gallonsRequested,
        deliveryAddress: deliveryAddress,
        deliveryDate: deliveryDate,
        suggestedPrice: suggestedPrice,
        totalAmountDue: totalAmountDue,
      };
      updateOrders(order);
      navigate("/fuel_history");
    }
  };

  return (
    <div>
      <h2>Fuel Quote Form</h2>
      <form onSubmit={handleSubmit} id="fuel-quote-form">
        <label htmlFor="gallons-requested">Gallons Requested:</label>
        <input
          type="number"
          id="gallons-requested"
          value={gallonsRequested}
          onChange={(e) => setGallonsRequested(e.target.value)}
          required
        />
        <br />
        <label htmlFor="delivery-address">Delivery Address:</label>
        <input
          type="text"
          id="delivery-address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
        <br />
        <label htmlFor="delivery-date">Delivery Date:</label>
        <input
          type="date"
          id="delivery-date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleGetQuote}>
          Get Quote
        </button>
        <button type="submit">Submit</button>
      </form>
      <div>
        {suggestedPrice !== 0 && (
          <p>Suggested Price: ${suggestedPrice.toFixed(2)}</p>
        )}
        {totalAmountDue !== 0 && (
          <p>Total Amount Due: ${totalAmountDue.toFixed(2)}</p>
        )}
      </div>
      <p>{error}</p>
    </div>
  );
}
