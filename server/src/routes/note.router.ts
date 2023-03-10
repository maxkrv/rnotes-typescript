import express from "express";
import NoteController from "../controllers/note.controller";
import authMiddleware from "../middleware/auth.middleware";
import activateMiddleware from "../middleware/activate.middleware";

const router = express.Router();

router.get(
	"/notes",
	authMiddleware,
	activateMiddleware,
	NoteController.getNotes
);
router.get(
	"/notes/:id",
	authMiddleware,
	activateMiddleware,
	NoteController.getNoteById
);
router.post(
	"/notes",
	authMiddleware,
	activateMiddleware,
	NoteController.createNote
);
router.put(
	"/notes/:id",
	authMiddleware,
	activateMiddleware,
	NoteController.updateNoteById
);
router.delete(
	"/notes/:id",
	authMiddleware,
	activateMiddleware,
	NoteController.deleteNoteById
);

export default router;
