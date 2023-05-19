import { IoIosArrowDown } from 'react-icons/io'

type CategoriesProps = {
	onChangeCategory: (index: number) => void
	categoryId: number
}

const categories = ['All', 'Iphone', 'Mac', 'Watch', 'Ipad']

const Categories: React.FC<CategoriesProps> = ({
	categoryId,
	onChangeCategory,
}) => {
	return (
		<>
			<h3>
				Categories <IoIosArrowDown className='sidebar__item-arrow' />
			</h3>
			{categories.map((obj, i) => (
				<div key={i}>
					<input
						className='styled-checkbox'
						onClick={() => onChangeCategory(i)}
						id={String(i)}
						name='categories'
						type='radio'
						checked={categoryId === i ? true : false}
					/>
					<label htmlFor={String(i)}>
						<span>{obj}</span>
					</label>
				</div>
			))}
		</>
	)
}

export default Categories
