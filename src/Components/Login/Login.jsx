
import './Login.css';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import imglogin from '../../assets/images/Navigation-pana 1.svg';
import logologin from '../../assets/images/LOGO1_Medicurb_page-0001-removebg-preview 1.svg';
import { useNavigate } from 'react-router-dom';
import { storecontext } from '../Context/StorecontextProvider';
import Loading from '../Loading/Loading';
import  secureLocalStorage  from  "react-secure-storage";

export default function Login() {


  const [apiError, setApiError] = useState(null);
  const[show,setshow] =useState(false)
  const [btnloading,setbtnloading] =useState(false)
  const navigate =useNavigate()
let {baseUrl,token} =useContext(storecontext)
// const expirationDate = new Date();
// expirationDate.setDate(expirationDate.getDate() + 1);
// const expires = expirationDate.toUTCString();

const expirationDate = new Date();
// Set the expiration date to one minute from the current time
expirationDate.setTime(expirationDate.getTime() + (1 * 60 * 1000)); // 1 minute in milliseconds

// Format the expiration date to comply with the cookie format (GMT string)
const expires = expirationDate.toUTCString();

  const onShowHide =()=>{
    setshow((prev)=>!prev)
  }


  function sendDataToApi(values) {
    setbtnloading(true)
    axios.post(`${baseUrl}/api/Admin/Login`,values)
      .then((response) => {
        console.log("API Response:", response);
       
        
       document.cookie=`loginstuts==loginin`
        secureLocalStorage.setItem('token', response.data.token.toString());
        

      

      console.log('hh',typeof(response.data.token))
      
       
        console.log(response.data.token)
       
        sessionStorage.setItem('token', response.data.token);
        navigate('/dashboard')
     
        setbtnloading(false)
      })
      .catch((error) => {
        console.error("API Error:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setApiError(error.response.data.message); 
        } else {
          setApiError("An unexpected error occurred."); // Fallback error message
        }
        setbtnloading(false)
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
    onSubmit: (values) => sendDataToApi(values)
   
  });
  // function getCookie(name) {
  //   const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  //   for (const cookie of cookies) {
  //     const [cookieName, cookieValue] = cookie.split('=');
  //     if (cookieName === name) {
  //       return decodeURIComponent(cookieValue);
  //     }
  //   }
  //   return null; // Return null if the cookie with the given name is not found
  // }
  
  // function isUserLoggedIn() {
  //   // remove token if cookie not set
  //   if (getCookie("loginstatus") !== 'loggedin') {
  //     secureLocalStorage.clear()
  //     navigate('/login')
  //   }
  
  //   let session =token;
  //   if (session == null) {
  //      return false;
  //   } else {
  //      return session;
  //   }
  // }
  // isUserLoggedIn();
  // function isUserLoggedIn() {
  //   const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  //   const loggedInCookie = cookies.find(cookie => cookie.startsWith('loginstatus=loggedin'));
    
  //   if (loggedInCookie) {
  //     // Check cookie expiration
  //     const [, expires] = loggedInCookie.split('=');
  //     const cookieExpiration = new Date(expires);
  //     if (new Date() > cookieExpiration) {
  //       // Clear local storage and return false
  //       secureLocalStorage.clear();
  //       return false;
  //     }
  //     return true;
  //   }
  //   return false;
  // }
  // useEffect(()=>{
  //   isUserLoggedIn()
  // },[])

  
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
            <div >
              <input value={login.values.username} onChange={login.handleChange} name="username" type="text" className='form-control my-4 input-phone' placeholder='Enter email or user name' />
            </div>
            {login.errors.username && login.touched.username ? <div className="alert alert-danger">{login.errors.username}</div> : ''}
            <div className="position-relative">
              <input value={login.values.password} onChange={login.handleChange} name="password" type={show ? "text" : "password"} className='form-control my-4 input-password' placeholder='Password' />
              <i  onClick={onShowHide}>{show ? (<i className="fa-regular fa-eye icon-password"></i>) : <i className="fa-regular fa-eye-slash icon-password"></i>}</i>
            </div>
            {login.errors.password && login.touched.password ? <div className="alert alert-danger">{login.errors.password}</div> : ''}
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            <button disabled={!login.isValid && login.dirty} type="submit" className='btn w-100 but my-3'>{btnloading ? <Loading/> : 'Login'}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  );
}

