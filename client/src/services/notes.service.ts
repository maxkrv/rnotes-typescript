import api from "./api";
import { Note, NoteRequest } from "../types/Note";

export const notesService = {
	getNotes: async () => {
		const response = await api.get<Note[]>("/notes");
		return response.data;
	},
	getNoteById: async (id: number) => {
		const response = await api.get<Note>(`/notes/${id}`);
		return response.data;
	},
	createNote: async (note: NoteRequest) => {
		const response = await api.post<Note>("/notes", note);
		return response.data;
	},
	updateNoteById: async (id: number, note: NoteRequest) => {
		const response = await api.put<Note>(`/notes/${id}`, note);
		return response.data;
	},
	deleteNoteById: async (id: number) => {
		const response = await api.delete<Note>(`/notes/${id}`);
		return response.data;
	},
};
