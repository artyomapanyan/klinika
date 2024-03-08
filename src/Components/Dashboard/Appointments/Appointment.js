import { useNavigate, useParams } from 'react-router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	postResource,
	createResource,
	useGetResourceSingle
} from '../../Functions/api_calls'
import { Button, Form, Space, Row, Col, Avatar } from 'antd'
import { t } from 'i18next'
import Preloader from '../../Preloader'
import FormInput from '../../Fragments/FormInput'
import CreatePatient from './Fragments/CreatePatient'
import Resources from '../../../store/Resources'
import { LeftOutlined } from '@ant-design/icons'
import user_icon from '../../../dist/icons/user-search.svg'
import x_black from '../../../dist/icons/x_black.png'
import AppointmentCalendar from './Fragments/AppointmentCalendar/AppointmentCalendar'
import { UserOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import './Appointment.sass'
import { notification } from 'antd'

const resource = 'Appointment'

function Appointment() {
	const params = useParams()

	let token = useSelector(state => state.auth.token)
	let role = useSelector(state => state.auth.selected_role?.key)
	let doctor_id = useSelector(state => state.auth?.user?.id)
	let ownerClinics = useSelector(state => state?.owner)
	let language = useSelector(state => state.app.current_locale)

	const [saveLoading, setSaveLoading] = useState(false)
	const [verifyLoading, setVerifyLoading] = useState(false)
	const [sendCodeLoading, setSendCodeLoading] = useState(false)
	const [invoiceLoading, setInvoiceLoading] = useState(false)

	const [data, setData] = useState(null)
	const [serviceTypeState, setServiceTypeState] = useState([])
	const [patient, setPatient] = useState(null)
	const [codeAndPhone, setCodeAndPhone] = useState({
		phone_country_code: 966,
		phone_number: null
	})
	const [pageState, setPageState] = useState('initial')
	const [invoicePrice, setInvoicePrice] = useState(null)
	const [nationality, setNationality] = useState(null)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const searchFormRef = useRef()
	const patientFormRef = useRef()
	const appointmentFormRef = useRef()
	const fetchedUsers = useRef([])

	//Get the patient from the route, if navigating from patient ;list page
	useGetResourceSingle(
		'Patient',
		params.id,
		{},
		params.id
			? response => {
					setCodeAndPhone(prevState => ({
						...prevState,
						phone_country_code: response?.phone_country_code,
						phone_number: response?.phone_number
					}))
					searchFormRef.current.setFieldsValue({
						patient: '+' + response.phone_country_code + response.phone_number
					})
					return data
			  }
			: null
	)

	//assign user clinic and doctor id to the appointment object
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

	//change page state when changing patient id
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

	const handleMapItems = (item, name) => {
		name = item.phone_code ? `(${item.phone_code}) ${item.name}` : null
		item.id = item.phone_code
		return [name, item]
	}

	const isPatientAuth = clinic_id => {
		postResource('PatientSearch', 'single', token, '', {
			...codeAndPhone,
			clinic_id: clinic_id
		}).then(response => {
			if (response.message) {
				setPageState('unauthorized')
				setPatient(null)
			} else {
				setPageState('retrieved')
				setPatient(response.items[0])
			}
		})
	}

	const sendCode = () => {
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

	const verifyNumber = () => {
		if (data?.code?.length === 4) {
			setVerifyLoading(true)
			postResource('PatientsVerificationCode', 'PatientCodeVerify', token, '', {
				phone_country_code: codeAndPhone?.phone_country_code,
				phone_number: codeAndPhone?.phone_number,
				clinic_id: data?.clinic_id,
				code: data?.code
			}).then(response => {
				if (response?.patient) {
					fetchedUsers.current.push(response?.patient)
					setData(prevState => ({
						...prevState,
						patient_id: response?.patient?.id,
						code: null
					}))
				}
				setVerifyLoading(false)
			})
		}
	}

	//load service types
	useEffect(() => {
		if (data?.clinic_id) {
			setServiceTypeState([])
			if (role === 'doctor') {
				Promise.all([
					postResource(
						'clinicDoctorBydoctorAndClinic',
						'single',
						token,
						`${doctor_id}/${data?.clinic_id}`
					),
					postResource('Clinic', 'single', token, data?.clinic_id)
				]).then(responses => {
					let doctorActiveServices = Object.keys(
						responses[0]?.activated_services
					)?.map(el => {
						return {
							service: true,
							id: el,
							name: el.replaceAll('_', ' ')
						}
					})
					let clinicActiveServices = [
						{
							service: responses[1]?.has_laboratory_home_visit_service,
							id: 'laboratory_home_visit',
							name: 'Laboratory Home Visit'
						},
						{
							service: responses[1]?.has_nursing_service,
							id: 'nursing',
							name: 'Nursing'
						},
						{
							service: responses[1]?.has_laboratory_clinic_visit_service,
							id: 'laboratory_clinic_visit',
							name: 'Laboratory Clinic Visit'
						}
					].filter(el => el.service === true)

					setServiceTypeState([
						...doctorActiveServices,
						...clinicActiveServices
					])
				})
			} else {
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
		}
	}, [data?.clinic_id])

	//Calculate the invoice price
	useEffect(() => {
		if (data?.booked_at) {
			let appointment = { ...data }

			if (!appointment?.patient_id && nationality) {
				appointment.patient = { country_id: nationality }
				delete appointment.patient_id
			}
			if(appointment?.patient_id == '0'){
				delete appointment.patient_id
			}
			setInvoicePrice(null)
			setInvoiceLoading(true)
			postResource(resource, 'InvoicePrice', token, '', appointment).then(
				response => {
					setInvoicePrice(response)
					setInvoiceLoading(false)
				}
			)
		} else {
			setInvoicePrice(null)
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
		setInvoicePrice(null)
	}

	const saveAppointment = () => {
		let appointment = { ...data }
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
		} else if (pageState === 'selected') {
			delete appointment.patient
			searchFormRef.current
				.validateFields()
				.then(() => {
					createAppointment(appointment)
				})
				.catch(error => {
					console.error('Validation failed:', error)
				})
		} else if (pageState === 'retrieved') {
			appointment.patient_id = params.id
			createAppointment(appointment)
		} else if (pageState === 'unauthorized' || pageState === 'codeSent') {
			notification.error({
				message: 'Error',
				description: t('Please verify patient for the selected clinic'),
				placement: 'bottomRight'
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

	const removeLabItem = (idx, type) => {
		if (data?.lab_tests.length + data?.lab_packages.length > 1) {
			setData(prevState => ({
				...prevState,
				labPackagesArray:
					type === 'package'
						? data?.labPackagesArray.filter((_, index) => index !== idx)
						: data?.labPackagesArray,
				lab_packages:
					type === 'package'
						? data?.lab_packages.filter((_, index) => index !== idx)
						: data?.lab_packages,
				labTestsArray:
					type === 'test'
						? data?.labTestsArray.filter((_, index) => index !== idx)
						: data?.labTestsArray,
				lab_tests:
					type === 'test'
						? data?.lab_tests.filter((_, index) => index !== idx)
						: data?.lab_tests
			}))
		} else {
			notification.error({
				message: 'Error',
				description: t(
					'The appointment must have at least one lab test or one lab package'
				),
				placement: 'bottomRight'
			})
		}
	}

	const removeNursingTask = idx => {
		if (data?.nursing_tasks.length > 1) {
			setData(prevState => ({
				...prevState,
				nursingTasksArray: data?.nursingTasksArray.filter(
					(_, index) => index !== idx
				),
				nursing_tasks: data?.nursing_tasks.filter((_, index) => index !== idx)
			}))
		} else {
			notification.error({
				message: 'Error',
				description: t('The appointment must have at least one nursing task'),
				placement: 'bottomRight'
			})
		}
	}

	return (
		<div className={'app_show_big_div appointment-tab'}>
			<div>
				<Button
					style={{ margin: '40px 24px', height: 45, width: 45, paddingTop: 10 }}
					onClick={goBack}
				>
					<LeftOutlined />
				</Button>
				<span
					style={{
						fontSize: 24,
						fontWeight: 700,
						fontFamily: 'Inter',
						marginLeft: -15
					}}
				>
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
												patient: undefined,
												booked_at: undefined
											}))
											appointmentFormRef?.current?.setFieldsValue({
												service_type: null
											})
											searchFormRef?.current?.setFieldsValue({
												patient_id: undefined
											})
											if (params?.id) {
												isPatientAuth(e)
											}
										}
									}}
									resourceParams={{
										active: 1
									}}
									resource={'Clinic'}
								/>
							</Col>
						) : null}
						{params.id ? (
							<Col lg={12} className='gutter-row'>
								<FormInput
									label={t('Patient')}
									name={'patient'}
									inputDisabled={true}
								/>
							</Col>
						) : (
							<>
								<Col lg={4} className='gutter-row'>
									<FormInput
										label={t('Country Code')}
										name={'phone_country_code'}
										inputType={'resourceSelect'}
										rules={[{ required: true }]}
										initialValue={
											patient?.phone_country_code
												? patient?.phone_country_code
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
								<Col
									lg={role === 'clinic-manager' ? 14 : 8}
									className='gutter-row'
								>
									<FormInput
										label={t('Select Patient (Search By phone number)')}
										name={'patient_id'}
										suffixIcon={<img src={user_icon} alt={'user_icon'} />}
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
							</>
						)}
						<Col lg={6} className='gutter-row'>
							{(pageState === 'initial' || pageState === 'creation') &&
							!params.id ? (
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
									onClick={sendCode}
									type={'primary'}
									style={{ marginTop: 4 }}
									className={'all_offers_book_btns'}
									disabled={pageState === 'codeSent'}
									loading={sendCodeLoading}
								>
									{t('Send permission request')}
								</Button>
							) : (
								<div></div>
							)}
						</Col>
					</Row>
					{pageState === 'unauthorized' || pageState === 'codeSent' ? (
						<Row>
							<Col lg={12} className='gutter-row' style={{ color: '#774D9D' }}>
								Send request for permissions to personal information. Please
								enter code from user or wait when user accept your request in
								app,
							</Col>
							{pageState === 'codeSent' ? (
								<>
									<Col lg={6} className='gutter-row'>
										<div class='vertical-line'>
											{t("Client didn't get a message")}? <br />
											<span
												onClick={sendCode}
												style={{
													color: '#BF539E',
													fontWeight: 700,
													cursor: 'pointer'
												}}
											>
												{t('Resend Request')}
											</span>
										</div>
									</Col>
									<Col lg={4} className='gutter-row'>
										<FormInput
											label={t('Code (4 digits)')}
											inputDisabled={pageState === 'unauthorized'}
											name={'code'}
										/>
									</Col>
									<Col lg={2} className='gutter-row'>
										<Button
											onClick={verifyNumber}
											type={'primary'}
											style={{ marginTop: 4 }}
											className={'all_offers_book_btns'}
											disabled={data?.code?.length !== 4}
											loading={verifyLoading}
										>
											{t('Verify')}
										</Button>
									</Col>
								</>
							) : null}
						</Row>
					) : null}
				</div>
			</Form>
			{pageState === 'creation' ? (
				<CreatePatient
					data={patient}
					formRef={patientFormRef}
					setNationality={setNationality}
				></CreatePatient>
			) : null}
			{pageState === 'selected' || pageState === 'retrieved' ? (
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
						<Row>
							<Col lg={8} className='gutter-row'>
								<h2 style={{ fontWeight: 'bold', paddingLeft: 7 }}>
									{t('Appointment')}
								</h2>
							</Col>
						</Row>
						{!data?.booked_at ? (
							<Form
								style={{ marginTop: 0 }}
								ref={appointmentFormRef}
								onValuesChange={handleValuesChange}
								layout='vertical'
							>
								<>
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
														has_doctor: 1,
														clinic: data?.clinic_id,
														doctor: role === 'doctor' ? doctor_id : undefined
													}}
												/>
											</Col>
										) : null}
									</Row>
									{data?.service_type ? (
										<AppointmentCalendar
											appointmentObj={data}
											setappointmentObj={setData}
										/>
									) : null}
								</>
							</Form>
						) : (
							<div>
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
													<div
														className={'cl_manager_modal_dr_name'}
														style={{ fontWeight: 400 }}
													>
														{data?.doctor?.first} {data?.doctor?.last}
													</div>
												</div>
											</Space>
										</Col>
									) : (
										<Col lg={12} className='gutter-row'>
											<Space>
												<div>
													<div
														className={'cl_manager_modal_dr_name'}
														style={{ fontWeight: 400 }}
													>
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
													<div
														className={'cl_manager_modal_dr_name'}
														style={{ fontWeight: 400 }}
													>
														{data.specialty}
													</div>
												</div>
											</Space>
										</Col>
									) : null}
									<Col lg={11} className='gutter-row'>
										<Space>
											<div>
												<div
													className={'cl_manager_modal_dr_name'}
													style={{ fontWeight: 600 }}
												>
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
													<img
														className={'del_icin'}
														alt={'x_black'}
														src={x_black}
													/>
												</div>
											</div>
										</Space>
									</Col>
									{data?.service_type === 'laboratory_clinic_visit' ||
									data?.service_type === 'laboratory_home_visit' ||
									data?.service_type === 'nursing' ? (
										<hr style={{ borderTop: '2px solid #E1E2E9' }}></hr>
									) : null}
									{data?.nursing_tasks?.length ? (
										<Col lg={24} className='gutter-row'>
											<h3 style={{ fontWeight: 'bold' }}>
												{t('Nursing tasks')}
											</h3>
											{data?.nursingTasksArray.map((item, index) => (
												<Row key={index}>
													<Col lg={23} className='gutter-row'>
														<h3>
															{item.nursing_task.name} [{item.price} SR]
														</h3>
													</Col>
													<Col lg={1} className='gutter-row'>
														<Space>
															<div>
																<div
																	className={'cl_manager_modal_dr_name'}
																	style={{ cursor: 'pointer' }}
																	onClick={() => {
																		removeNursingTask(index)
																	}}
																>
																	<img
																		className={'del_icin'}
																		alt={'x_black'}
																		src={x_black}
																	/>
																</div>
															</div>
														</Space>
													</Col>
												</Row>
											))}
										</Col>
									) : null}
									{data?.lab_tests?.length ? (
										<Col lg={24} className='gutter-row'>
											<h3 style={{ fontWeight: 'bold' }}>{t('Lab tests')}</h3>
											{data?.labTestsArray.map((item, index) => (
												<Row key={index}>
													<Col lg={23} className='gutter-row'>
														<h3>
															{item.lab_test.name} [{item.price} SR]
														</h3>
													</Col>
													<Col lg={1} className='gutter-row'>
														<Space>
															<div>
																<div
																	className={'cl_manager_modal_dr_name'}
																	style={{ cursor: 'pointer' }}
																	onClick={() => {
																		removeLabItem(index, 'test')
																	}}
																>
																	<img
																		className={'del_icin'}
																		alt={'x_black'}
																		src={x_black}
																	/>
																</div>
															</div>
														</Space>
													</Col>
												</Row>
											))}
										</Col>
									) : null}
									{data?.lab_packages?.length ? (
										<Col lg={24} className='gutter-row'>
											<h3 style={{ fontWeight: 'bold' }}>
												{t('Lab packages')}
											</h3>
											{data?.labPackagesArray.map((item, index) => (
												<Row key={index}>
													<Col lg={23} className='gutter-row'>
														<h3>
															{item.lab_package.name} [{item.price} SR]
														</h3>
													</Col>
													<Col lg={1} className='gutter-row'>
														<Space>
															<div>
																<div
																	className={'cl_manager_modal_dr_name'}
																	style={{ cursor: 'pointer' }}
																	onClick={() => {
																		removeLabItem(index, 'package')
																	}}
																>
																	<img
																		className={'del_icin'}
																		alt={'x_black'}
																		src={x_black}
																	/>
																</div>
															</div>
														</Space>
													</Col>
												</Row>
											))}
										</Col>
									) : null}
								</Row>
								<br/>
								<br/>
								<Row>
									<Col lg={8} className='gutter-row'>
										<h2 style={{ fontWeight: 'bold', paddingLeft: 7 }}>
											{t('Payment') + ':'}
										</h2>
									</Col>	
								</Row>
								{invoiceLoading? <Preloader></Preloader> :<Row style={{ paddingLeft: 7 }}>
									<Col lg={4} className='gutter-row'>
										<div className='payment-header'>
											{t('Sub total')}
										</div>	
										<div className='payment-item'>
											{invoicePrice?.sub_total + ' SAR'}
										</div>						
									</Col>	
									{invoicePrice?.service_fee?<Col lg={4} className='gutter-row'>
										<div className='payment-header'>
											{t('Service fee')}
										</div>	
										<div className='payment-item'>
											{invoicePrice?.service_fee + ' SAR'}
										</div>						
									</Col> : null }
									{data?.patient_id || nationality ? <Col lg={4} className='gutter-row'>
										<div className='payment-header'>
											{t('Tax')}
										</div>	
										<div className='payment-item'>
											{invoicePrice?.vat +' SAR'} 
											{/* {'(' + invoicePrice?.tax_percentage + '%)'} */}
										</div>						
									</Col> : null}
									<Col lg={4} className='gutter-row'>
										<div className='payment-header'>
											{t('Total')}
										</div>	
										<div className='payment-item'>
											{invoicePrice?.total_price + ' SAR'}
										</div>						
									</Col>
								</Row>}
								<br />
								<br />
								<Button
									loading={saveLoading}
									size={'large'}
									type={'primary'}
									htmlType='submit'
									onClick={saveAppointment}
								>
									{t('Save Appointment')}
								</Button>
								<br/><br/>
								<br/><br/>
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
