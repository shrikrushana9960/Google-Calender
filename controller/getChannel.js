const axios = require("axios");
require("dotenv").config();

const getChannelInfo = async (channelId) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,contentDetails,statistics",
          id: channelId,
          key: process.env.Youtube_API_KEY,
        },
      }
    );

    const channel = response.data.items[0];
    console.log("Channel Title:", channel.snippet.title);
    console.log("Channel Description:", channel.snippet.description);
    console.log(
      "Channel Thumbnail URL:",
      channel.snippet.thumbnails.default.url
    );
    console.log("Total Videos:", channel.statistics.videoCount);
    console.log("Total Subscribers:", channel.statistics.subscriberCount);
    console.log("Total Views:", channel.statistics.viewCount);
    return channel;
   
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getChannelInfo };
