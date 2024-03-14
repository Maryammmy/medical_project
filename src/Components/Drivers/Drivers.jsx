import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';

export default function Drivers() {
  const [drivers,setdrivers] =useState([])
  const [loading,setloading] =useState(true)
  const token = localStorage.getItem('token');
  async function getdrivers(){
   try  {
      const data = await axios.get('https://frail-elk-pea-coat.cyclic.app/api/Admin/PendingDrivers/0', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if(data.status==200){
        console.log(data);
        setloading(false)
        setdrivers(data.data)
        console.log(data.data)
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    getdrivers()
  },[])
    if (loading)  return <Loading/>
  return (
    <div>

    </div>
  )
}
