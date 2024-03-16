import React from 'react'
import { useParams } from 'react-router-dom'
import Drivers from '../Drivers/Drivers'

export default function Driverdetails() {
let {id} =useParams()
console.log(id)
  return (
    <>
<div>{id}</div>
</>
  )
}
