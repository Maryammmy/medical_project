

import axios from 'axios';
import React, { useState,useContext,useEffect } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'
import { storecontext } from '../Context/StorecontextProvider';
import * as yup from 'yup';
import { useFormik } from 'formik';
import upload from '../../assets/images/user-svgrepo-com 1(1).svg'
import nationalFront from '../../assets/images/Group.svg'
import nationalBack from '../../assets/images/card-emulator-pro-svgrepo-com 1.svg'
import { LoadScript, GoogleMap, Autocomplete,StandaloneSearchBox, InfoWindow, Marker, LoadScriptNext }from '@react-google-maps/api';
import Loading from '../Loading/Loading';




const YOUR_API_KEY = 'AIzaSyDpRNzE-9ne0Gwcs_56dPa9E9aTCLsiECA';
const libraries = ["places"];
export default function UpdatePersonalData() {
  
  const [btnloading,setbtnloading] =useState(false);
  const [apiError, setApiError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [nationalBackImage, setNationalBackImage] = useState(null);
  const [nationalFrontImage, setNationalFrontImage] = useState(null);
  const [profileError, setProfileError] = useState('');
  const [nationalFrontError, setNationalFrontError] = useState('');
  const [nationalBackError, setNationalBackError] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 12.2121, lng: 32.322 });
  const [mapZoom, setMapZoom] = useState(10);
  const searchBoxRef = React.useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const {baseUrl,selected} =useContext(storecontext)
  let navigate =useNavigate()
  let token = sessionStorage.getItem('token')
  let {id} =useParams()
  console.log((selected));
  


  // Define the validation schema
  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^[0-9]{11}$/, 'Invalid phone number').required('Phone is required'),
    latitude: yup.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude').required('Latitude is required'),
    longitude: yup.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude').required('Longitude is required'),
    address: yup.string().required('Address is required'),
    profile: yup.mixed().nullable().test('fileType', 'Invalid file format', (value) => {
      if (!value) return true; // Allow null value (no image provided)
      return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'].includes(value.type);
    }),
    
      
 

  });

  // Function to handle form submission and API call
  const sendDataToApi = async (values) => {
   
    setbtnloading(true) // Set loading state to true

    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

    const response=  await axios.put(`${baseUrl}/api/Admin/UpdateDriver?id=${id}`, formData, {
        headers: {
         
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log("API Response:", response);
      setbtnloading(false)
      navigate('/drivers')
      
    } catch (error) {
      console.error("API Error:", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message); 
        if(error.response.data.message=="Authorization Failed"){
          navigate('/login')
        }
      } else {
        setApiError("An unexpected error occurred."); // Fallback error message
      }
      setbtnloading(false)
    } 
  }

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      firstName: selected.user?.firstName,
      lastName: selected.user?.lastName,
      email: selected.user?.email,
      phone: selected.user?.phone,
      birthDate: null,
      ssn: null,
      medicalInsurance: null,
      password: null,
      latitude: selected.location?.latitude,
      longitude: selected.location?.longitude,
      address: selected.location?.address,
      profile:null,
      nationalFront: null,
      nationalBack: null
    },
    
    validationSchema: validationSchema,
    onSubmit: (values) => sendDataToApi(values)
 
  });

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        // If the selected file is not an image, set an error message
        setProfileError("Invalid file format.");
      } else {
        // If the selected file is an image, clear any existing error message
        setProfileError("");
        // Set profile image
        setProfileImage(URL.createObjectURL(file));
        // Update Formik field value
        formik.setFieldValue("profile", file);
      }
    } 
    // else {
    //   // If no file is selected, clear any existing error message and set the profile field to null
    //   setProfileError("");
    //   setProfileImage(null); // Clear profile image
    //   formik.setFieldValue("profile", null);
    // }
  }
  

  
 
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setMapVisible(true);
  
    // Set latitude and longitude in formik values
    formik.setFieldValue('latitude', place.geometry.location.lat());
    formik.setFieldValue('longitude', place.geometry.location.lng());
    // Set address in formik values
    formik.setFieldValue('address', place.formatted_address);
  };
  return (
    <>
    <h5 className='px-3 pt-3'>Personal Data</h5>
    <form onSubmit={formik.handleSubmit}>
   <div className='d-flex input-container'>
    <div className='w-50 input-width'>
      <input type="text" className='form-control  my-4  py-2 w-75 mx-3' name="firstName" value={formik.values.firstName} onChange={formik.handleChange} placeholder='First Name'  onBlur={formik.handleBlur} />
      {formik.errors.firstName && formik.touched.firstName ? <div className="alert alert-danger w-75 mx-3">{formik.errors.firstName}</div> : ''}
      <input type="text" className='form-control  my-4  w-75 mx-3 py-2' name="lastName" value={formik.values.lastName} onChange={formik.handleChange} placeholder='Last Name'   onBlur={formik.handleBlur} />
      {formik.errors.lastName && formik.touched.lastName ? <div className="alert alert-danger w-75 mx-3">{formik.errors.lastName}</div> : ''}
      <input type="email" className='form-control  my-4  w-75 mx-3 py-2' name="email" value={formik.values.email} onChange={formik.handleChange} placeholder='Email'   onBlur={formik.handleBlur} />
      {formik.errors.email && formik.touched.email ? <div className="alert alert-danger w-75 mx-3">{formik.errors.email}</div> : ''}
      
      
      <input type="text" className='form-control  my-4  w-75 mx-3 py-2' name="phone" value={formik.values.phone} onChange={formik.handleChange} placeholder='Phone '   onBlur={formik.handleBlur} />
      {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger w-75 mx-3">{formik.errors.phone}</div> : ''}
      
     
     
    
      <LoadScript googleMapsApiKey={YOUR_API_KEY} libraries={libraries} >
        <Autocomplete
          onLoad={(autocomplete) => {
           
            searchBoxRef.current = autocomplete;
          }}
          onPlaceChanged={() => {
            const place = searchBoxRef.current.getPlace();
            if (place && place.geometry) {
              handlePlaceSelect(place);
              
            }
          }}
        >
          <input
            type="text"
            className='form-control my-4 w-75 mx-3 py-2'
            placeholder="Address"
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
          
          />
        </Autocomplete>
        {formik.errors.address && formik.touched.address ? (
          <div className="alert alert-danger w-75 mx-3">{formik.errors.address}</div>
        ) : null}
        {selectedPlace && (
          <GoogleMap
            mapContainerStyle={{ width: '75%', height: '200px',marginLeft:'20px'}}
            center={{ lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }}
            zoom={10} >
            {/* Your Google Map components */}
          </GoogleMap>
        )}
        {!selectedPlace && (
          <GoogleMap
            mapContainerStyle={{ display:'none'}}
            center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
            zoom={mapZoom}
          >
          </GoogleMap>
        )}
     
      </LoadScript>
    


     
      </div>
  <div className=' w-50 input-width'>
<div className='mt-3 mb-4 mx-5 px-5 text-center'>
   <label htmlFor="profileImageUpload">
  
        {profileImage ? (
          <div className='div-img'  style={{overflow:'hidden'}}><img src={profileImage} alt="Profile" className="uploaded-image" />
         
          </div>
        ) : (
         <div className='div-img'> <img src={selected.user?.profileImage} alt="Placeholder" className="updated-image" />
          <i className="fa-solid fa-plus bg-i" ></i>
         </div>
        )}
        <p className=' p-color text-center'>Profile image</p>
      </label>
      <input
        id="profileImageUpload"
        type="file"
       accept='image/*'
        style={{ display: "none" }}
        onChange={handleProfileImageChange}
        onBlur={formik.handleBlur} />
         {profileError && <div className="alert alert-danger">{profileError}</div>}
         {formik.errors.profile && formik.touched.profile ? <div className="alert alert-danger">{formik.errors.profile}</div> : ''}
</div>



  

   
     
      </div>
      </div>


{apiError && <div className="alert alert-danger">{apiError}</div>}
    <div className='text-end '>  <button type='submit' className='btn-bg btn px-5 py-2 my-3 mx-3 fw-bold'   disabled={!formik.isValid && formik.dirty}>{btnloading ? <Loading/>  : 'Update'}</button></div>

    </form>
  </>
  )
}
