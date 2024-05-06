

import * as Yup from 'yup';
import React, { useState, useContext,useRef } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { storecontext } from '../Context/StorecontextProvider';
import axios from 'axios';
import { LoadScript, GoogleMap, Autocomplete,StandaloneSearchBox, InfoWindow, Marker }from '@react-google-maps/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../Loading/Loading';

const YOUR_API_KEY = 'AIzaSyDpRNzE-9ne0Gwcs_56dPa9E9aTCLsiECA';
const libraries = ['places'];

export default function TripDetails() {
  const { baseUrl,token } = useContext(storecontext);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [btnloading, setbtnloading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const searchBoxRef = useRef(null);
  const searchBox = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: 12.2121, lng: 32.322 });
  const [mapZoom, setMapZoom] = useState(10);
  const today = new Date(); // Get today's date
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because getMonth() returns zero-based index
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  


  const sendDataToApi = (values) => {
    setbtnloading(true);
    axios.post(`${baseUrl}/api/Admin/CreateTrip`, values, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response);
        // navigate('/addtrip/assigndriver');
        // const { latitude, longitude } = response.data.data.pickup;
        // navigate(`/addtrip/assigndriver?latitude=${latitude}&longitude=${longitude}`); 
          const { latitude, longitude } = response.data.data.pickup;
          navigate(`/addtrip/assigndriver/${response.data.data._id}`, { state: { latitude, longitude } }); 
   

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

  const validationSchema = Yup.object().shape({
 
    driver: Yup.string().min(3, 'First name must be at least 3 characters')
    .max(15, 'First name must be at most 15 characters').notRequired(), 
    firstName: Yup.string()
      .min(3, 'First name must be at least 3 characters')
      .max(15, 'First name must be at most 15 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(3, 'Last name must be at least 3 characters')
      .max(15, 'Last name must be at most 15 characters')
      .required('Last name is required'),
    birthDate: Yup.date().required('Birth date is required'),
    phone: Yup.string().required('Phone number is required'),
    type: Yup.string().required('Type is required'),
    date: Yup.date().required('Date is required'),
    time: Yup.string().required('Time is required'),
    cost: Yup.number() .min(0, 'Cost must be a non-negative value').required('Cost is required'),
    number: Yup.string().notRequired(),
    specialNeeds: Yup.string().notRequired().max(255, 'Special needs must be less than 255 characters'),
    pickup: Yup.object().shape({
      latitude: Yup.number().required('Latitude is required'),
      longitude: Yup.number().required('Longitude is required'),
      address: Yup.string().required('Pickup address is required'),
    }),
    destination: Yup.object().shape({
      latitude: Yup.number().required('Latitude is required'),
      longitude: Yup.number().required('Longitude is required'),
      address: Yup.string().required('Destination address is required'),
    }),
  });

  const trip = useFormik({
    initialValues: {
    
      driver:null, // Not Required
      firstName: '',
      lastName: '',
      birthDate: '',
      phone: '',
      type: '',
      date: formattedDate, // empty initially
      time: '', // empty initially
      cost: '',
      number: '', // Not Required
      specialNeeds: '', // Not Required
      pickup: {
        latitude: '',
        longitude: '',
        address: '',
      },
      destination: {
        latitude: '',
        longitude: '',
        address: '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => sendDataToApi(values),
  });
  
  
  const handlePlaceSelect = (place, isPickup) => {
    if (place && place.geometry && place.geometry.location) {
      const selectedPlace = {
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };
  
      // Set the appropriate fields based on whether it's a pickup or destination
      if (isPickup) {
        trip.setFieldValue('pickup.address', selectedPlace.address);
        trip.setFieldValue('pickup.latitude', selectedPlace.latitude);
        trip.setFieldValue('pickup.longitude', selectedPlace.longitude);
        setSelectedPickup(selectedPlace);
        console.log(selectedPlace)
      } else {
        trip.setFieldValue('destination.address', selectedPlace.address);
        trip.setFieldValue('destination.latitude', selectedPlace.latitude);
        trip.setFieldValue('destination.longitude', selectedPlace.longitude);
        setSelectedDestination(selectedPlace);
        console.log(selectedPlace)
      }
    } else {
      console.error('Invalid place object:', place);
    }
  };
  
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };


  
  return (
    <div>
    <h5 className='px-3 pt-3'>Trip Details</h5>
    <form onSubmit={trip.handleSubmit}>
      <div className='d-flex'>
        <div className='w-50'>
          <label className=' mx-3 mt-2'>First Name</label>
        <input type="text" className='form-control mt-2  mb-4  py-2 w-75 mx-3' name="firstName" value={trip.values.firstName} onChange={trip.handleChange} placeholder='First Name'  onBlur={trip.handleBlur} />
        {trip.errors.firstName && trip.touched.firstName ? <div className="alert alert-danger w-75 mx-3">{trip.errors.firstName}</div> : ''}
        <label className=' mx-3'> Last Name</label>
        <input type="text" className='form-control mt-2  mb-4  py-2 w-75 mx-3' name="lastName" value={trip.values.lastName} onChange={trip.handleChange} placeholder='Last Name'  onBlur={trip.handleBlur} />
        {trip.errors.lastName && trip.touched.lastName? <div className="alert alert-danger w-75 mx-3">{trip.errors.lastName}</div> : ''}
       
       
        <label className=' mx-3'>Phone</label>
        <input type="text" className='form-control   mt-2  mb-4  py-2 w-75 mx-3' name="phone" value={trip.values.phone} onChange={trip.handleChange} placeholder='Phone'  onBlur={trip.handleBlur} />
        {trip.errors.phone&& trip.touched.phone ? <div className="alert alert-danger w-75 mx-3">{trip.errors.phone}</div> : ''} 
        <label className=' mx-3'>Birth Date</label> 
        <input type="date"className='form-control  mt-2  mb-4  w-75 mx-3 py-2 'name="birthDate" value={trip.values.birthDate} onChange={trip.handleChange}  onBlur={trip.handleBlur}/>
        {trip.errors.birthDate && trip.touched.birthDate ? <div className="alert alert-danger w-75 mx-3">{trip.errors.birthDate}</div> : ''}
        <label className=' mx-3'>Special Needs</label>
        <input type="text"className='form-control  mt-2  mb-4  w-75 mx-3 py-2 'name="specialNeeds" placeholder='Special Needs' value={trip.values.specialNeeds} onChange={trip.handleChange}  onBlur={trip.handleBlur}/>
        {trip.errors.specialNeeds && trip.touched.specialNeeds ? <div className="alert alert-danger w-75 mx-3">{trip.errors.specialNeeds}</div> : ''}
        <label className=' mx-3'>Number</label>
        <input type="text" className='form-control   mt-2  mb-4  py-2 w-75 mx-3' name="number" value={trip.values.number} onChange={trip.handleChange} placeholder='Number'  onBlur={trip.handleBlur} />
        {trip.errors.number && trip.touched.number ? <div className="alert alert-danger w-75 mx-3">{trip.errors.number}</div> : ''}
        
        </div>
        <div className='w-50'>
        <LoadScript googleMapsApiKey={YOUR_API_KEY} libraries={libraries}>
          <Autocomplete
  onLoad={(autocomplete) => {
    searchBox.current = autocomplete;
  }}
  onPlaceChanged={() => {
    const place = searchBox.current.getPlace();
    
    if (place && place.geometry) {
      handlePlaceSelect(place, true); // For pickup
     
    }
  }}
>
  <>
<label className=' mx-3'>Pick up</label>
  <input
    type="text"
    className='form-control mt-2  mb-4 w-75 mx-3 py-2'
    placeholder="Pickup Address"
    name='pickup.address'
    onBlur={trip.handleBlur}
  />
  {/* {trip.errors.pickup?.address && trip.touched.pickup?.address ? <div className="alert alert-danger w-75 mx-3">{trip.errors.pickup.address}</div> : ''} */}
  </>
</Autocomplete>


  {selectedPickup && (
  <GoogleMap
    mapContainerStyle={{ width: '75%', height: '200px', marginLeft: '20px' }}
    center={{ lat: selectedPickup.latitude, lng: selectedPickup.longitude }}
    zoom={10}
  >
    {/* Your Google Map components */}
  </GoogleMap>
)}

{!selectedPickup && (
  <GoogleMap
    mapContainerStyle={{ display:'none' }}
    center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
    zoom={mapZoom}
  >
    {/* Your Google Map components */}
  </GoogleMap>
)}

          </LoadScript>
          <LoadScript googleMapsApiKey={YOUR_API_KEY} libraries={libraries}>
          <Autocomplete
  onLoad={(autocomplete) => {
    searchBoxRef.current = autocomplete;
  }}
  onPlaceChanged={() => {
    const place = searchBoxRef.current.getPlace();
   
    if (place && place.geometry) {
      handlePlaceSelect(place, false); // For destination
    
    }
  }}
>
  <>
<label className=' mx-3'>Destination</label>
  <input
    type="text"
    className='form-control mb-4 mt-2 w-75 mx-3 py-2'
    placeholder="Destination Address"
    name='destination.address'
    onBlur={trip.handleBlur}
  />
  {/* {trip.errors.destination?.address && trip.touched.destination?.address ? <div className="alert alert-danger w-75 mx-3">{trip.errors.destination.address}</div> : ''} */}
  </>
          </Autocomplete>
            {selectedDestination && (
            <GoogleMap
             mapContainerStyle={{ width: '75%', height: '200px', marginLeft: '20px' }}
             center={{ lat: selectedDestination.latitude, lng: selectedDestination.longitude }}
             zoom={10}
  >
            {/* Your Google Map components */}
           </GoogleMap>
                                      )}

            {!selectedDestination && (
  <GoogleMap
    mapContainerStyle={{ display:'none' }}
    center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
    zoom={mapZoom}
  >
    {/* Your Google Map components */}
  </GoogleMap>
                                      )}
          </LoadScript>
          
        <label className=' mx-3'>Cost</label>
        <input type="number" className='form-control   mt-2  mb-4  py-2 w-75 mx-3' name="cost" value={trip.values.cost} onChange={trip.handleChange} placeholder='Cost'  onBlur={trip.handleBlur} />
        {trip.errors.cost && trip.touched.cost ? <div className="alert alert-danger w-75 mx-3">{trip.errors.cost}</div> : ''}
        <label className=' mx-3'>Date</label>
        <input type="date" className='form-control  mt-2  mb-4  py-2 w-75 mx-3' name="date"    value={trip.values.date}
            onChange={trip.handleChange}   onBlur={trip.handleBlur} />
        {trip.errors.date && trip.touched.date ? <div className="alert alert-danger w-75 mx-3">{trip.errors.date}</div> : ''}
        <label className=' mx-3'>Type</label>
        <input type="text" className='form-control   mt-2  mb-4  py-2 w-75 mx-3' name="type" value={trip.values.type} onChange={trip.handleChange} placeholder='Type'  onBlur={trip.handleBlur} />
        {trip.errors.type && trip.touched.type ? <div className="alert alert-danger w-75 mx-3">{trip.errors.type}</div> : ''}
        <label className=' mx-3'>Time</label>
        <input type="time" className='form-control   mt-2  mb-4  py-2 w-75 mx-3' name="time" value={trip.values.time} onChange={trip.handleChange} placeholder='Time'  onBlur={trip.handleBlur} />
        {trip.errors.time && trip.touched.time ? <div className="alert alert-danger w-75 mx-3">{trip.errors.time}</div> : ''}
        </div>
      </div>
      {apiError && <div className="alert alert-danger">{apiError}</div>}
        <button type='submit' className='btn-bg btn ms-auto d-block w-25 my-3 mx-3 fw-bold'   disabled={!trip.isValid}>{btnloading ? <Loading/> : 'Next'}</button>
    </form>
  </div>
  );
  
}
