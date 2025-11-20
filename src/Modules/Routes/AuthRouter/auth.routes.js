import { Router } from "express";
const router = Router();
import * as authController from "../../Controller/AuthController/auth.controller.js";

router.post("/signup", authController.signup);

export default router;
