import { NextPage } from "next";
import {
	Button,
	Center,
	Flex,
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
import Socials from "../components/socials";

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
			<Flex
				h="100%"
				flexDirection="column"
				alignItems="center"
				justifyContent="space-between"
				py="10px"
			>
				<ColorModeSwitcher />

				<Flex mt="10" flexDirection="column" textAlign="center">
					<Heading as="h1" size="3xl">
						Rnotes
					</Heading>
					<Text fontSize="xl" textAlign="center" mt="5px" mb="50px">
						Free, safe to-dos and notes. <br /> Login or Register to use an app.
					</Text>
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
				</Flex>

				<Socials />
			</Flex>

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
