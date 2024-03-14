import React from 'react'
import './Sidebar.css'
import logoSidebar from '../../assets/images/LOGO1_Medicurb_page-0001-removebg-preview 1.svg';
import { NavLink } from 'react-router-dom';


export default function Sidebar () {
  return (
<nav>
  <div>
    <img src={logoSidebar} alt="logo" className="w-50" />
  </div>
  <ul className='menu m-0 p-0'>
    <li>
      <NavLink className="text-white link" to="dashboard"><i className="fa-solid fa-table pe-1" /> Dashboard</NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="drivers"><i className="fa-solid fa-user-group pe-1" /> Drivers</NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="reports"><i className="fa-solid fa-signal pe-1" /> Reports</NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="pendingdrivers"><i className="fa-solid fa-user-group pe-1" /> Pending Drivers</NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="trips"><i className="fa-solid fa-car-side pe-1" /> Trips</NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="allocatedrivers"><i className="fa-solid fa-location-dot pe-1" /> Allocate Driver</NavLink>
    </li>
  </ul>
</nav>


     
  
  )
}
