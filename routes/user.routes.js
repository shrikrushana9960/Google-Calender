const express=require("express");
const { register, login, update, getAllUsers, getSingleUser } = require("../controller/UserController");
const router=new express.Router();


router.get("/register",register).get("/",login).put("/",update);
router.get("/getAllUsers",getAllUsers);
router.get("/getSingleUser",getSingleUser)

module.exports=router