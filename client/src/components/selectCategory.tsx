import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	useColorModeValue,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { RxTriangleDown } from "react-icons/rx";
import Scrollbars from "react-custom-scrollbars-2";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { Category } from "../types/Category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";
import CategoryForm from "./form/categoryForm";
import { useAppDispatch } from "../hooks/redux";
import { setCategory } from "../store/reducers/category.slice";

interface SelectCategoryProps extends HTMLAttributes<HTMLDivElement> {
	isHeader?: boolean;
	showSelectedCategory?: boolean;
	deleteControl?: boolean;
	editControl?: boolean;
	selectedCategory?: Category | undefined;
	// eslint-disable-next-line no-unused-vars
	setSelectedCategory?: (category: Category | undefined) => void;
}

const SelectCategory: FC<SelectCategoryProps> = ({
	isHeader = true,
	deleteControl = true,
	editControl = true,
	selectedCategory,
	setSelectedCategory,
	...props
}) => {
	const bg = useColorModeValue("gray.300", "gray.600");
	const border = useColorModeValue("gray.700", "gray.500");
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const toast = useToast();
	const {
		isOpen: isPopoverOpen,
		onClose: onPopoverClose,
		onToggle: onPopoverToggle,
	} = useDisclosure();
	const {
		isOpen: isModalOpen,
		onClose: onModalClose,
		onToggle: onModalToggle,
	} = useDisclosure();

	const [editCategory, setEditCategory] = useState<Category | undefined>(
		undefined
	);

	const categories = useQuery({
		queryKey: ["categories"],
		queryFn: () => categoryService.getCategories(),
		onError: (error: any) =>
			toast({
				title: error.response.data.message,
				status: "error",
				isClosable: true,
				duration: 5000,
			}),
	});
	const deleteCategory = useMutation({
		mutationKey: ["deleteCategory"],
		mutationFn: (id: number) => categoryService.deleteCategoryById(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["categories"] });
			await queryClient.invalidateQueries({ queryKey: ["notes"] });
			await queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error: any) =>
			toast({
				title: error.response.data.message,
				status: "error",
				isClosable: true,
				duration: 5000,
			}),
	});

	const selectCategoryHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
		category: Category | undefined
	) => {
		event.stopPropagation();
		if (setSelectedCategory) {
			setSelectedCategory(category);
		} else {
			dispatch(setCategory(category));
		}
		onPopoverClose();
	};
	const editCategoryHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
		category: Category
	) => {
		event.stopPropagation();
		setEditCategory(category);
		onModalToggle();
	};
	const deleteCategoryHandler = (
		event: React.MouseEvent<HTMLButtonElement>,
		categoryId: number
	) => {
		event.stopPropagation();
		if (selectedCategory?.id === categoryId) {
			if (setSelectedCategory) {
				setSelectedCategory(undefined);
			} else {
				dispatch(setCategory(undefined));
			}
		}
		deleteCategory.mutate(categoryId);
	};
	const closeModal = () => {
		onModalClose();
		setEditCategory(undefined);
	};

	useEffect(() => {
		const tempSelectedCategory = categories.data?.find(
			(category) => category.id === selectedCategory?.id
		);
		if (setSelectedCategory) {
			setSelectedCategory(tempSelectedCategory);
		} else {
			dispatch(setCategory(tempSelectedCategory));
		}
	}, [categories.data, selectedCategory?.id, setSelectedCategory, dispatch]);

	return (
		<Popover isLazy isOpen={isPopoverOpen} onClose={onPopoverClose} {...props}>
			<PopoverTrigger>
				<Button onClick={onPopoverToggle} rightIcon={<RxTriangleDown />}>
					{selectedCategory ? (
						<>
							{selectedCategory?.name}
							<Box ml="2" w="4" h="4" bg={selectedCategory?.color} />
						</>
					) : (
						"Category"
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />

				<PopoverHeader
					borderBottomWidth={isHeader ? "1px" : "0px"}
					mb={isHeader ? "0px" : "6px"}
				>
					{isHeader && (
						<Button colorScheme="green" onClick={onModalToggle}>
							New category
						</Button>
					)}
				</PopoverHeader>

				<PopoverBody as={Box} h="350px">
					<Scrollbars universal style={{ height: "100%" }}>
						<Box display="flex" flexDirection="column" gap="15">
							<Button
								py="24px"
								borderWidth={2}
								borderColor={!selectedCategory ? border : "transparent"}
								borderRadius="0.375rem"
								_hover={{ bg: "gray.500" }}
								aria-label={`Select none category`}
								onClick={(event) => selectCategoryHandler(event, undefined)}
							>
								None
							</Button>
							{categories?.data?.map((category) => (
								<Button
									bg={category.color ? category.color : bg}
									py="24px"
									borderWidth={2}
									borderColor={
										selectedCategory?.id === category.id
											? border
											: "transparent"
									}
									borderRadius="0.375rem"
									_hover={{ bg: "gray.500" }}
									key={category.id}
									aria-label={`Select ${category.name} category`}
									onClick={(event) => selectCategoryHandler(event, category)}
								>
									<Box mr="auto">{category.name}</Box>
									{editControl && (
										<Button
											rounded="full"
											p="0"
											aria-label={`Edit ${category.name} category`}
											onClick={(event) => editCategoryHandler(event, category)}
										>
											<MdModeEditOutline />
										</Button>
									)}

									{deleteControl && (
										<Button
											ml={1}
											rounded="full"
											p="0"
											aria-label="Delete category"
											onClick={(event) =>
												deleteCategoryHandler(event, category.id)
											}
										>
											<MdDelete />
										</Button>
									)}
								</Button>
							))}
						</Box>
					</Scrollbars>
				</PopoverBody>
			</PopoverContent>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ModalOverlay />
				<ModalContent mx="10px">
					<ModalHeader>
						{editCategory ? "Edit category" : "Create category"}
					</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<CategoryForm
							editCategory={editCategory}
							onSubmitCallback={closeModal}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Popover>
	);
};

export default SelectCategory;
