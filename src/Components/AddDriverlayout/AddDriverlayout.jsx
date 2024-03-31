import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { storecontext } from '../Context/StorecontextProvider'


export default function AddDriverlayout() {
  let {isOpen} =useContext(storecontext)
  return (
    <>
    <div className='d-flex'>
  <div className='bg-color'><Sidebar/></div>
  <div style={{width: isOpen? "84%" :'99%'}}>
  <h3 className='p-5'>Add Driver</h3>
<div className='d-flex'>
<nav className='px-3'>
      <ul>
        <li className='list-item'>
        <NavLink className='anch py-3' to='personaldata' style={{pointerEvents:'none'}}>Personal Data</NavLink>
        </li>
        <li  className='list-item'>
        <NavLink className='anch py-3' to='addcar' style={{pointerEvents:'none'}}>Add Car Information</NavLink>
        </li>
        <li  className='list-item'>
        <NavLink className='anch py-3' to='addlicenses' style={{pointerEvents:'none'}}>Add Licenses</NavLink>
        </li>
        </ul>
    </nav>
    <div className='bg-light m-auto'style={{width:'55%'}}><Outlet/></div>
</div>
    </div>
     </div>
   

    
    
 
    </>
  )
}
