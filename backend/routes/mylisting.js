import express from "express";
import { DeleteListing, gettingListing, Listing, UpdateListing } from "../controllers/listing.js";
import { verifytoken } from "../utils/verifyuser.js";
const router=express.Router();
router.post("/create",verifytoken,Listing);
router.delete('/deletelisting/:userid',verifytoken,DeleteListing);
router.get('/get/:lid',gettingListing);
router.post('/update/:id',verifytoken,UpdateListing);
export default router;