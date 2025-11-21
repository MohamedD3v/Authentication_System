import nodemailer from "nodemailer";

export async function sendEmail({
  to = "",
  subject = "",
  text = "",
  html = "",
  attachments = [],
  cc = "",
  bcc = "",
}) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: `"Authentication System" <${process.env.EMAIL_SENDER}>`,
    to,
    subject,
    text,
    html,
    attachments,
    cc,
    bcc,
  });
  console.log("message Sent ==>" ,info.messageId );
  
}


export const emailSubject = {
    confirmEmail:"Confirm Your Account",
    welcomeMessage:"Welcome in authentication-System"
}