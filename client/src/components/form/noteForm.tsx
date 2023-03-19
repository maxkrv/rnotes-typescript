import React, { FC, HTMLAttributes, useMemo, useState } from "react";
import {
	Button,
	Center,
	FormControl,
	FormLabel,
	Input,
	useColorMode,
	useToast,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note, NoteRequest } from "../../types/Note";
import { notesService } from "../../services/notes.service";
import { Category } from "../../types/Category";
import SelectCategory from "../selectCategory";
import "jodit/build/jodit.min.css";
import dynamic from "next/dynamic";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const JoditReact = dynamic(() => import("jodit-react-ts"), { ssr: false });

interface NoteFormProps extends HTMLAttributes<HTMLDivElement> {
	editNote?: Note;
	onSubmitCallback?: () => void;
}

const formNoteSchema = z
	.object({
		title: z.string(),
		content: z.string(),
	})
	.required({ title: true, message: "This field is required" });
type FormNoteSchemaType = z.infer<typeof formNoteSchema>;

const NoteForm: FC<NoteFormProps> = ({
	editNote,
	onSubmitCallback,
	...props
}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormNoteSchemaType>({
		resolver: zodResolver(formNoteSchema),
	});

	const [selectedCategory, setSelectedCategory] = useState<
		Category | undefined
	>(editNote?.category || undefined);
	const { colorMode } = useColorMode();
	const queryClient = useQueryClient();
	const toast = useToast();

	const createNote = useMutation({
		mutationKey: ["createNote"],
		mutationFn: (data: NoteRequest) => notesService.createNote(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["notes"] });
		},
		onError: (error: any) =>
			toast({
				title: error.response.data.message,
				status: "error",
				isClosable: true,
				duration: 5000,
			}),
	});
	const updateNote = useMutation({
		mutationKey: ["updateNote"],
		mutationFn: (data: NoteRequest) =>
			notesService.updateNoteById(editNote!.id, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["notes"] });
		},
		onError: (error: any) =>
			toast({
				title: error.response.data.message,
				status: "error",
				isClosable: true,
				duration: 5000,
			}),
	});

	const onSubmit: SubmitHandler<FormNoteSchemaType> = (data) => {
		if (editNote) {
			updateNote.mutate({ ...data, categoryId: selectedCategory?.id });
		} else {
			createNote.mutate({ ...data, categoryId: selectedCategory?.id });
		}
		onSubmitCallback?.();
	};

	const config = useMemo(
		() => ({
			readonly: false,
			statusbar: false,
			theme: colorMode === "dark" ? "dark" : "snow",
			tabIndex: 1,
		}),
		[colorMode]
	);

	return (
		<FormControl as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
			<FormLabel mb="0">Title</FormLabel>
			<Controller
				name="title"
				defaultValue={editNote?.title ?? ""}
				control={control}
				render={({ field }) => (
					<Input isInvalid={!!errors.title} required {...field} />
				)}
			/>

			<FormLabel mt="2" mb="0">
				Category
			</FormLabel>
			<SelectCategory
				isHeader={false}
				deleteControl={true}
				editControl={false}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>

			<FormLabel mt="2" mb="0">
				Content
			</FormLabel>
			<Controller
				name="content"
				control={control}
				render={({ field }) => (
					<JoditReact
						defaultValue={editNote?.content ?? ""}
						config={config}
						{...field}
					/>
				)}
			/>

			<Center>
				<Button
					isLoading={createNote.isLoading || updateNote.isLoading}
					mt="2"
					type="submit"
				>
					Submit
				</Button>
			</Center>
		</FormControl>
	);
};

export default NoteForm;
