import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Initial } from '../Types/reducerType'

type Children = {
  children : React.ReactNode
}

const ProtectedRoute = ({children} : Children) => {
  const checkUserAuthenctication = useSelector((store:Initial)=>store.auth)
  console.log(checkUserAuthenctication)
  return <div>{ checkUserAuthenctication? children : <Navigate to='/login' />} </div>
}

export default ProtectedRoute