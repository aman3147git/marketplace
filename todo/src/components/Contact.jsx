import React, { useEffect, useState } from 'react'
import { END_POINT } from '../utils/constant'
import {Link} from 'react-router-dom'
const Contact = ({listing}) => {
    const [contact,setContact]=useState(null);
    const [message,setMessage]=useState("");
    useEffect(()=>{
      const getlisting=async()=>{
        const res=await fetch(`${END_POINT}/${listing.userRef}`,{credentials:'include'});
        const data=await res.json();
        setContact(data);
      }
      getlisting();
    },[listing.userRef])
  return (
    <div className='max-w-lg mx-auto'>
        {contact&&(
          <div className='my-7 flex flex-col gap-3 '>
        <p>Contact: {contact.fullName}</p>
        <textarea name="message" id="message" rows="2" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Write something here..' className='w-full p-3 text-black outline-none bg-gray-500'></textarea>
        <Link to={`mailto:${contact.email}?subject=Regarding${listing.name}&body=${message}`} className='bg-slate-700 p-3 w-full text-center rounded-lg'>Send message</Link>
        </div>
        )}
    </div>
  )
}

export default Contact