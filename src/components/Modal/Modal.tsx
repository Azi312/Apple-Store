import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOpenModal, setProductId } from '../../redux/filter/slice'
import { GrClose } from 'react-icons/gr'
import SimpleSlider from './Slider'

type ModalProps = {
	name: string
	price: number
	slides: string[]
	info: [{ icon: string; text: string }]
	colors: [{ value: string; name: string; images: string[] }]
}

const Modal: React.FC<ModalProps> = ({ name, price, info, slides, colors }) => {
	const dispatch = useDispatch()

	const closeModal = () => {
		dispatch(setOpenModal(false))
		dispatch(setProductId(''))
	}

	return (
		<div onClick={() => dispatch(setOpenModal(false))} className='modal'>
			<div onClick={e => e.stopPropagation()} className='modal__body'>
				<button onClick={closeModal} className='modal__close'>
					<GrClose />
				</button>
				<div className='modal__slider'>
					<SimpleSlider slides={slides} />
					<div className='modal__colors'>
						<h3>Available in {colors.length} finishes</h3>
						<div className='modal__color'>
							{colors.map((obj, i) => (
								<div
									key={i}
									style={{
										background: obj.value,
										borderRadius: '50%',
										width: '15px',
										height: '15px',
									}}
								></div>
							))}
						</div>
					</div>
				</div>
				<div className='modal__content'>
					<div className='modal__title'>
						<div className='modal__title-texts'>
							<h2 className='modal__name'>{name}</h2>
							<p className='modal__price'>From ${price}</p>
						</div>
						<Link to='/Product' className='modal__button' onClick={closeModal}>
							<button>Buy</button>
						</Link>
					</div>
					<div className='modal__items items-modal'>
						{info.map(obj => (
							<div className='items-modal__item'>
								<div className='items-modal__icon'>
									{obj.icon.length < 10 ? (
										<h4>{obj.icon}</h4>
									) : (
										<img src={obj.icon} alt='' />
									)}
								</div>
								<div className='items-modal__text'>{obj.text}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
