// import axios from 'axios';
// import React, { useContext, useState } from 'react'
// import { Link } from 'react-router-dom'
// import * as yup from 'yup';
// import { useFormik } from 'formik';
// import { storecontext } from '../Context/StorecontextProvider';

// export default function PersonalData() {
// const [loading,setloading] =useState(true)
//  let {baseUrl} =useContext(storecontext)
//  const token = localStorage.getItem('token');


// // Define the validation schema
// const validationSchema = yup.object().shape({
//   firstName: yup.string().required('First name is required'),
//   lastName: yup.string().required('Last name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   phone: yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Phone is required'),
//   birthDate: yup.date().max(new Date(), 'Invalid birth date').required('Birth date is required'),
//   ssn: yup.string().matches(/^\d{9}$/, 'Invalid SSN').required('SSN is required'),
//   medicalInsurance: yup.string().required('Medical insurance is required'),
//   password: yup.string().matches(/^[A-Za-z0-9@#-_]{6,}$/, 'Invalid password').required('Password is required'),
//   latitude: yup.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude').required('Latitude is required'),
//   longitude: yup.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude').required('Longitude is required'),
//   address: yup.string().required('Address is required'),
//   profile: yup
//     .mixed()
//     .test('fileType', 'Invalid file format', (value) => {
//       if (!value) return true; // Allow empty value (no image provided)
//       return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
//     })
//     .required('Profile image is required'),
//   nationalFront: yup
//     .mixed()
//     .test('fileType', 'Invalid file format', (value) => {
//       if (!value) return true; // Allow empty value (no image provided)
//       return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
//     })
//     .required('National ID front image is required'),
//   nationalBack: yup
//     .mixed()
//     .test('fileType', 'Invalid file format', (value) => {
//       if (!value) return true; // Allow empty value (no image provided)
//       return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
//     })
//     .required('National ID back image is required'),
// });

// // Function to handle form submission and API call
// function getdatafromapi(values) {
//   setloading(true);

//   // Create FormData object and append form values
//   const formData = new FormData();
//   Object.keys(values).forEach(key => {
//     formData.append(key, values[key]);
//   });

//   axios.post(`${baseUrl}/api/Admin/CreateDriver`, formData,{
//     headers:{
//       'Authorization': `Bearer ${token}`,
//     }
//   })
//     .then((response) => {
//       console.log("API Response:", response);
//       setloading(false);
//     })
//     .catch((error) => {
//       console.error("API Error:", error);
//       setloading(false);
//     });
// }

// // Formik configuration
// const PersonalData = useFormik({
//   initialValues: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     birthDate: "",
//     ssn: "",
//     medicalInsurance: "",
//     password: "",
//     latitude: "",
//     longitude: "",
//     address: "",
//     profile: null,
//     nationalFront: null,
//     nationalBack: null
//   },
//   validationSchema: validationSchema,
//   onSubmit: (values) => getdatafromapi(values)
// });


//   return (
//     <>
//     <h5 className='px-4 pt-3'>Personal Data</h5>
//     <form onSubmit={PersonalData.handleSubmit}>
// <input type="text" className='form-control input-width my-4 mx-4'  />
// <input type="text"  className='form-control input-width my-4 mx-4' />
// <input type="text" className='form-control input-width my-4 mx-4'  />
// <input type="text" className='form-control input-width my-4 mx-4'  />
// <input type="image" src="" alt="" />

 


// <Link className='btn-bg btn ms-auto d-block w-25 my-3 mx-3 fw-bold' to='/adddriver/addcar'>Next</Link>
//     </form>
     
//     </>
//   )
// }
import axios from 'axios';
import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { storecontext } from '../Context/StorecontextProvider';
import upload from '../../assets/images/user-svgrepo-com 1(1).svg'
import nationalFront from '../../assets/images/Group.svg'
import nationalBack from '../../assets/images/card-emulator-pro-svgrepo-com 1.svg'
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';


