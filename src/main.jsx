import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ReportedComplaints from "./components/ReportedComplaints";
import "./index.css";
import CitizenDashboard from "./pages/CitizenDashboard";
import CitizenLogin from "./pages/CitizenLogin";
import HomePage from "./pages/HomePage";
import OfficialDashboard from "./pages/OfficialDashboard";
import OfficialLogin from "./pages/OfficialLogin";
import ReportComplaint from "./pages/ReportComplaint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/citizen-login",
    element: <CitizenLogin />,
  },
  {
    path: "/official-login",
    element: <OfficialLogin />,
  },
  {
    path: "/citizen-dashboard",
    element: <CitizenDashboard />,
  },
  {
    path: "/official-dashboard",
    element: <OfficialDashboard />,
  },
  {
    path: "/report",
    element: <ReportComplaint />,
  },
  {
    path: "/track-complaints",
    element: (
      <>
        <Navbar />
        <ReportedComplaints />
      </>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

