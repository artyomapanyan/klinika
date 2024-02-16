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

function AppointmentCalendar({ appointmentObj, setappointmentObj }) {
	const [loading, setLoading] = useState(true)
	const [date, setDate] = useState([dayjs(), dayjs().add(6, 'day')])
	const [data, setData] = useState({ workload: [] })
	const [showCount, setShowCount] = useState(10)
	const [search, setSearch] = useState('')

	let token = useSelector(state => state.auth.token)
	useEffect(() => {
		setLoading(true)
		if (appointmentObj?.service_type) {
			if (
				appointmentObj?.service_type === 'nursing' ||
				appointmentObj?.service_type === 'laboratory_clinic_visit' ||
				appointmentObj?.service_type === 'laboratory_home_visit'
			) {
				setLoading(true)
				postResource('Dashboard', 'ClinicWorkload', token, '', {
					from: date[0].format('YYYY-MM-DD'),
					to: date[1].format('YYYY-MM-DD'),
					clinic: appointmentObj?.clinic_id,
					service: appointmentObj?.service_type
				}).then(response => {
					setData({
						clinic_id: response.clinic.id,
						clinic: response.clinic,
						workload: Object.values(response.workload)
					})
					setLoading(false)
				})
			} else {
				postResource('Dashboard', 'DoctorWorkload', token, '', {
					from: date[0].format('YYYY-MM-DD'),
					to: date[1].format('YYYY-MM-DD'),
					clinic: appointmentObj?.clinic_id,
					service: appointmentObj?.service_type
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
			}
		}
	}, [date, appointmentObj?.service_type, appointmentObj?.specialty_id])

	return (
		<section className={'table_conteiner'}>
			<Spin spinning={loading}>
				<AppointmentCalendarHead date={date} setDate={setDate} />
				<div className='container-fluid'>
					<div className='row'>
						<div className='d-flex justify-content-center w-100'>
							<div className='col-12 card mb-4 cardStyle'>
								<div className='card-body'>
									<div className='scrollXHide'>
										<table className='w-100' style={{ marginTop: -10 }}>
											<tbody>
												<tr className='d-flex align-items-center justify-content-between w-100'>
													{appointmentObj?.service_type !== 'nursing' &&
													appointmentObj?.service_type !==
														'laboratory_clinic_visit' &&
													appointmentObj?.service_type !==
														'laboratory_home_visit' ? (
														<td>
															<div className='input-group md-form form-sm pl-0 mr-3 searchInput'>
																<Input
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
														</td>
													) : null}
													{[...Array(7).keys()].map((e, k) => {
														return (
															<td
																key={e}
																className='appointmentsDate'
																style={{
																	height: 48,
																	paddingLeft: k === 0 ? 20 : 0
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

											{data.workload
												?.slice(0, showCount)
												?.map((item, key) =>
													appointmentObj?.service_type === 'nursing' ||
													appointmentObj?.service_type ===
														'laboratory_clinic_visit' ||
													appointmentObj?.service_type ===
														'laboratory_home_visit' ? (
														<NursLabCalendarCollapse
															key={key}
															item={item}
															appointmentObj={appointmentObj}
															setappointmentObj={setappointmentObj}
														/>
													) : (
														<AppointmentCalendarCollapse
															key={key}
															item={item}
															search={search}
															appointmentObj={appointmentObj}
															setappointmentObj={setappointmentObj}
														/>
													)
												)}
										</table>
										<div style={{ padding: 10, display: 'flex', gap: 10 }}>
											{data.workload.length > showCount ? (
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
