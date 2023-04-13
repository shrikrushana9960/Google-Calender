const axios = require('axios');
require("dotenv").config();


async function getToken(token) {

  const data = {
    grant_type: 'authorization_code',
    code: token,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: 'http://localhost:3000/redirect'
  };

  try {
    const response = await axios.post('https://accounts.google.com/o/oauth2/token', data);
    // Handle the response
    return(response.data);
  } catch (error) {
    // Handle the error
    return(error);
  }
}
module.exports={getToken}

getToken();
