import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { END_POINT2 } from "../utils/constant";

const Browse = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((store) => store.appSlice.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`${END_POINT2}/random`, { credentials: "include" });
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 bg-white">
      
      <h1 className="text-4xl font-bold text-center text-gray-500">
        Your Ultimate Marketplace for Homes 🏡  
      </h1>
      <p className="text-lg text-center text-gray-600 mt-2">
        Find your dream home today!  
      </p>

      
      <div className="flex justify-center items-center mt-6 mb-6">
        <input
          type="text"
          placeholder="Search here..."
          className="p-3 w-[300px] border border-gray-300  outline-none bg-gray-500"
        />
        <button className="ml-2 bg-green-900 text-white p-3 px-6 rounded-md hover:bg-green-800 transition">
          Search
        </button>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {listings.length > 0 ? (
          listings.map(
            (listing, index) =>
              listing.imageUrls && listing.imageUrls.length > 0 && (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                >
                  <img
                    src={listing.imageUrls[0].startsWith("http") ? listing.imageUrls[0] : `${END_POINT2}${listing.imageUrls[0]}`}
                    alt={`Listing ${index + 1}`}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-semibold text-gray-900">Beautiful Home</h3>
                    <p className="text-sm text-gray-600">Great location with amazing amenities.</p>
                  </div>
                </div>
              )
          )
        ) : (
          <p className="text-center text-gray-700 text-lg col-span-full">
            Loading or No Listings Available...
          </p>
        )}
      </div>
    </div>
  );
};

export default Browse;
