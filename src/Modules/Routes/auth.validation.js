import joi from "joi";
import { generalField } from "../../Middleware/validation.middleware.js";

export const signupSchema = {
  body: joi.object({
    name: generalField.name.required(),
    email: generalField.email.required(),
    password: generalField.password.required(),
    passwordConfirm: generalField.passwordConfirm,
  }),
};

export const loginSchema = {
  body: joi.object({
    email: generalField.email.required(),
    password: generalField.password.required(),
  }),
};

export const confirmEmailSchema = {
  body: joi.object({
    email: generalField.email.required(),
    otp: generalField.otp.required(),
  }),
};
