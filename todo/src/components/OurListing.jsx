import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { END_POINT2 } from "../utils/constant";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import Contact from "./Contact";

const OurListing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const { user } = useSelector((state) => state.appSlice);
  const [listing, setListing] = useState(null);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`${END_POINT2}/get/${params.listingid}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === false) return;
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [params.listingid]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {listing && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          
          <Swiper navigation>
            {listing.imageUrls.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[350px] w-full bg-center bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url(${item})` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          
          <div className="p-6">
            <p className="text-center text-3xl font-bold text-slate-700 mb-4">
              Price: INR {listing.regularPrice}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold dark:text-black">{listing.name}</p>
              <button className="p-1 bg-red-700 text-white font-bold">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </button>
            </div>

            
            {user && user._id !== listing.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className="w-full mt-6 p-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-200"
              >
                Contact Landlord
              </button>
            )}

            
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default OurListing;
