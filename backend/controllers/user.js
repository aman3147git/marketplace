import {User} from "../models/user.js";
import { List } from "../models/listing.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();
export const Login=async(req,res)=>{
    const {email,password}=req.body;
    try{
    if(!email || !password){
        return res.status(401).json({
            message:"invalid data",
            success:false
        })
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json({
            message:"Never logged in before",
            success:false
        })
    }
    const ismatch=await bcryptjs.compare(password,user.password);
    if(!ismatch){
        return res.status(401).json({
            message:"password is incorrect",
            success:false
        }) 
    }
    const tokendata={id:user._id}
    const token= jwt.sign(tokendata,process.env.SECRET_KEY,{expiresIn:"2d"});
    return res.status(200).cookie("token",token,{httpOnly:true}).json({
        message:`welcome back ${user.fullName}`,
        user,
        success:true
    })
}catch(error){
    console.log(error);
}


}



export const Register=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try{
    if(!fullName || !email || !password){
        return res.status(401).json({
            message:"invalid data",
            success:false
        })
    }
    const user= await User.findOne({email});
    if(user){
        return res.status(401).json({
            message:"Email already taken",
            success:false
        })
    }
    const hashedpass=await bcryptjs.hash(password,15);
    User.create({
        fullName,
        email,
        password:hashedpass
    });
    return res.status(200).json({
        message:"Account created",
        success:true
    })
}catch(error){
    console.log(error);
}


}


export const Logout=async (req,res)=>{
    return res.status(200).clearCookie("token").json({
        message:"User logged out successfully",
        success:true
    })
}


export const Google=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        
        if(user){
            const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"2d"});
            
            const {password: pass, ...rest}=user._doc;
            return res
               .cookie("token",token,{httpOnly:true})
               .status(200)
               .json(rest);
                                
                
               
        }else{
            const generatedpassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedpassword=bcryptjs.hashSync(generatedpassword,10);
            const newuser=new User({fullName:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),email:req.body.email,password:hashedpassword,avatar:req.body.photo});
            await newuser.save();
            const token=jwt.sign({id:newuser._id},process.env.SECRET_KEY,{expiresIn:"2d"});
        
            const {password: pass, ...rest}=newuser._doc;
            
        
            return res
               .cookie("token",token,{httpOnly:true})
               .status(200)

               .json(rest);
            
        } 
        
    } catch (error) {
        console.log(error);
    }
}


export const Delete=async(req,res)=>{
    try {
   
    if(req.user.id!==req.params.userid){
        return res.status(403).json({
            message:"Not allowed to delete this user",
            success:false
        })
    }
    
        await User.findByIdAndDelete(req.params.userid);
        return res.status(200).json({
            message:"User successfully deleted.",
            success:true
        })
     } catch (error) {
        console.log(error);
        
     }
}



export const getListing=async(req,res)=>{
    try {
        if(req.user.id===req.params.userid){
           const listings=await List.find({userRef:req.params.userid});        //user id is coming from client side
           return res.status(200).json(listings);
            
        
        }else{
            return res.status(403).json({
                message:"You can view your own listing",
                success:false
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const contact=async(req,res,next)=>{
    try {
       const user=await User.findById(req.params.cid);
       if(!user){
        console.log(" contact user not found");
       } 
       const {password:pass,...rest}=user._doc;
       return res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}