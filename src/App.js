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
import Storecontextprovider from "./Components/Context/StorecontextProvider";
import Notfound from "./Components/Notfound/Notfound";
import AddDriverlayout from "./Components/AddDriverlayout/AddDriverlayout";
import PersonalData from "./Components/PersonalData/PersonalData";
import AddCar from "./Components/AddCar/AddCar";
import AddLicenses from "./Components/AddLicenses/AddLicenses";
import ImageUpload from "./Components/Uploadimages/ImageUpload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TripDetails from "./Components/TripDetails/TripDetails";
import AssignDriver from "./Components/AssignDriver/AssignDriver";
import AddTriplayout from "./Components/AddTriplayout/AddTriplayout";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Userlayout />,

      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <ImageUpload />
            </ProtectedRoutes>
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          ),
        },
        {
          path: "drivers",
          element: (
            <ProtectedRoutes>
              <Drivers />
            </ProtectedRoutes>
          ),
        },
        {
          path: "reports",
          element: (
            <ProtectedRoutes>
              <Reports />
            </ProtectedRoutes>
          ),
        },
        {
          path: "pendingdrivers",
          element: (
            <ProtectedRoutes>
              <PendingDrivers />
            </ProtectedRoutes>
          ),
        },
        {
          path: "trips",
          element: (
            <ProtectedRoutes>
              <Trips />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allocatedrivers",
          element: (
            <ProtectedRoutes>
              <AllocateDriver />
            </ProtectedRoutes>
          ),
        },
        {
          path: "driverdetails",
          element: (
            <ProtectedRoutes>
              <Driverdetails />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
    {
      path: "/",
      element: <Authlayout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "/adddriver",
      element: <AddDriverlayout />,
      children: [
        { path: "/adddriver", element: <PersonalData /> },
        { path: "personaldata", element: <PersonalData /> },
        { path: "addcar/:id", element: <AddCar /> },
        { path: "addlicenses/:id", element: <AddLicenses /> },
      ],
    },
    {
      path: "/addtrip",
      element: <AddTriplayout />,
      children: [
        { path: "/addtrip", element: <TripDetails /> },
        { path: "tripdetails", element: <TripDetails /> },
        { path: "assigndriver/:id", element: <AssignDriver /> },
      ],
    },
  ]);
  return (
    <>
      <SkeletonTheme baseColor="#88888833" >
        <Storecontextprovider>
          <RouterProvider router={routes} />
        </Storecontextprovider>
      </SkeletonTheme>
      <ToastContainer theme="colored" autoClose={700} draggable={true} />
    </>
  );
}
