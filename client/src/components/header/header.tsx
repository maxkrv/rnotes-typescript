import React, { FC } from "react";
import {
	Box,
	Button,
	Heading,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	useToast,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../services/user.service";
import { removeUser } from "../../store/reducers/user.slice";
import { useRouter } from "next/router";
import ColorModeSwitcher from "../colorModeSwitcher";
import Link from "next/link";

const Header: FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const toast = useToast();

	const logOut = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => userService.logout(),
		onSuccess: () => {
			dispatch(removeUser());
			router.push("/");
			toast({
				title: "Logged out successfully",
				status: "success",
				isClosable: true,
				duration: 5000,
			});
		},
	});

	return (
		<Box
			as="header"
			py="4"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			borderBottom="2px"
		>
			<Heading as="h1" size="lg">
				<Link href="/">Rnotes</Link>
			</Heading>

			<Popover>
				<PopoverTrigger>
					<Button
						borderRadius="50%"
						p="0"
						aria-label="user info and logout button"
					>
						<FaUserAlt />
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader>{user.user?.email}</PopoverHeader>
					<PopoverBody display="flex" justifyContent="space-between">
						<Button onClick={() => logOut.mutate()}>Logout</Button>
						<ColorModeSwitcher />
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Box>
	);
};

export default Header;
