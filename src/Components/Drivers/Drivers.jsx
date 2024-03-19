import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import './Drivers.css'
import Driverdetails from '../Driverdetails/Driverdetails';
import { Link } from 'react-router-dom';
import { storecontext } from '../Context/StorecontextProvider';
import ReactPaginate from 'react-paginate';

export default function Drivers() {
  const [drivers,setdrivers] =useState([])
  const [pagecount,setpagecount] =useState(0)
  const [loading,setloading] =useState(true)
  const token = localStorage.getItem('token');
  let {handleLinkClick,baseUrl} =useContext(storecontext)
  async function getdrivers(){
   try  {
      const data = await axios.get(`${baseUrl}/api/Admin/Drivers/0`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if(data.status==200){
        console.log(data);
        setloading(false)
        setdrivers(data.data.data)
        console.log(data.data.data)
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  function getPageCount(){
    axios.get(`${baseUrl}/api/Admin/Drivers/PagesCount`,{
      headers:{
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((data)=>{
      console.log(data);
      console.log(data.data.data)
      setpagecount(Math.ceil(data.data.data))
      
    })
    .catch(err=>console.log(err))
      }
  useEffect(()=>{
    getdrivers()
    getPageCount()
    
  },[])
  // function getPage(currentPage){
  //    return axios.get(`${baseUrl}/api/Admin/Drivers/${currentPage}`,{
  //     headers:{
  //       'Authorization': `Bearer ${token}`,
  //     }
  //   })
  //   .then((data)=>{
  //     return data
  //   })
  //   .catch(err=>{
  //     return err
  //   }
  //    )
  //     }

  // const handlePageClick = async (event) => {
  //   setloading(true)
  //  const currentPage = event.selected
  // const data= await getPage(currentPage)
  // if(data?.status==200){
  //   setdrivers(data?.data?.data)
    
  //  }
  //  setloading(false)
 
 
  // };
  // const handlePageClick = async (event) => {
  //   const currentPage = event.selected;
  //   try {
  //     const response = await axios.get(`${baseUrl}/api/Admin/Drivers/${currentPage}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       }
  //     });
      
  //     if (response.status === 200) {
  //       setloading(false);
  //       setdrivers(response.data.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // async function getPage(currentPage) {

  //   try {
  //     const response = await axios.get(`${baseUrl}/api/Admin/Drivers/${currentPage}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       }
  //     });
  //     return response
  //   } catch (err) {
  //   console.log(err)
  //   return err
  //   } 
  // }
  // const handlePageClick = async (event) => {
  //   setloading(true);
  //   const currentPage = event.selected;
  // const data =  await getPage(currentPage);
  // setdrivers(data.data.data)
  // setloading(false)
  // };
  async function getPage(currentPage) {
    try {
      const response = await axios.get(`${baseUrl}/api/Admin/Drivers/${currentPage}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      return response;
    } catch (err) {
      console.log(err);
      return err; // Return an error object to handle errors in the calling code
    } 
  }
  
  const handlePageClick = async (event) => {
    // setloading(true); 
    const currentPage = event.selected;
    const data = await getPage(currentPage);
    if (data.status==200) {
     setdrivers(data.data.data)
    //  setloading(false)
    
    } 
  }


  
    if (loading)  return <Loading/>
  return (
    <>
    <div className="container-fluid">
      < div className="d-flex justify-content-between py-3 widdth m-auto">
       <h2 className='h-color'>Drivers</h2>
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
        <div className='d-flex justify-content-between py-4 widdth m-auto'>
          <input type="search" className='form-control w-25' placeholder='search'  />
          <button className='btn btn-bg'> + Add Drivers</button>
        </div>
        <div className="container-fluid bg-white py-3 px-5 text-color text-center rounded-3">
  <div className="row row-bg py-3 rounded-3">  
    <div className="col-md-3">Name</div>
    <div className="col-md-2">Address</div>
    <div className="col-md-2">Phone number</div>
    <div className="col-md-2">Active</div>
    <div className="col-md-2">status</div>

  </div>
  {drivers.map((item)=>{
    return  <div className="row my-3 py-3 brdr" key={item._id}>
    <div className="col-md-3 d-flex name-color align-items-center gap-3">
      <div className='images'><img  src={item.user.profileImage} alt=""/></div>
<span  onClick={() => handleLinkClick (item._id)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >{item.user.firstName}</span>
<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"  style={{width:'370px' ,textAlign:'left'}} >
  <div className="offcanvas-header">
    <h5 id="offcanvasRightLabel">Driverdetails</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body"  >
  <Driverdetails />
  </div>
</div>
    </div>
    <div className="col-md-2">{item.location.address.split(' ').slice(0,3).join(' ')}</div>
    <div className="col-md-2">{item.user.phone}</div>
    <div className="col-md-2">{item.visible==false? <span><i className="fa-solid fa-circle off pe-2 "></i>Offline</span> :<span><span className="fa-solid fa-circle on pe-2"></span>Online</span>}</div>
    <div className="col-md-2">{item.onTrip==false ?<span><i className="fa-solid fa-circle-check pe-2"></i>Avaliable</span> :<span><i className="fa-solid fa-car-side pe-2"></i>On Trip</span>}</div>
  
  </div>
  })}

 
</div>
      </div>
      <ReactPaginate
        nextLabel="next"
        pageCount={pagecount}
        onPageChange={handlePageClick}
        previousLabel="previous"
        containerClassName={'pagination justify-content-end pe-5'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
      </>
  )
}
