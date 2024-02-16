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
	appointMentObj,
	setAppointMentObj
}) {
	let language = useSelector(state => state?.app?.current_locale)
	const [loading, setLoading] = useState(false)
	const [times, setTimes] = useState([])
	const [noTimes, setNoTimes] = useState(false)
	const formRef = useRef()
	let token = useSelector(state => state.auth.token)

	useEffect(() => {
		if (appointMentObj.service_type) {
			if (
				appointMentObj?.service_type === 'nursing' ||
				appointMentObj?.service_type === 'laboratory_clinic_visit' ||
				appointMentObj?.service_type === 'laboratory_home_visit'
			) {
				setLoading(true)
				postResource(
					'Clinic',
					'ClinicsAvailableTimes',
					token,
					appointMentObj.clinic_id,
					{
						date: selectedDate,
						service: appointMentObj.service_type
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
					doctor.id + '/' + appointMentObj.clinic_id,
					{
						service: appointMentObj.service_type,
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
		setAppointMentObj(prevState => ({
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
		console.log(appointMentObj)
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
					</div>
				) : null}
				<div>
					{loading ? (
						<Preloader />
					) : times.length ? (
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
						</Form.Item>
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

				{appointMentObj?.service_type === 'nursing' ? (
					<FormInput
						label={t('Nursing tasks')}
						disableClear={true}
						name={'nursing_tasks'}
						inputProps={{
							mode: 'multiple'
						}}
						rules={[{ required: true }]}
						resourceParams={{
							clinic: appointMentObj.clinic_id,
							status: 2
						}}
						inputType={'resourceSelect'}
						resource={'NursingTask'}
					/>
				) : null}
				{appointMentObj?.service_type === 'laboratory_clinic_visit' ||
				appointMentObj?.service_type === 'laboratory_home_visit' ? (
					<div>
						<FormInput
							label={t('Lab Tests')}
							name={'lab_tests'}
							rules={[
								{
									required:
										!appointMentObj?.lab_packages &&
										!appointMentObj?.lab_packages?.length,
									message: 'Please enter Lab test or Lab package'
								}
							]}
							inputType={'resourceSelect'}
							resourceParams={{
								clinic: appointMentObj.clinic_id,
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
										!appointMentObj?.lab_tests ||
										!appointMentObj?.lab_tests?.length,
									message: 'Please enter Lab test or Lab package'
								}
							]}
							inputType={'resourceSelect'}
							resourceParams={{
								clinic: appointMentObj.clinic_id,
								status: 2
							}}
							resource={'LabPackage'}
						/>
					</div>
				) : null}
				{appointMentObj.service_type === 'home_visit' ||
				appointMentObj.service_type === 'physical_therapy_home_visit' ||
				appointMentObj.service_type === 'laboratory_home_visit' ||
				appointMentObj.service_type === 'nursing' ? (
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
						clinic: appointMentObj.clinic_id,
						status: 2,
						approved: 1,
						doctor: doctor?.id,
						for_date: selectedDate
					}}
					resource={'Offer'}
				/>
				<Button
					type={'primary'}
					htmlType={'submit'}
					style={{ width: '100%', height: '44px' }}
				>
					{t('Add')}
				</Button>
			</Form>

			<div></div>
		</div>
	)
}

export default AppointmentCalendarModal
