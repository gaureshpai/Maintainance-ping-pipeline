import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ReportedComplaints from "./components/ReportedComplaints";
import "./index.css";
import CitizenDashboard from "./pages/CitizenDashboard";
import StudentLogin from "./pages/StudentLogin";
import HomePage from "./pages/HomePage";
import OfficialDashboard from "./pages/OfficialDashboard";
import AdminLogin from "./pages/AdminLogin";
import ReportComplaint from "./pages/ReportComplaint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/student-login",
    element: <StudentLogin />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
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

