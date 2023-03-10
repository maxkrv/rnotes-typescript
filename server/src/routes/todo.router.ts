import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import TodoController from "../controllers/todo.controller";
import activateMiddleware from "../middleware/activate.middleware";

const router = express.Router();

router.get(
	"/todos",
	authMiddleware,
	activateMiddleware,
	TodoController.getTodos
);
router.get(
	"/todos/:id",
	authMiddleware,
	activateMiddleware,
	TodoController.getTodoById
);
router.post(
	"/todos",
	authMiddleware,
	activateMiddleware,
	TodoController.createTodo
);
router.put(
	"/todos/:id",
	authMiddleware,
	activateMiddleware,
	TodoController.updateTodoById
);
router.delete(
	"/todos/:id",
	authMiddleware,
	activateMiddleware,
	TodoController.deleteTodoById
);

export default router;
