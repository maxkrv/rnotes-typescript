import { NextFunction, Request, Response } from "express";
import NoteService from "../services/note.service";
import { NoteRequest, NoteRequestWithId } from "../interfaces/note.interface";
import TokenService from "../services/token.service";
import { User } from "@prisma/client";

class NoteController {
	public async getNotes(req: Request, res: Response, next: NextFunction) {
		try {
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const notes = await NoteService.getNotes(user?.id as number);
			res.json(notes);
		} catch (error) {
			next(error);
		}
	}

	public async getNoteById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const note = await NoteService.getNoteById(id, user?.id as number);
			res.json(note);
		} catch (error) {
			next(error);
		}
	}

	public async createNote(
		req: Request<{}, {}, NoteRequest>,
		res: Response,
		next: NextFunction
	) {
		try {
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const note = await NoteService.createNote({
				...req.body,
				userId: user?.id as number,
			});
			res.json(note);
		} catch (error) {
			next(error);
		}
	}

	public async updateNoteById(
		req: Request<any, {}, NoteRequestWithId>,
		res: Response,
		next: NextFunction
	) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const note = await NoteService.updateNoteById({
				...req.body,
				userId: user?.id as number,
				id: id,
			});
			res.json(note);
		} catch (error) {
			next(error);
		}
	}

	public async deleteNoteById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = parseInt(req.params.id);
			const Authorization = req.header("Authorization")?.split("Bearer ")[1];
			const user = TokenService.validateAccessToken<User>(
				Authorization as string
			);

			const note = await NoteService.deleteNoteById(id, user?.id as number);
			res.json(note);
		} catch (error) {
			next(error);
		}
	}
}

export default new NoteController();
