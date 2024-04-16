import { t } from 'i18next'
import { Button, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import './Payment.sass'
import { postResource } from '../../../Functions/api_calls'
import { useSelector } from 'react-redux'
import Preloader from '../../../Preloader'

const Payment = ({
	appointment_id,
	status,
	selectedFutureVisits,
	setData,
	paymentDone,
	setPaymentDone,
	updateState, 
	setUpdateState
}) => {
	let token = useSelector(state => state.auth.token)

	const [updateInvoiceState, setUpdateInvoiceState] = useState(0)
	const [invoicePrinted, setInvoicePrinted] = useState(false)
	const [invoicePrice, setInvoicePrice] = useState(null)
	const [disabled, setDisabled] = useState(false)

	const [invoiceLoading, setInvoiceLoading] = useState(false)
	const [paymentRecievedLoading, setPaymentRecievedLoading] = useState(false)
	const [undoPaymentLoading, setUndoPaymentLoading] = useState(false)
	const [printInvoiceLoading, setPrintInvoiceLoading] = useState(false)
	const [finishLoading, setFinishLoading] = useState(false)

	useEffect(() => {
		setInvoiceLoading(true)
		postResource('Appointment', 'ServicePaymentCalculation', token, '', {
			appointments: [appointment_id, ...selectedFutureVisits]
		}).then(response => {
			setInvoicePrice(response)
			setPaymentDone(!response.unpaid_amount)
			setInvoiceLoading(false)
		})
	}, [selectedFutureVisits, updateInvoiceState, updateState])

	useEffect(() => {
		if (status == 2) {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
	}, [status])

	const paymentRecieved = () => {
		setPaymentRecievedLoading(true)
		postResource('Appointment', 'PaymentReceived', token, '', {
			appointments: [appointment_id, ...selectedFutureVisits]
		}).then(response => {
			setPaymentRecievedLoading(false)
			setUpdateInvoiceState(updateInvoiceState + 1)
			setUpdateState(updateState + 1)
		})
	}

	const undoPayment = () => {
		setUndoPaymentLoading(true)
		postResource('Appointment', 'UndoPayment', token, '', {
			appointments: [appointment_id, ...selectedFutureVisits]
		}).then(response => {
			setUndoPaymentLoading(false)
			setUpdateInvoiceState(updateInvoiceState + 1)
			setUpdateState(updateState + 1)
		})
	}

	const printInvoice = () => {
		setPrintInvoiceLoading(true)
		postResource('Appointment', 'PrintInvoice', token, '', {
			download: 1,
			appointments: [appointment_id, ...selectedFutureVisits]
		}).then(response => {
			const url = window.URL.createObjectURL(new Blob([response]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', 'invoice.pdf')
			document.body.appendChild(link)
			link.click()
			setPrintInvoiceLoading(false)
			setInvoicePrinted(true)
		})
	}

	const finishAppointment = () => {
		setFinishLoading(true)
		postResource(
			'Appointment',
			'appointmentStatus',
			token,
			`${appointment_id}/switch-status`,
			{
				status: 2
			}
		).then(response => {
			setData(response)
			setFinishLoading(false)
			setUpdateInvoiceState(updateInvoiceState + 1)
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
				<div style={{ padding: 20, paddingBottom:40 }}>
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
								<div className='payment-item'>{invoicePrice?.services}</div>
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
							{!disabled ? (
								<Col lg={9}>
									<div style={{ float: 'inline-end' }}>
										{!paymentDone ? (
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
										) : (
											<div>
												<Button
													loading={undoPaymentLoading}
													size={'large'}
													type={'secondary'}
													htmlType='submit'
													style={{ marginInlineEnd: 5 }}
													onClick={undoPayment}
												>
													{t('Undo')}
												</Button>
												{!invoicePrinted ? (
													<Button
														loading={printInvoiceLoading}
														size={'large'}
														type={'primary'}
														htmlType='submit'
														style={{ marginInlineEnd: 0 }}
														onClick={printInvoice}
													>
														{t('Print Invoice')}
													</Button>
												) : (
													<Button
														loading={finishLoading}
														size={'large'}
														type={'primary'}
														htmlType='submit'
														style={{ marginInlineEnd: 0 }}
														onClick={finishAppointment}
													>
														{t('Finish appointment')}
													</Button>
												)}
											</div>
										)}
									</div>
								</Col>
							) : null}
						</Row>
					</div>
				</div>
			)}
		</div>
	)
}
export default Payment
