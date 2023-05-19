import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, ProductTypes, SortType } from './types'

const initialState: FilterSliceState = {
	categoryId: 0,
	search: '',
	currentPage: 1,
	maxPrice: '',
	minPrice: '',
	openModal: false,
	productId: '',
	product: {} as ProductTypes,
	sortType: {
		name: 'популярности',
		sortProperty: 'rating',
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload
		},
		setSortType(state, action: PayloadAction<SortType>) {
			state.sortType = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setMaxPrice(state, action: PayloadAction<string>) {
			state.maxPrice = action.payload
		},
		setMinPrice(state, action: PayloadAction<string>) {
			state.minPrice = action.payload
		},
		setOpenModal(state, action: PayloadAction<boolean>) {
			state.openModal = action.payload
		},
		setProductId(state, action: PayloadAction<string>) {
			state.productId = action.payload
		},
		setProduct(state, action: PayloadAction<ProductTypes>) {
			state.product = action.payload
		},
	},
})

export const {
	setCategoryId,
	setSearch,
	setSortType,
	setCurrentPage,
	setMaxPrice,
	setMinPrice,
	setOpenModal,
	setProductId,
	setProduct,
} = filterSlice.actions
export default filterSlice.reducer
