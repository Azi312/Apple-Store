import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/user/userSlice'
import { auth } from '../firebase.config'

interface AuthWrapperProps {
	children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
	const dispatch = useDispatch()
	const token = window.localStorage.getItem('token')

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user?.refreshToken === token) {
				// Пользователь аутентифицирован, сохраняем его данные в Redux
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: user.refreshToken,
					})
				)
			} else {
				// Пользователь не аутентифицирован, удаляем его данные из Redux
				dispatch(setUser(null))
			}
		})

		return () => unsubscribe()
	}, [])

	return <>{children}</>
}

export default AuthWrapper
