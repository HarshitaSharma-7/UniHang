const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

  text: String,

  sender: String,

  planId: String

}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);