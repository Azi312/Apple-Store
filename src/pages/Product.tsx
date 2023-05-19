import { useSelector } from 'react-redux'
import { selectFilterSlice } from '../redux/filter/selectors'
import FullProduct from '../components/FullProduct'

const Product = () => {
	const { product } = useSelector(selectFilterSlice)
	return <FullProduct {...product} />
}

export default Product
