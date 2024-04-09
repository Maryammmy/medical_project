import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import './Drivers.css'
import Driverdetails from '../Driverdetails/Driverdetails';
import { Link } from 'react-router-dom';
import { storecontext } from '../Context/StorecontextProvider';
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CartSkeleton from '../CartSkeleton/CartSkeleton';

export default function Drivers() {
  const [drivers,setdrivers] =useState([])
  const [pagecount,setpagecount] =useState(0)
  const [loading,setloading] =useState(true)
  const token = localStorage.getItem('token')
  let {handleLinkClick,baseUrl,setSelected} =useContext(storecontext)
  // async function getdrivers(){
  //  try  {
  //     const data = await axios.get(`${baseUrl}/api/Admin/Drivers/0`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     if(data.status==200){
  //       console.log(data);
  //       setloading(false)
  //       setdrivers(data.data.data)
  //       console.log(data.data.data)
  //     }
      
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  async function getPageCount() {
    setloading(true)
    try {
      const response = await axios.get(`${baseUrl}/api/Admin/Drivers/PagesCount`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if(response.status==200){
        setpagecount(Math.ceil(response.data.data));
     
      }
      console.log(response.data.data)
    } catch (error) {
      console.log(error);
    
      
    }
  }
 
 async function getPage(currentPage) {
        setloading(true)
        try {
          const data = await axios.get(`${baseUrl}/api/Admin/Drivers/${currentPage}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          if (data.status==200) {
            setdrivers(data.data.data)
            setloading(false)
            
           } 
        } catch (err) {
          console.log(err);
          setloading(false)
        
        } 
      }
  useEffect(()=>{
    // getdrivers()
    getPageCount()
    getPage()
    
  },[])

  
  const handlePageClick =  (event) => {
 
    const currentPage = event.selected;
    getPage(currentPage);
   
 

  }
  const handleClickdriver = (item)=>{
    setSelected(item)
  }


  return (
    <>
   
    <>
    <div className="container-fluid">
      < div className="d-flex justify-content-between py-3 widdth m-auto">
       <h2 className='h-color'>Drivers</h2>
     <div  className=" position-relative mt-2" >
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
          <Link to='/adddriver/personaldata' className='btn btn-bg' > + Add Driver</Link>
        </div>
        <div className="container-fluid bg-white py-3 px-5 text-color text-center rounded-3">
  <div className="row row-bg py-3 rounded-3  ">  
    <div className="col-md-2">Name</div>
    <div className="col-md-2">Address</div>
    <div className="col-md-2">Phone</div>
    <div className="col-md-2">Active</div>
    <div className="col-md-2">status</div>
    <div className="col-md-2">Actions</div>
  </div>
  {loading ? (
  <CartSkeleton cards={6} />
) : (
  drivers.map((item) => (
    <div className="row my-3 py-3 brdr   " key={item._id}>
        <div className='col-md-1 '>
        <div className='images'>
        <img src={item.user.profileImage} alt=""  />
        </div>
        </div>
        <div onClick={() => handleLinkClick(item._id)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="namee col-md-1 name-color d-flex align-items-center justify-content-center ">{item.user.firstName}
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" style={{ width: '370px', textAlign: 'left' }}>
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Driver Details</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <Driverdetails />
          </div>
        </div>
        </div>
      <div className="col-md-2 d-flex align-items-center justify-content-center ">{item.location.address.split(' ').slice(0, 3).join(' ')}</div>
      <div className="col-md-2 d-flex align-items-center justify-content-center">{item.user.phone}</div>
      <div className="col-md-2 d-flex align-items-center justify-content-center ">{item.visible === false ? <span><i className="fa-solid fa-circle off pe-2"></i>Offline</span> : <span><span className="fa-solid fa-circle on pe-2"></span>Online</span>}</div>
      <div className="col-md-2 d-flex align-items-center justify-content-center">{item.onTrip === false ? <span><i className="fa-solid fa-circle-check pe-2"></i>Available</span> : <span><i className="fa-solid fa-car-side pe-2"></i>On Trip</span>}</div>
      <div className="col-md-2 d-flex align-items-center justify-content-center">
                 <i className="fa-solid fa-trash-can icon-color mx-3"></i>
                 <Link onClick={()=>{
                  handleClickdriver(item)
                 }} to={{ pathname: `/updatedriver/updatepersonaldata/${item._id}`}} className='text-decoration-none'>
                <i className="fa-solid fa-pencil icon-color"></i>
                </Link>
     
{console.log("Item:", item)}


                </div>
    </div>
  ))
)}
</div>
</div>
      </>
   
      <ReactPaginate
        nextLabel="next"
        pageCount={pagecount}
        onPageChange={handlePageClick}
        previousLabel="previous"
        containerClassName={'pagination justify-content-end pe-5 my-3'}
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
