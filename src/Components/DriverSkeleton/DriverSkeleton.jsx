import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function DriverSkeleton({cards}) {
  return (
 <>
           <div className='d-flex justify-content-around mb-3'>
          <div className='skeleton-animation'><Skeleton circle width={70} height={70} /></div>
          <div className='skeleton-animation pt-3'><Skeleton width={120}height={12} /></div>
      
        </div>
        {Array(cards).fill(0).map((item, index) => (
        <div key={index} className='skeleton-animation my-4 '><Skeleton width={200}height={12} /></div>
    ))}
      
       
        </>

  )  
}
