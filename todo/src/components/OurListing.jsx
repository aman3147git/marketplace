import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { END_POINT2 } from '../utils/constant';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import Contact from './Contact';
const OurListing = () => {
    SwiperCore.use([Navigation]);
    const params=useParams();
    const {user}=useSelector(state=>state.appSlice);
    const [listing,setListing]=useState(null);
    const [contact,setContact]=useState(false);
    useEffect(()=>{
        const fetchListing=async()=>{
           
               
              const res=await fetch(`${END_POINT2}/get/${params.listingid}`,{credentials:'include'}); 
              const data=await res.json();
              if(data.success===false){
               return;
              }
              setListing(data);
           
        }
        fetchListing();
     },[params.listingid])
  return (
    <div>
        {listing&&(
            <div>
            <Swiper navigation>
            {listing.imageUrls.map((item)=>(
                <SwiperSlide key={{item}}>
                    <div className="h-[350px]" style={{background:`url(${item}) center no-repeat`,backgroundSize:'cover'}}></div>
                </SwiperSlide>
            ))}
            </Swiper>
            <p className='text-center my-7 text-3xl font-bold text-slate-700'>Price:INR {listing.regularPrice}</p>
           <div className="flex flex-row gap-9 mx-6">
           <p className='font-semibold'>{listing.name}</p>
            
            <div className="max-w-[150px] p-1 w-full bg-purple-700 rounded-lg text-center font-bold">
                {listing.type==='rent'?"For Rent":"For Sale"}
            </div></div>
            {user&&(user._id!==listing.userRef)&&!contact&&
              <button onClick={()=>setContact(true)} className='uppercase w-full p-3 bg-gray-800  rounded-lg text-center '>contact lanlord</button> 
            }
            {
                contact&& <Contact listing={listing}/>
            }
            
            </div>
        )}
    </div>
  )
}

export default OurListing