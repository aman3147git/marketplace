import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { END_POINT2 } from "../utils/constant";
import Search from "./Search"; // Import the Search component

const Browse = () => {
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      try {
        const res = await fetch(`${END_POINT2}/search?query=${value}`, { credentials: "include" });
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 bg-white">
      <h1 className="text-4xl font-bold text-center text-gray-500">
        Your Ultimate Marketplace for Homes 🏡
      </h1>
      <p className="text-lg text-center text-gray-600 mt-2">Find your dream home today!</p>

      {/* Search Bar */}
      <div className="flex justify-center items-center mt-6 mb-6">
        <input
          type="text"
          placeholder="Search here..."
          className="p-3 w-[300px] border border-gray-300 outline-none bg-gray-500 text-white"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>

      {/* Search Results */}
      {searchQuery && <Search results={searchResults} />}

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {listings.length > 0 ? (
          listings.map(
            (listing, index) =>
              listing.imageUrls && listing.imageUrls.length > 0 && (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                  <img
                    src={listing.imageUrls[0].startsWith("http") ? listing.imageUrls[0] : `${END_POINT2}${listing.imageUrls[0]}`}
                    alt={`Listing ${index + 1}`}
                    className="w-full h-56 object-cover"
                  />
                  <Link to={`/listing/${listing._id}`}>
                    <div className="p-3">
                      <h3 className="text-lg font-semibold text-gray-900 hover:underline">{listing.name}</h3>
                      <p className="text-sm text-gray-500">INR {listing.regularPrice}</p>
                    </div>
                  </Link>
                </div>
              )
          )
        ) : (
          <p className="text-center text-gray-700 text-lg col-span-full">Loading or No Listings Available...</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
