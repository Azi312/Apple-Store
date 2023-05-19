import { useSelector } from 'react-redux'
import { selectFilterSlice } from '../redux/user/userSlice'

export const useAuth = () => {
	const { email, token, id } = useSelector(selectFilterSlice)

	return {
		isAuth: !!email,
		email,
		token,
		id,
	}
}
