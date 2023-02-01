export interface CategoryRequest {
	name: string;
	color: string;
	userId: number;
}

export interface CategoryRequestWithId extends CategoryRequest {
	id: number;
}
