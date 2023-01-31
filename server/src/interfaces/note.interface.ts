export interface NoteRequest {
	title: string;
	content: string;
	categoryId: number | null | undefined;
	userId: number;
}

export interface NoteRequestWithId extends NoteRequest {
	id: number;
}
