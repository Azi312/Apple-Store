import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { CartProducts, CartSliceState } from './types'

const initialState: CartSliceState = getCartFromLS()

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartProducts>) {
			const findItem = state.products.find(
				obj =>
					obj._id === action.payload._id &&
					obj.memory.value === action.payload.memory.value &&
					obj.color.value === action.payload.color.value
			)

			if (findItem) {
				findItem.count++
			} else {
				state.products.push({
					...action.payload,
					count: 1,
				})
			}

			state.totalPrice = state.products.reduce((sum, obj) => {
				return obj.memory.price * obj.count + sum
			}, 0)
		},

		minusItem(state, action) {
			const findItem = state.products.find(
				obj =>
					obj._id === action.payload._id &&
					obj.memory.value === action.payload.memory.value &&
					obj.color.value === action.payload.color.value
			)

			if (findItem) {
				findItem.count--

				if (findItem.count === 0) {
					state.products = state.products.filter(
						obj =>
							obj._id !== action.payload._id ||
							obj.memory.value !== action.payload.memory.value ||
							obj.color.value !== action.payload.color.value
					) // Удаляем товар из корзины
				}

				state.totalPrice = state.products.reduce((sum, obj) => {
					return obj.memory.price * obj.count - sum
				}, 0)
			}
		},
	},
})

export const { addItem, minusItem } = cartSlice.actions
export default cartSlice.reducer
