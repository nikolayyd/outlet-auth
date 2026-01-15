import nodemailer from 'nodemailer';

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // по-добре с малки букви
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const info = await transporter.sendMail({
      from: `"Outlet auth" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