export default function PersonalData() {
  const { baseUrl } = useContext(storecontext);
  const token = localStorage.getItem('token');
  const [btnloading,setbtnloading] =useState(false);
  const [apiError, setApiError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [nationalBackImage, setNationalBackImage] = useState(null);
  const [nationalFrontImage, setNationalFrontImage] = useState(null);
  const [profileError, setProfileError] = useState('');
  const [nationalFrontError, setNationalFrontError] = useState('');
  const [nationalBackError, setNationalBackError] = useState('');
  // const [mapCenter, setMapCenter] = useState({ lat: 12.2121, lng: 32.322 });
  // const [mapZoom, setMapZoom] = useState(10);
  // const [markerPosition, setMarkerPosition] = useState(null);
  // const [searchAddress, setSearchAddress] = useState('');

  let navigate =useNavigate()

  // Define the validation schema
  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^[0-9]{11}$/, 'Invalid phone number').required('Phone is required'),
    birthDate: yup.date()
    .max(new Date(2006, 0, 1), 'You must be born before 2006')
    .required('Birth date is required'),
    ssn: yup.string().matches(/^\d{6}$/, 'Invalid SSN').required('SSN is required'),
    medicalInsurance: yup.string().required('Medical insurance is required'),
    password: yup.string().matches(/^[A-Za-z0-9@#-_]{6,}$/, 'Invalid password').required('Password is required'),
    latitude: yup.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude').required('Latitude is required'),
    longitude: yup.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude').required('Longitude is required'),
    address: yup.string().required('Address is required'),
    profile: yup
      .mixed()
      .test('fileType', 'Invalid file format', (value) => {
        if (!value) return true; // Allow empty value (no image provided)
        return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
      })
      .required('Profile image is required'),
    nationalFront: yup
      .mixed()
      .test('fileType', 'Invalid file format', (value) => {
        if (!value) return true; // Allow empty value (no image provided)
        return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
      })
      .required('National ID front image is required'),
    nationalBack: yup
      .mixed()
      .test('fileType', 'Invalid file format', (value) => {
        if (!value) return true; // Allow empty value (no image provided)
        return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
      })
      .required('National ID back image is required'),
  });

  // Function to handle form submission and API call
  const getdatafromapi = async (values) => {
   
    setbtnloading(true) // Set loading state to true

    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

    const response=  await axios.post(`${baseUrl}/api/Admin/CreateDriver`, formData, {
        headers: {
         
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log("API Response:", response);
      setbtnloading(false)
      navigate(`/adddriver/addcar/${response.data.data._id}`)
      
    } catch (error) {
      console.error("API Error:", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message); 
      } else {
        setApiError("An unexpected error occurred."); // Fallback error message
      }
      setbtnloading(false)
    } 
  }

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      ssn: "",
      medicalInsurance: "",
      password: "",
      latitude: "12.2121",
      longitude: "32.322",
      address: "USA",
      profile: null,
      nationalFront: null,
      nationalBack: null
    },
    
    validationSchema: validationSchema,
    onSubmit: (values) => getdatafromapi(values)
 
  });
  // const handleProfileImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (file.type && !file.type.startsWith('image/')) {
  //       // If the selected file is not an image, set an error message
  //       formik.setErrors({ ...formik.errors, profile: "Invalid file format. Only images are allowed." });
  //     } else {
  //       // If the selected file is an image, clear any existing error message
  //       formik.setErrors({ ...formik.errors, profile: "" });
  //       // Set profile image and formik field value
  //       setProfileImage(URL.createObjectURL(file));
  //       formik.setFieldValue("profile", file);
  //     }
  //   }
  // };
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
        // Update Formik field value if needed
        formik.setFieldValue("profile", file);
      }
    }
  }
  const handleNationalBackImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        // If the selected file is not an image, set an error message
       
        setNationalBackError("Invalid file format.");
      } else {
        // If the selected file is an image, clear any existing error message
        setNationalBackError("");
        // Set national back image
        setNationalBackImage(URL.createObjectURL(file));
        // Update Formik field value if needed
        formik.setFieldValue("nationalBack", file);
      }
    }
  };
  const handleNationalFrontImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        setNationalFrontError("Invalid file format.");
        // If the selected file is not an image, set an error message
        // formik.setFieldError("nationalFront", "Invalid file format. Only images are allowed.");
      } else {
        // If the selected file is an image, clear any existing error message
        // formik.setFieldError("nationalFront", "");
        // Set national front image
        setNationalFrontError("");
        setNationalFrontImage(URL.createObjectURL(file));
        // Update Formik field value if needed
        formik.setFieldValue("nationalFront", file);
      }
    }
  };
  
  // const handleMapClick = (e) => {
  //   const clickedPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
  //   setMarkerPosition(clickedPosition);
  
  //   // Update form values with the clicked position
  //   formik.setFieldValue('latitude', clickedPosition.lat);
  //   formik.setFieldValue('longitude', clickedPosition.lng);
  // };
  
  // // Event handler for handling Places Autocomplete search
  // const handlePlacesChanged = () => {
  //   const places = searchBoxRef.getPlaces();
  //   if (places.length > 0) {
  //     const place = places[0];
  //     setMapCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
  //     setSearchAddress(place.formatted_address);
  
  //     // Update form values with the selected place
  //     formik.setFieldValue('latitude', place.geometry.location.lat());
  //     formik.setFieldValue('longitude', place.geometry.location.lng());
  //     formik.setFieldValue('address', place.formatted_address);
  //   }
  // };

  return (
    <>
      <h5 className='px-3 pt-3'>Personal Data</h5>
      <form onSubmit={formik.handleSubmit}>
     <div className='d-flex'>
      <div className='w-50'>
        <input type="text" className='form-control  my-4  py-2 w-75 mx-3' name="firstName" value={formik.values.firstName} onChange={formik.handleChange} placeholder='Enter YourFirst Name'  onBlur={formik.handleBlur} />
        {formik.errors.firstName && formik.touched.firstName ? <div className="alert alert-danger w-75 mx-3">{formik.errors.firstName}</div> : ''}
        <input type="text" className='form-control  my-4  w-75 mx-3 py-2' name="lastName" value={formik.values.lastName} onChange={formik.handleChange} placeholder='Ener Your Last Name'   onBlur={formik.handleBlur} />
        {formik.errors.lastName && formik.touched.lastName ? <div className="alert alert-danger w-75 mx-3">{formik.errors.lastName}</div> : ''}
        <input type="email" className='form-control  my-4  w-75 mx-3 py-2' name="email" value={formik.values.email} onChange={formik.handleChange} placeholder='Enter Your Email'   onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger w-75 mx-3">{formik.errors.email}</div> : ''}
        <input type="password"className='form-control  my-4  w-75 mx-3 py-2'name="password"value={formik.values.password}onChange={formik.handleChange}placeholder="Enter Password"   onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger w-75 mx-3">{formik.errors.password}</div> : ''}
        <input type="text" className='form-control  my-4  w-75 mx-3 py-2' name="phone" value={formik.values.phone} onChange={formik.handleChange} placeholder='Enter Your Phone '   onBlur={formik.handleBlur} />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger w-75 mx-3">{formik.errors.phone}</div> : ''}
        <input type="date"className='form-control my-4  w-75 mx-3 py-2 'name="birthDate" value={formik.values.birthDate}onChange={formik.handleChange}   onBlur={formik.handleBlur}/>
        {formik.errors.birthDate && formik.touched.birthDate ? <div className="alert alert-danger w-75 mx-3">{formik.errors.birthDate}</div> : ''}
        <input type="text"className='form-control  my-4  w-75 mx-3 py-2' name="ssn"value={formik.values.ssn} onChange={formik.handleChange} placeholder="Enter SSN"   onBlur={formik.handleBlur}/>
        {formik.errors.ssn && formik.touched.ssn ? <div className="alert alert-danger w-75 mx-3">{formik.errors.ssn}</div> : ''}
        <input type="text"className='form-control  my-4  w-75 mx-3 py-2'name="medicalInsurance"value={formik.values.medicalInsurance}onChange={formik.handleChange} placeholder="Enter Medical Insurance"  onBlur={formik.handleBlur}/>
        {formik.errors.medicalInsurance && formik.touched.medicalInsurance ? <div className="alert alert-danger w-75 mx-3">{formik.errors.medicalInsurance}</div> : ''}
        
       
        </div>
    <div className=' w-50'>
<div className='mt-3 mb-4 mx-5 px-5'>
     <label htmlFor="profileImageUpload">
    
          {profileImage ? (
            <div className='div-img'  style={{overflow:'hidden'}}><img src={profileImage} alt="Profile" className="uploaded-image" />
           
            </div>
          ) : (
           <div className='div-img'> <img src={upload} alt="Placeholder" className="placeholder-image" />
            <i className="fa-solid fa-plus bg-i" ></i>
           </div>
          )}
          <p className=' p-color'>Profile image</p>
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



      {/* <input type="file"className='form-control  my-4'name="nationalBack"onChange={(event) => formik.setFieldValue("nationalBack", event.currentTarget.files[0])} onBlur={formik.handleBlur}/>
        {formik.errors.nationalBack && formik.touched.nationalBack ? <div className="alert alert-danger">{formik.errors.nationalBack}</div> : ''} */}
<div className='d-flex gap-5'>
<div>
        <label htmlFor="nationalFrontUpload">
        {nationalFrontImage ? (
          <div className='div-img' style={{overflow :"hidden"}}><img src={nationalFrontImage} alt="National Front" className="uploaded-image" /></div>
        ) : (
         <div className=' div-img'> <img src={nationalFront} alt="Placeholder" className="placeholder-image" />
           <i className="fa-solid fa-plus bg-i" ></i></div>
        )}
         <p className='p-color'>Front national ID</p>
      </label>
      <input
        id="nationalFrontUpload"
        accept='image/*'
        type="file"
        className='form-control my-4'
        style={{ display: "none" }}
        onChange={handleNationalFrontImageChange}
        onBlur={formik.handleBlur}
      />
       {formik.errors.nationalFront && formik.touched.nationalFront ? <div className="alert alert-danger">{formik.errors.nationalFront}</div> : ''}
      {nationalFrontError && <div className="alert alert-danger">{nationalFrontError}</div>}
</div>

<div>
<label htmlFor="nationalBackUpload">

  {nationalBackImage ? (
   <div className='div-img' style={{overflow:'hidden'}}> <img src={nationalBackImage} alt="National Back" className="uploaded-image" /></div>
  ) : (
    <div className='div-img'><img src={nationalBack} alt="Placeholder" className="placeholder-image" />
      <i className="fa-solid fa-plus bg-i" ></i>
    </div>
  )}
  <p className='p-color'>Back national ID</p>
</label>
<input
  id="nationalBackUpload"
  type="file"
  accept='image/*'
  className='form-control my-4'
  style={{ display: "none" }}
  onChange={handleNationalBackImageChange}
  onBlur={formik.handleBlur}/>
   {formik.errors.nationalBack && formik.touched.nationalBack ? <div className="alert alert-danger ">{formik.errors.nationalBack}</div> : ''}
  {nationalBackError && <div className="alert alert-danger">{nationalBackError}</div>}
</div>

</div>
     
       
        </div>
        </div>


{apiError && <div className="alert alert-danger">{apiError}</div>}
        <button type='submit' className='btn-bg btn ms-auto d-block w-25 my-3 mx-3 fw-bold'   disabled={!formik.isValid && formik.dirty}>{btnloading ? <i className="fa-solid fa-spinner"></i> : 'Next'}</button>

      </form>
    </>
  )
}

