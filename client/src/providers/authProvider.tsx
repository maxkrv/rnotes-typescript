import React, { FC, ReactNode } from "react";
import axios from "axios";
import { useAppDispatch } from "../hooks/redux";
import { AuthResponse } from "../types/Auth";
import { useQuery } from "@tanstack/react-query";
import { setUser } from "../store/reducers/user.slice";
import { Box, Spinner } from "@chakra-ui/react";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();

	const { isLoading } = useQuery({
		queryKey: ["refresh"],
		queryFn: () =>
			axios.get<AuthResponse>(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/refresh`,
				{
					withCredentials: true,
				}
			),
		onSuccess: (data) => {
			dispatch(setUser(data.data));
		},
		enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
		retry: false,
	});

	return (
		<>
			{isLoading ? (
				<Box
					position="absolute"
					top="50%"
					left="50%"
					translateX="-50%"
					translateY="-50%"
				>
					<Spinner />
				</Box>
			) : (
				children
			)}
		</>
	);
};

export default AuthProvider;
