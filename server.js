const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Discipline system running");
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/send-mail", async (req, res) => {
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(403).send("Forbidden");
  }

  await transporter.sendMail({
    from: `Discipline System <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "Discipline Reminder",
    text: "Stay disciplined. No zero days.",
  });

  res.send("Mail sent");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
