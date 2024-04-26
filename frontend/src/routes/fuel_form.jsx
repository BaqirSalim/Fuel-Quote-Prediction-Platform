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
  const [deliveryAddress, setDeliveryAddress] = useState(user["address1"]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState(50);
  const [totalAmountDue, setTotalAmountDue] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getProfile } = getClientData();

  useEffect(() => {
    setTotalAmountDue(gallonsRequested * suggestedPrice);
  }, [gallonsRequested, suggestedPrice]);

  const handleGetQuote = async () => {
    try {
      //const userdata = await getProfile(user.username);

      const response = await axios.post("/backend/routes/pricing/getPrice", {
        location: "TX",
        recurringClient: false, // Assuming no information available for recurring client
        gallonsRequested: gallonsRequested,
      });
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
          readOnly
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
        <label htmlFor="suggested-price">Suggested Price:</label>
        <input
          type="number"
          id="suggested-price"
          value={suggestedPrice}
          readOnly
        />
        <br />
        <label htmlFor="total-amount-due">Total Amount Due:</label>
        <input
          type="number"
          id="total-amount-due"
          value={totalAmountDue}
          readOnly
        />
        <br />
        <button type="button" onClick={handleGetQuote}>
          Get Quote
        </button>
        <button type="submit">Submit</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
