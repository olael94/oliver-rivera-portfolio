import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name?.trim() || !message?.trim() || !/\S+@\S+\.\S+/.test(email ?? '')) {
    return Response.json(
      { error: 'Please fill out all fields with a valid email.' },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name} via portfolio`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, '<br />')}</p>`,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
