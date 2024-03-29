import React, { FC, ReactNode, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "../hooks/redux";
import { AuthResponse } from "../types/Auth";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../store/reducers/user.slice";
import { Spinner } from "@chakra-ui/react";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();

	const { mutate, isLoading } = useMutation({
		mutationKey: ["refresh"],
		mutationFn: () =>
			axios.get<AuthResponse>(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/api/refresh`,
				{
					withCredentials: true,
				}
			),
		onSuccess: (data) => {
			dispatch(setUser(data.data));
		},
	});

	useEffect(() => {
		if (typeof window !== "undefined" && !!localStorage.getItem("token")) {
			mutate();
		}
	}, [mutate]);

	return (
		<>
			{isLoading ? (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<Spinner />
				</div>
			) : (
				children
			)}
		</>
	);
};

export default AuthProvider;
