import React from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function ProfilePage() {
    const navigate = useNavigate();

    const navFuelForm = () => {
        navigate('/fuel_form');
    };

    const navFuelHistory = () => {
        navigate('/fuel_history');
    };

    const location = useLocation();
    const { fullName, address1, address2, city, state, zipcode } = location.state;

    return (
        <div>
            <h2>Client Profile Information</h2>
            <div>
                <p><strong>Full Name:</strong> {fullName}</p>
                <p><strong>Address 1:</strong> {address1}</p>
                <p><strong>Address 2:</strong> {address2}</p>
                <p><strong>City:</strong> {city}</p>
                <p><strong>State:</strong> {state}</p>
                <p><strong>Zipcode:</strong> {zipcode}</p>
            </div>


            <button onClick={navFuelForm}>Fuel Quote Form</button>

            <h2></h2>
            <button onClick={navFuelHistory}>Fuel History</button>



        </div>
        
        
    );
}