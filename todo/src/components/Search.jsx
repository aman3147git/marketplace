import React from "react";
import { Link } from "react-router-dom";
import { END_POINT2 } from "../utils/constant";

const Search = ({ results }) => {
  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-md">
      {results.length > 0 ? (
        results.map((item) => (
          <Link
            to={`/listing/${item._id}`}
            key={item._id}
            className="block p-2 border-b border-gray-300 hover:bg-gray-200"
          >
            <div className="flex items-center">
              <img
                src={item.imageUrls?.[0]?.startsWith("http") ? item.imageUrls[0] : `${END_POINT2}${item.imageUrls[0]}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-blue-500">{item.name}</h3>
                <p className="text-sm text-gray-600">INR {item.regularPrice}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
  );
};

export default Search;
