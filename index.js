const express = require("express");
const app = express();

const passport = require("./google-utils-files/passport-util");
const googleCalenderService = require("./google-utils-files/google-calendar.service");
const googleUtil = require("./google-utils-files/google-utils");
const { google } = require("googleapis");
const { setCookie } = require("./middleware/cookiesdata");
app.get("/", function (req, res) {
  res.send("Hello google calender app hit to /rest/v1/calendar/init/  ");
});
app.get("/rest/v1/calendar/init/", (req, res) => {
  res.redirect(googleUtil.urlGoogle());
});

app.get("/rest/v1/calendar/redirect/", setCookie, (req, res) => {
  // check for valid session
  if (req.session.user) {
    // get oauth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: req.session.user.accessToken,
    });

    // get calendar events by passing oauth2 client
    googleCalenderService.listEvents(oauth2Client, (events) => {
      console.log(events);
      let channels = events;

      if (channels.length) {
        console.log(`You are subscribed to ${channels.length} channels:`);
        channels.forEach((channel) => {
          console.log(
            `${channel.snippet.title} (${channel.snippet.channelId})`
          );
        });
      } else {
        console.log("You are not subscribed to any channels.");
      }
      const data = {
        name: req.session.user.name,
        displayPicture: req.session.user.displayPicture,
        id: req.session.user.id,
        email: req.session.user.email,
        events: events,
      };
      res.status(200).json(data);
      // res.render('dashboard.html', data);
    });
  } else {
    res.redirect("/login");
  }
});

app.listen(5000, () => {
  console.log("runninng");
});
