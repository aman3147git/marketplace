import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';
import { END_POINT2 } from '../utils/constant';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Listing = () => {
  const navigate=useNavigate()
  const {user}=useSelector(store=>store.appSlice);
  const [files,setFiles]=useState([]);
  const [formdata,setFormdata]=useState({
    imageUrls:[],
    name:"",
    type:"rent",
    regularPrice:0,
    discountPrice:0,
    bathrooms:1,
    bedrooms:1,
    furnished:false,
    parking:false,
    offer:false,

  });
  const [error,setError]=useState(false);
  const [uploaderror,setUploaderror]=useState(false);
  const imagesubmit=()=>{
        if(files.length>0&&files.length+formdata.imageUrls.length<7){
          const promises=[];
          for(let i=0;i<files.length;i++){
            promises.push(imageUploader(files[i]));
          }
          Promise.all(promises).then((urls)=>{
            setFormdata({...formdata,imageUrls:formdata.imageUrls.concat(urls)});
            setUploaderror(false);
          }).catch(setUploaderror(true));
        }else{
          setUploaderror("upload only 6 images");
        }
  }
  const imageUploader=(file)=>{
    return new Promise((resolve,reject)=>{
      const storage = getStorage(app);
      const filename=new Date().getTime()+file.name;
      const storageRef = ref(storage, filename);
  
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
        (snapshot) => {
          
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress is:${progress}%`);
          
        }, 
        (error) => {
          reject(error);
        }, 
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
  const deleteImage=(index)=>{
    setFormdata({...formdata,imageUrls:formdata.imageUrls.filter((_,i)=>
      i!==index
    )})
  }
  const handlechange=(e)=>{
    if(e.target.id==='sale'||e.target.id==='rent'){
      setFormdata({...formdata,type:e.target.id})
    }
    if(e.target.id==='furnished'||e.target.id==='offer'||e.target.id==='parking'){
      setFormdata({...formdata,
        [e.target.id]:e.target.checked
      })
    }
    if(e.target.type==='text'||e.target.type==='number'){
      setFormdata({...formdata,
        [e.target.id]:e.target.value
      })
    }
  }
  const submithandler=async(e)=>{
    e.preventDefault();
    try {
      if(formdata.imageUrls.length<1)return setError('Atleast one image should be present.')
      setError(false);
      const res=await fetch(`${END_POINT2}/create`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...formdata,userRef:user._id}),         //id is sending to know which user has created
        credentials:'include'
      });
      const data=await res.json();
      console.log(data);
      if(data.success===false){
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
      setFormdata({
        imageUrls:[],
        name:"",
        type:"rent",
        regularPrice:0,
        discountPrice:0,
        bathrooms:1,
        bedrooms:1,
        furnished:false,
        parking:false,
        offer:false,
      })
    } catch (error) {
      setError(error.message);
    }

  }
  return (
    <div className='p-3 max-w-4xl mx-auto min-h-screen '>
      <h1 className='text-4xl font-bold hover:scale-110 duration-75  text-center my-8'>Create Your Listing</h1>
      <form onSubmit={submithandler} className='flex flex-col sm:flex-row gap-4 '>
        <div className='flex flex-col flex-1 gap-4 '>
        <input type='text' placeholder='Name' id='name' className='p-3 border rounded-lg dark:text-black' onChange={handlechange} value={formdata.name} required/>
        <div className="flex gap-5 flex-wrap">
          <div className="flex gap-2">
            <input type='checkbox' id='sale' className='w-7 dark:text-black' onChange={handlechange} checked={formdata.type==="sale"}/>
            <span>Sale</span>
          </div>
          <div className="flex gap-2">
            <input type='checkbox' id='rent' className='w-7 dark:text-black' onChange={handlechange} checked={formdata.type==="rent"}/>
            <span>Rent</span>
          </div>
          <div className="flex gap-2">
            <input type='checkbox' id='parking' className='w-7 dark:text-black' onChange={handlechange} checked={formdata.parking}/>
            <span>Parking</span>
          </div>
          <div className="flex gap-2">
            <input type='checkbox' id='furnished' className='w-7 dark:text-black' onChange={handlechange} checked={formdata.furnished}/>
            <span>Furnished</span>
          </div>
          <div className="flex gap-2">
            <input type='checkbox' id='offer' className='w-7 dark:text-black' onChange={handlechange} checked={formdata.offer}/>
            <span>Offer</span>
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          <div className="flex gap-2">
            <input type='number' id='bedrooms' min='1' max='10' className='p-3 border border-gray-600 rounded-lg dark:text-black' onChange={handlechange} value={formdata.bedrooms}  required/>
            <span>Beds</span>
          </div>
          <div className="flex gap-2">
            <input type='number' id='bathrooms' min='1' max='10' className='p-3 border border-gray-600 rounded-lg dark:text-black' onChange={handlechange} value={formdata.bathrooms} required/>
            <span>Baths</span>
          </div>
          <div className="flex gap-2">
            <input type='number' id='regularPrice' min='50' max='100000000' className='p-3 border border-gray-600 rounded-lg dark:text-black' onChange={handlechange} value={formdata.regularPrice}  required/>
            <span>Regular Price</span>
          </div>
          {formdata.offer&&(
             <div className="flex gap-2">
             <input type='number' id='discountPrice' min='50' max='100000000' className='p-3 border border-gray-600 rounded-lg dark:text-black' onChange={handlechange} value={formdata.discountPrice}  required/>
             <span>Dicount Price</span>
           </div>
          )}
          
        </div>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex gap-2">
            <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple/>
            <button onClick={imagesubmit} type='button' className='p-3 bg-gradient-to-r from-green-700 to-slate-700 rounded-lg hover:opacity-45'>Upload</button>
          </div>
          
          <p className='text-red-500'>{uploaderror&&uploaderror}</p>
          {
            formdata.imageUrls.length>0 && formdata.imageUrls.map((item,index)=>(
              <div className="flex justify-between bg-gray-300 rounded-lg border " key={index}>
                <img src={item} alt="photioo" className='w-20 h-20 object-contain'/>
                <button onClick={()=>deleteImage(index)} className='p-3 text-orange-700 uppercase'>delete</button>
              </div>
            ))
          }
          <button className='bg-gradient-to-tr from-pink-500 to-violet-600 p-4 uppercase rounded-lg hover:opacity-75 text-center'>Submit</button>
          {error&&<p className='text-red-500 text-sm'>{error}</p>}
        </div>
        
      </form>
    </div>
  )
}

export default Listing