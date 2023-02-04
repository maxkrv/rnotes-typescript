import { DefaultFields } from "./DefaultFields";
import { Category } from "./Category";

export interface Note extends DefaultFields {
	title: string;
	content: string;
	category: Category | null;
	categoryID?: number | null;
}

export interface NoteRequest {
	title: string;
	content: string;
	categoryID?: number;
}
