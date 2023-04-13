const axios = require('axios');

async function getToken(token) {
  const data = {
    grant_type: 'authorization_code',
    code: token,
    client_id: '263251679518-nnq7mtohvg65tpfahigqh73kfourr8eh.apps.googleusercontent.com',
    client_secret: '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',
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
