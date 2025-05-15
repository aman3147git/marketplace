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
    <div className='max-w-3xl mx-auto px-4 py-10 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in'>👤 My Profile</h1>
        <Logout />
      </div>

      <div className='flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg'>
        <img
          className='rounded-full w-24 h-24 object-cover border-4 border-white shadow-md mb-4 hover:scale-110 transition-transform duration-300'
          src={user.avatar}
          alt='User Avatar'
        />
        <div className='w-full flex flex-col gap-3'>
          <input
            type='text'
            defaultValue={user.fullName}
            className='bg-gray-700 text-white p-3 rounded-lg outline-none hover:bg-gray-600 transition duration-300 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='email'
            defaultValue={user.email}
            className='bg-gray-700 text-white p-3 rounded-lg outline-none hover:bg-gray-600 transition duration-300 focus:ring-2 focus:ring-blue-400'
          />
        </div>
      </div>

      <div className='flex flex-col items-center mt-6'>
        <button
          onClick={() => setShow(true)}
          className='text-red-500 font-bold hover:underline hover:scale-105 transition duration-300'
        >
          Delete Account?
        </button>

        {show && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 animate-fade-in'>
            <div className='bg-white p-8 rounded-lg shadow-xl text-center w-80'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>Are you sure?</h2>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={handleDelete}
                  className='bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition'
                >
                  Delete
                </button>
                <button
                  onClick={() => setShow(false)}
                  className='bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-lg font-semibold transition'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='mt-6 flex flex-col gap-3'>
        <Link to='/listing'>
          <button className='w-full py-3 bg-gradient-to-r from-purple-700 to-red-700 text-white font-bold rounded-xl shadow hover:scale-105 transition duration-300'>
            + Create Your Listing
          </button>
        </Link>
        <button
          onClick={listingHandler}
          className='w-full py-3 bg-gradient-to-r from-green-700 to-slate-700 text-white font-bold rounded-xl shadow hover:scale-105 transition duration-300'
        >
          Show My Listings
        </button>
      </div>

      {listingError && (
        <p className='text-red-500 mt-4 text-center font-semibold'>Failed to load listings. Try again later.</p>
      )}

      {userListing && userListing.length > 0 && (
        <div className='mt-6 space-y-4'>
          {userListing.map((listing) => (
            <div
              key={listing._id}
              className='bg-gray-800 p-4 rounded-lg shadow hover:shadow-xl transition duration-300 flex items-center justify-between'
            >
              <Link to={`/listing/${listing._id}`} className='flex items-center gap-4 flex-1'>
                <img
                  src={listing.imageUrls[0]}
                  alt={listing.name}
                  className='w-16 h-16 object-cover rounded-md hover:scale-105 transition'
                />
                <p className='text-white font-semibold hover:underline'>{listing.name}</p>
              </Link>
              <div className='flex flex-col gap-2'>
                <button
                  onClick={() => deleteListingHandler(listing._id)}
                  className='text-red-500 hover:underline hover:scale-105 transition'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-400 hover:underline hover:scale-105 transition'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
