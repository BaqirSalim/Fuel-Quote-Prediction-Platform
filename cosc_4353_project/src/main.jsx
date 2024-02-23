import React from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from './routes/root';
import Register from './routes/register';
import Profile from './routes/profile'
import ProfilePage from './routes/profile_page';
import ErrorPage from './error';
import Login from './routes/login';

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
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/profile_page",
    element: <ProfilePage />
  },
  {
    path: "/fuel-form",
    element: <div>Fuel</div>
  },
  {
    path: "/fuel-history",
    element: <div>History</div>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);