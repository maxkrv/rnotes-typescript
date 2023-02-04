import { DefaultFields } from "./DefaultFields";

export interface Category extends DefaultFields {
	name: string;
	color: string;
}

export interface CategoryRequest {
	name: string;
	color: string;
}
