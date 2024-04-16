import { t } from 'i18next'
import { Button, Col, Row, Checkbox, Modal, Form } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import Resources from '../../../../store/Resources'
import { useSelector } from 'react-redux'
import Preloader from '../../../Preloader'
import { postResource, createResource } from '../../../Functions/api_calls'
import './FutureApps.sass'
import AppointmentCalendar from '../../Appointments/Fragments/AppointmentCalendar/AppointmentCalendar'
import dayjs from 'dayjs'
import booking_appointment from '../../../../dist/icons/booking_appointment.svg'
import { RascheduledContent } from '../../Appointments/StatusModalForms/RascheduledContent'

const FutureApps = ({
	appointment_id,
	status,
	selectedFutureVisits,
	setSelectedFutureVisits,
	paymentDone
}) => {
	let language = useSelector(state => state.app.current_locale)
	let token = useSelector(state => state.auth.token)
	let ownerClinics = useSelector(state => state?.owner)
	const rescheduleFormRef = useRef()
	const [disabled, setDisabled] = useState(false)
	const [appointmentObj, setappointmentObj] = useState(null)
	const [loading, setLoading] = useState(false)
	const [bookLoading, setBookLoading] = useState(0)
	const [rescheduleLoading, setRescheduleLoading] = useState(false)
	const [visitsState, setVisitsState] = useState([])
	const [defaultPagination, setDefaultPagination] = useState({
		order: 'desc',
		order_by: 'order',
		per_page: 100,
		page: 1
	})

	useEffect(() => {
		setDisabled(status == 2 || paymentDone)
	}, [status, paymentDone])

	useEffect(() => {
		loadVisits()
	}, [])

	const loadVisits = () => {
		setLoading(true)
		postResource('FutureVisits', 'single', token, '', {
			appointment: appointment_id,
			...defaultPagination
		}).then(response => {
			setLoading(false)
			if (!response.errors) {
				let visitsArray = []
				response?.items.forEach(record => {
					if (record?.availability?.['supported'].length) {
						visitsArray.push({
							...record,
							supported: true,
							items: record?.availability?.['supported'].map(obj => {
								return {
									...obj,
									name: obj.service.title ? obj.service.title : obj.service.name
								}
							}),
							price:
								record.service_type === 'doctor_visit'
									? record?.availability?.['supported'][0].price
									: record?.availability?.['supported'].reduce(
											(total, currentItem) => {
												if (parseFloat(currentItem.price)) {
													return total + parseFloat(currentItem.price)
												}
												return total
											},
											0
									  )
						})
					}
					if (record?.availability?.['non_supported'].length) {
						visitsArray.push({
							...record,
							supported: false,
							items: record?.availability?.['non_supported'].map(obj => {
								return {
									...obj,
									name: obj.service.title ? obj.service.title : obj.service.name
								}
							}),
							price: 0
						})
					}
				})
				setVisitsState(visitsArray)
			}
		})
	}

	const showBookingModal = visit => {
		let serviceType = null
		switch (visit.service_type) {
			case 'doctor_visit':
				serviceType = 'clinic_visit'
				break
			case 'laboratory':
				serviceType = 'laboratory_clinic_visit'
				break
			default:
				serviceType = visit.service_type
		}
		setappointmentObj(prevState => ({
			...prevState,
			future_visit_id: visit.id,
			clinic_id: ownerClinics.id,
			patient_id: visit.appointment.patient.id,
			service_type: serviceType,
			specialty_id: visit.specialty?.id ?? undefined,
			lab_tests: visit.lab_tests.map(item => item.id),
			nursing_tasks: visit.nursing_tasks.map(item => item.id)
		}))
	}

	const createAppointment = bookingData => {
		let appointment = { ...appointmentObj, ...bookingData }
		setappointmentObj(null)
		setBookLoading(appointmentObj.future_visit_id)
		createResource('Appointment', appointment, token)
			.then(response => {
				if (response?.id) {
					setVisitsState(prevVisits => {
						const updatedVisits = prevVisits.map(visit => {
							if (visit.id === appointmentObj.future_visit_id) {
								return { ...visit, booked_appointment: response }
							}
							return visit
						})
						return updatedVisits
					})
				}
			})
			.finally(() => {
				setBookLoading(0)
			})
	}

	const showUpdatingModal = visit => {
		setappointmentObj({
			...visit.booked_appointment,
			future_visit_id: visit.id
		})
	}

	const RescheduleAppointment = values => {
		setRescheduleLoading(true)

		if (values?.booked_at) {
			values.booked_at =
				values.booked_at.format('YYYY-MM-DD') + ' ' + values.appointment_time
		}
		postResource(
			'Appointment',
			'appointmentStatus',
			token,
			`${appointmentObj.id}/switch-status`,
			{
				status: 4,
				...values
			}
		)
			.then(response => {
				if (response?.id) {
					setVisitsState(prevVisits => {
						const updatedVisits = prevVisits.map(visit => {
							if (visit.id === appointmentObj.future_visit_id) {
								return { ...visit, booked_appointment: response }
							}
							return visit
						})
						return updatedVisits
					})
				}
			})
			.finally(() => {
				setappointmentObj(null)
				setRescheduleLoading(false)
			})
	}

	const handleCancel = () => {
		setappointmentObj(null)
	}

	const handleCheckboxChange = appId => {
		if (selectedFutureVisits.includes(appId)) {
			setSelectedFutureVisits(selectedFutureVisits.filter(id => id !== appId))
		} else {
			setSelectedFutureVisits([...selectedFutureVisits, appId])
		}
	}

	return (
		<div className='future-apps'>
			{visitsState.length ? (
				<div
					style={{
						background: '#ffffff',
						margin: '24px 24px',
						borderRadius: 12
					}}
				>
					<div style={{ padding: 20 }}>
						<h2 style={{ marginTop: 20 }} className={'h1'}>
							<span>{t('Future')}: </span>
							<span style={{ fontWeight: 400 }}>{t('Appointments')}</span>
						</h2>
						<div>
							{loading ? (
								<Preloader></Preloader>
							) : (
								visitsState?.map((visit, visitIndex) => {
									return (
										<Row
											key={visitIndex}
											style={{
												borderTop: '1px dashed #A6A7BA',
												minHeight: 60,
												alignContent: 'center'
											}}
										>
											<Col lg={1} style={{ alignSelf: 'center' }}>
												<Checkbox
													key={visit.id}
													disabled={disabled || !visit?.booked_appointment || !visit?.supported}
													onChange={() =>
														handleCheckboxChange(visit.booked_appointment?.id)
													}
												>
													{`${(visitIndex + 1).toString().padStart(2, '0')}`}{' '}
												</Checkbox>
											</Col>
											<Col lg={9} style={{ alignSelf: 'center' }}>
												<div style={{padding:10}}>
													{visit.items
														.map(item => item.name?.[language])
														.join(', ')}
												</div>
											</Col>
											<Col lg={4} style={{ alignSelf: 'center' }}>
												{
													Resources.futureVisitTypes.find(
														e => e.id === visit.service_type
													)?.name
												}
											</Col>
											<Col lg={2} style={{ alignSelf: 'center' }}>
												<span style={{ fontWeight: 700 }}>
													{visit.price ? visit.price + ' SAR' : null}
												</span>
											</Col>
											<Col lg={8} style={{ alignSelf: 'center' }}>
												{visit?.booked_appointment && visit?.supported ? (
													<div
														style={{
															fontWeight: 500,
															float: 'inline-end',
															fontSize: 16
														}}
													>
														{visit?.booked_appointment?.doctor ? (
															<>
																<span style={{ marginInlineStart: 10 }}>
																	Dr. {visit?.booked_appointment?.doctor?.first}{' '}
																	{visit?.booked_appointment?.doctor?.last}
																</span>
															</>
														) : null}
														<span style={{ marginInlineStart: 10 }}>
															{dayjs(
																visit?.booked_appointment?.booked_at?.iso_string
															).format('hh:mm A, DD MMM YY')}
														</span>
														<span
															style={{
																marginInlineStart: 10,
																cursor: 'pointer'
															}}
															onClick={() => showUpdatingModal(visit)}
														>
															<img alt={'icons'} src={booking_appointment} />
														</span>
													</div>
												) : (
													<div style={{ float: 'inline-end' }}>
														{/* <Button
															size={'large'}
															type={'secondary'}
															htmlType='submit'
															style={{margin:10}}
														>
															{t('Right Now (2 in line)')}
														</Button> */}
														<Button
															loading={
																bookLoading === visit.id && visit?.supported
															}
															size={'large'}
															type={'primary'}
															htmlType='submit'
															disabled={disabled || !visit?.supported}
															onClick={() => showBookingModal(visit)}
														>
															{t('Book Appointment')}
														</Button>
													</div>
												)}
											</Col>
										</Row>
									)
								})
							)}
						</div>
					</div>
					<Modal
						width={'80%'}
						title='Add Appointment'
						footer={false}
						open={appointmentObj}
						onCancel={handleCancel}
						key={appointmentObj?.id || 0}
					>
						{appointmentObj?.id ? (
							<Form
								onFinish={RescheduleAppointment}
								//onValuesChange={handleValuesChange}
								ref={rescheduleFormRef}
							>
								<RascheduledContent
									loading={rescheduleLoading}
									modal={appointmentObj}
									onCancel={handleCancel}
									formRef={rescheduleFormRef}
								/>
							</Form>
						) : (
							<AppointmentCalendar
								appointmentObj={appointmentObj}
								setappointmentObj={createAppointment}
							/>
						)}
					</Modal>
				</div>
			) : null}
		</div>
	)
}

export default FutureApps
