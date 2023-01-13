import { Router } from "express";
import authRouter from "./auth.router";

const router = Router();

router.get("/", (_, res) => res.sendStatus(200));
router.use("/api", authRouter);

export default router;
