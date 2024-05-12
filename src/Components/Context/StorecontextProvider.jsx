
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";



  export let storecontext= createContext(0)
  export default function Storecontextprovider({children}){
    const baseUrl = "https://medicurb.onrender.com"
    const [isOpen,setIsOpen] =useState(false)
    const[selected,setSelected] =useState({})
    const [excelData, setExcelData] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState()
    // const tokencheck = sessionStorage.getItem('token')
    // const token = typeof tokencheck === 'string' ? tokencheck : JSON.stringify(tokencheck);
    // console.log(typeof(token))

  
    const toggle =()=>setIsOpen(!isOpen)
    const handleLinkClick = (itemId) => {
      if (itemId) {
        setSelectedItemId(itemId);
      }
    };
    return <storecontext.Provider value={{baseUrl,isOpen,setIsOpen,toggle,handleLinkClick,selectedItemId,setSelectedItemId,selected,setSelected,excelData,setExcelData}}>
         {children}
    </storecontext.Provider>
 }