import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleTheme } from '../redux/themeSlice';
import { FaMoon, FaSun } from "react-icons/fa";
const Layout = () => {
  const dispatch=useDispatch();
    const {user}=useSelector(store=>store.appSlice);
    const theme=useSelector((state)=>state.themeSlice.theme);
  return (
    <div className=' h-[90px] bg-white text-black flex justify-between items-center dark:bg-slate-700 shadow-lg dark:text-white sticky top-0 z-10'>
        <div className='flex gap-3'>
        <h1 className='text-3xl font-bold text-blue-400 '>Market<span className='text-purple-700'>Place</span></h1>
        
        <button onClick={()=>dispatch(toggleTheme())} className='text-3xl text-yellow-400' >{
          theme=='light'?<FaMoon/>:<FaSun/>
        }
        </button>
        
        
        </div>
        <Link to="/profile">
        {
            user &&
            <img className='rounded-full w-14 h-14 '  src={user.avatar} alt='userphoto' /> 
            
        }
        </Link>
    </div>
  )
}

export default Layout