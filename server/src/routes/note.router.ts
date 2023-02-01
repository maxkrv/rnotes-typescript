import express from "express";
import NoteController from "../controllers/note.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get("/notes", authMiddleware, NoteController.getNotes);
router.get("/notes/:id", authMiddleware, NoteController.getNoteById);
router.post("/notes", authMiddleware, NoteController.createNote);
router.put("/notes/:id", authMiddleware, NoteController.updateNote);
router.delete("/notes/:id", authMiddleware, NoteController.deleteNoteById);

export default router;
