import React, { useContext, useEffect, useState } from 'react';
import { storecontext } from '../Context/StorecontextProvider';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import CartSkeleton from '../CartSkeleton/CartSkeleton';
import TripSkeleton from '../TripSkeleton/TripSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  let { baseUrl, setSelected,excelData,setExcelData,token } = useContext(storecontext);
  const [pagecount, setPageCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  let navigate =useNavigate()
 console.log(excelData)
  // Function to read the Excel file
  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      // Assuming there's only one sheet, and it's the first one
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Function to handle button click for file upload
  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
    if (excelData && excelData.length !== 0) {
      navigate('/reports');
  }
  
  };

  async function getPage(currentPage) {
    setLoading(true);
    try {
      const data = await axios.get(`${baseUrl}/api/Admin/Trips/${currentPage}?date=${selectedDate}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (data.status === 200) {
        setTrips(data.data.data);
        setLoading(false);
        console.log('trip', data)
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function getPageCount() {
    try {
      const data = await axios.get(`${baseUrl}/api/Admin/Trips/PagesCount?date=${selectedDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status === 200) {
        setPageCount(Math.ceil(data.data.data));
        console.log('count', data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPage();
    getPageCount();
  }, [selectedDate]); // Trigger useEffect whenever selectedDate changes

  const handlePageClick = (event) => {
    const currentPage = event.selected;
    getPage(currentPage);
    console.log(currentPage)
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const handleClickTrip = (item) => {
    setSelected(item)
  }


  return (
    <>

      <div className="container-fluid">
        <div className="d-flex justify-content-between py-3 widdth m-auto">
          <h2 className="h-color">Trips</h2>
          <div className="position-relative mt-2">
            <i className="fa-regular fa-bell fs-4 i-color"></i>
            <span className="position-absolute top-0 start-100 translate-middle py-1 px-1 badge badge-color rounded-circle">
              2
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-light">
        <div className="d-flex justify-content-between pt-3 widdth m-auto">
          <div className=' w-25'>
            <input type="search" className='form-control w-100' placeholder='search' />
            <input
              type="date"
              className="form-control w-100 my-2"
              value={selectedDate}
              onChange={handleDateChange} />

          </div>
          <div>
            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={(e) => readExcelFile(e.target.files[0])} />
            <button className='btn btn-bg' onClick={handleUploadClick}>Upload Excel File</button>
            
          </div>

          <div>
            <Link to="/addtrip/tripdetails" className="btn btn-bg"> + Add Trip </Link>
          </div>
        </div>
        <div className="container-fluid bg-white py-3 px-5 text-color text-center rounded-3">
          <div className="row row-bg py-3 rounded-3 justify-content-around">
            {/*    */}
            <div className="col-md-1">Time</div>
            <div className="col-md-1 px-1">Patient Name</div>
            <div className="col-md-1 px-1">Patient Phone</div>
            <div className="col-md-1">Pickup</div>
            <div className="col-md-1">Destination</div>
            <div className="col-md-1">Driver</div>
            <div className="col-md-1">Actions</div>
          </div>
          {loading ? (
            <TripSkeleton cards={3} />
          ) : (
            trips.map((item) => (
              <div className="row my-3 py-3 brdr justify-content-around" key={item._id}>
                <div className="col-md-1">{item.time}</div>
                <div className="col-md-1">{item.patient.firstName+' '+item.patient.lastName}</div>
                <div className="col-md-1">{item.patient.phone}</div>
                <div className="col-md-1">{item.pickup.address.split(' ').slice(0, 3).join(' ')}</div>
                <div className="col-md-1">{item.destination.address.split(' ').slice(0, 3).join(' ')}</div>
                <div className="col-md-1">{item.driver == null ? <div>Not assign</div> : item.driver.user.firstName}</div>
                <div className="col-md-1">
                  <i className="fa-solid fa-trash-can icon-color mx-3"></i>
                  <Link onClick={() => {
                    handleClickTrip(item)
                  }} to={{ pathname: `/update/updatetrip/${item._id}` }} className='text-decoration-none'>
                    <i className="fa-solid fa-pencil icon-color"></i>
                  </Link>

                 


                </div>
              </div>
            ))
          )}
        </div>
      </div>
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
  );
}
