import { EventEmitter } from "node:events";
import { emailSubject, sendEmail } from "./email.utils.js";
import { template } from "./HTML.template.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("confirmEmail", async (data) => {
  await sendEmail({
    to: data.to,
    subject: emailSubject.confirmEmail,
    html: template(data.otp,data.name),
  }).catch((err) => {
    console.log("error to send email", err);
  });
});
