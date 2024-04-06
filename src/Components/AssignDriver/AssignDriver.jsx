import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { storecontext } from '../Context/StorecontextProvider'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CartSkeleton from '../CartSkeleton/CartSkeleton'
import AssignDriverSkeleton from '../AssignDriverSkeleton/AssignDriverSkeleton'


export default function AssignDriver() {

const [loading,setLoading] =useState(true)
const [driver,setDriver] =useState([])
const token = localStorage.getItem('token')
let {baseUrl} =useContext(storecontext)
  const [selectedDriverId, setSelectedDriverId] = useState(null);
const location = useLocation(); // Use useLocation hook to access location state
const { latitude, longitude } = location.state;
const [btnloading, setbtnloading] = useState(false);
const [apiError, setApiError] = useState(null);
let navigate = useNavigate();
let {id} =useParams()
let obj ={
  driver : selectedDriverId
}




  async function getDriver() {
    setLoading(true)
    try {
      const data = await axios.get(`${baseUrl}/api/Admin/NearestDrivers?latitude=${latitude}&longitude=${longitude}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
       
      if (data.status==200) {
        setDriver(data.data.data)
        console.log(data.data.data)
        setLoading(false)
       } 
    } catch (err) {
      console.log(err);
      setLoading(false)
    
    } 
  }
  
  const handleRadioChange = (driverId) => {
    setSelectedDriverId(driverId); // Set the selected driver ID
    console.log('Selected Driver ID:', driverId); // Log the selected driver ID
    // Here you can send the selected driver ID as a parameter to another function
  };
    useEffect(()=>{
     getDriver()
    },[])
    const sendDataToApi = () => {
      setbtnloading(true);
      axios.put(`${baseUrl}/api/Admin/UpdateTrip?id=${id}`, obj, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response)
          navigate(`/trips`); 
          setbtnloading(false);
        })
        .catch((error) => {
          console.error("API Error:", error); // Log the error for debugging
          if (error.response && error.response.data && error.response.data.message) {
            setApiError(error.response.data.message);
          } else {
            setApiError("An unexpected error occurred."); // Fallback error message
          }
          setbtnloading(false);
        });
        
    };
   
 
  

 
  return (
    <div className='container-fluid'>
            {loading ? (
           <AssignDriverSkeleton cards={2}/>
          ) : (
            driver.map((item) => (
              <div className="row my-3 py-3 brdr justify-content-around text-center" key={item.driver._id}>
               <div className='col-md-1 d-flex align-items-center justify-content-center'>
               <input
                type="radio"
                name="selectedDriver"
                id={item.driver._id}
                value={item.driver._id}
                onClick={() => handleRadioChange(item.driver._id)} 
                style={{ width: '15px', height: '15px' }}
                />
                </div>
                <div className="col-md-2">
                  <div className='images'><img src={item.driver.user.profileImage} alt="" />
                  </div>
                </div>
                <div className="col-md-2 d-flex align-items-center ">{item.driver.user.firstName}</div>
                <div className="col-md-2 d-flex align-items-center">{item.driver.user.phone}</div>
               <div className='col-md-2 d-flex align-items-center'>
                {item.driver.visible === false ? <span><i className="fa-solid fa-circle off pe-2"></i>Offline</span> : <span><span className="fa-solid fa-circle on pe-2"></span>Online</span>}
                </div> 
                <div className="col-md-2 d-flex align-items-center">
                {typeof item.distance === 'number' && item.distance.toFixed(1) +' miles'}
                </div>

              
                </div>
            
            ))
          )}
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        <button onClick={sendDataToApi} type='submit' className='btn-bg btn ms-auto d-block w-25 my-3 mx-3 fw-bold' >{btnloading ? <i className="fa-solid fa-spinner"></i> : 'Assign'}</button>
    </div>
  )
}
