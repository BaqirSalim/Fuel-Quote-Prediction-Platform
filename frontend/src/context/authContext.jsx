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

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);

    const login = (username, password) => {
        const foundUser = users.find(user => user.username === username && user.password === password)
        if(foundUser){
            setCurrentUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
    }

    const register = (userData) => {
        setUsers([...users, userData]);
    };

    const getUser = () => {
        return currentUser;
    }

    const updateUser = (updatedData) => {
        const updatedUsers = users.map((user) => {
            if(user.username === currentUser.username)
            {
                return {...user, updatedData};
            }
            return user;
        });
        setUsers(updatedUsers);
        setCurrentUser({...currentUser, ...updatedData})
    }

    const updateOrders = (newOrder) => {
        const updatedUsers = users.map((user) => {
            if(user.username === currentUser.username)
            {
                if("orders" in currentUser)
                {
                    const updatedUser = {...user, orders:[newOrder]}
                    setCurrentUser(updatedUser)
                    return updatedUser;
                }
                else
                {
                    const updatedUser = {...user, orders:[...user.orders, newOrder]}
                    setCurrentUser(updatedUser)
                    return updatedUser;
                }                
            }
            return user;
        });
        setUsers(updatedUsers);
    }

    return (
        <AuthContext.Provider value={{currentUser, login, logout, register, getUser, updateUser, updateOrders}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);