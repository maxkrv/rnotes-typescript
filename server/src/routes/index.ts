import { Router } from "express";
import authRouter from "./auth.router";
import noteRouter from "./note.router";

const router = Router();

router.get("/", (_, res) => res.sendStatus(200));
router.use("/api", authRouter);
router.use("/api", noteRouter);

export default router;
