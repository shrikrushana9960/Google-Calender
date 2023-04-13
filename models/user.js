const mongoose = require("mongoose");
const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    access_token:String,
    expires_in:String,
    id_token:String,
    refresh_token:String,
    scope:String,
    token_type:String,
   
  },
  {
    timestamps: true,
  },
  { strict: false }
);

const User = mongoose.model("users", userModel);
module.exports = User;
