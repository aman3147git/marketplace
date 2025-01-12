import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { Toaster } from 'react-hot-toast';
import Profile from "./components/Profile";
import Browse from "./components/Browse";
import Layout from "./components/Layout";
import Private from "./components/Private";
import Listing from "./components/Listing";
import UpdateListing from "./components/Updatelisting";
import OurListing from "./components/OurListing";



const App = () => {
  return (
    <>
    <BrowserRouter>
      <Layout/>
      <Routes>
        <Route path="/" element={<Login/>} ></Route>
        <Route path="/browse" element={<Browse />} ></Route>
        <Route path="/listing/:listingid" element={<OurListing/>} ></Route>

        <Route element={<Private/>}>
        <Route path="/profile" element={<Profile/>} ></Route>
        <Route path="/listing" element={<Listing/>}/>
        <Route path="/update-listing/:lid" element={<UpdateListing/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster/>
    </>
  );
};

export default App;
