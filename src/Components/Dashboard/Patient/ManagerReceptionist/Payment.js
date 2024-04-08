import { t } from 'i18next'
import { Button, Col, Row, Form, Space, Card, Checkbox } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import './Payment.sass'
import {
	postResource,
	createResource,
	useGetResourceSingle
} from '../../../Functions/api_calls'
import { useDispatch, useSelector } from 'react-redux'
import Preloader from '../../../Preloader'

const Payment = ({ appointment_id, selectedFutureVisits }) => {
	const [invoicePrice, setInvoicePrice] = useState(null)
	const [paymentRecievedLoading, setPaymentRecievedLoading] = useState(false)
	const [undoPaymentLoading, setUndoPaymentLoading] = useState(false)
	const [finishLoading, seFinishLoading] = useState(false)
	let token = useSelector(state => state.auth.token)
	const [invoiceLoading, setInvoiceLoading] = useState(false)

	useEffect(() => {
		setInvoiceLoading(true)
		postResource('Appointment', 'ServicePaymentCalculation', token, '', {
			appointments: [appointment_id, ...selectedFutureVisits]
		}).then(response => {
			setInvoicePrice(response)
			setInvoiceLoading(false)
		})
	}, [selectedFutureVisits])

	const paymentRecieved = () => {
		setPaymentRecievedLoading(true)
		postResource('Appointment', 'PaymentReceived', token, '', {
			appointments: [appointment_id, ...selectedFutureVisits]
		}).then(response => {
			setPaymentRecievedLoading(false)
		})
	} 

	const undoPayment = () => {
		setPaymentRecievedLoading(true)
		postResource('Appointment', 'UndoPayment', token, '', {
			appointments: [appointment_id, ...selectedFutureVisits]
		}).then(response => {
			setPaymentRecievedLoading(false)
		})
	} 

	return (
		<div
			className='payment-section'
			style={{ background: '#ffffff', margin: '24px 24px', borderRadius: 12 }}
		>
			{invoiceLoading ? (
				<Preloader></Preloader>
			) : (
				<div style={{ padding: 20 }}>
					<h2 style={{ marginTop: 20, marginBottom: 40 }} className={'h1'}>
						<span>{t('Payment')}:</span>
					</h2>
					<div>
						<Row>
							<Col lg={3}>
								<div className='payment-header'>{t('Sub total')}</div>
								<div className='payment-item'>
									{invoicePrice?.sub_total + ' SAR'}
								</div>
							</Col>
							<Col lg={3}>
								<div className='payment-header'>{t('Services')}</div>
								<div className='payment-item'>
									{invoicePrice?.services}
								</div>
							</Col>
							<Col lg={3}>
								<div className='payment-header'>{t('Service fee')}</div>
								<div className='payment-item'>
									{invoicePrice?.service_fee + ' SAR'}
								</div>
							</Col>
							<Col lg={3}>
								<div className='payment-header'>{t('Tax')}</div>
								<div className='payment-item'>{invoicePrice?.tax + ' SAR'}</div>
							</Col>
							<Col lg={3} style={{ color: '#774D9D' }}>
								<div className='payment-header'>{t('Total')}</div>
								<div className='payment-item'>
									{invoicePrice?.total + ' SAR'}
								</div>
							</Col>
							<Col lg={9}>
								<div style={{ float: 'inline-end' }}>
									<Button
										loading={paymentRecievedLoading}
										size={'large'}
										type={'primary'}
										htmlType='submit'
										style={{ marginInlineEnd: 0 }}
										onClick={paymentRecieved}
									>
										{t('Payment Recieved')}
									</Button>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			)}
		</div>
	)
}
export default Payment
