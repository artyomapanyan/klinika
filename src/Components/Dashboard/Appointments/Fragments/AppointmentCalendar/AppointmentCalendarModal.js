import { Avatar, Form, Space, Radio, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import Resources from '../../../../../store/Resources'
import { postResource } from '../../../../Functions/api_calls'
import { useSelector } from 'react-redux'
import FormInput from '../../../../Fragments/FormInput'
import { t } from 'i18next'
import Preloader from '../../../../Preloader'

function AppointmentCalendarModal({
	doctor,
	specialty,
	selectedDate,
	setSelectedDate,
	appointmentObj,
	setappointmentObj
}) {
	let language = useSelector(state => state?.app?.current_locale)
	const [loading, setLoading] = useState(false)
	const [times, setTimes] = useState([])
	const [noTimes, setNoTimes] = useState(false)
	const formRef = useRef()
	let token = useSelector(state => state.auth.token)

	useEffect(() => {
		if (appointmentObj.service_type) {
			if (
				appointmentObj?.service_type === 'nursing' ||
				appointmentObj?.service_type === 'laboratory_clinic_visit' ||
				appointmentObj?.service_type === 'laboratory_home_visit'
			) {
				setLoading(true)
				postResource(
					'Clinic',
					'ClinicsAvailableTimes',
					token,
					appointmentObj.clinic_id,
					{
						date: selectedDate,
						service: appointmentObj.service_type
					}
				).then(response => {
					setLoading(false)
					setTimes(response.flat())
					setNoTimes(response)
				})
			} else {
				setLoading(true)
				postResource(
					'ClinicDoctorAvailableTimeForDayByDoctorAndClinic',
					'single',
					token,
					doctor.id + '/' + appointmentObj.clinic_id,
					{
						service: appointmentObj.service_type,
						date: selectedDate
					}
				).then(response => {
					setLoading(false)
					setTimes(response.flat())
					setNoTimes(response.flat())
				})
			}
		}
	}, [])

	const addAppointment = values => {
		setappointmentObj(prevState => ({
			...prevState,
			booked_at: dayjs(selectedDate + ' ' + values.time).format(
				'YYYY-MM-DD HH:mm'
			),
			offer_id: values.offer_id, //? values.offer_id : null,
			doctor_id: doctor?.id,
			lab_packages: values.lab_packages ? [values.lab_packages] : [],
			address1: values.address1,

			//data to be deleted from the object before saving the appointment
			doctor: doctor,
			specialty: specialty
		}))
		setSelectedDate(false)
		console.log(appointmentObj)
	}

	return (
		<div
			className={
				language === 'ar'
					? 'clinic_manager_modal_big_div'
					: 'clinic_manager_modal_big_div_en'
			}
		>
			<Form ref={formRef} onFinish={addAppointment}>
				<Space>
					<h1 className={'cl_manager_calendar_modal_head'}>
						{dayjs(selectedDate).format('DD MMMM')}
					</h1>
					<h1 style={{ fontSize: 24, fontWeight: 300 }}>
						{Resources.Days[dayjs(selectedDate).day()]}
					</h1>
				</Space>
				<div>
					{loading ? (
						<Preloader />
					) : times.length ? (
						<div>
							<Form.Item
								name={'time'}
								rules={[
									{
										required: true
									}
								]}
							>
								<Radio.Group
									className={'hours_select_cl_manager_modal'}
									options={times.map(e => ({
										label: dayjs('2023-10-10' + e).format('h:mmA'),
										value: e
									}))}
									optionType='button'
									buttonStyle='solid'
								/>
								<br/>
							</Form.Item>
							{doctor ? (
								<div>
									<Space style={{ marginBottom: '20' }}>
										<Avatar
											size={56}
											src={doctor?.avatar?.url}
											icon={<UserOutlined />}
										/>
										<div style={{ display: 'block' }}>
											<div className={'cl_manager_modal_dr_name'}>
												{doctor.first} {doctor.last}
											</div>
											<div className={'cl_manager_modal_stecialty_name'}>
												{specialty}
											</div>
										</div>
									</Space>
									<br/><br/>
								</div>
							) : null}
							{appointmentObj?.service_type === 'nursing' ? (
								<FormInput
									label={t('Nursing tasks')}
									disableClear={true}
									name={'nursing_tasks'}
									inputProps={{
										mode: 'multiple'
									}}
									rules={[{ required: true }]}
									resourceParams={{
										clinic: appointmentObj.clinic_id,
										status: 2
									}}
									inputType={'resourceSelect'}
									resource={'NursingTask'}
								/>
							) : null}
							{appointmentObj?.service_type === 'laboratory_clinic_visit' ||
							appointmentObj?.service_type === 'laboratory_home_visit' ? (
								<div>
									<FormInput
										label={t('Lab Tests')}
										name={'lab_tests'}
										rules={[
											{
												required:
													!appointmentObj?.lab_packages &&
													!appointmentObj?.lab_packages?.length,
												message: 'Please enter Lab test or Lab package'
											}
										]}
										inputType={'resourceSelect'}
										resourceParams={{
											clinic: appointmentObj.clinic_id,
											status: 2
										}}
										inputProps={{
											mode: 'multiple'
										}}
										resource={'LabTest'}
									/>

									<FormInput
										label={t('Lab Packages')}
										name={'lab_packages'}
										rules={[
											{
												required:
													!appointmentObj?.lab_tests ||
													!appointmentObj?.lab_tests?.length,
												message: 'Please enter Lab test or Lab package'
											}
										]}
										inputType={'resourceSelect'}
										resourceParams={{
											clinic: appointmentObj.clinic_id,
											status: 2
										}}
										resource={'LabPackage'}
									/>
								</div>
							) : null}
							{appointmentObj.service_type === 'home_visit' ||
							appointmentObj.service_type === 'physical_therapy_home_visit' ||
							appointmentObj.service_type === 'laboratory_home_visit' ||
							appointmentObj.service_type === 'nursing' ? (
								<FormInput
									label={t('Visit Address')}
									name={'address1'}
									rules={[
										{
											required: true,
											message: 'Please enter visit address'
										}
									]}
								/>
							) : (
								<div></div>
							)}
							<FormInput
								label={t('Offers')}
								name={'offer_id'}
								inputType={'resourceSelect'}
								initialValue={null}
								initialData={[]}
								resourceParams={{
									clinic: appointmentObj.clinic_id,
									status: 2,
									approved: 1,
									doctor: doctor?.id,
									for_date: selectedDate
								}}
								resource={'Offer'}
							/>
							<br></br>
							<Button
								type={'primary'}
								htmlType={'submit'}
								style={{ width: '100%', height: '44px' }}
							>
								{t('Submit')}
							</Button>
						</div>
					) : (
						<div></div>
					)}
					{noTimes[0]?.length < 1 || noTimes?.length < 1 ? (
						<div
							align={'center'}
							style={{
								width: '100%',
								fontSize: 20,
								marginTop: 20,
								marginBottom: 20,
								fontWeight: 500,
								color: '#F3A632'
							}}
						>
							{t('There are no available times')}
						</div>
					) : (
						<div></div>
					)}
				</div>
			</Form>

			<div></div>
		</div>
	)
}

export default AppointmentCalendarModal
