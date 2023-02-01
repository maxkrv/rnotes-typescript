import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import CategoryController from "../controllers/category.controller";

const router = express.Router();

router.get("/categories", authMiddleware, CategoryController.getCategories);
router.get(
	"/categories/:id",
	authMiddleware,
	CategoryController.getCategoryById
);
router.post("/categories", authMiddleware, CategoryController.createCategory);
router.put(
	"/categories/:id",
	authMiddleware,
	CategoryController.updateCategoryById
);
router.delete(
	"/categories/:id",
	authMiddleware,
	CategoryController.deleteCategoryById
);

export default router;
