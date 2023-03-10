import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import CategoryController from "../controllers/category.controller";
import activateMiddleware from "../middleware/activate.middleware";

const router = express.Router();

router.get("/categories", authMiddleware, CategoryController.getCategories);
router.get(
	"/categories/:id",
	authMiddleware,
	activateMiddleware,
	CategoryController.getCategoryById,
);
router.post("/categories", authMiddleware, activateMiddleware, CategoryController.createCategory);
router.put(
	"/categories/:id",
	authMiddleware,
	activateMiddleware,
	CategoryController.updateCategoryById,
);
router.delete(
	"/categories/:id",
	authMiddleware,
	activateMiddleware,
	CategoryController.deleteCategoryById,
);

export default router;
