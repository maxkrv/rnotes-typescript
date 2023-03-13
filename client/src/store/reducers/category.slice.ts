import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";

const initialState: { selectedCategory: Category | undefined } = {
	selectedCategory: undefined,
};

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<Category | undefined>) => {
			state.selectedCategory = action.payload;
		},
	},
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
