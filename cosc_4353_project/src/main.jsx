import React from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from './routes/root';
import Register from './routes/register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/login",
    element: <div>Hello</div>
  },
  {
    path: "/register",
    element: <Register />
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