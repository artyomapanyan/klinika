import React, { useEffect, useState } from 'react'
import AppDoctor from './AppDoctor'
import AppDate from './AppDate'
import AppTime from './AppTime'
import AppPersonalDetails from './AppPersonalDetails'
import AppPaymentMethods from './AppPaymentMethods'
import { postResource } from '../../../Functions/api_calls'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router'
import { t } from 'i18next'
import ThankYouOffer from './ThankYouOffer'
import { Button, Divider } from 'antd'
import DateTimeSelect
	from "../../../Dashboard/DoctorReworked/Fragments/DoctorReworkedCalendar/Fragments/DateTimeSelect";
import AllOfferCalendar from "./AllOfferCalendar";

function BookAnAppointment({ data }) {
	let token = useSelector(state => state.auth.token)
	let params = useParams()
	let dispatch = useDispatch()


	const [dataState, setDataState] = useState({})
	const [date, setDate] = useState()
	const [dataTimes, setDataTimes] = useState()
	const [responseCodeState, setResponseCodeState] = useState()
	const [loading, setLoading] = useState(false)
	const [namesState, setNamesState] = useState({})
	const [show, setShow] = useState(false)
	const [showthank, setShowthank] = useState(false)
	const [showPayment, setShowPayment] = useState(false)
	const [showButtons, setShowButtons] = useState(true)
	const [verify, setVerify] = useState(0)


	const onBooking = () => {
		setLoading(true)

		postResource('PublicAppointment', 'create', token, '', dataState).then(
			response => {
				setLoading(false)
				if (response?.appointment?.id) {
					console.log('booking confirmed')
					//setShowthank(true)
					console.log('document.location.href ', document.location.href)
					console.log('response?.redirect ', response?.redirect)

					document.location.href = response?.redirect
				}
			}
		)
	}

	useEffect(() => {
		if (data?.clinic?.id) {
			dispatch({
				type: 'PUBLIC_CLINIC',
				payload: data?.clinic
			})
		}
	}, [data?.clinic?.id])

	useEffect(() => {
		if (dataState?.date) {
			dispatch({
				type: 'PUBLIC_CLINIC',
				payload: {
					date: dataState?.date
				}
			})
		}
		if (dataState?.time) {
			dispatch({
				type: 'PUBLIC_CLINIC',
				payload: {
					time: dataState?.time
				}
			})
		}
		if (dataState?.doctor_id && dataState?.date && dataState?.time) {
			// setShow(true)
		}

		if (responseCodeState?.patient) {
			//	setShowpay(true)
		}
	}, [dataState?.date, dataState?.time, namesState])

	const onShowCalendar = () => {
		setShow(true)
	}

	const handleShowPayment = () => {
		setShowPayment(true)
		setShowButtons(false)

	}

	const onCancel = () => {

		setShow(false)
		setShowPayment(false)
		setVerify(0)
		setResponseCodeState(null)
		setNamesState({})
		setDataState({})
	}
	const onCancelAll = () => {

		setShow(false)
		setShowPayment(false)
		setVerify(0)
		setResponseCodeState(null)
		setNamesState({})
		setDataState({})
		setShowButtons(true)
	}

console.log(dataState, 'sss')


	return (
		<div>
			<div>
				{show === true ? (
					''
				) : (
					<>
						<div
						 className={'tab_div_mobile_new_offer'}
						 >
							<div>
								<div>
									<p className={'appointment_title'}>{t('Select doctor and date')}</p>
								</div>
								<div >
									<AppDoctor
										data={data}
										setDataState={setDataState}
										dataState={dataState}
									/>
								</div>
							</div>
						</div>

						<div className={'calendar_div'}>
							<div className={'calendar_date_div'}>
								{/*<AppDate*/}
								{/*	data={data}*/}
								{/*	setDataState={setDataState}*/}
								{/*	dataState={dataState}*/}
								{/*	date={date}*/}
								{/*	setDate={setDate}*/}
								{/*	setDataTimes={setDataTimes}*/}
								{/*/>*/}
								{
									dataState?.doctor_id ? <AllOfferCalendar show={show} setDataTimes={setDataTimes} setDataState={setDataState} dataState={dataState} data={data} date={date} setDate={setDate}/> : <div></div>
								}


							</div>

						</div>
					</>
				)}
				{
					dataState?.doctor_id ? show ? <div></div> : <div>
						<div style={{marginTop: 10}}>
							<Button onClick={onShowCalendar} disabled={dataState?.doctor_id && dataState?.date && dataState?.time ? false : true} type={'primary'} style={{width: '100%'}}>{t('Continue')}1</Button>
						</div>
						<div style={{marginTop: 10}}>
							<Button onClick={onCancel} type={'secondary'} style={{width: '100%'}}>{t('Cancel')}</Button>
						</div>
					</div> : <div></div>
				}

				{
					<div>
						<AppPersonalDetails
							onBooking={onBooking}
							setNamesState={setNamesState}
							namesState={namesState}
							responseCodeState={responseCodeState}
							setDataState={setDataState}
							dataState={dataState}
							setResponseCodeState={setResponseCodeState}
							params={params}
							date={date}
							dataTimes={dataTimes}
							showPayment={showPayment}
							setShowPayment={setShowPayment}
							show={show}
							verifyState={verify}
							setVerifyState={setVerify}
						/>
					</div>
				}
				{
					!showPayment && !show ? <div></div> : showButtons ? <div>
						<div style={{marginTop: 10}}>
							<Button onClick={handleShowPayment} disabled={namesState?.first && namesState?.last && namesState?.email ? false : true} type={'primary'} style={{width: '100%'}}>{t('Continue')}2</Button>
						</div>
						<div style={{marginTop: 10}}>
							<Button onClick={onCancel} type={'secondary'} style={{width: '100%'}}>{t('Cancel')}</Button>
						</div>
					</div> : <div></div>
				}
				{showPayment == true ? (
					<div>
						<AppPaymentMethods
							data={data}
							setDataState={setDataState}
							dataState={dataState}
							responseCodeState={responseCodeState}
						/>
					</div>
				) : (
					''
				)}
				{
					<div>

					</div>
				}

				<div className={'tab_div_mobile_new_offer'}>

					<div>
						{
							dataState?.payment_method_id ? <div>

								<Button
									loading={loading}
									onClick={onBooking}
									type={'primary'}
									className={'all_offers_book_btns'}
									style={{ marginTop: '20px'}}
									// disabled={
									// 	namesState?.first &&
									// 	namesState?.last &&
									// 	namesState?.email &&
									// 	dataState?.doctor_id &&
									// 	dataState?.date &&
									// 	dataState?.time &&
									// 	dataState?.payment_method_id
									// 		? false
									// 		: true
									// }
									htmlType={'submit'}
								>
									{t('Book_now')}
								</Button>
								<div style={{marginTop: 10}}>
									<Button onClick={onCancelAll} type={'secondary'} className={'all_offers_book_btns'}>{t('Cancel')}</Button>
								</div>

							</div> : <div></div>
						}

					</div>
				</div>
			</div>
		
			{/** 	{showthank == true ? <ThankYouOffer /> : ''} */}
		</div>
	)
}
export default BookAnAppointment
