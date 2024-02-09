import { useNavigate, useParams } from 'react-router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	createResource,
	postResource,
	useGetResourceSingle
} from '../../Functions/api_calls'
import { Button, Form, Space, Row, Col, Spin } from 'antd'
import { t } from 'i18next'
import Preloader from '../../Preloader'
import FormInput from '../../Fragments/FormInput'
import CreatePatient from './Fragments/CreatePatient'
import Resources from '../../../store/Resources'
import dayjs from 'dayjs'
import CancelComponent from '../../Fragments/CancelComponent'
import {
	CopyOutlined,
	EditOutlined,
	FilePdfOutlined,
	LeftOutlined,
	MailOutlined,
	PhoneOutlined,
	UserOutlined
} from '@ant-design/icons'
import clinic_man_user_icon from '../../../dist/icons/clinic_man_user_icon.png'
import ClinicManagerCalendar from "../ClinicManager/Fragments/ClinicManagerCalendar/ClinicManagerCalendar";

const resource = 'Appointment'

function Appointment({ isPatient }) {
	const navigate = useNavigate()
	let dispatch = useDispatch()
	const params = useParams()
	const formRef = useRef()
	const phoneNumberRef = useRef()
	let token = useSelector(state => state.auth.token)
	let role = useSelector(state => state.auth.selected_role?.key)
	let ownerClinics = useSelector(state => state?.owner)
	let language = useSelector(state => state.app.current_locale)
    const [serviceTypeState, setServiceTypeState] = useState([])

	const [ data, setData ] = useState(null);
	const [patient, setPatient] = useState(null)
	const [saveLoading, setSaveLoading] = useState(false)
	const [codeAndPhone, setCodeAndPhone] = useState({
		phone_country_code: 966,
		phone_number: null
	})
	const [pageState, setPageState] = useState('initial')
	const [changeValuesState, setChangeValuesState] = useState({})
	const fetchedUsers = useRef([])

	useEffect(() => {
		setData( prevState => ({
			...prevState,
			clinic_id: ownerClinics.id
		}))
	}, [ownerClinics.id]);

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

	const onFinish = values => {
		if (values.patient_id) {
			delete values.patient
			delete values?.dob
		} else {
			values.dob = values.patient.dob.format('YYYY-MM-DD')
		}

		values.booked_at =
			values.booked_at.format('YYYY-MM-DD') + ' ' + values.appointment_time

		if (values?.patient?.phone_country_code) {
			if (values.patient.phone_country_code.length > 3) {
				values.patient.phone_country_code =
					values?.patient?.phone_country_code?.slice(
						values?.patient.phone_country_code.indexOf('(') + 1,
						values?.patient.phone_country_code?.indexOf(')')
					)
			}
		}
		setSaveLoading(true)

		if (values?.lab_packages) {
			values.lab_packages = [values.lab_packages]
		}

		createResource(resource, values, token)
			.then(response => {
				if (response?.id) {
					navigate(-1)
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

	const handleValuesChange = (e, v) => {
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
		fetchedUsers.current.push(item);

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
		formRef?.current
			?.validateFields([
				'time',
				'service_type',
				'phone_country_code',
				'address1'
			])
			.then(e => {
				postResource(
					'PatientsVerificationCode',
					'PatientsPhoneVerify',
					token,
					'',
					codeAndPhone
				).then(response => {
					setPageState('codeSent')
				})
			})
			.catch(c => {})
	}

	const onVerify = e => {
		if (data?.code?.length === 4) {
			postResource('PatientsVerificationCode', 'PatientCodeVerify', token, '', {
				phone_country_code: codeAndPhone?.phone_country_code,
				phone_number: codeAndPhone?.phone_number,
				clinic_id: data?.clinic_id,
				code: data?.code
			}).then(response => {
				setPageState('selected')
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

            postResource('Clinic', 'single', token, data?.clinic_id).then(responses => {

                setServiceTypeState([
                    {
                        service: responses?.has_telehealth_service,
                        id: 'telehealth',
                        name: "Telehealth",
                    },
                    {
                        service: responses?.has_clinic_visit_service,
                        id: 'clinic_visit',
                        name: 'Clinic Visit',
                    },
                    {
                        service: responses?.has_home_visit_service,
                        id: 'home_visit',
                        name: 'Home Visit',
                    },
                    {
                        service: responses?.has_physical_therapy_home_visit_service,
                        id: 'physical_therapy_home_visit',
                        name: 'Physical Therapy Home Visit',
                    },
                    {
                        service: responses?.has_physical_therapy_clinic_visit_service,
                        id: 'physical_therapy_clinic_visit',
                        name: 'Physical Therapy Clinic Visit',
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
                ].filter(el => el.service === true))
            })
        }
    }, [data?.clinic_id])

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
				ref={formRef}
				className={'add_create_form'}
			>
				<div className={'add_edit_content'}>
					<div className='gutter-row'>
						<Row>
							{!data?.clinic_id ? (
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

												formRef?.current?.setFieldsValue({
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
										onSearch: e =>
											setCodeAndPhone(prevState => ({
												...prevState,
												phone_number: e
											})),

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
								{pageState === 'initial' ? (
									<Button
										onClick={() => {
											formRef.current.resetFields(['patient_id'])
											setPatient(null)
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
								{pageState === 'unauthorized' ? (
									<Button
										onClick={onSendCode}
										type={'primary'}
										style={{ marginTop: 4 }}
										className={'all_offers_book_btns'}
									>
										{t('Send request')}
									</Button>
								) : (
									<div></div>
								)}
							</Col>
						</Row>
						{pageState === 'unauthorized' || pageState === 'codeSent' ? (
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
									>
										{t('Verify')}
									</Button>
								</Col>
							</Row>
						) : (
							<div></div>
						)}
					</div>
				</div>
			</Form>
			{pageState === 'creation' || pageState === 'selected' ? (
					<div>
						<CreatePatient data={patient} pageState={pageState} setData={setPatient} setPageState={setPageState}></CreatePatient>
					</div>
				) : (
					<div></div>
				)}
				{serviceTypeState?.length?  (<div className={'add_edit_content'}>
					<Form>
						<Row>
							<Col lg={8} className='gutter-row'>
								<FormInput label={t('Service Type')} name={'service_type'}
									inputType={'resourceSelect'}
									rules={[{required: true}]}
									inputProps={{
										onChange:(e,data)=> {
											formRef?.current?.setFieldsValue({
												specialty_id:null,
												doctor_id: null,
												booked_at: null,
												appointment_time: null,
												lab_tests: undefined,
												lab_packages: null,
												offer_id: null,
												nursing_tasks: undefined,
												service_type: e

											})
											setData((prevState)=>({
												...prevState,
												specialty_id:null,
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
									initialData={serviceTypeState}/>
							</Col>
							<Col lg={16} className='gutter-row'>
								<FormInput label={t('Specialties')} name={'specialty_id'}
									inputType={'resourceSelect'}
									rules={[{required: true}]}
									initialValue={null}
									initialData={[]}
									inputProps={{
										onChange:(e,data)=> {
											formRef?.current?.setFieldsValue({
												doctor_id: null,
												booked_at: null,
												appointment_time: null,
												offer_id: null

											})
											setData((prevState)=>({
												...prevState,
												doctor_id: null,
												booked_at: null,
												appointment_time: null,
												offer_id: null

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
							</Col>
						</Row>
						
					</Form>
                    <ClinicManagerCalendar />
                </div>
								) : (
					<Preloader></Preloader>
				)}
		</div>
	)
}

export default Appointment
