const { google } = require("googleapis");

require("dotenv").config();

// google app config
const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: "http://localhost:3000/redirect",
};

// scopes use for the application
const defaultScope = [
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/youtube.readonly",
  "profile",
  "email",
];

// oauth2 client
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

// generate authentication url
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
}

// get auth url
module.exports.urlGoogle = function () {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

// get oauth2 api
function getOAuth2(auth) {
  return google.oauth2({
    auth: auth,
    version: "v2",
  });
}

module.exports.getGoogleAccountFromCode = async function (code) {
  try {
    const auth = createConnection();
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);
    const user = await getOAuth2(auth);
    const { data } = await user.userinfo.get();
    const userProfile = {
      id: data.id,
      accessToken: tokens.access_token,
      refresh_token:tokens.refresh_token,
      name: data.name,
      displayPicture: data.picture,
      email: data.email,
    };
    return userProfile;
  } catch (err) {
    throw err;
  }
};
module.exports.getAccountFromCode = async function (code,tokens) {
  try {
    const auth = createConnection();
    
    auth.setCredentials(tokens);
    const user = await getOAuth2(auth);
    const { data } = await user.userinfo.get();
    const userProfile = {
      id: data.id,
      accessToken: tokens.access_token,
      refresh_token:tokens.refresh_token,
      name: data.name,
      displayPicture: data.picture,
      email: data.email,
    };
    return userProfile;
  } catch (err) {
    throw err;
  }
};

