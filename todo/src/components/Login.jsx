import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/appSlice";
import {END_POINT}  from "../utils/constant.js" 
import toast from "react-hot-toast"
import Oauth from './Oauth.jsx';
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const Login = () => { 
    const [passtype,setPasstype]=useState("password");
    const [loader,setLoader]=useState(false);
    const [islogin,setIslogin]=useState(false);
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState(""); 
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const loginhandler=()=>{
        setIslogin(!islogin);
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        if(islogin){
           const user={email,password};
           
           try{
            setLoader(true);
            const res= await axios.post(`${END_POINT}/login`,user,{
            headers:{"Content-Type":"application/json"},
            withCredentials:true
           });
           if(res.data.success){
            toast.success(res.data.message);
          }
          console.log(res.data);
           dispatch(setUser(res.data.user));
           navigate('browse');
           
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            setLoader(false);
        }
        
        }else{
            const user={fullName,email,password};
            
           try{
            setLoader(true);
            const res=await axios.post(`${END_POINT}/register`,user,{
            headers:{"Content-Type":"application/json"},
            withCredentials:true
           });
           console.log(res);
           if(res.data.success){
            toast.success(res.data.message);
          }
           setIslogin(true);
        } catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }finally{
            setLoader(false);
        }
           
        }
        setFullName("");
        setEmail("");
        setPassword("");   
        
    }
  return (
    <div className='flex flex-row items-center justify-center  min-h-screen'>
        <div className='max-w-3xl mx-auto  bg-slate-700 rounded-md'>
        <form onSubmit={submitHandler}>
            <h1 className='font-bold text-3xl text-center text-white'>{islogin?"Sign In":"Sign Up"}</h1>
            <div className='flex flex-col text-center gap-3 mt-6 mb-4 p-4'>
            {!islogin && <input className='py-3 dark:text-blue-700' value={fullName} onChange={(e)=>setFullName(e.target.value)} type='text' placeholder='Write name'/>}
            <input className='py-3 dark:text-blue-700'  value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email'/>
            <input className='py-3 dark:text-blue-700'  value={password} onChange={(e)=>setPassword(e.target.value)} type={passtype} placeholder='********'/>
            
           
            <span  onClick={()=>setPasstype(passtype==="password"?"text":"password")}>{passtype==="password"?<FaLockOpen/>:<FaLock/>}</span>
            </div>
            
            <div className='ml-[70px] sm:mr-[60px]'>
            {
                loader?<button className='bg-blue-800  p-3 rounded-lg text-white ml-[140px]'>Loading..</button>:<button className='bg-blue-800  p-3 rounded-lg text-white ml-[140px]'>{islogin?"Login":"SignUp"}</button>
            }
            
            <Oauth/>
            </div>
            
            <p className='mt-6 ml-2 text-zinc-300'>{islogin?"New user?":"Already have an account?"} <span onClick={loginhandler} className='text-red-600 ml-3 hover:underline'>{islogin?"signup":"login"}</span></p>
        </form> 
        </div>
    </div>
  )
}

export default Login