import React, { useEffect, useRef, useState, useMemo } from 'react'

import { Button, Form, Input, Space, notification } from 'antd'
import { postResource } from '../../../Functions/api_calls'
import { useSelector } from 'react-redux'
import { t } from 'i18next'
import FormInput from '../../../Fragments/FormInput'


function AppPersonalDetails({
	setDataState,
	dataState,
	setResponseCodeState,
	responseCodeState,
	params,
	dataTimes,
	date,
	setNamesState,
	namesState,
	showPayment,
	setShowPayment,
	show,verifyState,setVerifyState
}) {
	let token = useSelector(state => state.auth.token)
	let formRef = useRef()
	let refObj = formRef?.current?.getFieldValue()
	const [phoneLoading, setPhoneLoading] = useState(false)
	//const [verifyState, setVerifyState] = useState(0)
	const [codeAndNumber, setCodeAndNumber] = useState()
	const [verifyResponse, setVerifyResponse] = useState()
	const [codeAndNumberState, setCodeAndNumberState] = useState({})
	const [codeStatus, setCodeStatus] = useState(null)
	const [changeVerifyCode, setChangeVerifyCode] = useState('')
	const [sendAgain, setSendAgain] = useState({})



	useEffect(() => {
		if (dataState?.payment_method_id) {
			if (verifyResponse?.patient?.id) {
				setDataState(prevState => ({
					...prevState,
					booked_at: date.format('YYYY-MM-DD') + ' ' + dataTimes,
					code: codeAndNumber?.code,
					patient_id: verifyResponse?.patient?.id,
					offer_id: params.id
				}))
			} else {
				setDataState(prevState => ({
					...prevState,
					offer_id: params.id,
					code: codeAndNumber?.code,
					booked_at: date?.format('YYYY-MM-DD') + ' ' + dataTimes,
					patient: {
						...namesState,
						phone_number: codeAndNumber?.phone_number,
						phone_country_code: codeAndNumber?.phone_country_code
					}
				}))
			}
		}
	}, [dataState?.payment_method_id, namesState])

	const onVerifyNumber = values => {
		setPhoneLoading(true)
		setSendAgain(values)
		postResource('PublicOffer', 'PhoneVerify', token, '', values).then(
			response => {
				setCodeStatus(response)
				setPhoneLoading(false)
				if (response?.errors === null) {
					setVerifyState(1)
				} else {
					setVerifyState(0)
				}
			}
		)
		setCodeAndNumber(values)
	}

	const onSendAgain = values => {
		setPhoneLoading(true)
		postResource('PublicOffer', 'PhoneVerify', token, '', sendAgain).then(
			response => {
				setCodeStatus(response)
				setPhoneLoading(false)
				if (response?.errors === null) {
					setVerifyState(1)
				} else {
					setVerifyState(0)
				}
			}
		)
		setTime([1, 59])
	}

	const [api, contextHolder] = notification.useNotification()

	// const enterInput = (e) => {
	//     setDataState((prevState) => ({
	//         ...prevState,
	//         verifyNumber: e?.target?.value,
	//     }))
	// }

	const openNotification = placement => {
		api.error({
			message: `Notification`,
			description: t('You entered an incorrect code'),
			placement
		})
	}

	const onVerifyCode = values => {
		values = {
			...values,
			phone_country_code: codeAndNumber?.phone_country_code,
			phone_number: codeAndNumber?.phone_number
		}
		setCodeAndNumber(values)

		setPhoneLoading(true)
		postResource('PublicOffer', 'CodeVerify', token, '', values).then(
			response => {
				setResponseCodeState(response)
				setVerifyResponse(response)
				setPhoneLoading(false)
				setNamesState({
					first: response?.patient?.first,
					last: response?.patient?.last,
					email: response?.patient?.email
				})

				if (
					response?.message ===
					'Verification code successfully sent to your phone number'
				) {
					setDataState(prevState => ({
						...prevState,
						verifyNumber:
							'Verification code successfully sent to your phone number'
					}))
				}

				if (
					response === 'You entered an incorrect code' ||
					response === 'لقد قمت بإدخال رمز غير صحيح'
				) {
					openNotification('bottomRight')
				}
			}
		)
	}

	const hoursMinSecs = {}
	const { minutes = 2, seconds = 0 } = hoursMinSecs
	const [[mins, secs], setTime] = React.useState([minutes, seconds])
	const onSendSMSAgain = () => {
		setVerifyState(0)
		setCodeAndNumber(null)
		setTime([1, 59])
	}

	const tick = () => {
		if (mins === 0 && secs === 0) clearInterval()
		else if (secs === 0) {
			setTime([mins - 1, 59])
		} else {
			setTime([mins, secs - 1])
		}
	}

	React.useEffect(() => {
		if (codeAndNumber) {
			const timerId = setInterval(() => tick(), 1000)
			return () => clearInterval(timerId)
		}
	})

	const handleMapItems = (item, name) => {
		name = item.phone_code ? `(${item.phone_code}) ${item.name} ` : null
		item.id = item.phone_code
		return [name, item]
	}

	const handleValuesChange = changed => {
		setCodeAndNumberState(prevState => ({
			...prevState,
			...changed
		}))
	}

	const onChangeVerifyCode = (changed) => {
		setChangeVerifyCode(changed)
	}

	const handleNamesChange = changed => {
		setNamesState(prevState => ({
			...prevState,
			...changed
		}))
	}



	return (
		<div className={'all_offer_details_big_div'}>
			{contextHolder}

			{show ? (
				<>
					<Space>
						<h2 style={{ fontWeight: 600 }}>{t('Your Information')}</h2>
					</Space>
					<div>
						<div>
							{verifyState === 0 && (
								<Form
									onFinish={onVerifyNumber}
									onValuesChange={handleValuesChange}
									name={'send'}
								>
									<div style={{display: 'flex', gap: 10}}>
										<div style={{ width: '40%'}} className={'all_offer_code'}>
											<FormInput
												label={t('Code')}
												name={'phone_country_code'}
												inputType={'resourceSelect'}
												rules={[{ required: true }]}
												handleMapItems={handleMapItems}
												resource={'PublicCountry'}
											/>
										</div>
										<div style={{ width: '60%'}}>
											<FormInput
												label={t('Phone number')}
												name={'phone_number'}
												maxLength={10}
												rules={[{ required: true }]}
											/>
										</div>


									</div>
									<Button
										disabled={
											!codeAndNumberState?.phone_country_code ||
											!codeAndNumberState?.phone_number
										}
										loading={phoneLoading}
										style={{ marginTop: 5, width: '100%'}}
										type={'primary'}
										htmlType={'submit'}
									>
										{t('Send code')}
									</Button>
								</Form>
							)}

							{!responseCodeState || typeof responseCodeState == 'string' ? (
								verifyState === 1 && (
									<div>
										<Form name={'verify_code'} onValuesChange={onChangeVerifyCode} onFinish={onVerifyCode}>
											<div>
												<div>
													<Input
														value={`+${codeAndNumber?.phone_country_code} ${codeAndNumber?.phone_number}`}
														style={{
															marginTop: 7,
															height: 46,
															borderRadius: 12,
															background: '#F5F6FA',
															border: 'none'
														}}
													/>
												</div>
												<div
													style={{
														display: 'flex',
														justifyContent: 'flex-end',
														marginTop: '10px',
														width: '100%'
													}}

												>
													<div onClick={onSendSMSAgain} style={{cursor: 'pointer'}} align={'right'}>
														{t('Change Number')}
													</div>

												</div>

												<div style={{ display: 'flex', width: '100%', gap: 10, justifyContent: 'space-between' }}>

													<div style={{width:'30%', display: 'flex', flexDirection: 'row', paddingTop: 10}}>
														{mins == 0 && secs == 0 ? (
															<div
																style={{ color: '#BF539E', cursor: 'pointer'}}
																onClick={onSendAgain}
															>
																{t('Send Again')}
															</div>
														) : (
															<div align={'center'}>
																<div style={{color: '#BF539E'}}>{t('Resend code')}</div>
																<div>{t('after')} {`${mins.toString().padStart(2, '0')}:${secs
																	.toString()
																	.padStart(2, '0')}`}</div>
															</div>

														)}
													</div>
													<div style={{width: '40%'}}>
														<FormInput label={t('Verify code')} name={'code'} />
													</div>
													<div style={{width: '20%'}}>
														<Button
															disabled={!changeVerifyCode?.code}
															loading={phoneLoading}
															style={{
																background: '',
																marginTop: 5,
																height: 47
															}}
															type={'primary'}
															htmlType={'submit'}
														>
															{t('Verify')}
														</Button>
													</div>


												</div>
											</div>
										</Form>
									</div>
								)
							) : (
								<div></div>
							)}

							{responseCodeState &&
							typeof responseCodeState !== 'string' &&
							showPayment === false ? (
								<div>
									<Space style={{ width: '100%' }} direction={'vertical'}>
										<Form ref={formRef} onValuesChange={handleNamesChange}>
											<FormInput
												inputDisabled={verifyResponse?.patient?.first}
												label={t('First Name')}
												name={'first'}
												initialValue={verifyResponse?.patient?.first}
												rules={[{ required: true }]}
											/>
											<FormInput
												inputDisabled={verifyResponse?.patient?.last}
												label={t('Last Name')}
												name={'last'}
												initialValue={verifyResponse?.patient?.last}
												rules={[{ required: true }]}
											/>
											<FormInput
												inputDisabled={verifyResponse?.patient?.email}
												label={t('Email')}
												name={'email'}
												initialValue={verifyResponse?.patient?.email}
												rules={[{ required: true }]}
											/>
										</Form>
										{/*<Button*/}
										{/*	onClick={handleShowPayment}*/}
										{/*	size={'large'}*/}
										{/*	type={'primary'}*/}
										{/*	style={{ marginTop: '0px' }}*/}
										{/*>*/}
										{/*	continue*/}
										{/*</Button>*/}
									</Space>
								</div>
							) : (
								<div></div>
							)}
						</div>
					</div>
				</>
			) : (
				<div></div>
			)}
		</div>
	)
}

export default AppPersonalDetails

/**
 * 
 * {shownames == true ? (
								''
							) : (
								<>
									{responseCodeState &&
									typeof responseCodeState !== 'string' ? (
										<div>
											<Space style={{ width: '100%' }} direction={'vertical'}>
												<Form ref={formRef} onValuesChange={handleNamesChange}>
													<FormInput
														inputDisabled={verifyResponse?.patient?.first}
														label={t('First Name')}
														name={'first'}
														initialValue={verifyResponse?.patient?.first}
														rules={[{ required: true }]}
													/>
													<FormInput
														inputDisabled={verifyResponse?.patient?.last}
														label={t('Last Name')}
														name={'last'}
														initialValue={verifyResponse?.patient?.last}
														rules={[{ required: true }]}
													/>
													<FormInput
														inputDisabled={verifyResponse?.patient?.email}
														label={t('Email')}
														name={'email'}
														initialValue={verifyResponse?.patient?.email}
														rules={[{ required: true }]}
													/>
												</Form>
											</Space>
										</div>
									) : (
										<div></div>
									)}
								</>
							)}
 * 
 */
