const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema({
  author: { type: String, required: true },
  messageText: { type: String, required: true },
  date: {
    added: { type: Date, required: true },
  },
});

MessageSchema.virtual("date.string").get(function getDateString() {
  return this.date.added.toLocaleString();
});

module.exports = mongoose.model("Message", MessageSchema);
