
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { storecontext } from '../Context/StorecontextProvider';

export default function Driverdetails() {
  const token = localStorage.getItem('token');
  const [driverdetails, setDriverdetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { selectedItemId,baseUrl } = useContext(storecontext);

  useEffect(() => {
    async function getDriverdetails() {
      try {
        if (selectedItemId ) {
         setLoading(true)
          const response = await axios.get(`${baseUrl}/api/Admin/DriverDetails?id=${selectedItemId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if(response.status==200){
            setLoading(false);
            setDriverdetails(response.data.data);
           console.log(response.data.data)
          }
         
        }
      } catch (error) {
        setLoading(false)
        console.error(error);
       
      }
      
    }

    getDriverdetails();
  }, [selectedItemId]);

  if (loading) return <Loading />;

  return (
    <>
    <div className='d-flex '>
      <span className='images'><img src={driverdetails.user.profileImage} alt="" /></span>
      <span className='ps-5 pt-3'>{driverdetails.user.firstName}</span>
    </div>
    <div>
    <p className='pt-4 mb-0 red-color'>Personal</p>
    <p className='mb-0 pb-2 red-color' >Information</p>
    </div>
    <div>
      <div className='d-flex justify-content-between'>
     <span className='p-color'><i className="fa-solid fa-phone i-color"></i>Phone number</span>
       <span className='content-color'>{driverdetails?.user?.phone}</span>
       </div>
       <div className='d-flex justify-content-between'>
     <span className='p-color'> <i className="fa-solid fa-location-dot i-color"></i>Address</span>
       <span className='content-color'>{driverdetails?.location?.address.split(' ').slice(0,3).join(' ')}</span>
       </div>
       <div className='d-flex justify-content-between'>
     <span className='p-color'><i className="fa-solid fa-calendar i-color"></i>Birthday</span>
       <span className='content-color'>{driverdetails?.user?.birthDate}</span>
       </div>
    </div>
    <div>
    <p className='pt-4 mb-0 red-color'>Car</p>
    <p className='mb-0 pb-2 red-color' >Information</p>
    </div>
    <div>
      <div className='d-flex justify-content-between'>
     <span className='p-color'><i className="fa-solid fa-car-side i-color"></i>Car type</span>
       <span className='content-color'>{driverdetails?.car?.carType}</span>
       </div>
       <div className='d-flex justify-content-between'>
     <span className='p-color'><i className="fa-solid fa-car-side i-color"></i>Car model</span>
       <span className='content-color'>{driverdetails?.car?.carModel}</span>
       </div>
       <div className='d-flex justify-content-between'>
     <span className='p-color'><i className="fa-solid fa-palette i-color"></i>Car color</span>
       <span className='content-color'>{driverdetails?.car?.color}</span>
       </div>
    </div>
    <div>
      <p className='mb-0 pt-4 red-color'>National Id</p>
      <span><img src={driverdetails?.nationalCard?.front} alt="" className='w-50' /></span> 
      <span><img src={driverdetails?.nationalCard?.back} alt="" className='w-50' /></span> 
    </div>
    <div>
      <p className='mb-0 pt-4 red-color'>car License</p>
      <span><img src={driverdetails?.car?.registration} alt="" className='w-50' /></span> 
      <span><img src={driverdetails?.car?.insurance} alt="" className='w-50' /></span> 
    </div>
    </>
   
  );
}

