import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading from './components/Loading'
import Home from './pages/Home'
import './scss/App.scss'

const Header = React.lazy(
	() => import(/* webpackChunkName: "Header" */ './components/Header')
)
const Cart = React.lazy(
	() => import(/* webpackChunkName: "Cart" */ './pages/Cart')
)
const Product = React.lazy(
	() => import(/* webpackChunkName: "Product" */ './pages/Product')
)
const LoginPage = React.lazy(
	() => import(/* webpackChunkName: "LoginPage" */ './pages/LoginPage')
)
const SignUpPage = React.lazy(
	() => import(/* webpackChunkName: "SignUpPage" */ './pages/SignUpPage')
)
const NotFound = React.lazy(
	() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)

function App() {
	return (
		<div className='App'>
			<Suspense fallback={<Loading />}>
				<Header />
			</Suspense>
			<main className='main'>
				<div className='main__container'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route
							path='/Cart'
							element={
								<Suspense fallback={<Loading />}>
									<Cart />
								</Suspense>
							}
						/>
						<Route
							path='/Product'
							element={
								<Suspense fallback={<Loading />}>
									<Product />
								</Suspense>
							}
						/>
						<Route
							path='/LoginPage'
							element={
								<Suspense fallback={<Loading />}>
									<LoginPage />
								</Suspense>
							}
						/>
						<Route
							path='/SignUpPage'
							element={
								<Suspense fallback={<Loading />}>
									<SignUpPage />
								</Suspense>
							}
						/>
						<Route
							path='*'
							element={
								<Suspense fallback={<Loading />}>
									<NotFound />
								</Suspense>
							}
						/>
					</Routes>
				</div>
			</main>
		</div>
	)
}

export default App
