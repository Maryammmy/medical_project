
import './Login.css';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import imglogin from '../../assets/images/Navigation-pana 1.svg';
import logologin from '../../assets/images/LOGO1_Medicurb_page-0001-removebg-preview 1.svg';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [apiError, setApiError] = useState(null);
  const[show,setshow] =useState(false)
  const [btnloading,setbtnloading] =useState(false)
  const navigate =useNavigate()
  const onShowHide =()=>{
    setshow((prev)=>!prev)
  }


  function getdatafromapi(values) {
    setbtnloading(true)
    axios.post('https://medicurb.onrender.com/api/Admin/Login',values)
      .then((response) => {
        console.log("API Response:", response);
        localStorage.setItem('token',response.data.token)
        navigate('/dashboard')
        setbtnloading(false)
        // Handle successful response if needed
      })
      .catch((error) => {
        console.error("API Error:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setApiError(error.response.data.message); // Set the API error message in the state
        } else {
          setApiError("An unexpected error occurred."); // Fallback error message
        }
      });
  }

  function validation() {
    let x = yup.object({
      username: yup.string().min(3).max(30).required(),
      password: yup.string().matches(/^[A-Za-z0-9@#-_]{6,}$/).required(),
    });
    return x;
  }

  let login = useFormik({
    initialValues: {
      username: "",
      password : "",
    
    },
 
    validationSchema: validation,
    onSubmit: (values) => getdatafromapi(values)
   
  });

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-6 col-img vh-100">
        <div><img src={logologin} alt="" /></div>
        <img src={imglogin} alt="" />
      </div>
      <div className="col-md-6 my-5 py-5">
        <div className='w-50 m-auto my-5 py-5'>
          <h2 className='my-2'>Sign in</h2>
          <form onSubmit={login.handleSubmit}>
            <div className="position-relative">
              <input value={login.values.username} onChange={login.handleChange} name="username" type="text" className='form-control my-4 input-phone' placeholder='Enter email or user name' />
            </div>
            {login.errors.username && login.touched.username ? <div className="alert alert-danger">{login.errors.username}</div> : ''}
            <div className="position-relative">
              <input value={login.values.password} onChange={login.handleChange} name="password" type={show ? "text" : "password"} className='form-control my-4 input-password' placeholder='Password' />
              <i  onClick={onShowHide}>{show ? (<i className="fa-regular fa-eye icon-password"></i>) : <i className="fa-regular fa-eye-slash icon-password"></i>}</i>
            </div>
            {login.errors.password && login.touched.password ? <div className="alert alert-danger">{login.errors.password}</div> : ''}
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            <button disabled={!login.isValid && login.dirty} type="submit" className='btn w-100 but my-3'>{btnloading ? <i className="fa-solid fa-spinner"></i> : 'Login'}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  );
}

