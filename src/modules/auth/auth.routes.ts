import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router: Router = Router();
const authController = new AuthController(new AuthService());


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/profile",authMiddleware, authController.profile);

export default router;
