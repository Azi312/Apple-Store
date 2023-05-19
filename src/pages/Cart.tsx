import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartEmpty from '../components/CartEmpty'
import CartItem from '../components/CartItem'
import { useAuth } from '../hooks/use-auth'
import { selectCartItems } from '../redux/cart/selectors'

const Cart: React.FC = () => {
	const { items, totalPrice } = useSelector(selectCartItems)
	const { isAuth } = useAuth()

	const totalAmount = totalPrice + 5

	if (items.length === 0) {
		return <CartEmpty />
	}

	return (
		<div className='cart'>
			{isAuth ? (
				<>
					<div className='cart__content'>
						<h1 className='cart__title'>Cart</h1>
						<div className='cart__list'>
							{items.map(item => (
								<CartItem key={item._id} {...item} />
							))}
						</div>
						<div className='cart__bottom'>
							<div className='cart__bottom-details'>
								<div className='cart__bottom-products'>
									<h3>Products</h3>
									<span>${totalPrice}</span>
								</div>
								<div className='cart__bottom-shipping'>
									<h3>Shipping</h3>
									<span>$5</span>
								</div>
								<div className='cart__bottom-total'>
									<h3>Total</h3>
									<span>${totalAmount}</span>
								</div>
							</div>
						</div>
					</div>
					<div className='cart__order order-cart'>
						<div className='order-cart__content'>
							<h3 className='order-cart__title'>Order information</h3>
							<form className='order-cart__form'>
								<input type='text' placeholder='Name' />
								<input type='email' placeholder='Email' />
								<div className='order-cart__item'>
									<input type='text' placeholder='City' />
									<input type='text' placeholder='Postal Code' />
								</div>
								<input type='text' placeholder='Street Address' />
								<input type='text' placeholder='Country' />
								<button>Continue to payment</button>
							</form>
						</div>
					</div>
				</>
			) : (
				<div style={{ fontSize: '22px' }} className='cart__notAuth'>
					<Link to='/LoginPage'>Login</Link> to see if have any saved products
				</div>
			)}
		</div>
	)
}
{
}
export default Cart
