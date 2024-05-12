import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TripSkeleton({cards}) {
  return (
    <div className="container-fluid">
    {Array(cards).fill(0).map((item, index) => (
      <div className='row my-3 py-3 justify-content-around' key={index}>
      
        <div className="col-md-2 skeleton-animation"><Skeleton width={150} height={12}/></div>
        <div className="col-md-2 skeleton-animation"><Skeleton width={150} height={12} /></div>
        <div className="col-md-2 skeleton-animation"><Skeleton width={150} height={12}/></div>
        <div className="col-md-2 skeleton-animation"><Skeleton width={150} height={12}/></div>
       
      </div>
    ))}
  </div>
  )  
}
