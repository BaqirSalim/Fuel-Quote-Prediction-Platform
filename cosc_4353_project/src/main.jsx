import React from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from './routes/root';
import Register from './routes/register';
import ProfileForm from './routes/profile_form'
import ProfilePage from './routes/profile_page';
import FuelForm from './routes/fuel_form';
import FuelHistory from './routes/fuel_history';
import ErrorPage from './error';
import Login from './routes/login';
import { AuthProvider } from './context/authContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/profile_form",
    element: <ProfileForm />
  },
  {
    path: "/profile_page",
    element: <ProfilePage />
  },
  {
    path: "/fuel_form",
    element: <FuelForm />
  },
  {
    path: "/fuel_history",
    element: <FuelHistory />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);