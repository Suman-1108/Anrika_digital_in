import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, description } = body;

    // Validate required fields
    if (!name || !email || !service || !description) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Service, and Description)." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Generate unique inquiry confirmation code
    const inquiryCode = `ADI-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Your inquiry has been received by ANRIKA DIGITAL INNOVATION creative directors.",
      inquiryCode,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your inquiry." },
      { status: 500 }
    );
  }
}

