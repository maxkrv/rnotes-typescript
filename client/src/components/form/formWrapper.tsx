import React, { ComponentPropsWithoutRef, FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formSchema, FormSchemaType } from "../../utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Center,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../services/user.service";
import { AuthResponse } from "../../types/Auth";
import { setUser } from "../../store/reducers/user.slice";
import { useAppDispatch } from "../../hooks/redux";
import { useRouter } from "next/router";

interface FormWrapperProps extends ComponentPropsWithoutRef<"form"> {
	formAction: "login" | "register";
}

const FormWrapper: FC<FormWrapperProps> = ({ formAction }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const toast = useToast();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
	});

	const login = useMutation<AuthResponse, any, FormSchemaType>({
		mutationKey: ["login"],
		mutationFn: ({ email, password }) =>
			userService.login({ email: email, password: password }),
		onSuccess: (data) => {
			dispatch(setUser(data));
			router.push("/notes");
		},
		onError: (error) =>
			toast({
				title: error.response.data.message,
				status: "error",
				isClosable: true,
				duration: 5000,
			}),
	});
	const register = useMutation<AuthResponse, any, FormSchemaType>({
		mutationKey: ["register"],
		mutationFn: ({ email, password }) =>
			userService.register({ email: email, password: password }),
		onSuccess: (data) => {
			dispatch(setUser(data));
			router.push("/notes");
		},
		onError: (error) =>
			toast({
				title: error.response.data.message,
				status: "error",
				isClosable: true,
				duration: 5000,
			}),
	});

	const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
		if (formAction === "login") {
			login.mutate(data);
		} else {
			register.mutate(data);
		}
	};

	return (
		<FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
			<FormLabel mb="0">Email</FormLabel>
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<Input type="email" isInvalid={!!errors.email} {...field} />
				)}
			/>
			<FormHelperText>
				{errors.email && (errors.email.message as string)}
			</FormHelperText>
			<FormLabel mt="2" mb="0">
				Password
			</FormLabel>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<Input type="password" isInvalid={!!errors.password} {...field} />
				)}
			/>
			<FormHelperText>
				{errors.password && (errors.password.message as string)}
			</FormHelperText>
			<Center>
				<Button
					mt="2"
					type="submit"
					isLoading={login.isLoading || register.isLoading}
				>
					Submit
				</Button>
			</Center>
		</FormControl>
	);
};

export default FormWrapper;
