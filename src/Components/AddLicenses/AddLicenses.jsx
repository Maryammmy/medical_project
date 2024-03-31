import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { storecontext } from '../Context/StorecontextProvider'
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import front from '../../assets/images/car (1) 1.svg'
import back from '../../assets/images/car 1.svg'
import right from '../../assets/images/car (2) 1.svg'
import left from '../../assets/images/car (2) 1(1).svg'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import user from '../../assets/images/user-svgrepo-com 1(1).svg'





export default function AddLicenses() {
  let {id} =useParams()
  let {baseUrl} =useContext(storecontext)
  const token = localStorage.getItem('token');
  const [btnloading,setbtnloading] =useState(null);
  const [apiError, setApiError] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [frontError, setFrontError] = useState('');
  const [backImage, setBackImage] = useState(null);
  const [backError, setBackError] = useState('');
  const [rightImage, setRightImage] = useState(null);
  const [rightError, setRightError] = useState('');
  const [leftImage, setLeftImage] = useState(null);
  const [leftError, setLeftError] = useState('');
  const [showModal, setShowModal] = useState(false);
 let navigate =useNavigate()
 
  const sendDataToApi = async (values) => {
   
    setbtnloading(true) // Set loading state to true

    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

    const response=  await axios.post(`${baseUrl}/api/Admin/CreateCarAlbum?id=${id}`, formData, {
        headers: {
         
          'Authorization': `Bearer ${token}`,
        }
      });
      if(response.status==201){
        setShowModal(true);
      }
      // setData(response);
      setbtnloading(false)
      console.log("API Response:", response);
     
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

  const closeModal = () => {
    setShowModal(false);
    navigate('/pendingdrivers')
    
  };
  const validationSchema = yup.object().shape({
    front: yup
      .mixed()
      .test('fileType', 'Invalid file format', (value) => {
        if (!value) return true; // Allow empty value (no image provided)
        return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
      })
      .required('Front car image is required'),
    back: yup
      .mixed()
      .test('fileType', 'Invalid file format', (value) => {
        if (!value) return true; // Allow empty value (no image provided)
        return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
      })
      .required('Back car image is required'),
    right: yup
      .mixed()
      .test('fileType', 'Invalid file format', (value) => {
        if (!value) return true; // Allow empty value (no image provided)
        return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
      })
      .required('Right car image is required'),
      left: yup
      .mixed()
      .test('fileType', 'Invalid file format', (value) => {
        if (!value) return true; // Allow empty value (no image provided)
        return value && ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml','image/webp'].includes(value.type);
      })
      .required('Left car image is required'),
  });
  const formik = useFormik({
    initialValues: {
     front:null,
      back: null,
      right: null,
      left: null
    },
    
    validationSchema: validationSchema,
    onSubmit: (values) => sendDataToApi(values)
 
  });
  const handleFrontImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        setFrontError("Invalid file format.");
        // If the selected file is not an image, set an error message
        // formik.setFieldError("nationalFront", "Invalid file format. Only images are allowed.");
      } else {
        // If the selected file is an image, clear any existing error message
        // formik.setFieldError("nationalFront", "");
        // Set national front image
        setFrontError("");
        setFrontImage(URL.createObjectURL(file));
        // Update Formik field value if needed
        formik.setFieldValue("front", file);
      }
    }
  };
  const handleBackImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        setBackError("Invalid file format.");
        // If the selected file is not an image, set an error message
        // formik.setFieldError("nationalFront", "Invalid file format. Only images are allowed.");
      } else {
        // If the selected file is an image, clear any existing error message
        // formik.setFieldError("nationalFront", "");
        // Set national front image
        setBackError("");
        setBackImage(URL.createObjectURL(file));
        // Update Formik field value if needed
        formik.setFieldValue("back", file);
      }
    }
  };
  const handleRightImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        setRightError("Invalid file format.");
        // If the selected file is not an image, set an error message
        // formik.setFieldError("nationalFront", "Invalid file format. Only images are allowed.");
      } else {
        // If the selected file is an image, clear any existing error message
        // formik.setFieldError("nationalFront", "");
        // Set national front image
        setRightError("");
        setRightImage(URL.createObjectURL(file));
        // Update Formik field value if needed
        formik.setFieldValue("right", file);
      }
    }
  };
  const handleLeftImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith('image/')) {
        setLeftError("Invalid file format.");
        // If the selected file is not an image, set an error message
        // formik.setFieldError("nationalFront", "Invalid file format. Only images are allowed.");
      } else {
        // If the selected file is an image, clear any existing error message
        // formik.setFieldError("nationalFront", "");
        // Set national front image
        setLeftError("");
        setLeftImage(URL.createObjectURL(file));
        // Update Formik field value if needed
        formik.setFieldValue("left", file);
      }
    }
  };

  return (
    <>
 <h5 className='px-4 pt-3'>Add Car Album</h5>
 <form onSubmit={formik.handleSubmit} >
  <div className='d-flex justify-content-around pt-3'>
  <div className=''>
     <label htmlFor="frontImageUpload">
    
          {frontImage ? (
            <div className='div-img'  style={{overflow:'hidden'}}><img src={frontImage} alt="front" className="uploaded-image" />
           
            </div>
          ) : (
           <div className='div-img'> <img src={front} alt="Placeholder" className="placeholder-image" />
            <i className="fa-solid fa-plus bg-i" ></i>
           </div>
          )}
          <p className=' p-color'>Front car image</p>
        </label>
        <input
          id="frontImageUpload"
          type="file"
         accept='image/*'
          style={{ display: "none" }}
          onChange={handleFrontImageChange}
          onBlur={formik.handleBlur} />
          {frontError && <div className="alert alert-danger">{frontError}</div>}
          {formik.errors.front && formik.touched.front ? (
    <div className="alert alert-danger ">{formik.errors.front}</div>
  ) : (
    ""
  )}

</div>
<div className=''>
     <label htmlFor="backImageUpload">
    
          {backImage ? (
            <div className='div-img'  style={{overflow:'hidden'}}><img src={backImage} alt="back" className="uploaded-image" />
           
            </div>
          ) : (
           <div className='div-img'> <img src={back} alt="Placeholder" className="placeholder-image" />
            <i className="fa-solid fa-plus bg-i" ></i>
           </div>
          )}
          <p className=' p-color'>Back car image</p>
        </label>
        <input
          id="backImageUpload"
          type="file"
         accept='image/*'
          style={{ display: "none" }}
          onChange={handleBackImageChange}
          onBlur={formik.handleBlur} />
          {backError && <div className="alert alert-danger">{backError}</div>}
          {formik.errors.back && formik.touched.back ? (
    <div className="alert alert-danger ">{formik.errors.back}</div>
  ) : (
    ""
  )}

</div>
  </div>
  <div className='d-flex justify-content-around'>
  <div className=''>
     <label htmlFor="rightImageUpload">
    
          {rightImage ? (
            <div className='div-img'  style={{overflow:'hidden'}}><img src={rightImage} alt="right" className="uploaded-image" />
           
            </div>
          ) : (
           <div className='div-img'> <img src={right} alt="Placeholder" className="placeholder-image" />
            <i className="fa-solid fa-plus bg-i" ></i>
           </div>
          )}
          <p className=' p-color'>Right car image</p>
        </label>
        <input
          id="rightImageUpload"
          type="file"
         accept='image/*'
          style={{ display: "none" }}
          onChange={handleRightImageChange}
          onBlur={formik.handleBlur} />
          {rightError && <div className="alert alert-danger">{rightError}</div>}
          {formik.errors.right && formik.touched.right? (
    <div className="alert alert-danger ">{formik.errors.right}</div>
  ) : (
    ""
  )}

</div>
<div className=''>
     <label htmlFor="leftImageUpload">
    
          {leftImage ? (
            <div className='div-img'  style={{overflow:'hidden'}}><img src={leftImage} alt="left" className="uploaded-image" />
           
            </div>
          ) : (
           <div className='div-img'> <img src={left} alt="Placeholder" className="placeholder-image" />
            <i className="fa-solid fa-plus bg-i" ></i>
           </div>
          )}
          <p className=' p-color'>Left car image</p>
        </label>
        <input
          id="leftImageUpload"
          type="file"
         accept='image/*'
          style={{ display: "none" }}
          onChange={handleLeftImageChange}
          onBlur={formik.handleBlur} />
          {leftError && <div className="alert alert-danger">{leftError}</div>}
          {formik.errors.left && formik.touched.left? (
    <div className="alert alert-danger ">{formik.errors.left}</div>
  ) : (
    ""
  )}

</div>
  </div>
  {apiError && <div className="alert alert-danger">{apiError}</div>}
<button type='submit'   className='btn-bg btn ms-auto d-block w-25 my-3 mx-3 fw-bold' disabled={!formik.isValid && formik.dirty}   >
  {btnloading ? <i className="fa-solid fa-spinner"></i> : 'Next'}
</button>
<Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black overlay
          },
          content: {
            backgroundColor: 'rgba(250, 250, 250, 1)', // red background
            border: '1px solid #ccc', // border
            borderRadius: '8px', // border radius
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // shadow
            maxWidth: '500px', // max width
            margin: 'auto', // center horizontally
            padding: '20px',
            height:'350px' ,// padding
            // display: 'flex',
            // flexDirection: 'column',
          },
      
        }}
      >
        
        <div className='text-center div-user'><img src={user} alt="driver" className='w-25' /></div>
        <h5 className='modal-title text-center pt-3'>Driver Added</h5>
        <h4 className='title text-center'>Successfully</h4>
      <div className='text-center my-3'>  <button  className="btn modal-close-btn px-3 "    onClick={closeModal}>Okay</button></div>
        
</Modal>  
 </form>




    </>
  )
}
