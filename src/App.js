import React from "react";
import Login from "./Components/Login/Login";
import Drivers from "./Components/Drivers/Drivers";
import Dashboard from "./Components/Dashboard/Dashboard";
import Reports from "./Components/Reports/Reports";
import PendingDrivers from "./Components/PendingDrivers/PendingDrivers";
import Trips from "./Components/Trips/Trips";
import AllocateDriver from "./Components/AllocateDriver/AllocateDriver";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Userlayout from "./Components/Userlayout/Userlayout";
import Driverdetails from "./Components/Driverdetails/Driverdetails";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Authlayout from "./Components/Authlayout/Authlayout";
import Storecontextprovider from "./Components/Context/StorecontextProvider";
import Notfound from "./Components/Notfound/Notfound";
import AddDriverlayout from "./Components/AddDriverlayout/AddDriverlayout";
import PersonalData from "./Components/PersonalData/PersonalData";
import AddCar from "./Components/AddCar/AddCar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TripDetails from "./Components/TripDetails/TripDetails";
import AssignDriver from "./Components/AssignDriver/AssignDriver";
import AddTriplayout from "./Components/AddTriplayout/AddTriplayout";
import UpDateTriplayout from "./Components/UpDateTriplayout/UpDateTriplayout";
import UpDateTrip from "./Components/UpDateTrip/UpDateTrip";
import UpdateDriverlayout from "./Components/UpDateDriverlayout/UpDateDriverlayout";
import UpdatePersonalData from "./Components/UpdatePersonalData/UpdatePersonalData";
import AddCarAlbum from "./Components/AddCarAlbum/AddCarAlbum"
import secureLocalStorage from "react-secure-storage";

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
             <Dashboard />
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
        // { path: "/", element: <Login /> },
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
        { path: "addcarablum/:id", element: <AddCarAlbum/>},
      ],
    },
    {
      path: "/addtrip",
      element: <AddTriplayout />,
      children: [
        { path: "/addtrip", element: <TripDetails /> },
        { path: "tripdetails", element: <TripDetails />},
        { path: "assigndriver/:id", element:<AssignDriver /> },
      ],
    },
    {
      path: "/update",
      element:<UpDateTriplayout/>,
      children: [
        { path: "/update", element: <UpDateTrip/>},
        { path: "updatetrip/:id", element: <UpDateTrip/>},
      ],
    },
    {
      path: "/updatedriver",
      element:<UpdateDriverlayout/>,
      children: [
        { path: "/updatedriver", element: <ProtectedRoutes><UpdatePersonalData/></ProtectedRoutes> },
        { path: "updatepersonaldata/:id", element:<ProtectedRoutes><UpdatePersonalData/></ProtectedRoutes>  },
      ],
    },
  ]);

  return (
    <>
    
      <SkeletonTheme baseColor="#88888833">
        <Storecontextprovider>
          <RouterProvider router={routes} />
        </Storecontextprovider>
      </SkeletonTheme>
      <ToastContainer theme="colored" autoClose={700} draggable={true} />
    </>
  );
}
