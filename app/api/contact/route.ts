import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import ContactModel from "@/app/models/contact";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create new contact instance
    const newContact = new ContactModel({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });

    // Save to MongoDB
    await newContact.save();

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}