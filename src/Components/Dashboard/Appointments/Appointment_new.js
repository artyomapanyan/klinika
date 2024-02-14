import { useNavigate, useParams } from 'react-router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postResource } from '../../Functions/api_calls'
import { Button, Form, Space, Row, Col } from 'antd'
import { t } from 'i18next'
import Preloader from '../../Preloader'
import FormInput from '../../Fragments/FormInput'
import CreatePatient from './Fragments/CreatePatient'
import Resources from '../../../store/Resources'
import { LeftOutlined } from '@ant-design/icons'
import clinic_man_user_icon from '../../../dist/icons/clinic_man_user_icon.png'
import AppointmentCalendar from './Fragments/AppointmentCalendar/AppointmentCalendar'

const resource = 'Appointment'

function Appointment() {
	const [saveLoading, setSaveLoading] = useState(false)
	const [verifyLoading, setVerifyLoading] = useState(false)
	const [sendCodeLoading, setSendCodeLoading] = useState(false)

	const navigate = useNavigate()
	let dispatch = useDispatch()
	const searchFormRef = useRef()
	const patientFormRef = useRef()
	const appointmentFormRef = useRef()

	let token = useSelector(state => state.auth.token)
	let role = useSelector(state => state.auth.selected_role?.key)
	let ownerClinics = useSelector(state => state?.owner)
	let language = useSelector(state => state.app.current_locale)
	const [serviceTypeState, setServiceTypeState] = useState([])

	const [data, setData] = useState(null)
	const [patient, setPatient] = useState(null)
	const [codeAndPhone, setCodeAndPhone] = useState({
		phone_country_code: 966,
		phone_number: null
	})
	const [pageState, setPageState] = useState('initial')
	const [changeValuesState, setChangeValuesState] = useState({})
	const fetchedUsers = useRef([])

	useEffect(() => {
		setData(prevState => ({
			...prevState,
			clinic_id: ownerClinics.id
		}))
	}, [ownerClinics.id])

	useEffect(() => {
		if (data?.patient_id === undefined) {
			setPageState('initial')
		} else if (data?.patient_id === '0') {
			setPageState('unauthorized')
		} else {
			setPageState('selected')
		}
		console.log('state: ' + pageState)

		return () => {}
	}, [data?.patient_id])

	const onBack = () => {
		navigate(-1)
	}

	const onFinish = values => {}

	const handleValuesChange = (e, v) => {
		//setPageState('loading')
		setData(prevState => ({
			...prevState,
			...e
		}))
		if (e.patient_id) {
			const foundUser = fetchedUsers.current?.find(i => i.id === e?.patient_id)
			setPatient(foundUser)
		}
		setChangeValuesState(e)
		if (Object.keys(e).length > 0) {
			dispatch({
				type: 'DASHBOARD_STATE',
				payload: true
			})
		}
		//setLo(true)
		//setTimeout(() => {setLo(false)},500)
	}

	const searchByNumber = (item, name) => {
		fetchedUsers.current.push(item)

		if (item?.name === null) {
			name = (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						fontSize: '11px'
					}}
				>
					<div>Registered | App</div>
					<div>
						{codeAndPhone?.phone_country_code} {codeAndPhone?.phone_number}
					</div>
				</div>
			)
			let searchData = item.phone_number + item.email
			return [name, item, searchData]
		} else {
			name = (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						fontSize: '11px'
					}}
				>
					<div>
						{item.first} {item.last}
					</div>
					<div>
						+{item.phone_country_code}
						{item.phone_number}
					</div>
				</div>
			)
			let searchData = item.phone_number + item.email
			return [name, item, searchData]
		}
	}

	const onSendCode = () => {
		setSendCodeLoading(true)
		postResource(
			'PatientsVerificationCode',
			'PatientsPhoneVerify',
			token,
			'',
			codeAndPhone
		).then(response => {
			setPageState('codeSent')
			setSendCodeLoading(false)
		})
	}

	const onVerify = e => {
		if (data?.code?.length === 4) {
			setVerifyLoading(true)
			postResource('PatientsVerificationCode', 'PatientCodeVerify', token, '', {
				phone_country_code: codeAndPhone?.phone_country_code,
				phone_number: codeAndPhone?.phone_number,
				clinic_id: data?.clinic_id,
				code: data?.code
			}).then(response => {
				setPatient(response?.patient)
				setPageState('selected')
				setVerifyLoading(false)
			})
		}
	}

	const handleMapItems = (item, name) => {
		name = item.phone_code ? `(${item.phone_code}) ${item.name}` : null
		item.id = item.phone_code
		return [name, item]
	}

	useEffect(() => {
		if (data?.clinic_id) {
			postResource('Clinic', 'single', token, data?.clinic_id).then(
				responses => {
					setServiceTypeState(
						[
							{
								service: responses?.has_telehealth_service,
								id: 'telehealth',
								name: 'Telehealth'
							},
							{
								service: responses?.has_clinic_visit_service,
								id: 'clinic_visit',
								name: 'Clinic Visit'
							},
							{
								service: responses?.has_home_visit_service,
								id: 'home_visit',
								name: 'Home Visit'
							},
							{
								service: responses?.has_physical_therapy_home_visit_service,
								id: 'physical_therapy_home_visit',
								name: 'Physical Therapy Home Visit'
							},
							{
								service: responses?.has_physical_therapy_clinic_visit_service,
								id: 'physical_therapy_clinic_visit',
								name: 'Physical Therapy Clinic Visit'
							},
							{
								service: responses?.has_laboratory_home_visit_service,
								id: 'laboratory_home_visit',
								name: 'Laboratory Home Visit'
							},
							{
								service: responses?.has_nursing_service,
								id: 'nursing',
								name: 'Nursing'
							},
							{
								service: responses?.has_laboratory_clinic_visit_service,
								id: 'laboratory_clinic_visit',
								name: 'Laboratory Clinic Visit'
							}
						].filter(el => el.service === true)
					)
				}
			)
		}
	}, [data?.clinic_id])

	const saveAppointment = () => {
		appointmentFormRef.current.submit()

		let appointment = appointmentFormRef.current.getFieldsValue()
		if (pageState === 'selected') {
			delete appointment?.dob
		} else if (pageState === 'creation') {
			patientFormRef.current.submit()
			appointment.patient = patient
			appointment.dob = appointment.patient.dob.format('YYYY-MM-DD')
		}

		appointment.booked_at =
			appointment.booked_at.format('YYYY-MM-DD') +
			' ' +
			appointment.appointment_time

		setSaveLoading(true)

		if (appointment?.lab_packages) {
			appointment.lab_packages = [appointment.lab_packages]
		}

		console.log(appointment)
		// createResource(resource, appointment, token)
		// 	.then(response => {
		// 		if (response?.id) {
		// 			navigate(-1)
		// 		}
		// 	})
		// 	.finally(() => {
		// 		dispatch({
		// 			type: 'DASHBOARD_STATE',
		// 			payload: false
		// 		})
		// 		setSaveLoading(false)
		// 	})
	}

	return (
		<div className={'app_show_big_div'}>
			<div>
				<Button
					style={{ margin: '40px 24px', height: 45, width: 45 }}
					onClick={onBack}
				>
					<LeftOutlined />
				</Button>
				<span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Inter' }}>
					{t('Add new Appointment')}
				</span>
			</div>
			<Form
				onValuesChange={handleValuesChange}
				name='edit'
				onFinish={onFinish}
				layout='vertical'
				ref={searchFormRef}
				className={'add_create_form'}
			>
				<div className={'add_edit_content'}>
					<div className='gutter-row'>
						<Row>
							{!ownerClinics.id ? (
								<Col lg={6} className='gutter-row'>
									<FormInput
										label={t('Clinic')}
										name={'clinic_id'}
										inputType={'resourceSelect'}
										rules={[{ required: true }]}
										initialValue={null}
										initialData={[data?.clinic].filter(e => e)}
										inputProps={{
											onChange: (e, dat) => {
												setData(prevState => ({
													...prevState,
													specialty_id: null,
													doctor_id: null,
													booked_at: null,
													appointment_time: null,
													service_type: null,
													offer_id: null
												}))

												appointmentFormRef?.current?.setFieldsValue({
													specialty_id: null,
													doctor_id: null,
													booked_at: null,
													appointment_time: null,
													service_type: null,
													offer_id: null
												})
											}
										}}
										resourceParams={{
											active: 1
										}}
										resource={'Clinic'}
									/>
								</Col>
							) : null}
							<Col lg={4} className='gutter-row'>
								<FormInput
									label={t('Country Code')}
									name={'phone_country_code'}
									inputType={'resourceSelect'}
									rules={[{ required: true }]}
									initialValue={
										data?.appointment?.patient?.phone_country_code
											? data?.appointment?.patient?.phone_country_code
											: `(966) ${
													language === 'ar'
														? 'المملكة العربية السعودية'
														: 'Saudi Arabia'
											  }`
									}
									handleMapItems={handleMapItems}
									customSearchKey={'phone_code'}
									inputProps={{
										onChange: e =>
											setCodeAndPhone(prevState => ({
												...prevState,
												phone_country_code: e
											}))
									}}
									resource={'Country'}
								/>
							</Col>
							<Col lg={8} className='gutter-row'>
								<FormInput
									label={t('Select Patient (Search By phone number)')}
									name={'patient_id'}
									suffixIcon={
										<img
											src={clinic_man_user_icon}
											alt={'clinic_man_user_icon'}
										/>
									}
									inputType={'resourceSelect'}
									rules={[{ required: true }]}
									searchConfigs={{ minLength: 6 }}
									initialValue={null}
									inputProps={{
										onSearch: e => {
											if (e)
												setCodeAndPhone(prevState => ({
													...prevState,
													phone_number: e
												}))
										},
										notFoundContent: (
											<div
												style={{
													display: 'flex',
													flexDirection: 'row',
													justifyContent: 'space-between'
												}}
											>
												<div>{t('Not found')}</div>
											</div>
										)
									}}
									resourceParams={{
										phone_country_code: data?.phone_country_code
											? data?.phone_country_code?.length > 3
												? data?.phone_country_code?.slice(
														data?.phone_country_code?.indexOf('(') + 1,
														data?.phone_country_code?.indexOf(')')
												  )
												: data?.phone_country_code
											: '966',
										clinic_id: data?.clinic_id
									}}
									initialData={[]}
									handleMapItems={(item, name, status) =>
										searchByNumber(item, name, status)
									}
									handleStatus={true}
									customSearchKey={'phone_number'}
									resource={'PatientSearch'}
								/>
							</Col>
							<Col lg={6} className='gutter-row'>
								{pageState === 'initial' || pageState === 'creation' ? (
									<Button
										onClick={() => {
											appointmentFormRef.current.resetFields(['patient_id'])
											setPatient(codeAndPhone)
											setPageState('creation')
										}}
										type={'primary'}
										style={{ marginTop: 4 }}
										className={'all_offers_book_btns'}
									>
										{t('Create new')}
									</Button>
								) : (
									<div></div>
								)}
								{pageState === 'unauthorized' || pageState === 'codeSent' ? (
									<Button
										onClick={onSendCode}
										type={'primary'}
										style={{ marginTop: 4 }}
										className={'all_offers_book_btns'}
										disabled={pageState === 'codeSent'}
										loading={sendCodeLoading}
									>
										{t('Send request')}
									</Button>
								) : (
									<div></div>
								)}
							</Col>
						</Row>
						{pageState === 'codeSent' ? (
							<div>
								<Row>
									<Col lg={8} className='gutter-row'>
										<FormInput
											label={t('Code (4 digits)')}
											inputDisabled={pageState === 'unauthorized'}
											name={'code'}
										/>
									</Col>
									<Col lg={4} className='gutter-row'>
										<Button
											onClick={onVerify}
											type={'primary'}
											style={{ marginTop: 4 }}
											className={'all_offers_book_btns'}
											disabled={data?.code?.length !== 4}
											loading={verifyLoading}
										>
											{t('Verify')}
										</Button>
									</Col>
								</Row>
								<Row>
									<Col lg={12} className='gutter-row'>
										Send request for permissions to personal information. Please
										enter code from user or wait when user accept your request
										in app,
									</Col>
									<Col lg={12} className='gutter-row'>
										{t("Client didn't get a message")}? <br />
										<span
											onClick={onSendCode}
											style={{
												color: '#BF539E',
												fontWeight: 700,
												cursor: 'pointer'
											}}
										>
											{t('Resend Request')}
										</span>
									</Col>
								</Row>
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>
			</Form>
			{pageState === 'creation' || pageState === 'selected' ? (
					<div>
						<CreatePatient
							data={patient}
							setData={setPatient}
							formRef={patientFormRef}
						></CreatePatient>
					</div>
				) : (
					<div></div>
				)}
			{data?.clinic_id ? (
				serviceTypeState?.length ? (
					<div className={'add_edit_content'}>
						<Form ref={appointmentFormRef}
										onValuesChange={handleValuesChange}
										>
							<Row>
								<Col lg={8} className='gutter-row'>
									<FormInput
										label={t('Service Type')}
										name={'service_type'}
										inputType={'resourceSelect'}
										rules={[{ required: true }]}
										inputProps={{
											onChange: (e, data) => {
												appointmentFormRef?.current?.setFieldsValue({
													specialty_id: null,
													doctor_id: null,
													booked_at: null,
													appointment_time: null,
													lab_tests: undefined,
													lab_packages: null,
													offer_id: null,
													nursing_tasks: undefined,
													service_type: e
												})
												setData(prevState => ({
													...prevState,
													specialty_id: null,
													doctor_id: null,
													booked_at: null,
													appointment_time: null,
													lab_tests: null,
													lab_packages: null,
													offer_id: null,
													nursing_tasks: null,
													service_type: e
												}))
											}
										}}
										initialValue={null}
										initialData={serviceTypeState}
									/>
								</Col>
								{data?.service_type && 
								data?.service_type !== 'nursing' && data?.service_type !== 'laboratory_clinic_visit' && data?.service_type !== 'laboratory_home_visit'? (
								<Col lg={16} className='gutter-row'>
									<FormInput
										label={t('Specialties')}
										name={'specialty_id'}
										inputType={'resourceSelect'}
										rules={[{ required: true }]}
										initialValue={null}
										initialData={[]}
										inputProps={{
											onChange: (e, data) => {
												appointmentFormRef?.current?.setFieldsValue({
													doctor_id: null,
													booked_at: null,
													appointment_time: null,
													offer_id: null,
													specialty_id: e
												})
												setData(prevState => ({
													...prevState,
													doctor_id: null,
													booked_at: null,
													appointment_time: null,
													offer_id: null,
													specialty_id: e
												}))
											}
										}}
										resource={'Taxonomy'}
										customSearchKey={'title'}
										resourceParams={{
											type: Resources.TaxonomyTypes.SPECIALTY,
											has_parent: 0
										}}
									/>
								</Col>) : null
}
							</Row>
							<Row>
								{
									data.service_type === 'home_visit' || data.service_type ==='physical_therapy_home_visit' ||
									data.service_type === 'laboratory_home_visit' || data.service_type ==='nursing'?
									<Col lg={24} className="gutter-row">
										<FormInput label={t('Visit Address')} name={'address1'} 
										rules={[{required: true, message: 'Please enter visit address'}]}/>
									</Col> : <div></div>  
								}
							</Row>
						</Form>
						{data?.service_type ? (
							 <AppointmentCalendar appointMentObj={data} setAppointMentObj={setData}/>
						) : null}
						<Space className={'create_apdate_btns'}>
							<Button
								loading={saveLoading}
								size={'large'}
								type={'primary'}
								htmlType='submit'
								onClick={saveAppointment}
							>
								{t('Save Appointment')}
							</Button>
						</Space>
					</div>
				) : (
					<Preloader></Preloader>
				)
			) : null}
		</div>
	)
}

export default Appointment
