import express from "express";
import AuthController from "../controllers/auth.controller";
import { body } from "express-validator";

const router = express.Router();

router.post(
	"/register",
	body("email").isEmail(),
	body("password").isString().isLength({ min: 6 }),
	AuthController.register
);
router.post(
	"/login",
	body("email").isEmail(),
	body("password").isString().isLength({ min: 6 }),
	AuthController.login
);
router.post("/logout", AuthController.logout);
router.get("/activate/:link", AuthController.activate);
router.get("/refresh", AuthController.refresh);

export default router;
