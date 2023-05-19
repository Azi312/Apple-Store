export type CartProducts = {
	_id: string
	name: string
	price: number
	memory: { value: number; size: number; price: number }
	color: { value: string; name: string; images: string[] }
	count: number
}

export interface CartSliceState {
	totalPrice: number
	products: CartProducts[]
}
