import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Userlayout() {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2 vh-100 bg-color"><Sidebar/></div>
        <div className="col-md-10 vh-100"> <Outlet/></div>
        
       
    </div>
    </div>
  )
}
