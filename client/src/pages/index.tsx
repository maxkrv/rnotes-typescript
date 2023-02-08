import { NextPage } from "next";
import {
	Box,
	Button,
	Center,
	Heading,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import ColorModeSwitcher from "../components/colorModeSwitcher";
import LoginForm from "../components/form/loginForm";
import RegisterForm from "../components/form/registerForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import { removeUser } from "../store/reducers/user.slice";

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const {
		isOpen: isLoginFormOpen,
		onOpen: onLoginFormOpen,
		onClose: onLoginFormClose,
	} = useDisclosure();
	const {
		isOpen: isRegisterFormOpen,
		onOpen: onRegisterFormOpen,
		onClose: onRegisterFormClose,
	} = useDisclosure();

	const logout = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => userService.logout(),
		onSuccess: () => {
			dispatch(removeUser());
		},
	});

	return (
		<>
			<Box
				h="100%"
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
			>
				<Box position="absolute" top="6">
					<ColorModeSwitcher />
				</Box>
				<Heading as="h1" size="3xl">
					Rnotes
				</Heading>
				<Text fontSize="xl" textAlign="center">
					Free, safe to-dos and notes. <br /> Login or Register to use an app.
				</Text>

				<Box mt="10" display="flex" flexDirection="column">
					{user.isAuth ? (
						<>
							<Button as={Link} href="/notes">
								Use an app
							</Button>
							<Text textAlign="center">or</Text>
							<Button
								isLoading={logout.isLoading}
								onClick={() => logout.mutate()}
							>
								Logout
							</Button>
						</>
					) : (
						<>
							<Button onClick={onLoginFormOpen}>Login</Button>
							<Text textAlign="center">or</Text>
							<Button onClick={onRegisterFormOpen}>Register</Button>
						</>
					)}
				</Box>
			</Box>

			<Modal isCentered isOpen={isLoginFormOpen} onClose={onLoginFormClose}>
				<ModalOverlay />
				<ModalContent px="2" pb="4" mx="10px">
					<ModalHeader>
						<Center>Login</Center>
					</ModalHeader>
					<ModalCloseButton />

					<LoginForm />
				</ModalContent>
			</Modal>

			<Modal
				isCentered
				isOpen={isRegisterFormOpen}
				onClose={onRegisterFormClose}
			>
				<ModalOverlay />
				<ModalContent px="2" pb="4" mx="10px">
					<ModalHeader>
						<Center>Register</Center>
					</ModalHeader>
					<ModalCloseButton />

					<RegisterForm />
				</ModalContent>
			</Modal>
		</>
	);
};

export default Home;
