import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart/slice'
import filterSlice from './filter/slice'
import { productsApi } from './productsApi/productsApi'
import userSlice from './user/userSlice'

export const store = configureStore({
	reducer: {
		filter: filterSlice,
		cart: cartSlice,
		user: userSlice,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: getDefoultMiddleware =>
		getDefoultMiddleware().concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
