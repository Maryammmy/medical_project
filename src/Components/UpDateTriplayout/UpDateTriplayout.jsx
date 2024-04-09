import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { storecontext } from '../Context/StorecontextProvider'


export default function UpDateTriplayout() {
  let {isOpen} =useContext(storecontext)
  return (
    <>
    <div className='d-flex'>
  <div className='bg-color'><Sidebar/></div>
  <div style={{width: isOpen? "84%" :'99%'}}>
  <h3 className='p-5'>Update Trip</h3>
  <div className='bg-light m-auto pb-4'style={{width:'55%'}}><Outlet/></div>
 </div>
 </div>
   

    
    
 
    </>
  )
}
