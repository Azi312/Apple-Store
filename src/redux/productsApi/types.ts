export type Products = {
	_id: string
	name: string
	price: number
	rating: number
	discount: number
	memory: [{ value: number; size: number; price: number }]
	colors: [{ value: string; name: string; images: string[] }]
	imageUrl: string
}

export interface Params {
	currentPage: number
	category: string
	searches: string
	lowestPrice: string
	highestPrice: string
	sortById: string
	order: string
}
