
import { createContext, useState } from "react";

  export let storecontext= createContext(0)
  export default function Storecontextprovider({children}){
    const [isOpen,setIsOpen] =useState(false)
    const toggle =()=>setIsOpen(!isOpen)
   
    return <storecontext.Provider value={{isOpen,setIsOpen,toggle}}>
         {children}
    </storecontext.Provider>
 }