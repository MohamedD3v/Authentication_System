import { Router } from "express";
const router = Router();
import * as authController from "../Controller/auth.controller.js";

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/confirm-email",authController.confirmEmail);


export default router;
