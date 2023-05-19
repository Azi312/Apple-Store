import { useEffect } from 'react'
import axios from '../axios'
import {
	Categories,
	Loading,
	Modal,
	Pagination,
	Sidebar,
	StoreList,
} from '../components'
import NotFound from './NotFound'

import { useDispatch, useSelector } from 'react-redux'
import { selectFilterSlice } from '../redux/filter/selectors'
import { productsApi } from '../redux/productsApi/productsApi'
import {
	setCategoryId,
	setOpenModal,
	setProduct,
	setSortType,
} from '../redux/filter/slice'

const Home = () => {
	const {
		categoryId,
		search,
		sortType,
		currentPage,
		minPrice,
		maxPrice,
		openModal,
		productId,
		product,
	} = useSelector(selectFilterSlice)

	const dispatch = useDispatch()

	const category = categoryId > 0 ? `&category=${categoryId}` : ''
	const searches = search ? `&search=${search}` : ''
	const lowestPrice = minPrice ? `&price_gte=${minPrice}` : ''
	const highestPrice = maxPrice ? `&price_lte=${maxPrice}` : ''
	const sortById = sortType.sortProperty.replace('-', '')
	const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'

	const {
		data: products,
		isLoading,
		error,
	} = productsApi.useGetProductsQuery({
		currentPage,
		category,
		searches,
		lowestPrice,
		highestPrice,
		sortById,
		order,
	})

	const fetchModalData = async () => {
		const { data } = await axios.get(`/products/${productId}`)
		dispatch(setProduct(data))
	}

	const productValue = Boolean(Object.keys(product).length)

	useEffect(() => {
		if (productId) {
			fetchModalData()
			if (productValue) {
				dispatch(setOpenModal(true))
			}
		}
	}, [productId, productValue])

	if (error) {
		return <NotFound />
	}

	return (
		<>
			<div className='main__content'>
				<Sidebar
					sortType={sortType}
					onChangeSort={i => dispatch(setSortType(i))}
				>
					<Categories
						categoryId={categoryId}
						onChangeCategory={i => dispatch(setCategoryId(i))}
					/>
				</Sidebar>
				{isLoading ? <Loading /> : <StoreList products={products!} />}
				{openModal && (
					<Modal
						name={product.name}
						price={product.price}
						slides={product.slides}
						info={product.info}
						colors={product.colors}
					/>
				)}
			</div>
			<Pagination />
		</>
	)
}

export default Home
