import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Userlayout() {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-2 bg-color p-0"><Sidebar/></div>
        <div className="col-md-10 p-0"> <Outlet/></div>  
    </div>
    </div>
  )
}
