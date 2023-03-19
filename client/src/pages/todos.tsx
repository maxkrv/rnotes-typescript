import React, { useState } from "react";
import { NextPage } from "next";
import AppHeader from "../components/appHeader";
import {
	Box,
	Button,
	Flex,
	IconButton,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import Scrollbars from "react-custom-scrollbars-2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todo.service";
import { formatDate } from "../utils/formateDate";
import { Todo } from "../types/Todo";
import { MdDelete, MdDone } from "react-icons/md";
import TodoForm from "../components/form/todoForm";

const Todos: NextPage = () => {
	const queryClient = useQueryClient();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const bg = useColorModeValue("gray.400", "gray.600");

	const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);

	const todos = useQuery({
		queryKey: ["todos"],
		queryFn: () => todoService.getTodos(),
	});
	const updateTodo = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: (todo: Todo) => todoService.updateTodoById(todo.id, todo),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["todos"]);
		},
	});
	const deleteTodo = useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: (id: number) => todoService.deleteTodoById(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries(["todos"]);
		},
	});

	const selectTodoHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
		todo: Todo
	) => {
		event.stopPropagation();
		setSelectedTodo(todo);
		onOpen();
	};
	const updateTodoHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
		todo: Todo
	) => {
		event.stopPropagation();
		updateTodo.mutate(todo);
	};
	const deleteTodoHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
		id: number
	) => {
		event.stopPropagation();
		deleteTodo.mutate(id);
	};
	const closeTodoFormHandler = () => {
		setSelectedTodo(undefined);
		onClose();
	};

	return (
		<>
			<AppHeader formAction="todo" style={{ marginBottom: "10px" }} />

			<Scrollbars universal style={{ height: "calc(100% - 50px)" }}>
				<Stack>
					{!todos.data?.length ? (
						<Text textAlign="center">
							You don&apos;t have any to-dos. <br /> Create one by clicking on
							the button above.
						</Text>
					) : (
						todos.data?.map((todo) => (
							<Button
								justifyContent="space-between"
								py="30px"
								bg={todo.category?.color ?? bg}
								onClick={(event) => selectTodoHandler(event, todo)}
								key={todo.id}
							>
								<Flex
									textAlign="left"
									gap="5px"
									alignItems="center"
									justifyContent="center"
								>
									<IconButton
										aria-label={`change todo status to ${
											todo.isDone ? "not done" : "done"
										}`}
										onClick={(event) =>
											updateTodoHandler(event, {
												...todo,
												isDone: !todo.isDone,
											})
										}
									>
										{todo.isDone && <MdDone />}
									</IconButton>
									<Box>
										<Box fontSize="xl">{todo.title}</Box>
										<Box fontSize="sm">{formatDate(todo.createdAt)}</Box>
									</Box>
								</Flex>

								<Button
									rounded="full"
									p="0"
									aria-label="Delete note"
									onClick={(event) => deleteTodoHandler(event, todo.id)}
								>
									<MdDelete />
								</Button>
							</Button>
						))
					)}
				</Stack>
			</Scrollbars>

			<Modal isCentered isOpen={isOpen} onClose={closeTodoFormHandler}>
				<ModalOverlay />
				<ModalContent px="2" pb="4" mx="10px">
					<ModalHeader>Create new note</ModalHeader>
					<ModalCloseButton />

					<TodoForm
						editTodo={selectedTodo}
						onSubmitCallback={closeTodoFormHandler}
					/>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Todos;
