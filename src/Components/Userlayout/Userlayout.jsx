import React, { useContext, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { storecontext } from '../Context/StorecontextProvider'

export default function Userlayout() {
   let { isOpen } = useContext(storecontext)
   return (
     <>
      <div className='d-flex '>
         <div className='bg-color heighty'><Sidebar /></div>
         <div style={{ width: isOpen ? "84%" : '99%' }}><Outlet /></div>
      </div>
     </>
   )
}
