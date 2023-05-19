import StoreItem from './StoreItem'

type ProductType = {
	_id: string
	name: string
	price: number
	rating: number
	discount: number
	memory: [{ value: number; size: number; price: number }]
	colors: [{ value: string; name: string; images: string[] }]
	imageUrl: string
}

type StoreListProps = {
	products: ProductType[]
}

const StoreList: React.FC<StoreListProps> = ({ products }) => {
	return (
		<section className='store__list'>
			<div className='store__items'>
				{products.map(obj => (
					<StoreItem key={obj._id} {...obj} />
				))}
			</div>
		</section>
	)
}

export default StoreList
