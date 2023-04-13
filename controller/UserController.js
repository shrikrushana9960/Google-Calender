const {
  getGoogleAccountFromCode,
  getAccountFromCode,
} = require("../google-utils-files/google-utils");
const User = require("../models/user");
const { google } = require("googleapis");
const { getToken } = require("./getTokens");
const urlmodel = require("../models/url");
const { v4: uuidv4 } = require("uuid");
const { getChannelInfo } = require("./getChannel");
require("dotenv").config();

const register = async (req, res) => {
  try {
    console.log(req.query.code);
    if (req.query.code && req.query.code !== "undefined") {
      const tokens = await getToken(req.query.code);
      if (tokens.access_token) {
        const user = await User.create({ ...tokens });
        res.status(200).json({ user });
      } else {
        res.status(200).json({ success: false, message: "token error" });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "Cannot Register this Phone No" });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ success: false, message: "Cannot Register this Phone No" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.find({ ...req.query });
    if (user) res.status(200).json({ success: true, data: user[0] || {} });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    let offset = req.query.offset;
    delete req.query.offset;
    const count = await User.find({ ...req.query }).count();
    const user = await User.find(
      { ...req.query },
      { name: 1, _id: 1, photos: 1, role: 1, address: 1, mobile: 1, poster: 1 }
    )
      .sort({ _id: -1 })
      .skip(parseInt(offset) || 0)
      .limit(10);
    res.status(200).json({ success: true, count, data: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getSingleUser = async (req, res) => {
  try {
    const mess = await User.find({ ...req.query });

    if (mess) res.status(200).json({ success: true, data: mess });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.updateMany(
      { mobile: req.body.mobile },
      { $set: { ...req.body } }
    );

    res.status(200).json({ success: true, data: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addURL = async (req, res) => {
  const uuid = uuidv4();
  const channel = await getChannelInfo(req.body.channel_id);
  try {
    const url = await urlmodel.create({ ...req.body, uuid, ...channel });
    if (url) res.status(200).json({ success: true, data: uuid, channel });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getChannel = async (req, res) => {
  const channel = await getChannelInfo(req.query.channel_id);
  res.status(200).json({ success: true, channel });
};
const getURL = async (req, res) => {
  try {
    const url = await urlmodel.find({ ...req.query });
    if (url) res.status(200).json({ success: true, data: url[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  getChannel,
  login,
  update,
  getAllUsers,
  getSingleUser,
  addURL,
  getURL,
};
