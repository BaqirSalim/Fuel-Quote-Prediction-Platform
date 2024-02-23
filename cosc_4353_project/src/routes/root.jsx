import React from 'react';
import '../styles/root.css'; // Import the CSS file from the 'styles' folder
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from './login';

export default function Root() {


    return (
        < Login />
    );
}
