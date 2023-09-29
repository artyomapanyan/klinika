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

function BookAnAppointment({ data }) {
	let token = useSelector(state => state.auth.token)
	let params = useParams()
	let navigate = useNavigate()
	let dispatch = useDispatch()
	const location = useLocation()

	const [dataState, setDataState] = useState({})
	const [date, setDate] = useState()
	const [dataTimes, setDataTimes] = useState()
	const [responseCodeState, setResponseCodeState] = useState()
	const [loading, setLoading] = useState(false)
	const [namesState, setNamesState] = useState({})
	const [show, setShow] = useState(false)
	const [showpay, setShowpay] = useState(false)
	const [showthank, setShowthank] = useState(false)
	const [shownames, setShowNames] = useState(false)

	const onBooking = () => {
		setLoading(true)

		postResource('PublicAppointment', 'create', token, '', dataState).then(
			response => {
				setLoading(false)
				if (response?.appointment?.id) {
					console.log('booking confirmed')
					setShowthank(true)
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
			setShow(true)
		}

		if (responseCodeState?.patient) {
			setShowpay(true)
		}
		if(namesState?.first&&namesState?.last&&namesState?.email){
			setShowNames(true)
		}
	}, [dataState?.date, dataState?.time,namesState])

	
	return (
		<div>
			<div>
				{show === true ? (
					''
				) : (
					<>
						<div>
							<p className={'appointment_title'}>Select doctor and date</p>
						</div>
						<div>
							<AppDoctor
								data={data}
								setDataState={setDataState}
								dataState={dataState}
							/>
						</div>

						<div className={'calendar_div'}>
							<div className={'calendar_date_div'}>
								<AppDate
									data={data}
									setDataState={setDataState}
									dataState={dataState}
									date={date}
									setDate={setDate}
								/>
							</div>
							<div>
								<AppTime
									data={data}
									setDataState={setDataState}
									dataState={dataState}
									setDataTimes={setDataTimes}
								/>
							</div>
						</div>
					</>
				)}
				{showpay === true && showthank == true ? (
					''
				) : (
					<div>
						<AppPersonalDetails
							onBooking={onBooking}
							setNamesState={setNamesState}
							responseCodeState={responseCodeState}
							setDataState={setDataState}
							dataState={dataState}
							setResponseCodeState={setResponseCodeState}
							params={params}
							date={date}
							dataTimes={dataTimes}
							shownames={shownames}
						/>
					</div>
				)}
				{showthank == true ? (
					''
				) : (
					<>
						<div>
							<AppPaymentMethods
								data={data}
								setDataState={setDataState}
								dataState={dataState}
								responseCodeState={responseCodeState}
							/>
						</div>
					
					</>
				)}
					<div className={'app_btn'}>
							<Button
								loading={loading}
								onClick={onBooking}
								size={'large'}
								type={'primary'}
								style={{ marginTop: '20px' }}
								disabled={
									namesState?.first &&
									namesState?.last &&
									namesState?.email &&
									dataState?.doctor_id &&
									dataState?.date &&
									dataState?.time &&
									dataState?.payment_method_id
										? false
										: true
								}
								htmlType={'submit'}
							>
								{t('Book_now')}
							</Button>
						</div>
			</div>

		{/*	{showthank == true ? <ThankYouOffer /> : ''} */}
		</div>
	)
}
export default BookAnAppointment
