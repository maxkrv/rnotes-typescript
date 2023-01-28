import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../types/Auth";
import { IUser } from "../../types/IUser";

interface InitialState {
	accessToken: string;
	refreshToken: string;
	user: IUser;
	isAuth: boolean;
}

const initialState: InitialState = {} as InitialState;

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthResponse>) => {
			localStorage.setItem("token", action.payload.accessToken);

			return { ...state, ...action.payload, isAuth: true };
		},
		removeUser: () => {
			localStorage.removeItem("token");

			return { ...({} as InitialState), isAuth: false };
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
