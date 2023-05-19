import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartProducts } from '../redux/cart/selectors'
import { setOpenModal } from '../redux/filter/slice'
import { removeUser } from '../redux/user/userSlice'

import { BsBag } from 'react-icons/bs'
import logo from '../assets/images/apple.svg'
import { useAuth } from '../hooks/use-auth'
import Search from './Search'

const Header = () => {
	const { products } = useSelector(selectCartProducts)
	const dispatch = useDispatch()
	const { isAuth } = useAuth()

	const isMounted = React.useRef(false)
	const totalCount = products.reduce(
		(sum: number, item: any) => sum + item.count,
		0
	)

	const signOut = () => {
		dispatch(removeUser())
		window.localStorage.removeItem('token')
	}

	useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify(products)
			localStorage.setItem('cart', json)
		}
		isMounted.current = true
	}, [products])

	return (
		<header className='header'>
			<div className='header__container'>
				<div className='header__content'>
					<Link
						to='/'
						onClick={() => dispatch(setOpenModal(false))}
						className='header__logo'
					>
						<img src={logo} alt='' />
						<h3>Store</h3>
					</Link>
					<Search />
					<div className='header__block'>
						{isAuth ? (
							<div onClick={signOut} className='header__login'>
								Sign Out
							</div>
						) : (
							<Link to='/LoginPage' className='header__login'>
								Login
							</Link>
						)}

						<Link to='/cart' className='header__cart'>
							<BsBag className='header__cart-icon' />
							{isAuth && (
								<h3>
									<span
										style={
											products.length > 9 ? { right: '16%' } : { right: '30%' }
										}
									>
										{totalCount}
									</span>
								</h3>
							)}
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
