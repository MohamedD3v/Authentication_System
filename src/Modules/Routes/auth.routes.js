import { Router } from "express";
const router = Router();
import * as authController from "../Controller/auth.controller.js";
import { validation } from "../../Middleware/validation.middleware.js";
import * as validationSchema from "./auth.validation.js";

router.post(
  "/signup",
  validation(validationSchema.signupSchema),
  authController.signup
);
router.post(
  "/login",
  validation(validationSchema.loginSchema),
  authController.login
);
router.patch(
  "/confirm-email",
  validation(validationSchema.confirmEmailSchema),
  authController.confirmEmail
);

export default router;
