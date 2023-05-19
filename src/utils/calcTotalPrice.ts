import { CartProducts } from '../redux/cart/types'

export const calcTotalPrice = (products: CartProducts[]) => {
	return products.reduce((sum, obj) => obj.memory.price + sum, 0)
}
