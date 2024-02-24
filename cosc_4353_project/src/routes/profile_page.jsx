import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext';


export default function ProfilePage() {
    const navigate = useNavigate();

    const navFuelForm = () => {
        navigate('/fuel_form');
    };

    const navigate = useNavigate();

    const navFuelForm = () => {
        navigate('/fuel_form');
    };

    const navFuelHistory = () => {
        navigate('/fuel_history');
    };

    const {getUser} = useAuth()

    const user = getUser()
    console.log(user)

    return (
        <div>
            {
                user ?
                <div> 
                    <p>{"User Name: " + user["username"]}</p>
                    <p>{"Full Name: " + user["fullName"]}</p>
                    <p>{"Address 1: " + user["address1"]}</p>
                    {user["address2"] ? <p>{"Address 2: " + user["address2"]}</p> : <></>}
                    <p>{"City: " + user["city"]}</p>
                    <p>{"State: " + user["state"]}</p>
                    <p>{"Zipcode: " + user["zipcode"]}</p>
                </div>
                : "Profile Not Set Up"
            }

            <button onClick={navFuelForm}>Fuel Quote Form</button>

            <h2></h2>
            <button onClick={navFuelHistory}>Fuel History</button>

        </div>
    );


}