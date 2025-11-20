import { Router } from "express";
const router = Router();
import * as userController from "../Controller/user.controller.js";
import { isAuthenticated } from "../../Middleware/auth.middleware.js";

router.get("/profile", isAuthenticated,  userController.profile);
router.post("/revoke-token", isAuthenticated,  userController.logout);

export default router;
