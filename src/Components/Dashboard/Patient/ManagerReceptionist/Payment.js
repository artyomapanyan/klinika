import { t } from 'i18next'
import { Button, Col, Row, Form, Space, Card, Checkbox } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import './Payment.sass'

const Payment = ({ appointment_id }) => {
	const [invoicePrice, setInvoicePrice] = useState(null)
	const [paymentLoading, setPaymentLoading] = useState(false)

	useEffect(() => {
		setInvoicePrice({
			sub_total: 100,
			service_fee: 50,
			vat: 10,
			tax_percentage: 2,
			tax_percentage_for_service_fees: 3,
			total_price: 150
		})
	}, [])
	return (
		<div
			className='payment-section'
			style={{ background: '#ffffff', margin: '24px 24px', borderRadius: 12 }}
		>
			<div style={{ padding: 20 }}>
				<h2 style={{ marginTop: 20, marginBottom: 40 }} className={'h1'}>
					<span>{t('Payment')}:</span>
				</h2>
				<div>
					<Row>
						<Col lg={4} >
							<div className='payment-header'>{t('Sub total')}</div>
							<div className='payment-item'>
								{invoicePrice?.sub_total + ' SAR'}
							</div>
						</Col>
						{invoicePrice?.service_fee ? (
							<Col lg={4} >
								<div className='payment-header'>{t('Service fee')}</div>
								<div className='payment-item'>
									{invoicePrice?.service_fee + ' SAR'}
								</div>
							</Col>
						) : null}
						{invoicePrice?.vat ? (
							<Col lg={4} >
								<div className='payment-header'>{t('Tax')}</div>
								<div className='payment-item'>
									{invoicePrice?.vat + ' SAR'}
									<ul style={{ marginTop: 10, marginLeft: -20 }}>
										{invoicePrice?.tax_percentage !== '0' ? (
											<li className='payment-header'>
												{invoicePrice?.tax_percentage + '% ' + t('Task tax')}
											</li>
										) : null}
										{!invoicePrice?.tax_percentage_for_service_fees !== '0' &&
										invoicePrice?.tax_percentage_for_service_fees !== null ? (
											<li className='payment-header'>
												{invoicePrice?.tax_percentage_for_service_fees +
													'% ' +
													t('Service tax')}
											</li>
										) : null}
									</ul>
								</div>
							</Col>
						) : null}
						<Col lg={9}  style={{color:'#774D9D'}}>
							<div className='payment-header'>{t('Total')}</div>
							<div className='payment-item'>
								{invoicePrice?.total_price + ' SAR'}
							</div>
						</Col>
						<Col lg={3} >
							<Button
								loading={paymentLoading}
								size={'large'}
								type={'primary'}
								htmlType='submit'
                                style={{marginInlineEnd: 0}}
							>
								{t('Bayment Recieved')}
							</Button>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	)
}
export default Payment
