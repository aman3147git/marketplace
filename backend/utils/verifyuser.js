import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifytoken=(req,res,next)=>{
    const token=req.cookies.token;
    
    if(!token){
        console.log("Token not found in cookies");
        return res.status(401).json({
            message:"Unauthorized",
            success:false
        })
    }
    
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            console.error('Token verification error:', err);
            return res.status(403).json({
                message:"Forbidden",
                success:false
            })
            
        }
        console.log("User verified:", user);
        req.user=user;
        next();
    });
}