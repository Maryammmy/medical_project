
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { storecontext } from '../Context/StorecontextProvider';
import Modal from 'react-modal';
import user from '../../assets/images/user-svgrepo-com 1(1).svg'
import CartSkeleton from '../CartSkeleton/CartSkeleton';
import DriverSkeleton from '../DriverSkeleton/DriverSkeleton';
import { useNavigate } from 'react-router-dom';

export default function Driverdetails() {
  const [driverdetails, setDriverdetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { selectedItemId, baseUrl} = useContext(storecontext);
  const [apiError, setApiError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  let token =sessionStorage.getItem('token')
  let navigate = useNavigate()
  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };
  const openModal = (imageUrl) => {
    setShowModal(true);
    setModalImage(imageUrl);
  }
  useEffect(() => {
    async function getDriverdetails() {
      try {
        if (selectedItemId) {
          setLoading(true)
          const response = await axios.get(`${baseUrl}/api/Admin/DriverDetails?id=${selectedItemId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.status == 200) {
            setLoading(false);
            setDriverdetails(response.data.data);
           

          }

        }
      } catch (error) {
        setLoading(false)
        console.error(error);
        if(error.response.data.message=="Authorization Failed"){
          navigate('/login')
        }

      }

    }

    getDriverdetails();
  }, [selectedItemId]);



  return (
    <>
    {loading? <DriverSkeleton cards={12}/>: <div>
        <div className='d-flex '>
          <span className='images' onClick={() => openModal(driverdetails.user?.profileImage)}><img src={driverdetails.user.profileImage} alt="" /></span>
          <span className='ps-5 pt-3'>{driverdetails.user.firstName}</span>
          <span className='pt-3 ps-2'>{driverdetails.user.lastName}</span>
        </div>
        <div>
          <p className='pt-4  red-color'>Personal Information</p>
        </div>
        <div>
          <div className='d-flex justify-content-between'>
            <span className='p-color'><i className="fa-solid fa-phone i-color"></i>Phone number</span>
            <span className='content-color'>{driverdetails?.user?.phone}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span className='p-color'> <i className="fa-solid fa-location-dot i-color"></i>Address</span>
            <span className='content-color'>{driverdetails?.location?.address.split(' ').slice(0, 3).join(' ')}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span className='p-color'><i className="fa-solid fa-calendar i-color"></i>Birthday</span>
            <span className='content-color'>{driverdetails?.user?.birthDate}</span>
          </div>
        </div>
        <div>
          <p className='pt-4  red-color'>Car Information</p>

        </div>
        <div>
          <div className='d-flex justify-content-between'>
            <span className='p-color'><i className="fa-solid fa-car-side i-color"></i>Car type</span>
            <span className='content-color'>{driverdetails?.car?.carType}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span className='p-color'><i className="fa-solid fa-car-side i-color"></i>Car model</span>
            <span className='content-color'>{driverdetails?.car?.carModel}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span className='p-color'><i className="fa-solid fa-palette i-color"></i>Car color</span>
            <span className='content-color'>{driverdetails?.car?.color}</span>
          </div>
        </div>
        <div>
          <p className='mb-0 pt-4 red-color'>National Id</p>
          <div className='d-flex  justify-content-around gap-3 mt-2'>
            <div className='imageee' onClick={() => openModal(driverdetails?.nationalCard?.front)}><img src={driverdetails?.nationalCard?.front} alt="" /></div>
            <div className='imageee' onClick={() => openModal(driverdetails?.nationalCard?.back)} ><img src={driverdetails?.nationalCard?.back} alt="" /></div>
          </div>
        </div>
        <div>
          <p className='mb-0 pt-4 red-color'>car License</p>
          <div className='d-flex justify-content-around  gap-3 mt-2'>
            <div className='imageee' onClick={() => openModal(driverdetails?.car?.registration)}><img src={driverdetails?.car?.registration} alt="" /></div>
            <div className='imageee' onClick={() => openModal(driverdetails?.car?.insurance)}><img src={driverdetails?.car?.insurance} alt="" /></div>
          </div>
        </div>
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="Success Modal"
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '1050'
            },
            content: {
              backgroundColor: 'rgba(250, 250, 250, 1)', // white background
              border: '1px solid #ccc', // border
              borderRadius: '8px', // border radius
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // shadow
              width: '450px', // max width
              margin: 'auto', // center horizontally
              padding: '0x',
              height: 'fit-content',
              overflow: "hidden",
              zIndex: '1050'

              // display: 'flex',
              // flexDirection: 'column',
            },

          }}
        >
          <div className='text-end'><button className="btn  fw-medium" onClick={closeModal}>X</button>  </div>
          <div> <img src={modalImage}  alt="Modal" style={{ width: '100%', height: '100%' }} /></div>

        </Modal>
      </div>}
     
    </>

  );
}

