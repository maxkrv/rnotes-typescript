import React, { useEffect } from "react";
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { useAppSelector } from "../../hooks/redux";
import { useRouter } from "next/router";
import { Box, Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";

const Activate: NextPage<{ link: string }> = ({ link }) => {
	const router = useRouter();
	const toast = useToast();

	const user = useAppSelector((state) => state.user);

	const { isLoading, isFetching, isSuccess, isError } = useQuery({
		queryKey: ["confirm"],
		queryFn: () => api.get(`/activate/${link}`),
		enabled: user.isAuth,
	});

	useEffect(() => {
		if (!user && typeof window !== "undefined") {
			router.push("/");
			toast({
				title: "Account not found",
				status: "error",
				isClosable: true,
				duration: 5000,
			});
		}
	}, [router, toast, user, user.isAuth]);

	const loader = isLoading || isFetching;

	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			{loader && (
				<Box textAlign="center">
					<Spinner size="md" />
					<Text>Activating your account</Text>
				</Box>
			)}
			{!loader && isSuccess && (
				<Flex flexDirection="column" alignItems="center">
					<Text>Success!</Text>
					<Text>Your account is activated</Text>
					<Button mt="5px" onClick={() => router.push("/notes")}>
						Use an app
					</Button>
				</Flex>
			)}
			{!loader && isError && (
				<Box>
					<Text>Something went wrong</Text>
				</Box>
			)}
		</div>
	);
};

Activate.getInitialProps = async ({ query }) => {
	const { link } = query as { link: string };

	return { link };
};

export default Activate;
