const express = require("express");
const {
  register,
  login,
  update,
  getAllUsers,
  getSingleUser,
  addURL,
  getURL,
  getChannel,
} = require("../controller/UserController");
const router = new express.Router();

router.get("/register", register).get("/", login).put("/", update);
router.get("/getAllUsers", getAllUsers);
router.get("/getSingleUser", getSingleUser);
router.post("/addURL", addURL);
router.get("/getURL", getURL);

router.get("/channel", getChannel);

module.exports = router;
