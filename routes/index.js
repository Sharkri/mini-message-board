const express = require("express");
const format = require("date-fns/format");
const isThisYear = require("date-fns/isThisYear");
const isToday = require("date-fns/isToday");

const router = express.Router();

function convertDateToLocal(date) {
  return new Date(new Date(date).toLocaleString());
}

function getFormattedDate(date) {
  if (isToday(date)) return `Today at ${format(date, "h:mm a")}`;

  return format(date, `MMM dd,${isThisYear(date) ? "" : " yyyy"} h:mm a`);
}

const messages = [];

/* GET home page. */
router.get("/", (req, res, next) => {
  const localTimeMessages = messages.map((msg) => ({
    ...msg,
    date: {
      ...msg.date,
      string: getFormattedDate(convertDateToLocal(msg.date.added)),
    },
  }));

  res.render("index", {
    title: "Mini Message Board",
    messages: localTimeMessages,
  });
});

router.post("/new", (req, res, next) => {
  const { name, message } = req.body;

  const currentDate = Date.now();

  if (name && message) {
    messages.push({
      user: name,
      text: message,
      date: {
        added: currentDate,
      },
    });
  }

  res.redirect("/");
});

module.exports = router;
