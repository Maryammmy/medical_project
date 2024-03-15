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
import Driverdetails from "./Components/Driverdetails/Driverdetails";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Authlayout from "./Components/Authlayout/Authlayout";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Userlayout />,

      children: [
        { index: true, element:<ProtectedRoutes><Dashboard /></ProtectedRoutes>   },
        { path: "dashboard", element:<ProtectedRoutes><Dashboard /></ProtectedRoutes>  },
        { path: "drivers", element: <ProtectedRoutes><Drivers /></ProtectedRoutes> },
        { path: "reports", element: <ProtectedRoutes><Reports /></ProtectedRoutes>  },
        { path: "pendingdrivers", element: <ProtectedRoutes><PendingDrivers /></ProtectedRoutes>  },
        { path: "trips", element: <ProtectedRoutes><Trips /></ProtectedRoutes>  },
        { path: "allocatedrivers", element: <ProtectedRoutes><AllocateDriver /></ProtectedRoutes>  },
        { path: "driverdetails/:id", element:<ProtectedRoutes><Driverdetails /></ProtectedRoutes>  },
      ],
    },
    {
      path: "/",
      element: <Authlayout/>,
      children: [
        { path: "/", element: <Login/> },
        { path: "login", element: <Login/> },
       
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}
