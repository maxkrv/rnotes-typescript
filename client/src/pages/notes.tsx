import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import AppHeader from "../components/appHeader";
import {
	Box,
	Button,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useAppSelector } from "../hooks/redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notesService } from "../services/notes.service";
import Scrollbars from "react-custom-scrollbars-2";
import { Note } from "../types/Note";
import NoteForm from "../components/form/noteForm";
import { MdDelete } from "react-icons/md";
import { formatDate } from "../utils/formateDate";
import { useRouter } from "next/router";

const Notes: NextPage = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const user = useAppSelector((state) => state.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const bg = useColorModeValue("gray.400", "gray.600");

	const selectedCategory = useAppSelector(
		(state) => state.category.selectedCategory
	);
	const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);

	const notes = useQuery({
		queryKey: ["notes"],
		queryFn: () => notesService.getNotes(),
		select: (data) => {
			if (selectedCategory) {
				return data.filter((note) => note.category?.id === selectedCategory.id);
			}

			return data;
		},
	});
	const deleteNote = useMutation({
		mutationKey: ["deleteNote"],
		mutationFn: (id: number) => notesService.deleteNoteById(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["notes"]);
		},
	});

	const deleteNoteHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
		id: number
	) => {
		event.stopPropagation();
		deleteNote.mutate(id);
	};
	const selectNoteHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
		note: Note
	) => {
		event.stopPropagation();
		setSelectedNote(note);
		onOpen();
	};
	const closeNoteFormHandler = () => {
		setSelectedNote(undefined);
		onClose();
	};

	useEffect(() => {
		if (user.isAuth === false && typeof window !== "undefined") {
			router.push("/");
		}
	}, [router, user.isAuth]);

	return (
		<>
			<AppHeader formAction="note" style={{ marginBottom: "10px" }} />

			<Scrollbars universal style={{ height: "calc(100% - 50px)" }}>
				<Stack>
					{notes.isLoading && (
						<>
							{[...Array(5)].map((_, index) => (
								<Skeleton key={index} height="60px" />
							))}
						</>
					)}
					{!notes.isLoading && !notes.data?.length ? (
						<Text textAlign="center">
							You don&apos;t have any notes. <br /> Create one by clicking on
							the button above.
						</Text>
					) : (
						notes.data?.map((note) => (
							<Button
								justifyContent="space-between"
								py="30px"
								bg={note.category?.color ?? bg}
								onClick={(event) => selectNoteHandler(event, note)}
								key={note.id}
							>
								<Box textAlign="left">
									<Box fontSize="xl">{note.title}</Box>
									<Box fontSize="sm">{formatDate(note.createdAt)}</Box>
								</Box>

								<Button
									rounded="full"
									p="0"
									aria-label="Delete note"
									onClick={(event) => deleteNoteHandler(event, note.id)}
								>
									<MdDelete />
								</Button>
							</Button>
						))
					)}
				</Stack>
			</Scrollbars>

			<Modal isCentered isOpen={isOpen} onClose={closeNoteFormHandler}>
				<ModalOverlay />
				<ModalContent px="2" pb="4" mx="10px">
					<ModalHeader>Create new note</ModalHeader>
					<ModalCloseButton />

					<NoteForm
						editNote={selectedNote}
						onSubmitCallback={closeNoteFormHandler}
					/>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Notes;
