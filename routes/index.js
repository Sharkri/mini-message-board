const express = require("express");
const Message = require("../models/message");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const messages = await Message.find().sort({ "date.added": 1 });

  res.render("index", {
    title: "Mini Message Board",
    messages,
  });
});

router.post("/new", (req, res, next) => {
  const { name, message: messageText } = req.body;

  const message = new Message({
    author: name,
    messageText,
    date: { added: new Date() },
  });

  message.save();

  res.redirect("/");
});

module.exports = router;
