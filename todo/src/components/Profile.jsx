import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/appSlice';
import Logout from './Logout';
import { END_POINT, END_POINT2 } from '../utils/constant';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.appSlice);
  const [show, setShow] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${END_POINT}/delete/${user._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      dispatch(setUser(null));
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const listingHandler = async () => {
    try {
      setListingError(false);
      const res = await fetch(`${END_POINT}/yourlisting/${user._id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        setListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setListingError(true);
    }
  };

  const deleteListingHandler = async (listingId) => {
    try {
      const res = await fetch(`${END_POINT2}/deletelisting/${listingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) return;
      setUserListing((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto min-h-screen'>
      <div className='flex justify-between items-center py-5'>
        <h1 className='text-3xl font-bold animate-fade-in'>My Profile</h1>
        <Logout />
      </div>
      <img className='rounded-full w-20 h-20 mx-auto animate-bounce' src={user.avatar} alt='userphoto' />
      <div className='bg-slate-800 flex flex-col gap-3 p-7 m-7 rounded-lg animate-slide-in'>
        <input
          type='text'
          defaultValue={user.fullName}
          className='dark:text-blue-700 bg-gray-700 p-2 rounded-md outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:bg-gray-600'
        />
        <input
          type='email'
          defaultValue={user.email}
          className='dark:text-blue-700 bg-gray-700 p-2 rounded-md outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:bg-gray-600'
        />
      </div>

      <div className='flex flex-col items-center'>
        <h1
          className='text-red-700 cursor-pointer text-lg font-semibold hover:underline animate-pulse'
          onClick={() => setShow(true)}
        >
          Delete Account?
        </h1>

        {show && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in'>
            <div className='bg-gray-200 w-[320px] p-6 rounded-lg shadow-lg'>
              <h1 className='text-2xl text-black text-center font-semibold'>Are you sure?</h1>
              <div className='flex justify-center mt-6 gap-6'>
                <button
                  onClick={handleDelete}
                  className='h-10 w-20 bg-red-900 text-white font-semibold rounded-lg hover:bg-red-800 transition duration-200'
                >
                  Delete
                </button>
                <button
                  className='h-10 w-20 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition duration-200'
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Link to='/listing'>
        <button className='bg-gradient-to-r from-purple-700 to-red-700 p-3 rounded-lg w-full mt-3 hover:scale-105 transition'>
          Create Your's
        </button>
      </Link>
      <button
        onClick={listingHandler}
        className='bg-gradient-to-r from-green-900 to-slate-700 p-3 rounded-lg w-full my-3 hover:scale-105 transition'
      >
        Show listings
      </button>

      {userListing && userListing.length > 0 &&
        userListing.map((listing) => (
          <div
            key={listing._id}
            className='border rounded-lg p-3 gap-2 flex justify-between items-center animate-slide-in'
          >
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} className='w-16 h-16 object-contain hover:scale-110 transition' />
            </Link>
            <Link to={`/listing/${listing._id}`} className='flex-1 font-semibold hover:underline'>
              <p>{listing.name}</p>
            </Link>
            <div className='flex flex-col gap-2'>
              <button onClick={() => deleteListingHandler(listing._id)} className='uppercase text-red-700 hover:scale-105 transition'>
                delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
                <button className='uppercase text-green-700 hover:scale-105 transition'>edit</button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Profile;