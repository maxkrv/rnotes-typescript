import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";

const initialState: Category | undefined = {} as Category;

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		setCategory: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
