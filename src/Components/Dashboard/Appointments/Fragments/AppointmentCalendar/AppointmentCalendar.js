import React, { useEffect, useState } from 'react'
import './AppointmentCalendar.scss'
import { Button, Input, Spin } from 'antd'
import AppointmentCalendarHead from './AppointmentCalendarHead'
import dayjs from 'dayjs'
import { postResource } from '../../../../Functions/api_calls'
import { useSelector } from 'react-redux'
import search_icon_black from '../../../../../dist/icons/search_icon_black.png'
import AppointmentCalendarCollapse from './AppointmentCalendarCollapse'
import NursLabCalendarCollapse from './NursLabCalendarCollapse'
import { t } from 'i18next'
import FormInput from '../../../../Fragments/FormInput'

function AppointmentCalendar({
	appointmentObj,
	setappointmentObj,
	createAppointment,
	servicesList
}) {
	const [loading, setLoading] = useState(false)
	const [hasLeftSide, setHasLeftSide] = useState(true)
	const [labNursing, setLabNursing] = useState(false)
	const [date, setDate] = useState([dayjs(), dayjs().add(6, 'day')])
	const [data, setData] = useState({ workload: [] })
	const [showCount, setShowCount] = useState(10)
	const [search, setSearch] = useState('')

	let token = useSelector(state => state.auth.token)

	useEffect(() => {
		setDate([dayjs(), dayjs().add(6, 'day')])
	}, [appointmentObj.service_type])
	useEffect(() => {
		if (appointmentObj?.service_type) {
			if (
				appointmentObj?.service_type === 'nursing' ||
				appointmentObj?.service_type === 'radiology' ||
				appointmentObj?.service_type === 'laboratory_clinic_visit' ||
				appointmentObj?.service_type === 'laboratory_home_visit'
			) {
				setLoading(true)
				setData(prevState => ({
					...prevState,
					workload: null
				}))
				// console.log(3333)
				postResource('Dashboard', 'ClinicWorkload', token, '', {
					from: date[0].format('YYYY-MM-DD'),
					to: date[1].format('YYYY-MM-DD'),
					clinic: appointmentObj?.clinic_id
				}).then(response => {
					setData({
						clinic_id: response.clinic.id,
						clinic: response.clinic,
						workload: Object.values(response.workload).filter(
							e => e.service === appointmentObj.service_type
						)
					})
					setLoading(false)
				})
			} else {
				if (appointmentObj?.specialty_id) {
					setLoading(true)
					postResource('Dashboard', 'DoctorWorkload', token, '', {
						from: date[0].format('YYYY-MM-DD'),
						to: date[1].format('YYYY-MM-DD'),
						clinic: appointmentObj?.clinic_id,
						service_type: appointmentObj?.service_type,
						specialty: appointmentObj?.specialty_id
					}).then(response => {
						setData({
							clinic_id: response.clinic.id,
							clinic: response.clinic,
							workload: Object.values(response.workload).filter(
								e => e.speciality_id === appointmentObj?.specialty_id
							)
						})
						setLoading(false)
					})
				} else {
					setData(null)
				}
			}
		}
	}, [date, appointmentObj?.service_type, appointmentObj?.specialty_id])

	useEffect(() => {
		setLabNursing(
			appointmentObj?.service_type === 'nursing' ||
				appointmentObj?.service_type === 'laboratory_clinic_visit' ||
				appointmentObj?.service_type === 'laboratory_home_visit'
		)
	}, [appointmentObj?.service_type])

	useEffect(() => {
		setHasLeftSide(!labNursing && !appointmentObj?.doctor_id)
	}, [labNursing, appointmentObj?.doctor_id])
	return (
		<section>
			<Spin spinning={loading}>
				<AppointmentCalendarHead
					date={date}
					setDate={setDate}
					calendarTitle={
						appointmentObj.future_visit_id
							? labNursing
								? 'Select time slot'
								: 'Select doctor and time slot'
							: labNursing
							? 'Laboratories and Nursing'
							: 'Appointments'
					}
					servicesList={servicesList}
					appointmentObj={appointmentObj}
					setappointmentObj={setappointmentObj}
				/>
				<div className='container-fluid'>
					<div className='row'>
						<div className='d-flex justify-content-center w-100'>
							<div className='col-12 card mb-4 cardStyle'>
								<div className='card-body'>
									<div className='scrollXHide'>
										<table className='w-100' style={{ marginTop: -10 }}>
											<tbody>
												<tr className='d-flex align-items-center justify-content-between w-100'>
													{hasLeftSide ? (
														<td style={{ width: '20%', paddingRight: 20 }}>
															
																{appointmentObj.future_visit_id ? (
																	<div style={{marginTop:22}}>
																	<FormInput
																		label={t('Service Type')}
																		name={'service_type'}
																		inputType={'resourceSelect'}
																		rules={[{ required: true }]}
																		initialData={servicesList}
																		initialValue={appointmentObj?.service_type}
																		inputProps={{
																			onChange: e =>
																				setappointmentObj(prevState => ({
																					...prevState,
																					service_type: e
																				}))
																		}}
																	/>
																	</div>
																) : (
																	<div className='input-group md-form form-sm pl-0 mr-3 searchInput'>
																	<Input
																		placeholder={t('Search for doctor')}
																		className={'search_input_clinic_man'}
																		onChange={e => setSearch(e.target.value)}
																		value={search}
																		aria-label='Search'
																		prefix={
																			<img
																				src={search_icon_black}
																				alt={'search_icon_black'}
																			/>
																		}
																	/>
																	</div>
																)}
															
														</td>
													) : null}
													{[...Array(7).keys()].map(e => {
														return (
															<td
																key={e}
																className='appointmentsDate'
																style={{
																	height: 48,
																	width: hasLeftSide ? '11.4%' : '14.3%'
																}}
															>
																<div
																	className='appointmentsDate__content'
																	style={{ height: 48, paddingTop: 14 }}
																>
																	<span className='appointmentsDate__content__text'>
																		{date[0].add(e, 'days').format('DD')}
																	</span>
																	<span
																		style={{ marginLeft: 5, fontSize: 18 }}
																		className='ppointmentsDate__content__text appointmentsDate__content__text--light'
																	>
																		{date[0].add(e, 'days').format('ddd')}
																	</span>
																</div>
															</td>
														)
													})}
												</tr>
											</tbody>

											{data?.workload
												?.slice(0, showCount)
												?.map((item, key) =>
													appointmentObj?.service_type === 'nursing' ||
													appointmentObj?.service_type === 'radiology' ||
													appointmentObj?.service_type ===
														'laboratory_clinic_visit' ||
													appointmentObj?.service_type ===
														'laboratory_home_visit' ? (
														<NursLabCalendarCollapse
															key={key}
															item={item}
															appointmentObj={appointmentObj}
															setappointmentObj={setappointmentObj}
															createAppointment={createAppointment}

														/>
													) : (
														<AppointmentCalendarCollapse
															key={key}
															item={item}
															search={search}
															appointmentObj={appointmentObj}
															setappointmentObj={setappointmentObj}
															createAppointment={createAppointment}
														/>
													)
												)}
										</table>
										<div style={{ padding: 10, display: 'flex', gap: 10 }}>
											{data?.workload?.length > showCount ? (
												<Button
													type={'primary'}
													onClick={() =>
														setShowCount(prevState => prevState + 10)
													}
												>
													{t('Show More')}
												</Button>
											) : null}
											{showCount > 10 ? (
												<Button
													type={'primary'}
													onClick={() =>
														setShowCount(prevState => prevState - 10)
													}
												>
													{t('Show Less')}
												</Button>
											) : null}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Spin>
		</section>
	)
}

export default AppointmentCalendar
