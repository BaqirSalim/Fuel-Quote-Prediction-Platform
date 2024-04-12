// schema for login
// {
//     username: "string", ## recieved at registration page
//     password: "string", ## recieved at registration page
//     fullName: "string", ## recieved at profile page
//     address1: "string", ## recieved at profile page
//     address2: "string", ## recieved at profile page
//     city: "string", ## recieved at profile page
//     state: "string", ## recieved at profile page
//     zipCode: "string", ## recieved at profile page
//     orders: "string", ## recieved at fuel form page and displayed in fuel history page
// }

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const AuthContext = createContext();

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(() => {
        const prevData = localStorage.getItem('currentUser');
        return prevData ? JSON.parse(prevData) : null;
    });

    useEffect(() => {
        if(currentUser != null)
        {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
      }, [currentUser]);

    const register = async (user, password) => {
        try {
            const response = await axios.post('http://localhost:3000/user/register', {username:user, password});           
            
            const {userId, username} = response.data;
            setCurrentUser({userId, username})

            if(response.status === 200)
            {
                return {success: true, message: "Registration successful"}
            }
        } catch (error) {
            if(error.response.status === 402)
            {
                return {success: false, error: "Username or Password not long enough"}
            }
            else if(error.response.status === 401)
            {
                return {success: false, error: "Username not available"}
            }
            else
            {
                console.log(error.message)
                return {success: false, error: "An unexpected error occurred"}
            }
        }
    }

    const login = async (user, password) => {
        try {
            const response = await axios.post('http://localhost:3000/user/login', {username:user, password});           
            
            const {userId, username} = response.data;
            setCurrentUser({userId, username})

            if(response.status === 200)
            {
                console.log(userId)
                return {success: true, message: "Login successful"}
            }
        } catch (error) {
            if(error.response.status === 401)
            {
                return {success: false, error: "Username or Password incorrect"}
            }
            else if(error.response.status === 402)
            {
                return {success: false, error: "Username or Password empty"}
            }
            else
            {
                console.log(error.message)
                return {success: false, error: "Unexpected error occurred"}
            }
        }
    }

    const logout = async () => {
        setCurrentUser(null)

        await axios.delete('http://localhost:3000/user/delete')
    }

    const getUser = () => {
        return currentUser;
    }

    return (
        <AuthContext.Provider value={{currentUser, login, logout, register, getUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);