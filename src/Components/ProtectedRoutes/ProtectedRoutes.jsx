import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { storecontext } from '../Context/StorecontextProvider';

export default function ProtectedRoutes({children}) {
   const {token} =useContext(storecontext)

try {
    const decoded = jwtDecode(token);
    console.log(decoded); 
   console.log(typeof(token))
}
catch (error){
    // localStorage.clear()
    console.log(error)
    console.log(typeof(token))
    return < Navigate to='/login'/>   
}
    if(token) return children
    return (
   < Navigate to='/login'/>
  )
}