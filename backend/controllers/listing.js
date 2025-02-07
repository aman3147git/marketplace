import { List } from "../models/listing.js"
export const Listing=async(req,res)=>{
     try {
        const listing=await List.create(req.body);
        return res.status(201).json(listing);
     } catch (error) {
        console.log(error);
     }
}

export const DeleteListing=async(req,res)=>{
   const listing=await List.findById(req.params.userid);      //listing id
   if(!listing){
      console.log("Listing not found");
   }
   if(req.user.id!==listing.userRef){
      return res.status(401).json({
         success:false,
         message:"You can only delete your own listing"
      })
   }
   try {
      await List.findByIdAndDelete(req.params.userid);
      return res.status(200).json({
         success:true,
         message:"Listing deleted.."
      })
   } catch (error) {
      console.log(error);
   }
}
export const gettingListing=async(req,res,next)=>{
   try {
      const listing=await List.findById(req.params.lid);
      if(!listing){
         console.log("Listing not found");
      }
      return res.status(200).json(listing);
   } catch (error) {
      next(error);
   }
}


export const UpdateListing=async(req,res,next)=>{
   
      const listing=await List.findById(req.params.id);
      if(!listing){
         console.log("Listing not found");
      }
      if(req.user.id!==listing.userRef){
         return res.status(401).json({
            success:false,
            message:"You can only delete your own listing"
         })
      }
   try {
      const updatedlisting=await List.findByIdAndUpdate(req.params.id,req.body,{new:true});
      return res.status(200).json(updatedlisting);
         
   } catch (error) {
      next(error);
   }
}
export const getRandomListings = async (req, res, next) => {
   try {
       const totalListings = await List.countDocuments(); 

       const listings = await List.aggregate([
           { $sample: { size: Math.min(12, totalListings) } } 
       ]);

       return res.status(200).json(listings);
   } catch (error) {
       next(error);
   }
}
