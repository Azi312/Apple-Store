import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem, minusItem } from '../redux/cart/slice'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { CartProducts as CartItemType } from '../redux/cart/types'

type CartItemProps = {
	_id: string
	name: string
	memory: { value: number; size: number; price: number }
	color: { value: string; name: string; images: string[] }
	count: number
}

const CartItem: React.FC<CartItemProps> = ({
	_id,
	name,
	memory,
	color,
	count,
}) => {
	const dispatch = useDispatch()

	const onClickPlus = () => {
		dispatch(
			addItem({
				_id,
				memory,
				color,
			} as CartItemType)
		)
	}

	const onClickMinus = () => {
		dispatch(minusItem({ _id, memory, color }))
	}

	return (
		<div className='cart__item item-cart'>
			<div className='item-cart__image'>
				<img src={color.images[0]} alt='' />
			</div>
			<div className='item-cart__content'>
				<h3 className='item-cart__title'>{name}</h3>
				<div className='item-cart__price'>Price: ${memory.price * count}</div>
				{memory.size ? (
					<div className='item-cart__memory'>
						<span>SizeCase: </span>
						{memory.size}mm
					</div>
				) : (
					<div className='item-cart__memory'>
						<span>Memory: </span>
						{memory.value > 20 ? memory.value + 'gb' : memory.value + 'tb'}
					</div>
				)}
				<div className='item-cart__color'>Color - {color.name}</div>
				<div className='item-cart__count count-buttons'>
					<div onClick={onClickMinus} className='count-buttons__button'>
						<AiOutlineMinus />
					</div>
					<b>{count}</b>
					<div onClick={onClickPlus} className='count-buttons__button'>
						<AiOutlinePlus />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartItem
