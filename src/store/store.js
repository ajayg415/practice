// DEPRECATED: store archived to legacy. Keep a placeholder export to avoid import errors.
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export default store;