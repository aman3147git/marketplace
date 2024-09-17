import express from "express";
import { contact, Delete, getListing, Google, Login,Logout,Register } from "../controllers/user.js";
import { verifytoken } from "../utils/verifyuser.js";

const router=express.Router();
router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/logout").get(Logout);
router.route("/google").post(Google);
router.delete("/delete/:userid",verifytoken,Delete);

router.get("/yourlisting/:userid",verifytoken,getListing);
router.get('/:cid',verifytoken,contact);
export default router;