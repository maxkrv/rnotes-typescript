import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import TodoController from "../controllers/todo.controller";

const router = express.Router();

router.get("/todos", authMiddleware, TodoController.getTodos);
router.get("/todos/:id", authMiddleware, TodoController.getTodoById);
router.post("/todos", authMiddleware, TodoController.createTodo);
router.put("/todos/:id", authMiddleware, TodoController.updateTodoById);
router.delete("/todos/:id", authMiddleware, TodoController.deleteTodoById);

export default router;
