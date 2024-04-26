import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import getClientData from "../hooks/getClientData";
import "../styles/profiledisplay.css";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const navigate = useNavigate();

  const navFuelForm = () => {
    navigate("/fuel_form");
  };

  const navFuelHistory = () => {
    navigate("/fuel_history");
  };

  const { getUser } = useAuth();

  const user = getUser();

  const { getProfile } = getClientData();

  useEffect(() => {
    // add setprofile...
      setProfileVariables(user.username)
  }, []);

  const setProfileVariables = async (username) => {
    const data = await getProfile(username);
    setFullName(data.clientProfile.fullName);
    setAddress1(data.clientProfile.address1);
    setAddress2(data.clientProfile.address2);
    setCity(data.clientProfile.city);
    setState(data.clientProfile.state);
    setZipcode(data.clientProfile.zipcode);
  };

  return (
    <section className="profile-display-container">
      {user ? (
        <section className="profile-details">
          <p>{"User Name: " + user.username}</p>
          <p>{"Full Name: " + fullName}</p>
          <p>{"Address 1: " + address1}</p>
          {user["address2"] ? <p>{"Address 2: " + address2}</p> : null}
          <p>{"City: " + city}</p>
          <p>{"State: " + state}</p>
          <p>{"Zipcode: " + zipcode}</p>
        </section>
      ) : (
        "Profile Not Set Up"
      )}

      <button onClick={navFuelForm}>Fuel Quote Form</button>
      <button onClick={navFuelHistory}>Fuel History</button>
    </section>
  );
}
