
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { END_POINT } from '../utils/constant';
import { setUser } from '../redux/appSlice';
import toast from "react-hot-toast"
const Logout = () => {
    const navigate=useNavigate();
  const dispatch=useDispatch();

  const logouthandler=async()=>{
    try{
      const res=await axios.get(`${END_POINT}/logout`);
      if(res.data.success){
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate('/auth');
    }catch(error){
      toast.error(error.response.data.message);
      console.log(error);
    }
    

  }
  return (
    <div>
        <button onClick={logouthandler} className='bg-slate-700 p-4 rounded-md text-white m-10'>Logout</button>
    </div>
  )
}

export default Logout