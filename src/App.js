import React from "react";
import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar";
import Drivers from "./Components/Drivers/Drivers";
import Dashboard from "./Components/Dashboard/Dashboard";
import Reports from "./Components/Reports/Reports";
import PendingDrivers from "./Components/PendingDrivers/PendingDrivers";
import Trips from "./Components/Trips/Trips";
import AllocateDriver from "./Components/AllocateDriver/AllocateDriver";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Userlayout from "./Components/Userlayout/Userlayout";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Userlayout />,

      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "drivers", element: <Drivers /> },
        { path: "reports", element: <Reports /> },
        { path: "pendingdrivers", element: <PendingDrivers /> },
        { path: "trips", element: <Trips /> },
        { path: "allocatedrivers", element: <AllocateDriver /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}
