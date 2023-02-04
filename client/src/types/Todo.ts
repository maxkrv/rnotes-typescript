import { Category } from "./Category";
import { DefaultFields } from "./DefaultFields";

export interface Todo extends DefaultFields {
	title: string;
	isDone: boolean;
	category: Category | null;
	categoryID?: number | null;
}

export interface TodoRequest {
	title: string;
	isDone: boolean;
	categoryId?: number | null;
}
