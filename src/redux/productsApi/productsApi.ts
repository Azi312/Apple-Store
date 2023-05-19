import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Products, Params } from './types'

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
	}),
	endpoints: build => ({
		getProducts: build.query<Products[], Params>({
			query: ({
				currentPage,
				category,
				searches,
				lowestPrice,
				highestPrice,
				sortById,
				order,
			}) => ({
				url: `/products?_page=${currentPage}&_limit=8${category}${lowestPrice}${highestPrice}&_sort=${sortById}&_order=${order}${searches}`,
			}),
		}),
	}),
})

export const { useGetProductsQuery } = productsApi
