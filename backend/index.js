import express from "express";
import cookieParser from 'cookie-parser';
import myroute from "./routes/myroute.js";
import mylisting from "./routes/mylisting.js";
import cors from "cors";
import db from "./utils/database.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app=express();
const __dirname=path.resolve();
db();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsoption={
    origin:process.env.FRONTEND_URL,
    credentials:true
}
app.use(cors(corsoption));
app.use("/s1/user",myroute);
app.use("/s1/listing",mylisting);

app.use(express.static(path.join(__dirname,"/todo/dist")));
app.use("*",(_,res)=>{
    res.sendFile(path.resolve(__dirname,"todo","dist","index.html"));
})
app.listen(process.env.PORT,()=>{
    console.log("server started successfully");
});