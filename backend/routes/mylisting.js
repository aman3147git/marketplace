import express from "express";
import { DeleteListing, gettingListing, Listing, UpdateListing,getRandomListings } from "../controllers/listing.js";
import { verifytoken } from "../utils/verifyuser.js";
import { searched, searchedItem } from "../controllers/search.js";
const router=express.Router();
router.post("/create",verifytoken,Listing);
router.delete('/deletelisting/:userid',verifytoken,DeleteListing);
router.get('/get/:lid',gettingListing);
router.post('/update/:id',verifytoken,UpdateListing);
router.get("/random", getRandomListings);

router.get("/search", searched);
router.get("/search/:id", searchedItem);
export default router;