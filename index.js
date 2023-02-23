const express = require("express");
const app = express();

const passport = require("./passport-util");
const googleCalenderService = require("./google-calendar.service");
const googleUtil = require("./google-utils");
const { google } = require("googleapis");
const { setCookie } = require("./cookiesdata");
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get(
  "/rest/v1/calendar/init/",(req, res) => {
    res.redirect(googleUtil.urlGoogle());
}
);

app.get("/rest/v1/calendar/redirect/",setCookie, (req, res) => {
  // check for valid session
  if (req.session.user) {

    // get oauth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: req.session.user.accessToken
    });

    // get calendar events by passing oauth2 client
    googleCalenderService.listEvents(oauth2Client, (events) => {  
        console.log(events);
                  
        const data = {
            name: req.session.user.name,
            displayPicture: req.session.user.displayPicture,
            id: req.session.user.id,
            email: req.session.user.email,
            events: events
        }
        res.status(200).json(data)
        // res.render('dashboard.html', data);
    });
    
} else {
    res.redirect('/login')
}
});

app.listen(5000, () => {
  console.log("runninng");
});
