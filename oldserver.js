import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

app.post("/api/verify-email", async (req, res) => {
  const { email } = req.body;

  // Ensure email is valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Use nodemailer to send verification email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "prabanjanbluestacks@gmail.com",
      pass: "your-email-password",
    },
  });

  try {
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Email Verification",
      text: "Please confirm your email by clicking the verification link.",
    });
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
