const express = require("express");

const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Mini Message Board", messages });
});

router.post("/new", (req, res, next) => {
  const { name, message } = req.body;

  messages.push({ user: name, text: message, added: new Date() });

  res.redirect("/");
});

module.exports = router;
