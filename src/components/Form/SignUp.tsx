import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config'

import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/user/userSlice'

import { BiError } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Form.module.scss'
import { FormTypes } from './formTypes'

const SignUp: React.FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
	} = useForm<FormTypes>({
		mode: 'onBlur',
	})

	const onSubmit = (data: FormTypes) => {
		alert(JSON.stringify(data))
		reset()
	}

	const handleSignUp = async (e: any) => {
		e.preventDefault()
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user
			console.log(user)
			dispatch(
				setUser({
					email: user.email,
					id: user.uid,
					token: user.refreshToken,
				})
			)
			window.localStorage.setItem('token', user.refreshToken)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className={styles.body}>
				<h2>Sign Up for Free</h2>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.input}>
						<label>
							Email Address
							<input
								{...register('email', {
									required: 'Email is a required field',
									pattern: {
										value:
											/^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u,
										message: 'Please enter a valid email address',
									},
								})}
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</label>
						<div className={styles.error}>
							{errors?.email?.message && (
								<BiError className={styles.error__icon} />
							)}
							{errors?.email?.message}
						</div>
					</div>
					<div className={styles.input}>
						<label>
							Password
							<input
								{...register('password', {
									required: 'Password is a required field',
									minLength: {
										value: 8,
										message: 'minimum 8 symbols',
									},
								})}
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</label>
						<div className={styles.error}>
							{errors?.password && errors?.password?.message && (
								<BiError className={styles.error__icon} />
							)}
							{errors?.password && errors?.password?.message}
						</div>
					</div>
					<h3 className={styles.link}>
						Already registered? <Link to='/LoginPage'>Sign In</Link>
					</h3>
					<input
						type='submit'
						value='Sign up'
						disabled={!isValid}
						style={
							!isValid
								? { backgroundColor: '#909eeb' }
								: { backgroundColor: '#403ec0' }
						}
						onClick={handleSignUp}
					/>
				</form>
			</div>
		</>
	)
}

export default SignUp
