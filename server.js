const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

/* ---------------- BASIC ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("✅ Discipline System is running");
});

/* ---------------- MAIL TRANSPORTER ---------------- */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

/* ---------------- MESSAGE ---------------- */
const PURPOSE_MESSAGE = `
💰 Money brings freedom. With a job, you can buy what you need without fear.
🚀 Show people what you are capable of. Results will speak.
🎯 Target: Get a job in 21 days with a minimum ₹8 LPA package.
🌱 Open source daily. Learn at least ONE new thing today.
💪 Discipline beats motivation. No zero days.

🕉️ GANESH MANTRA — DAILY (21 DAYS)

ॐ गं गणपतये विघ्न विनाशिने स्वाहा
Om Gam Ganapataye Vighna Vinashine Swaha

Chant 108 times with focus.
Faith + discipline + action.
`;

/* ---------------- TRIGGER ROUTE (CALLED BY GITHUB ACTIONS) ---------------- */
app.get("/send-mail", async (req, res) => {
  // 🔐 Security check
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(403).send("❌ Forbidden");
  }

  try {
    await transporter.sendMail({
      from: `Discipline System 💪 <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "⏰ PURPOSE + GANESH MANTRA",
      text: PURPOSE_MESSAGE,
    });

    console.log("✅ Discipline mail sent");
    res.send("✅ Mail sent successfully");
  } catch (error) {
    console.error("❌ Mail error:", error);
    res.status(500).send("❌ Mail failed");
  }
});


/* ---------------- START SERVER ---------------- */
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
