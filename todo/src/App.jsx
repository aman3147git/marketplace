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
import Search from "./components/Search";
import Footer from "./components/Footer";



const App = () => {
  return (
    <>
    <BrowserRouter>
      <Layout/>
      <Routes>
        <Route path="/auth" element={<Login/>} ></Route>
        <Route path="/" element={<Browse />} ></Route>
        <Route path="/listing/:listingid" element={<OurListing/>} ></Route>

        <Route element={<Private/>}>
        <Route path="/profile" element={<Profile/>} ></Route>
        <Route path="/listing" element={<Listing/>}/>
        <Route path="/update-listing/:lid" element={<UpdateListing/>}/>
        <Route path="/search" element={<Search/>} />
        <Route path="/search/:query" element={<Search/>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    <Toaster/>
    </>
  );
};

export default App;
