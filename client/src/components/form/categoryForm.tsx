import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import {
	Button,
	Center,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	useToast,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ColorPiker from "../colorPiker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category, CategoryRequest } from "../../types/Category";
import { categoryService } from "../../services/category.service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formCategorySchema = z
	.object({
		name: z.string(),
	})
	.required({ name: true, message: "This field is required" });

type FormCategorySchemaType = z.infer<typeof formCategorySchema>;

interface CategoryFormProps extends HTMLAttributes<HTMLDivElement> {
	editCategory?: Category;
	onSubmitCallback?: () => void;
}

const CategoryForm: FC<CategoryFormProps> = ({
	editCategory,
	onSubmitCallback,
	...props
}) => {
	const queryClient = useQueryClient();
	const toast = useToast();
	const [color, setColor] = useState<string | undefined>(undefined);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormCategorySchemaType>({
		resolver: zodResolver(formCategorySchema),
	});

	const createCategory = useMutation<Category, any, CategoryRequest>({
		mutationKey: ["createCategory"],
		mutationFn: (category) => categoryService.createCategory(category),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["categories"] });
			await queryClient.invalidateQueries({ queryKey: ["notes"] });
			await queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error) =>
			toast({
				title: error.response.data.message,
				status: "error",
				isClosable: true,
				duration: 5000,
			}),
	});
	const updateCategory = useMutation<Category, any, CategoryRequest>({
		mutationKey: ["editCategory"],
		mutationFn: (category) =>
			categoryService.updateCategoryById(editCategory!.id, category),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["categories"] });
			await queryClient.invalidateQueries({ queryKey: ["notes"] });
			await queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error) =>
			toast({
				title: error.response.data.message,
				status: "error",
				isClosable: true,
				duration: 5000,
			}),
	});

	const onSubmit: SubmitHandler<FormCategorySchemaType> = (data) => {
		if (editCategory) {
			updateCategory.mutate({ name: data.name, color: color ?? "" });
		} else {
			createCategory.mutate({ name: data.name, color: color ?? "" });
		}

		onSubmitCallback?.();
	};

	useEffect(() => {
		if (editCategory) {
			setColor(editCategory.color);
		}
	}, [editCategory]);

	return (
		<FormControl as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
			<FormLabel mb="0">Name</FormLabel>
			<Controller
				name="name"
				control={control}
				defaultValue={editCategory?.name ?? ""}
				render={({ field }) => (
					<Input isInvalid={!!errors.name} required {...field} />
				)}
			/>
			<FormLabel mt="2" mb="0">
				Color
			</FormLabel>
			<FormHelperText>{errors.name && errors.name.message}</FormHelperText>
			<ColorPiker selectedColor={color} setSelectedColor={setColor} />

			<Center>
				<Button
					isLoading={createCategory.isLoading || updateCategory.isLoading}
					mt="2"
					type="submit"
				>
					Submit
				</Button>
			</Center>
		</FormControl>
	);
};

export default CategoryForm;
