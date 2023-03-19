import React, { FC, HTMLAttributes } from "react";
import {
	Button,
	Flex,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import SelectCategory from "./selectCategory";
import NoteForm from "./form/noteForm";
import { useAppSelector } from "../hooks/redux";
import TodoForm from "./form/todoForm";

interface AppHeaderProps extends HTMLAttributes<HTMLDivElement> {
	formAction: "note" | "todo";
}

const AppHeader: FC<AppHeaderProps> = ({ formAction, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const category = useAppSelector((state) => state.category.selectedCategory);

	return (
		<Flex justifyContent="space-between" {...props}>
			<SelectCategory selectedCategory={category} />

			<Button colorScheme="green" onClick={onOpen}>
				New {formAction}
			</Button>

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent px="2" pb="4" mx="10px">
					<ModalHeader>Create new {formAction}</ModalHeader>
					<ModalCloseButton />

					{formAction === "note" && <NoteForm onSubmitCallback={onClose} />}
					{formAction === "todo" && <TodoForm onSubmitCallback={onClose} />}
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default AppHeader;
