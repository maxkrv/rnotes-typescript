export interface TodoRequest {
	title: string;
	isDone: boolean;
	categoryId: number | null | undefined;
	userId: number;
}

export interface TodoRequestWithId extends TodoRequest {
	id: number;
}
