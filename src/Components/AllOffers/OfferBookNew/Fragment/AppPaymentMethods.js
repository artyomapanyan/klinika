import React, { useState } from 'react'
import { Space } from 'antd'
import { t } from 'i18next'
import imga from '../../../../dist/Img/img-15.png'
import imgb from '../../../../dist/Img/img-16.png'
import imgc from '../../../../dist/Img/img-17.png'
import imgd from '../../../../dist/Img/img-18.png'
import imge from '../../../../dist/Img/img-19.png'
import imgf from '../../../../dist/Img/img-20.png'
import payment_visa from '../../../../dist/Img/Payments.png'

function AppPaymentMethods({
	setDataState,
	dataState,
	responseCodeState,
	data
}) {
	const [paymentMethodState, setPaymentMethodState] = useState('')

	const onChangeDetails = () => {
		setDataState(prevState => ({
			...prevState,
			payment_method_id: ''
		}))
		setPaymentMethodState('')
	}

	const onChange = e => {
		console.log('ddd')
		setPaymentMethodState(e.target.value)
		setDataState(prevState => ({
			...prevState,
			payment_method_id: e.target.value
		}))
	}
	const onpay = e => {
		setPaymentMethodState(e)
		setDataState(prevState => ({
			...prevState,
			payment_method_id: e
		}))
	}

	return (
		<div>
			{dataState?.doctor_id &&
			dataState?.date &&
			dataState?.time &&
			dataState?.payment &&
			dataState?.verifyNumber ? (
				<>
					<Space>
						<h2 className={'appointment_title'}>Select payment method</h2>
					</Space>
					<div className={'payment_section'}>
						<div className={'payment_container'} onClick={() => {}}>
							<div className={'payment_conatiner_div'}>
								<img src={imge} alt={'imge'} className={'payment_icon'} />
								<span className={'payment_container_title'}>Pay at Clinic</span>
							</div>
						</div>
						<hr />
						<div className={'payment_container'} onClick={() => {}}>
							<Space>
								<div className={'payment_conatiner_div'}>
									<img src={imgf} alt={'imgf'} className={'payment_icon'} />
									<img
										src={payment_visa}
										alt={'payment_visa'}
										className={'payment_icon'}
									/>
									<span className={'payment_container_title'}>
										Visa/Mastercard Card
									</span>
								</div>
							</Space>
						</div>

						<div className={'payment_div'}>
							<div className={'payment_methods'} onClick={() => {}}>
								<img src={imga} alt={'imga'} className={'payment_icon'} />
							</div>
							<div className={'payment_methods'} onClick={() => {}}>
								<Space>
									<div>
										<img src={imgb} alt={'imgb'} className={'payment_icon'} />
									</div>
								</Space>
							</div>
							<div className={'payment_methods'} onClick={() => {}}>
								<Space>
									<div>
										<img src={imgc} alt={'imgc'} className={'payment_icon'} />
									</div>
								</Space>
							</div>
							<div className={'payment_methods'} onClick={() => {}}>
								<Space>
									<div>
										<img src={imgd} alt={'imgd'} className={'payment_icon'} />
									</div>
								</Space>
							</div>
						</div>
					</div>
				</>
			) : responseCodeState ? (
				<>
					<div>
						<Space>
							<h2 className={'appointment_title'}>Select payment method</h2>
						</Space>
						{data?.clinic?.payment_methods.map(item => {
							return (
								<>
									<div className={'payment_section'}>
										<div
											onClick={() => onpay(item.id)}
											className={'payment_container'}
										>
											{item.title}
										</div>
									</div>
								</>
							)
						})}
					</div>
				</>
			) : (
				<div></div>
			)}
		</div>
	)
}
export default AppPaymentMethods
