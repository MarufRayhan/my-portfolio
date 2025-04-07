import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // Parse the request body
    const { email, subject, message } = await req.json();

    // Validate input
    if (!email || !subject || !message) {
      return Response.json(
        { error: "Email, subject, and message are required" },
        { status: 400 }
      );
    }

    // Send email using Resend with inline JSX
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Contact Form <onboarding@resend.dev>",
      to: [process.env.TO_EMAIL || email],
      subject: subject,
      react: (
        <div>
          <h1>{subject}</h1>
          <p>Message from your portfolio</p>
          <p>{message}</p>
          <hr />
          <p>Reply to: {email}</p>
        </div>
      ),
    });

    // Handle Resend API errors
    if (error) {
      console.error("Resend API error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
