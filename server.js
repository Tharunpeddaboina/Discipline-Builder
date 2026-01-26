const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("welcome to discipline system");
});

// 📧 MAIL TRANSPORTER (Render env vars)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔥 PURPOSE + GANESH MANTRA (COMBINED)
const PURPOSE_MESSAGE = `
💰 Money brings freedom. With a job, you can buy what you need without fear,paybill
🚀 Show people what you are capable of. Results will speak,
🎯 Target: Get a job in 21 days with a minimum ₹8 LPA package,
🌱 Open source daily. Learn at least ONE new thing today,
💪 Discipline beats motivation. No zero days.

🕉️ GANESH MANTRA — DAILY (21 DAYS)

ॐ गं गणपतये विघ्न विनाशिने स्वाहा
Om Gam Ganapataye Vighna Vinashine Swaha

Chant 108 times with focus.
Faith + discipline + action.
`;
app.get("/send-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: `Discipline System 💪 <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "⏰ PURPOSE + GANESH MANTRA (21 DAYS)",
      text: PURPOSE_MESSAGE,
    });

    console.log("✅ Purpose + mantra mail sent");
    res.status(200).json({ message: "✅ Mail sent successfully" });
  } catch (err) {
    console.error("❌ Mail error:", err);
    res.status(500).json({ message: "❌ Mail failed", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ server started at ${port} port`);
});