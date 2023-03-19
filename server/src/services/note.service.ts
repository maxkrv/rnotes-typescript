import { prisma } from "../utils/prisma";
import { NoteRequest, NoteRequestWithId } from "../interfaces/note.interface";
import { HttpException } from "../exceptions/HttpExeption";

class NoteService {
	public async getNotes(userId: number) {
		return prisma.note.findMany({
			where: {
				userId,
			},
			include: {
				category: true,
			},
		});
	}

	public async getNoteById(id: number, userId: number) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				notes: true,
			},
		});
		if (user?.notes.some((note) => note.id === id)) {
			return prisma.note.findUnique({
				where: {
					id,
				},
				include: {
					category: true,
				},
			});
		} else {
			throw new HttpException(404, "Note not found");
		}
	}

	public async createNote({ title, content, categoryId, userId }: NoteRequest) {
		if (categoryId) {
			return prisma.note.create({
				data: {
					title,
					content,
					category: {
						connect: {
							id: categoryId,
						},
					},
					user: {
						connect: {
							id: userId,
						},
					},
				},
				include: {
					category: true,
				},
			});
		} else {
			return prisma.note.create({
				data: {
					title,
					content,
					user: {
						connect: {
							id: userId,
						},
					},
				},
				include: {
					category: true,
				},
			});
		}
	}

	public async updateNoteById({
		id,
		title,
		content,
		categoryId,
		userId,
	}: NoteRequestWithId) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				notes: true,
			},
		});

		if (user?.notes.some((note) => note.id === id)) {
			if (categoryId) {
				return prisma.note.update({
					where: {
						id,
					},
					data: {
						title,
						content,
						category: {
							connect: {
								id: categoryId,
							},
						},
					},
					include: {
						category: true,
					},
				});
			} else {
				return prisma.note.update({
					where: {
						id,
					},
					data: {
						title,
						content,
						category: {
							disconnect: true,
						},
					},
					include: {
						category: true,
					},
				});
			}
		} else {
			throw new HttpException(404, "Note not found");
		}
	}

	public async deleteNoteById(id: number, userId: number) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				notes: true,
			},
		});
		if (user?.notes.some((note) => note.id === id)) {
			return prisma.note.delete({
				where: {
					id,
				},
			});
		} else {
			throw new HttpException(404, "Note not found");
		}
	}
}

export default new NoteService();
