import React, { useState } from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cart/slice'
import styles from './Product.module.scss'
import ProductSlider from './ProductSlider'

type FullProductProps = {
	_id: string
	name: string
	price: number
	count: number
	memory: [{ value: number; size: number; price: number }]
	colors: [{ value: string; name: string; images: string[] }]
}

const FullProduct: React.FC<FullProductProps> = ({
	_id,
	name,
	price,
	count,
	memory,
	colors,
}) => {
	const dispatch = useDispatch()

	const [activeMemory, setActiveMemory] = useState(...memory)
	const [activeColor, setActiveColor] = useState(...colors)

	const onClickItem = () => {
		const item = {
			_id,
			name,
			price,
			count,
			memory: activeMemory,
			color: activeColor,
		}
		dispatch(addItem(item))
	}

	return (
		<div className={styles.item}>
			<div className={styles.item__body}>
				<div className={styles.item__slider}>
					<ProductSlider activeColor={activeColor} />
				</div>
				<div className={styles.item__content}>
					<div className={styles.content}>
						<h1 className={styles.content__title}>{name}</h1>
						<div className={styles.content__price}>
							Price: ${activeMemory.price}
						</div>
						<div className={styles.content__memory}>
							<h3> {activeMemory.size ? 'Case Size:' : 'Memory:'} </h3>
							<div className={styles.content__memory_items}>
								{memory.map((obj, i) => (
									<div
										onClick={() => setActiveMemory(obj)}
										className={
											activeMemory === obj
												? [
														styles.content__memory_item,
														styles.activeMemory,
												  ].join(' ')
												: styles.content__memory_item
										}
										key={i}
									>
										{obj.size ? (
											<span>{obj.size}mm</span>
										) : (
											<span>
												{obj.value < 15 ? obj.value + 'tb' : obj.value + 'gb'}
											</span>
										)}

										<h4>${obj.price}</h4>
									</div>
								))}
							</div>
						</div>
						<div className={styles.content__color}>
							<h3>Color - {activeColor.name}</h3>
							<div className={styles.content__color_items}>
								{colors.map((obj, i) => (
									<BsFillCircleFill
										key={i}
										onClick={() => setActiveColor(obj)}
										className={activeColor === obj ? styles.activeColor : ''}
										style={{
											color: obj.value,
											borderRadius: '50%',
											padding: '3px',
											width: '43px',
											height: '43px',
											cursor: 'pointer',
										}}
									/>
								))}
							</div>
						</div>
						<button onClick={onClickItem}>Add to cart</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FullProduct
