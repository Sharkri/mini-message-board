const express = require("express");
const format = require("date-fns/format");
const isThisYear = require("date-fns/isThisYear");
const isToday = require("date-fns/isToday");

const router = express.Router();

function getFormattedDate(date = new Date()) {
  if (isToday(date)) return `Today at ${format(date, "h:mm a")}`;

  return format(date, `MMM dd,${isThisYear(date) ? "" : " yyyy"} h:mm a`);
}

const messages = [];

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Mini Message Board", messages });
});

router.post("/new", (req, res, next) => {
  const { name, message } = req.body;

  const currentDate = new Date();

  if (name && message) {
    messages.push({
      user: name,
      text: message,
      date: {
        added: currentDate,
        string: getFormattedDate(currentDate),
      },
    });
  }

  res.redirect("/");
});

module.exports = router;
