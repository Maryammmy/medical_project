import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CartSkeleton({cards}) {
  return (
    <div className="container-fluid">
    {Array(cards).fill(0).map((item, index) => (
      <div className='row my-3 py-3 justify-content-evenly' key={index}>
        <div className="col-md-2 d-flex gap-3 justify-content-center align-items-center  me-md-4 me-xl-0">
          <div className='skeleton-animation'><Skeleton circle width={70} height={70} /></div>
          <div className='skeleton-animation'><Skeleton width={120}height={12} /></div>
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-center skeleton-animation"><Skeleton width={130} height={12}/></div>
        <div className="col-md-2 d-flex align-items-center justify-content-center skeleton-animation"><Skeleton width={130} height={12} /></div>
        <div className="col-md-2 d-flex align-items-center justify-content-center skeleton-animation"><Skeleton width={130} height={12}/></div>
       
      
      </div>
    ))}
  </div>
  )  
}
