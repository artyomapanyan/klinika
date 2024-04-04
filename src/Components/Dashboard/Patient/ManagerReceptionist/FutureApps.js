import { t } from 'i18next'
import { Button, Col, Row, Checkbox, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import Resources from '../../../../store/Resources'
import { useSelector } from 'react-redux'
import Preloader from '../../../Preloader'
import {
	postResource,
	createResource,
} from '../../../Functions/api_calls'
import './FutureApps.sass'
import AppointmentCalendar from '../../Appointments/Fragments/AppointmentCalendar/AppointmentCalendar'
import dayjs from 'dayjs'
import booking_appointment from '../../../../dist/icons/booking_appointment.svg'

const FutureApps = ({ appointment_id, disabled = false }) => {
	let language = useSelector(state => state.app.current_locale)
	let token = useSelector(state => state.auth.token)
	let ownerClinics = useSelector(state => state?.owner)
	const [appointmentObj, setappointmentObj] = useState(null)
	const [loading, setLoading] = useState(false)
	const [bookLoading, setBookLoading] = useState(0)
	const [visitsState, setVisitsState] = useState([])
	const [defaultPagination, setDefaultPagination] = useState({
		order: 'desc',
		order_by: 'order',
		per_page: 100,
		page: 1
	})

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
							price: record?.availability?.['supported'].reduce(
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

	const showModal = visit => {
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

	const handleCancel = () => {
		setappointmentObj(null)
	}

	return (
		<div
			style={{ background: '#ffffff', margin: '24px 24px', borderRadius: 12 }}
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
										<Checkbox key={visit.id} disabled={!visit?.supported}>
											{visitIndex + 1}
										</Checkbox>
									</Col>
									<Col lg={9} style={{ alignSelf: 'center' }}>
										<div>
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
									<Col lg={4} style={{ alignSelf: 'center' }}>
										<span style={{ fontWeight: 700 }}>
											{visit.price ? visit.price + ' SAR' : null}
										</span>
									</Col>
									<Col lg={6} style={{ alignSelf: 'center' }}>
										{visit?.booked_appointment && visit?.supported ? (
											<div
												style={{
													fontWeight: 500,
													float: 'inline-end',
													margin: 20,
													fontSize: 16
												}}
											>
												{visit?.booked_appointment?.doctor ? (
													<>
														<span style={{ marginInlineStart: 10 }}>
															Dr. {visit?.booked_appointment?.doctor?.first } { visit?.booked_appointment?.doctor?.last}
														</span>
													</>
												) : null}
												<span style={{ marginInlineStart: 10 }}>
													{dayjs(
														visit?.booked_appointment?.booked_to?.iso_string
													).format('hh:mm A, DD MMM YY')}
												</span>
												<span style={{ marginInlineStart: 10 }}>
													<img alt={'icons'} src={booking_appointment} />
												</span>
											</div>
										) : (
											<Row>
												<Col lg={12} style={{ alignSelf: 'center' }}>
													{/* <Button
														loading={addLoading}
														size={'large'}
														type={'secondary'}
														htmlType='submit'
													>
														{t('Right Now (2 in line)')}
													</Button> */}
												</Col>
												<Col lg={12} style={{ alignSelf: 'center' }}>
													<Button
														loading={bookLoading === visit.id}
														size={'large'}
														type={'primary'}
														htmlType='submit'
														disabled={!visit?.supported}
														onClick={() => showModal(visit)}
													>
														{t('Book Appointment')}
													</Button>
												</Col>
											</Row>
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
			>
				<AppointmentCalendar
					appointmentObj={appointmentObj}
					setappointmentObj={createAppointment}
				/>
			</Modal>
		</div>
	)
}

export default FutureApps
