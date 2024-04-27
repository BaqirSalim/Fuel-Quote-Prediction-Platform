import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import useClientForm from "../hooks/useClientForm.js";
import "../styles/profileedit.css";

export default function ProfileForm() {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const { updateProfile } = useClientForm();
  const { getUser } = useAuth();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!fullName || !address1 || !city || !state || !zipcode) {
      setError("One or more profile fields are empty");
    } else {
      const currentUser = getUser(); // invoke getUser to get the current user
      if (currentUser) {
        const data = {
          username: currentUser.username,
          fullName: fullName,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zipcode: zipcode
        };

        try {
          await updateProfile(data);
          console.log("sent to update profile");
          navigate("/profile_page");
        } catch (error) {
          setError("Failed to update profile. Please try again.");
        }
      } else {
        setError("User not found. Please log in again.");
      }
    }
  };

  return (
    <section className="profile-container">
      <h2>Client Profile Form</h2>
      <form onSubmit={handleUpdate}>
        <section className="input-container">
          <input
            type="text"
            id="full_name"
            name="full_name"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            maxLength={50}
            required
          />
        </section>
        <section className="input-container">
          <input
            type="text"
            id="address1"
            name="address1"
            placeholder="Address 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            minLength={10}
            maxLength={100}
            required
          />
        </section>
        <section className="input-container">
          <input
            type="text"
            id="address2"
            name="address2"
            placeholder="Address 2 (Optional)"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            minLength={10}
            maxLength={100}
          />
        </section>
        <section className="input-container">
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={100}
            required
          />
        </section>
        <section className="input-container">
          <select
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option value="">
              State
            </option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </section>
        <section className="input-container">
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            minLength={5}
            maxLength={9}
            required
          />
        </section>
        <button className="update-button">Update Profile</button>
      </form>
    </section>
  );
}
