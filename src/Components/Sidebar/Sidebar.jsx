import React, { useContext, useState } from 'react'
import './Sidebar.css'
import logoSidebar from '../../assets/images/LOGO1_Medicurb_page-0001-removebg-preview 1.svg';
import { NavLink } from 'react-router-dom';
import { storecontext } from '../Context/StorecontextProvider';

export default function Sidebar () {
let {isOpen,toggle} =useContext(storecontext)

  return (
    
 <nav style={{width: isOpen? "230px" :'80px'}} >
  <div>
    <img src={logoSidebar} alt="logo" className={isOpen ?'w-50' :'w-100'}style={{paddingTop:isOpen? '0px' :'5px'}} />
    <i className="fa-solid fa-bars text-white  fs-2 text-center" onClick={toggle} style={{paddingLeft: isOpen? "60px" :'0px',paddingRight:isOpen?'0px' :'20px',paddingBottom:isOpen?'0px' :'30px',display: isOpen ? 'inline' :'block',paddingTop:isOpen? '0px' :'8px'}} ></i>
  </div>
  <ul className='menu m-0 p-0'>
    <li>
      <NavLink className="text-white link" to="dashboard"><i className="fa-solid fa-table pe-1" style={{paddingTop:isOpen? '0px' :'5px'}} ></i><span style={{display: isOpen? "inline" :'none'}}>Dashboard</span></NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="drivers"><i className="fa-solid fa-user-group pe-1"style={{paddingTop:isOpen? '0px' :'5px'}} ></i> <span style={{display: isOpen? "inline" :'none'}}>Drivers</span></NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="reports"><i className="fa-solid fa-signal pe-1"style={{paddingTop:isOpen? '0px' :'5px'}} ></i> <span style={{display: isOpen? "inline" :'none'}}>Reports</span></NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="pendingdrivers"><i className="fa-solid fa-user-group pe-1" style={{paddingTop:isOpen? '0px' :'5px'}} ></i><span style={{display: isOpen? "inline" :'none'}}>Pending Drivers</span></NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="trips"><i className="fa-solid fa-car-side pe-1" style={{paddingTop:isOpen? '0px' :'5px'}} ></i> <span style={{display: isOpen? "inline" :'none'}}>Trips</span></NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="allocatedrivers"><i className="fa-solid fa-location-dot pe-1 " style={{paddingTop:isOpen? '0px' :'5px'}}></i><span style={{display: isOpen? "inline" :'none'}}>Allocate Drivers</span></NavLink>
    </li>
    <li>
      <NavLink className="text-white link" to="login"><i className="fa-solid fa-user" style={{paddingTop:isOpen? '0px' :'5px'}}></i> <span style={{display: isOpen? "inline" :'none'}}>Logout</span></NavLink>
    </li>
  </ul>
</nav> 

  )
}




