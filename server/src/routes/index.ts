import { Router } from "express";
import authRouter from "./auth.router";
import noteRouter from "./note.router";
import todoRouter from "./todo.router";
import categoryRouter from "./category.router";

const router = Router();

router.get("/", (_, res) => res.sendStatus(200));
router.use("/api", authRouter);
router.use("/api", noteRouter);
router.use("/api", todoRouter);
router.use("/api", categoryRouter);

export default router;
