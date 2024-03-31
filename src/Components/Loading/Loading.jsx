import React from 'react'
import './Loading.css'

export default function Loading() {
  return (
    <div className='d-flex justify-content-center align-items-center text-center vh-100'>
     <div><span className="loader"></span></div>
    </div>
  )
}