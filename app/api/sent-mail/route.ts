import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } =
    process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    console.error("Missing Google OAuth environment variables");
    return NextResponse.json(
      { message: "Server configuration error: Missing API credentials." },
      { status: 500 }
    );
  }

  const body = await req.json();
  console.log("API route hit:", body); // Debug log

  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "itsanvert@gmail.com",
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "itsanvert@gmail.com",
      subject: subject || "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject || "N/A"}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: String(error) },
      { status: 500 }
    );
  }
}
