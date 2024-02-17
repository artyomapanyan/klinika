import { useNavigate } from 'react-router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postResource, createResource } from '../../Functions/api_calls'
import { Button, Form, Space, Row, Col, Avatar } from 'antd'
import { t } from 'i18next'
import Preloader from '../../Preloader'
import FormInput from '../../Fragments/FormInput'
import CreatePatient from './Fragments/CreatePatient'
import Resources from '../../../store/Resources'
import { LeftOutlined } from '@ant-design/icons'
import clinic_man_user_icon from '../../../dist/icons/clinic_man_user_icon.png'
import AppointmentCalendar from './Fragments/AppointmentCalendar/AppointmentCalendar'
import { UserOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const resource = 'Appointment'

function Appointment() {
	const [saveLoading, setSaveLoading] = useState(false)
	const [verifyLoading, setVerifyLoading] = useState(false)
	const [sendCodeLoading, setSendCodeLoading] = useState(false)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const searchFormRef = useRef()
	const patientFormRef = useRef()
	const appointmentFormRef = useRef()

	let token = useSelector(state => state.auth.token)
	let role = useSelector(state => state.auth.selected_role?.key)
	let doctor_id = useSelector(state => state.auth?.user?.id)
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
	const fetchedUsers = useRef([])
	const [invoicePrice, setInvoicePrice] = useState(0)
	const [nationality, setNationality] = useState(null)

	useEffect(() => {
		if (role === 'clinic-manager') {
			setData(prevState => ({
				...prevState,
				clinic_id: ownerClinics.id
			}))
		}

		if (role === 'doctor') {
			setData(prevState => ({
				...prevState,
				doctor_id: doctor_id
			}))
		}
	}, [ownerClinics.id])

	useEffect(() => {
		if (data?.patient_id === undefined) {
			setPageState('initial')
		} else if (data?.patient_id === null) {
			setPageState('creation')
			setNationality(null)
		} else if (data?.patient_id === '0') {
			setPageState('unauthorized')
		} else {
			setPageState('selected')
			setPatient(fetchedUsers.current?.find(i => i.id === data?.patient_id))
		}
	}, [data?.patient_id])

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

	const goBack = () => {
		navigate(-1)
	}

	const handleValuesChange = e => {
		setData(prevState => ({
			...prevState,
			...e
		}))
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

	const onVerify = () => {
		if (data?.code?.length === 4) {
			setVerifyLoading(true)
			postResource('PatientsVerificationCode', 'PatientCodeVerify', token, '', {
				phone_country_code: codeAndPhone?.phone_country_code,
				phone_number: codeAndPhone?.phone_number,
				clinic_id: data?.clinic_id,
				code: data?.code
			}).then(response => {
				fetchedUsers.current.push(response?.patient)
				setData(prevState => ({
					...prevState,
					patient_id: response?.patient?.id,
					code: null
				}))
				setVerifyLoading(false)
			})
		}
	}

	const handleMapItems = (item, name) => {
		name = item.phone_code ? `(${item.phone_code}) ${item.name}` : null
		item.id = item.phone_code
		return [name, item]
	}

	const saveAppointment = () => {
		let appointment = Object.assign({}, data)
		if (pageState === 'creation') {
			delete appointment.patient_id
			patientFormRef.current
				.validateFields()
				.then(() => {
					const patient = patientFormRef.current.getFieldsValue()
					appointment.patient = {
						...patient,
						dob: patient.dob?.format('YYYY-MM-DD'),
						phone_country_code:
							patient.phone_country_code.length > 3
								? patient?.phone_country_code?.slice(
										patient.phone_country_code.indexOf('(') + 1,
										patient.phone_country_code?.indexOf(')')
								  )
								: patient.phone_country_code
					}
					createAppointment(appointment)
				})
				.catch(error => {
					console.error('Validation failed:', error)
				})
		} else {
			delete appointment.patient
			searchFormRef.current
				.validateFields()
				.then(() => {
					createAppointment(appointment)
				})
				.catch(error => {
					console.error('Validation failed:', error)
				})
		}
	}

	const createAppointment = appointment => {
		setSaveLoading(true)
		createResource(resource, appointment, token)
			.then(response => {
				if (response?.id) {
					goBack()
				}
			})
			.finally(() => {
				dispatch({
					type: 'DASHBOARD_STATE',
					payload: false
				})
				setSaveLoading(false)
			})
	}

	useEffect(() => {
		if (
			data?.booked_at &&
			((pageState === 'creation' && nationality) || data.patient_id)
		) {
			let appointment = Object.assign({}, data)

			if (!appointment?.patient_id) {
				appointment.patient = { ...patientFormRef.current.getFieldsValue(),
					phone_country_code:
							patient.phone_country_code.length > 3
								? patient?.phone_country_code?.slice(
										patient.phone_country_code.indexOf('(') + 1,
										patient.phone_country_code?.indexOf(')')
								  )
								: patient.phone_country_code
				}
				delete appointment.patient_id
			}
			postResource(resource, 'InvoicePrice', token, '', appointment).then(
				response => {
					setInvoicePrice(response.total_price ? response.total_price : 0)
				}
			)
		}
		else{
			setInvoicePrice(0);
		}
	}, [data, nationality])

	const removeAppointment = () => {
		setData(prevState => ({
			...prevState,
			booked_at: null,
			doctor_id: null,
			service_type: null,
			speciality_id: null,
			offer_id: null,
			lab_tests: [],
			lab_packages: [],
			nursing_tasks: []
		}))
		setInvoicePrice(0)
	}

	return (
		<div className={'app_show_big_div'}>
			<div>
				<Button
					style={{ margin: '40px 24px', height: 45, width: 45 }}
					onClick={goBack}
				>
					<LeftOutlined />
				</Button>
				<span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Inter' }}>
					{t('Add new Appointment')}
				</span>
			</div>
			<Form
				onValuesChange={handleValuesChange}
				name='search'
				layout='vertical'
				ref={searchFormRef}
			>
				<div className={'add_edit_content'}>
					<div className='gutter-row'>
						<Row>
							{role !== 'clinic-manager' ? (
								<Col lg={6} className='gutter-row'>
									<FormInput
										label={t('Clinic')}
										name={'clinic_id'}
										inputType={'resourceSelect'}
										rules={[{ required: true }]}
										initialData={[data?.clinic].filter(e => e)}
										inputProps={{
											onChange: e => {
												setData(prevState => ({
													...prevState,
													service_type: null,
													patient_id: undefined,
													patient: undefined
												}))
												appointmentFormRef?.current?.setFieldsValue({
													service_type: null
												})
												searchFormRef?.current?.setFieldsValue({
													patient_id: undefined
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
									disabled={!data?.clinic_id}
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
									rules={[{ required: pageState !== 'creation' }]}
									searchConfigs={{ minLength: 6 }}
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
									handleMapItems={(item, name, status) =>
										searchByNumber(item, name, status)
									}
									handleStatus={true}
									customSearchKey={'phone_number'}
									disabled={!data?.clinic_id}
									resource={'PatientSearch'}
								/>
							</Col>
							<Col lg={6} className='gutter-row'>
								{pageState === 'initial' || pageState === 'creation' ? (
									<Button
										onClick={() => {
											setData(prevState => ({
												...prevState,
												patient_id: null
											}))
											setPatient(codeAndPhone)
											setPageState('creation')
										}}
										type={'primary'}
										style={{ marginTop: 4 }}
										className={'all_offers_book_btns'}
										disabled={!data?.clinic_id}
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
			{pageState === 'creation' ? (
				<CreatePatient
					formRef={patientFormRef}
					setNationality={setNationality}
				></CreatePatient>
			) : (
				<div></div>
			)}
			{pageState === 'selected' ? (
				<div>
					<CreatePatient
						data={patient}
						formRef={patientFormRef}
					></CreatePatient>
				</div>
			) : (
				<div></div>
			)}
			{data?.clinic_id ? (
				serviceTypeState?.length ? (
					<div className={'add_edit_content'}>
						<h2 style={{ fontWeight: 'bold' }}>{t('Appointment')}</h2>
						{!data?.booked_at ? (
							<div>
								<Form
									ref={appointmentFormRef}
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
															specialty_id: null
														})
														setData(prevState => ({
															...prevState,
															specialty_id: null
														}))
													}
												}}
												initialData={serviceTypeState}
											/>
										</Col>
										{data?.service_type &&
										data?.service_type !== 'nursing' &&
										data?.service_type !== 'laboratory_clinic_visit' &&
										data?.service_type !== 'laboratory_home_visit' ? (
											<Col lg={16} className='gutter-row'>
												<FormInput
													label={t('Specialties')}
													name={'specialty_id'}
													inputType={'resourceSelect'}
													rules={[{ required: true }]}
													resource={'Taxonomy'}
													customSearchKey={'title'}
													resourceParams={{
														type: Resources.TaxonomyTypes.SPECIALTY,
														has_parent: 0,
														doctor: role === 'doctor' ? doctor_id : undefined
													}}
												/>
											</Col>
										) : null}
									</Row>
								</Form>
								{data?.service_type ? (
									<AppointmentCalendar
										appointmentObj={data}
										setappointmentObj={setData}
									/>
								) : null}
							</div>
						) : (
							<div>
								<br />
								<br />
								<Row
									style={{
										backgroundColor: '#F0F7EE',
										display: 'flex',
										alignItems: 'center',
										borderRadius: '10px',
										padding: '10px'
									}}
								>
									{data?.doctor ? (
										<Col lg={6} className='gutter-row'>
											<Space>
												<Avatar
													size={50}
													src={data?.doctor?.avatar?.url}
													icon={<UserOutlined />}
												/>
												<div>
													<div className={'cl_manager_modal_dr_name'}>
														{data?.doctor?.first} {data?.doctor?.last}
													</div>
												</div>
											</Space>
										</Col>
									) : (
										<Col lg={12} className='gutter-row'>
											<Space>
												<div>
													<div className={'cl_manager_modal_dr_name'}>
														{data?.service_type[0]?.toUpperCase() +
															data?.service_type
																?.slice(1)
																?.replaceAll('_', ' ')}
													</div>
												</div>
											</Space>
										</Col>
									)}
									{data?.specialty ? (
										<Col lg={6} className='gutter-row'>
											<Space>
												<div>
													<div className={'cl_manager_modal_dr_name'}>
														{data.specialty}
													</div>
												</div>
											</Space>
										</Col>
									) : null}
									<Col lg={5} className='gutter-row'>
										<Space>
											<div>
												<div className={'cl_manager_modal_dr_name'}>
													{invoicePrice} SAR
												</div>
											</div>
										</Space>
									</Col>
									<Col lg={6} className='gutter-row'>
										<Space>
											<div>
												<div className={'cl_manager_modal_dr_name'}>
													{dayjs(data.booked_at).format('h:mm A, D MMM YY')}
												</div>
											</div>
										</Space>
									</Col>
									<Col lg={1} className='gutter-row'>
										<Space>
											<div>
												<div
													className={'cl_manager_modal_dr_name'}
													style={{ cursor: 'pointer' }}
													onClick={removeAppointment}
												>
													X
												</div>
											</div>
										</Space>
									</Col>
								</Row>
								<br />
								<br />
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
						)}
					</div>
				) : (
					<Preloader></Preloader>
				)
			) : null}
		</div>
	)
}

export default Appointment
