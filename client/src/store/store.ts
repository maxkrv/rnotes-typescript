import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user.slice";
import categorySlice from "./reducers/category.slice";

const store = configureStore({
	reducer: {
		user: userSlice,
		category: categorySlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
