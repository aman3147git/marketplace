import React,{useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from "../firebase";
import Logout from './Logout';
import { END_POINT, END_POINT2 } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/appSlice';
import {Link, useNavigate} from "react-router-dom"
const Profile = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [file,setFile]=useState(undefined);
  const [perc,setPerc]=useState(0);
  const [uploaderror,setUploaderror]=useState(false);
  const [formdata,setFormdata]=useState({});
  const {user}=useSelector(store=>store.appSlice);
  const [show,setShow]=useState(false);
  const refer=useRef(null);
  const [listingerror,setListingerror]=useState(false)
  const [userListing,setUserListing]=useState([])
  
  useEffect(()=>{
    if(file){
      uploadFile(file);
    }
  },[file]);
  const uploadFile=(file)=>{
    const storage = getStorage(app);
    const filename=new Date().getTime()+file.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
        
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(Math.round(progress));
        
      }, 
      (error) => {
        setUploaderror(true);
      }, 
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormdata({...formdata,avatar:downloadURL});
        });
      }
    );
  }
  
  const handleDelete=async()=>{
    try {
      const res=await fetch(`${END_POINT}/delete/${user._id}`,{
        method:'DELETE',
        credentials: 'include',
        
      })
     
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data=await res.json();
       
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  
  const listinghandler=async()=>{
     try {
      setListingerror(false);
      const res=await fetch(`${END_POINT}/yourlisting/${user._id}`,{credentials:'include'});
      const data=await res.json();
      if(data.success===false){
        setListingerror(true);
        return;
      }
      console.log(data);
      setUserListing(data);  
     } catch (error) {
      setListingerror(true);
     }
  }

  const DeleteListinghandler=async(listingid)=>{
    try {
      const res=await fetch(`${END_POINT2}/deletelisting/${listingid}`,{      //ye backend me dikhega
        method:'DELETE',
        credentials:'include'
      })
      const data=await res.json();
      if(data.success===false){
        return;
      }
      setUserListing((prev)=>prev.filter((listing)=>listing._id!==listingid));    //ye frontend me dikhe ki delete hua
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='max-w-lg mx-auto min-h-screen'>
      <div  className='flex justify-between'>
      <h1 className='text-3xl font-bold ml-[200px]'>My Profile</h1>
      <Logout />
      </div>
      <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={refer} hidden accept='image/*'/>
      <img onClick={()=>refer.current.click()} className='rounded-full w-16 h-16 ml-[200px] ' src={formdata.avatar||user.avatar} alt='userphoto'/>
      
      <p className='self-center'>{
        uploaderror?
        <span className='text-red-700'>uploading file error</span>:
        perc>0 && perc<100?
        <span>{`uploading ${perc}%`}</span>:
        perc===100?
        <span className='text-green-700'>Image uploaded successfully</span>:""
        
      }</p>
      <form className='bg-slate-700 flex flex-col gap-3  p-7 m-7  rounded-lg'>
      
      <input type='text' defaultValue={user.fullName} className='dark:text-blue-700'/>
      <input type='email' defaultValue={user.email} className='dark:text-blue-700'/>
      </form>


      <div className="flex flex-col items-center">
      
      <h1
        className="text-red-700 cursor-pointer text-lg font-semibold hover:underline"
        onClick={() => setShow(true)}
      >
        Delete Account?
      </h1>

      
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 w-[320px] p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl text-black text-center font-semibold">
              Are you sure?
            </h1>

           
            <div className="flex justify-center mt-6 gap-6">
              <button
                onClick={handleDelete}
                className="h-10 w-20 bg-red-900 text-white font-semibold rounded-lg hover:bg-red-800 transition duration-200"
              >
                Delete
              </button>
              <button
                className="h-10 w-20 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-200"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>


      <Link to="/listing">
      <button className='bg-gradient-to-r from-purple-700 to-red-700 p-3 rounded-lg w-full mt-3'>Create Your's</button>
      
      </Link>
      <button onClick={listinghandler} className='bg-gradient-to-r from-green-900 to-slate-700 p-3 rounded-lg w-full my-3 '>Show listings</button>
      {
        userListing&&userListing.length>0&&
        userListing.map((listing)=>
          <div key={listing._id} className="border rounded-lg p-3 gap-2 flex justify-between items-center">
            <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} className='w-16 h-16 object-contain'/>
            </Link>
            <Link to={`/listing/${listing._id}`} className='flex-1 font-semibold'>
            <p>{listing.name}</p>
            </Link>
            <div className='flex flex-col gap-2'>
              <button onClick={()=>DeleteListinghandler(listing._id)} className='uppercase text-red-700'>delete</button>
              <Link to={`/update-listing/${listing._id}`}><button className='uppercase text-green-700'>edit</button></Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Profile