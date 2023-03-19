import React, { FC, HTMLAttributes, useState } from "react";
import {
	Button,
	Center,
	FormControl,
	FormLabel,
	Input,
	useToast,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SelectCategory from "../selectCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Todo, TodoRequest } from "../../types/Todo";
import { Category } from "../../types/Category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../../services/todo.service";

interface TodoFormProps extends HTMLAttributes<HTMLDivElement> {
	editTodo?: Todo;
	onSubmitCallback?: () => void;
}

const formTodoSchema = z
	.object({
		title: z.string(),
	})
	.required({ title: true, message: "This field is required" });
type FormTodoSchemaType = z.infer<typeof formTodoSchema>;

const TodoForm: FC<TodoFormProps> = ({
	editTodo,
	onSubmitCallback,
	...props
}) => {
	const queryClient = useQueryClient();
	const toast = useToast();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormTodoSchemaType>({
		resolver: zodResolver(formTodoSchema),
	});

	const [selectedCategory, setSelectedCategory] = useState<
		Category | undefined
	>(editTodo?.category || undefined);

	const createTodo = useMutation({
		mutationKey: ["createTodo"],
		mutationFn: (todo: TodoRequest) => todoService.createTodo(todo),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["todos"]);
		},
		onError: (error: any) => {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});
	const updateTodo = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: (todo: TodoRequest) =>
			todoService.updateTodoById(editTodo!.id, todo),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["todos"]);
		},
		onError: (error: any) => {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		},
	});

	const onSubmit: SubmitHandler<FormTodoSchemaType> = (data) => {
		if (editTodo) {
			updateTodo.mutate({
				...data,
				isDone: editTodo.isDone,
				categoryId: selectedCategory?.id,
			});
		} else {
			createTodo.mutate({
				...data,
				isDone: false,
				categoryId: selectedCategory?.id,
			});
		}
		onSubmitCallback?.();
	};

	return (
		<FormControl as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
			<FormLabel mb="0">Title</FormLabel>
			<Controller
				name="title"
				defaultValue={editTodo?.title ?? ""}
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

			<Center>
				<Button
					mt="2"
					type="submit"
					isLoading={createTodo.isLoading || updateTodo.isLoading}
				>
					Submit
				</Button>
			</Center>
		</FormControl>
	);
};

export default TodoForm;
