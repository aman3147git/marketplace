import express from "express";
import cookieParser from 'cookie-parser';
import myroute from "./routes/myroute.js";
import mylisting from "./routes/mylisting.js";
import cors from "cors";
import db from "./utils/database.js";
import dotenv from "dotenv";
dotenv.config();

const app=express();
db();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsoption={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsoption));
app.use("/s1/user",myroute);
app.use("/s1/listing",mylisting);
app.listen(process.env.PORT,()=>{
    console.log("server started successfully");
});