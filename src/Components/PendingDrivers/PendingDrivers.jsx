import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';

export default function PendingDrivers() {
  const [pendingdrivers,setpendingdrivers] =useState([])
  const [loading,setloading] =useState(true)
  const token = localStorage.getItem('token');
  async function getpendingdrivers(){
    try  {
       const data = await axios.get('https://medicurb.onrender.com/api/Admin/PendingDrivers/0', {
         headers: {
           'Authorization': `Bearer ${token}`,
         },
       });
       if(data.status==200){
         console.log(data);
         setloading(false)
         setpendingdrivers(data.data.data)
         console.log(data.data.data)
        
        
       }
       
     } catch (err) {
       console.log(err);
     }
   }
   useEffect(()=>{
    getpendingdrivers()
   },[])
     if (loading)  return <Loading/>
  return (
    <>
    <div className="container-fluid">
      < div className="d-flex justify-content-between py-3">
       <h2 className='h-color'> Pending Drivers</h2>
     <div  className=" position-relative">
     <i className="fa-regular fa-bell fs-4 i-color"></i>
  <span className="position-absolute top-0 start-100 translate-middle  py-1 px-1 badge badge-color rounded-circle ">
    2
    <span className="visually-hidden">unread messages</span>
  </span>
</div>

     </div>
      </div>
      <div className="container-fluid bg-light">
        <div className='d-flex justify-content-between py-4'>
          <input type="search" className='form-control w-25' placeholder='search'  />
          <button className='btn btn-bg'> + Add Drivers</button>
        </div>
        <div className="container-fluid bg-white py-3 px-5 text-color text-center rounded-3">
  <div className="row row-bg py-3 rounded-3">  
    <div className="col-md-2">Name</div>
    <div className="col-md-2">Address</div>
    <div className="col-md-2">Phone number</div>
    <div className="col-md-2">Active</div>
    <div className="col-md-2">status</div>
    <div className="col-md-2">Actions</div>
  </div>
  {pendingdrivers.map((item)=>{
    return  <div className="row my-3 py-3 brdr" key={item._id}>
    <div className="col-md-2 d-flex justify-content-evenly name-color"><span><img src={item.user.profileImage} alt="" className='img'  /></span><span >{item.user.firstName}</span></div>
    <div className="col-md-2">{item.location.address.split(' ').slice(0,3).join(' ')}</div>
    <div className="col-md-2">{item.user.phone}</div>
    <div className="col-md-2"></div>
    <div className="col-md-2"></div>
    <div className="col-md-2"></div>
  </div>
  })}

 
</div>
      </div>
      </>
  )
}
