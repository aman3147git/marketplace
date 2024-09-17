import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const Private = () => {
    const {user}=useSelector(state=>state.appSlice);
  return (
    user?<Outlet/>:<Navigate to="/"/>
  )
}

export default Private