import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { storecontext } from '../Context/StorecontextProvider';
import TripSkeleton from '../TripSkeleton/TripSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loading from '../Loading/Loading';
import Modal from 'react-modal';

function ExcelReader() {
  const { excelData, baseUrl, setSelected, selected } = useContext(storecontext);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [index,setIndex]=useState(null)
  const [formattedData,setFormattedData] =useState([])
 let token = sessionStorage.getItem('token')
console.log(formattedData)
  const itemsPerPage = 10;
  const getAddressCoordinates = async (address) => {
  setGoogleLoading(true)
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: 'AIzaSyDpRNzE-9ne0Gwcs_56dPa9E9aTCLsiECA', // Replace with your Google Maps Geocoding API key
        },
      });
      if (response.data.results.length > 0) {
        setGoogleLoading(false)
        const location = response.data.results[0].geometry.location;
        return { latitude: location.lat, longitude: location.lng, address: address };



      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      return null;
    }
  };


  const processExcelData = async (data) => {
    const processedData = await Promise.all(
      data.map(async (item, index) => {
        const pickupAddress =
          item['Pickup Address'] +
          ',' +
          item['Pickup City'] +
          ',' +
          item['Pickup State'];
        const deliveryAddress =
          item['Delivery Address'] +
          ',' +
          item['Delivery City'] +
          ',' +
          item['Delivery State'];
        const pickupLocation = await getAddressCoordinates(pickupAddress);
        const deliveryLocation = await getAddressCoordinates(deliveryAddress);
        const timeString = item['Time'];
        const hours = timeString.substring(0, 2); // Extract hours (e.g., "14")
        const minutes = timeString.substring(2); // Extract minutes (e.g., "30")
        // Format time for display (e.g., "14:30")
        const formattedTime = `${hours}:${minutes}`;
        const cost = parseFloat(item['Trip Cost']);

        return {
          // ...item,
          firstName: item['Member\'s First Name'],
          lastName: item['Member\'s Last Name'],
          birthDate: item['Date of Birth'],
          phone: item['Member\'s Phone Number'],
          type: item['Trip Reason'],
          date: item['Appointment Date'],
          cost: cost,
          specialNeeds: item['Special Needs'] || null,
          number: item['Medicaid Number'],
          driver: null,
          time: formattedTime,
          pickup: pickupLocation,
          destination: deliveryLocation,
      

        };
      })
    );
    setFormattedData(processedData);

  };
  useEffect(() => {
    if (excelData.length > 0) {
      processExcelData(excelData);
    }
  }, []);  


  
  const handleDeleteRow = (index) => {

    formattedData.splice(index, 1);
    setFormattedData([...formattedData]);
    console.log(index)
  };
  const handleEditRow = (item,index) => {
    setSelected(item);
    setShowModal(true)
    setIndex(index)
    console.log(item)
    console.log(formattedData[index])
   
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSelected(prevSelected => ({ ...prevSelected, [name]: value }));
    console.log(selected.firstName)

  };
  const handleUpdateClick = () => {
    
 
      formattedData[index] = selected
     setFormattedData([...formattedData])
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const closeModal = () => {
    setShowModal(false); 
  };
  // const handleDeleteRow = (index) => {
  //   const updatedData = formattedData.filter((_, i) => i !== index);
  //   setFormattedData(updatedData);
  // };
  

 

  const sendDataToAPI = async () => {
    setLoading(true)
    try {
      console.log(formattedData)
      formattedData.map(item => ({
        // Adjust the properties here according to your data structure
        firstName: item.firstName,
        lastName: item.lastName,
        birthDate: item.birthDate,
        phone: item.phone,
        type: item.type,
        date: item.date,
        time: item.time,
        cost: item.cost,
        number: item.number,
        specialNeeds: item.specialNeeds,
        pickup: {
          latitude: item.pickup.latitude,
          longitude: item.pickup.longitude,
          address: item.pickup.address
        },
        destination: {
          latitude: item.destination.latitude,
          longitude: item.destination.longitude,
          address: item.destination.address
        }
      }));

      const response = await axios.post(`${baseUrl}/api/Admin/CreateMultiTrip`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      });

      console.log('Response:', response);
      setLoading(false)
      console.log('All requests sent successfully');
      console.log('array', formattedData)
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
      setLoading(false)
    }
  };

  return (
    <div>
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
        <div className="d-flex justify-content-between  widdth m-auto py-4">
          <div className="w-25 input-search">
            <input
              type="search"
              className="form-control w-100"
              placeholder="search"
            />
          </div>
          <div>
            <Link to="/addtrip/tripdetails" className="btn btn-bg">
              {' '}
              + Add Trip{' '}
            </Link>
          </div>
        </div>
        <div className="container-fluid bg-white py-3 px-5 text-color text-center rounded-3">
          <div className="row row-bg py-3 rounded-3 justify-content-around">
            <div className="col-md-1">Date</div>
            <div className="col-md-1">Time</div>
            <div className="col-md-1 px-md-1">Patient Name</div>
            <div className="col-md-1 px-md-1">Patient Phone</div>
            <div className="col-md-1">Pickup</div>
            <div className="col-md-1">Destination</div>
            <div className="col-md-1 px-md-1">Special Needs</div>
            <div className="col-md-1">Cost</div>
            <div className="col-md-1">Actions</div>
          </div>
        
          {formattedData
            .slice(
              currentPage * itemsPerPage,
              (currentPage + 1) * itemsPerPage
            )
            .map((item, index) => (
          
              <div
                className="row my-3 py-3 brdr justify-content-around"
                key={index}>
                
                <div className="col-md-1">{item.date}</div>
                <div className="col-md-1">{item.time}</div>
                <div className="col-md-1">
                  {item.firstName +
                    ' ' +
                    item.lastName}
                    
                </div>
                <div className="col-md-1">{item.phone}</div>
                <div className="col-md-1">
                  {googleLoading && item.pickup ? 'Loading' : (
                    <div>
                      {item.pickup?.address}
                    </div>
                  )}
                </div>
                <div className="col-md-1">
                  {googleLoading && item.destination ? 'Loading' : (
                    <div>
                      {item.destination?.address}
                    </div>
                  )}
                </div>
                <div className="col-md-1">
                  {item.specialNeeds ? (
                    item.specialNeeds
                  ) : (
                    <div className="dash"></div>
                  )}
                </div>
                <div className="col-md-1">{item.cost}$</div>
                <div className="col-md-1">
                  <i
                    className="fa-solid fa-trash-can icon-color mx-3"
                    onClick={() => handleDeleteRow(index)}></i>
                  <i className="fa-solid fa-pencil icon-color"
                    onClick={() => {
                      handleEditRow(item,index)
                    }}></i>
                </div>
              </div>
            ))}
         
          
        </div>
      </div>
      <ReactPaginate
        nextLabel="next"
        pageCount={Math.ceil(formattedData.length / itemsPerPage)}
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
        <div>
      <h5 className='px-3 pt-3'>Update Trip</h5>

      <input type="text" className='form-control mt-2 mb-4 py-2 w-75 mx-3' name="firstName" value={selected.firstName} onChange={handleInputChange} placeholder='First Name' />
      <input type="text" className='form-control mt-2 mb-4 py-2 w-75 mx-3' name="lastName" value={selected.lastName} onChange={handleInputChange} placeholder='Last Name' />
      <input type="date" className='form-control mt-2 mb-4 py-2 w-75 mx-3' name="date" value={selected.date} onChange={handleInputChange} placeholder='Date' />
      <input type="text" className='form-control mt-2 mb-4 py-2 w-75 mx-3' name="phone" value={selected.phone} onChange={handleInputChange} placeholder='phone' />
      <input type="date" className='form-control mt-2 mb-4 py-2 w-75 mx-3' name="birthDate" value={selected.birthDate} onChange={handleInputChange} placeholder='birthDate' />
      <input type="time" className='form-control mt-2 mb-4 py-2 w-75 mx-3' name="time" value={selected.time} onChange={handleInputChange} placeholder='time' />
      <input type="text" className='form-control mt-2 mb-4 py-2 w-75 mx-3' name="type" value={selected.type} onChange={handleInputChange} placeholder='type' />
      
      <button onClick={handleUpdateClick} className='btn-bg btn ms-auto d-block w-25 my-3 mx-3 fw-bold'>Update</button>

    </div>
      <div className='text-center my-3'>  <button  className="btn modal-close-btn px-3 "  onClick={closeModal}>Okay</button></div>
        
</Modal>  
      {apiError && <div className="alert alert-danger">{apiError}</div>}
     <div className='text-end  me-5'> <button className='btn btn-bg' onClick={sendDataToAPI}>{loading ? <Loading/> : 'SendDataToApi'}</button></div>
    
    </div>
  );

}
export default ExcelReader;
