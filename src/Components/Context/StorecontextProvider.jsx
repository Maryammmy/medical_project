
import { createContext, useState } from "react";

  export let storecontext= createContext(0)
  export default function Storecontextprovider({children}){
    const baseUrl = "https://medicurb.onrender.com"
    const [isOpen,setIsOpen] =useState(false)
    const [selectedItemId, setSelectedItemId] = useState()
    const toggle =()=>setIsOpen(!isOpen)
    const handleLinkClick = (itemId) => {
      if (itemId) {
        setSelectedItemId(itemId);
      }
    };
    return <storecontext.Provider value={{baseUrl,isOpen,setIsOpen,toggle,handleLinkClick,selectedItemId,setSelectedItemId}}>
         {children}
    </storecontext.Provider>
 }