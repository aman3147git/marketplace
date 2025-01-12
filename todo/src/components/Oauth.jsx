import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {app} from "../firebase";
import {END_POINT}  from "../utils/constant.js" 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setUser} from "../redux/appSlice";

const Oauth = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const googlehandler=async()=>{
        try {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,provider);
           
            const res=await fetch(`${END_POINT}/google`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                }),
                credentials:"include"
            });
            const data=await res.json();
            console.log(data);
            
            dispatch(setUser(data));
            navigate("/browse");
        } catch (error) {
            
            console.log(error);
        }
    }
  return (
    <button type='button' onClick={googlehandler} className='bg-gradient-to-r from-yellow-500 to-green-600 text-white p-3 rounded-lg mt-3 ml-16 hover:opacity-95 uppercase'>Continue with google</button>
  )
}

export default Oauth