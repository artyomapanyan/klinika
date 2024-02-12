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
import mobile_filter_icon from "../../../../dist/icons/mobile_filter_icon.png";
import {PayCircleOutlined} from "@ant-design/icons";
import OfferPrice from "./OfferPrice";

function AppPaymentMethods({
	setDataState,
	dataState,
	responseCodeState,
	data,
	totalState,
	verifyResponseNationality
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

					<div>
						<Space className={'drawer_header_text'}>
							<h2 className={'appointment_title'}>{t('Select payment method')}</h2>
						</Space>


						<div className={'mobile_offer_price'}>
							<OfferPrice data={data} totalState={totalState} verifyResponseNationality={verifyResponseNationality}/>
						</div>

						{data?.clinic?.payment_methods.map((item, key) => {
							return <div key={key} className={'payment_section'}>

										<div
											onClick={() => onpay(item.id)}
											className={paymentMethodState === (key+1) ? 'selected_payment_container' : 'payment_container'}
											//style={{background: paymentMethodState === (key+1) ? '#000000' : '#ffffff'}}
										>
											<div style={{height: 24,display: 'flex', alignItems: 'center'}}>
												{
													item?.logo?.url ? <img src={item?.logo?.url} alt={'mobile_filter_icon'} style={{height: 30}} /> : <PayCircleOutlined />
												}


											</div>
											<div style={{margin: '0 12px', fontSize: 14, fontWeight: 500}}>
												{item.title}
											</div>


										</div>
									</div>

						})}
					</div>

		</div>
	)
}
export default AppPaymentMethods
