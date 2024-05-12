
import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { storecontext } from '../Context/StorecontextProvider'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import upload from '../../assets/images/user-svgrepo-com 1(1).svg'
import register from '../../assets/images/Group.svg'
import insurance from '../../assets/images/card-emulator-pro-svgrepo-com 1.svg'
import Loading from '../Loading/Loading';

export default function AddCar() {
  let {id}=  useParams()
  let {baseUrl} =useContext(storecontext)
  const [btnloading,setbtnloading] =useState(false)
  const [apiError, setApiError] = useState(null);
  const [registerImage, setRegisterImage] = useState(null);
  const [insuranceImage, setInsuranceImage] = useState(null);
  const [registerError, setRegisterError] = useState('');
  const [insuranceError, setInsuranceError] = useState('');
  let navigate =useNavigate()
  let token =sessionStorage.getItem('token')

  const senddatatoapi=  async (values) => {
    setbtnloading(true)
    try {
      // const formData = new FormData();
      // Object.entries(values).forEach(([key, value]) => {
      //   if (key === 'registrationImage' || key === 'insuranceImage') {
      //     formData.append(key, value); // Append image files to form data
      //   } else {
      //     formData.append(key, JSON.stringify(value)); // Append other form fields
      //   }
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
     const response = await axios.post(`${baseUrl}/api/Admin/CreateCar?id=${id}`, formData,{
      headers:{
        'Authorization': `Bearer ${token}`,
      }
     });
      console.log(response)
      setbtnloading(false)
      navigate(`/adddriver/addcarablum/${response.data.data.driver}`)
    } catch (error) {
      console.error('API Error:', error);
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
const validationSchema = yup.object().shape({
  carType: yup.string().required('Car type is required'),
  carModel: yup.string().required('Car model is required'),
  plateNum: yup.string().required('Plate number is required'),
  color: yup.string().required('Color is required'),
  registration: yup
    .mixed()
    .test('fileType', 'Invalid file format', (value) => {
      if (!value) return true; // Allow empty value (no image provided)
      return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
    })
    .required('Registration image is required'),
  insurance: yup
    .mixed()
    .test('fileType', 'Invalid file format', (value) => {
      if (!value) return true; // Allow empty value (no image provided)
      return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
    })
    .required('Insurance image is required'),
});
  const formik = useFormik({
    initialValues: {
      carType: '',
      carModel: '',
      plateNum: '',
      color: '',
      registration: null,
      insurance: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => senddatatoapi(values)
  });
  const handleRegisterImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        setRegisterError("Invalid file format.");
        // If the selected file is not an image, set an error message
        // formik.setFieldError("nationalFront", "Invalid file format. Only images are allowed.");
      } else {
        // If the selected file is an image, clear any existing error message
        // formik.setFieldError("nationalFront", "");
        // Set national front image
        setRegisterError("");
        setRegisterImage(URL.createObjectURL(file));
        // Update Formik field value if needed
        formik.setFieldValue("registration", file);
      }
    }
  };
  const handleInsuranceImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        setInsuranceError("Invalid file format.");
        // If the selected file is not an image, set an error message
        // formik.setFieldError("nationalFront", "Invalid file format. Only images are allowed.");
      } else {
        // If the selected file is an image, clear any existing error message
        // formik.setFieldError("nationalFront", "");
        // Set national front image
        setInsuranceError("");
        setInsuranceImage(URL.createObjectURL(file));
        // Update Formik field value if needed
        formik.setFieldValue("insurance", file);
      }
    }
  };
  return (
    <>
    <h5 className='px-3 pt-3'>Add Car Information</h5>
    <form onSubmit={formik.handleSubmit}>
      <div className='d-flex input-container'>
<div className='w-50 input-width'>
<input
        type="text"
        name="carType"
        value={formik.values.carType}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Car Type"
        className="form-control my-4 w-75 mx-3 py-2"
      />
      {formik.touched.carType && formik.errors.carType && <div className="alert alert-danger w-75 mx-3">{formik.errors.carType}</div>}
      <input
    type="text"
    className="form-control my-4 w-75 mx-3 py-2"
    name="carModel"
    value={formik.values.carModel}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="Enter Car Model"
  />
  {formik.errors.carModel && formik.touched.carModel ? (
    <div className="alert alert-danger w-75 mx-3">{formik.errors.carModel}</div>
  ) : (
    ""
  )}
   <input
    type="text"
    className="form-control my-4 w-75 mx-3 py-2"
    name="color"
    value={formik.values.color}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="Enter Color"
  />
  {formik.errors.color && formik.touched.color ? (
    <div className="alert alert-danger w-75 mx-3">{formik.errors.color}</div>
  ) : (
    ""
  )}
  <input
    type="text"
    className="form-control my-4 w-75 mx-3 py-2"
    name="plateNum"
    value={formik.values.plateNum}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="Enter Plate Number"
  />
  {formik.errors.plateNum && formik.touched.plateNum ? (
    <div className="alert alert-danger  w-75 mx-3 ">{formik.errors.plateNum}</div>
  ) : (
    ""
  )}
</div>
<div className='w-50 d-flex  gap-5 padding-images'>
<div className='mt-3 mb-3'>
     <label htmlFor="registerImageUpload">
    
          {registerImage ? (
            <div className='div-img'  style={{overflow:'hidden'}}><img src={registerImage} alt="register" className="uploaded-image" />
           
            </div>
          ) : (
           <div className='div-img'> <img src={register} alt="Placeholder" className="placeholder-image" />
            <i className="fa-solid fa-plus bg-i" ></i>
           </div>
          )}
          <p className=' p-color'>Registration image</p>
        </label>
        <input
          id="registerImageUpload"
          type="file"
         accept='image/*'
          style={{ display: "none" }}
          onChange={handleRegisterImageChange}
          onBlur={formik.handleBlur} />
          {registerError && <div className="alert alert-danger">{registerError}</div>}
          {formik.errors.registration && formik.touched.registration ? (
    <div className="alert alert-danger ">{formik.errors.registration}</div>
  ) : (
    ""
  )}
</div>

  
 <div className='mt-3 me-md-5 me-xl-0  '>
     <label htmlFor="insuranceImageUpload">
    
          {insuranceImage ? (
            <div className='div-img'  style={{overflow:'hidden'}}><img src={insuranceImage} alt="insurance" className="uploaded-image" />
           
            </div>
          ) : (
           <div className='div-img'> <img src={insurance} alt="Placeholder" className="placeholder-image" />
            <i className="fa-solid fa-plus bg-i" ></i>
           </div>
          )}
          <p className=' p-color '>Insurance image</p>
        </label>
        <input
          id="insuranceImageUpload"
          type="file"
         accept='image/*'
          style={{ display: "none" }}
          onChange={handleInsuranceImageChange}
          onBlur={formik.handleBlur} />
          {insuranceError && <div className="alert alert-danger">{insuranceError}</div>}
          {formik.errors.insurance && formik.touched.insurance ? (
    <div className="alert alert-danger ">{formik.errors.insurance}</div>
  ) : (
    ""
  )}

</div>

</div>
</div>
     
     
  
 

{apiError && <div className="alert alert-danger">{apiError}</div>}
<div  className='text-end'><button type='submit' className='btn-bg btn px-5 py-2 my-3 mx-3 fw-bold'   disabled={!formik.isValid && formik.dirty}>{btnloading ? <Loading/> : 'Next'}</button></div>
    </form>
    </>
  );
};

