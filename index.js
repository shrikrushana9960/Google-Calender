const express = require("express");
const app = express();
require("dotenv").config();
const { dbConnect } = require("./config/dbConfig");
const passport = require("./google-utils-files/passport-util");
const googleCalenderService = require("./google-utils-files/google-calendar.service");
const googleUtil = require("./google-utils-files/google-utils");
const { google } = require("googleapis");
const { setCookie } = require("./middleware/cookiesdata");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(logger("dev"));

const bodyParser = require("body-parser");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSucessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoute = require("./routes/user.routes");
const User = require("./models/user");
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.json("Hello google calender app hit to /rest/v1/calendar/init/");
});
app.get("/rest/v1/calendar/init/", (req, res) => {
  res.json({ url: googleUtil.urlGoogle() });
});
mongoose.set("strictQuery", false);
dbConnect();
app.use("/user", userRoute);
app.get("/rest", async (req, res) => {
  // check for valid session
  const user = await User.findById(req.query.user_id);

  if (user) {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: user.access_token,
    });
    let channelId = req.query.channel_id;

    googleCalenderService.listEvents(oauth2Client, (events) => {
      if (events?.length) {
        let channels = events;
        let validation = channels.filter(
          (channel) => channel.snippet.channelId == channelId
        );
        if (channels.length) {
          res.status(200).json({ status: validation.length > 0 });
        } else {
          res
            .status(200)
            .json({ success: false, message: "Internal Server Error" });
        }
      } else
        res
          .status(200)
          .json({ success: false, message: "Invalid Credentials" });
    });
  } else {
    res.status(200).json({ success: false, message: "Invalid Credentials" });
  }
});

app.get("/", function (req, res) {
  try {
    res.json({
      message: "Server is running",
      database: mongoose.connection.readyState ? "Connected" : "Not Connected",
    });
  } catch (e) {
    console.log(e);
  }
});
app.listen(process.env.PORT || 5000, () => {
  console.log("server is running");
});
