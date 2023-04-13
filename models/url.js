const mongoose = require("mongoose");
const urlsModel = new mongoose.Schema(
  {
    channel_id: {
      type: String,
    },
    uuid:String,
    url:String,
  },
  {
    timestamps: true,
  },
  { strict: false }
);

const urlmodel = mongoose.model("urls", urlsModel);
module.exports = urlmodel;
