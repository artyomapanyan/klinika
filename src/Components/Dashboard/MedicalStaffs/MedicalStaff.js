import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import React, { useRef, useState } from 'react'
import {
	createResource,
	updateResource,
	useGetResourceSingle
} from '../../Functions/api_calls'
import Resources from '../../../store/Resources'

import { t } from 'i18next'
import Preloader from '../../Preloader'
import { Button, Col, Form, Space } from 'antd'
import FormInput from '../../Fragments/FormInput'
import FileManager from '../../Fragments/FileManager'
import { InboxOutlined } from '@ant-design/icons'
import CancelComponent from '../../Fragments/CancelComponent'
import { Row } from 'antd/lib'
import dayjs from 'dayjs'

const resource = 'MedicalStaff'

function MedicalStaff() {
	let language = useSelector(state => state.app.current_locale)
	let dispatch = useDispatch()
	const params = useParams()
	const navigate = useNavigate()
	const formRef = useRef()
	let token = useSelector(state => state.auth.token)
	const { loadingState, dataState } = useGetResourceSingle(resource, params.id)
	const { data, setData } = dataState
	const { loading, setLoading } = loadingState
	const [saveLoading, setSaveLoading] = useState(false)
	const [changeValuesState, setChangeValuesState] = useState({})

	const onFinish = values => {
		setSaveLoading(true)
		console.log(values.dob)
		if (values.dob) {
			values.dob = values?.dob?.format('YYYY-MM-DD')
		} else {
			values.dob = ''
		}

		values.plid_expired_at = values?.plid_expired_at?.format('YYYY-MM-DD')

		if (values?.phone_country_code) {
			if (values.phone_country_code?.length > 3) {
				values.phone_country_code = values?.phone_country_code?.slice(
					values?.phone_country_code.indexOf('(') + 1,
					values?.phone_country_code?.indexOf(')')
				)
			}
		}

		if (values?.password) {
			values.password = values.password
		} else {
			values.password = ''
		}

		if (values?.password_confirmation) {
			values.password_confirmation = values.password_confirmation
		} else {
			values.password_confirmation = ''
		}

		if (values?.bio) {
			values.bio = JSON.stringify(values.bio)
		}

		let nullDescription = {
			en: '',
			ar: ''
		}

		if (values?.bio === '{}') {
			values.bio = JSON.stringify(nullDescription)
		}
		values.first = JSON.stringify(values.first)
		values.last = JSON.stringify(values.last)

		setData(prevState => ({
			...prevState,
			...values
		}))

		if (params.id) {
			updateResource(resource, params.id, values, token, true)
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
		} else {
			createResource(resource, values, token, true)
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
	}

	const handleMapItems = (item, name) => {
		name = item.phone_code ? `(${item.phone_code}) ${item.name}` : null
		item.id = item.phone_code
		return [name, item]
	}

	const handleValuesChange = changed => {
		setChangeValuesState(changed)
		setData(prevData => ({
			...prevData,
			...changed
		}))

		if (Object.keys(changed)?.length > 0) {
			dispatch({
				type: 'DASHBOARD_STATE',
				payload: true
			})
		}
	}

	let enFirst = (
		<span>
			<span style={{ color: 'red' }}>* </span>
			{'EN First Name'}
		</span>
	)
	let enLast = (
		<span>
			<span style={{ color: 'red' }}>* </span>
			{'EN Last Name'}
		</span>
	)
	let arFirst = (
		<span>
			<span style={{ color: 'red' }}>* </span>
			{'AR First Name'}
		</span>
	)
	let arLast = (
		<span>
			<span style={{ color: 'red' }}>* </span>
			{'AR Last Name'}
		</span>
	)

	return (
		<div>
			{data?.translations?.first ? (
				<h3 className={'create_apdate_btns'}>
					{t(`Editing Medical staff`)} -{' '}
					{language === 'ar'
						? data?.translations?.first?.ar + ' ' + data?.translations?.last?.ar
						: data?.translations?.first?.en +
						  ' ' +
						  data?.translations?.last?.en}
				</h3>
			) : (
				<h3 className={'create_apdate_btns'}>{t(`Add Medical staff`)}</h3>
			)}
			{loading ? (
				<Preloader />
			) : (
				<Form
					name='edit'
					onFinish={onFinish}
					onValuesChange={handleValuesChange}
					layout='vertical'
					ref={formRef}
					className={'add_create_form'}
				>
					<div className={'add_edit_content'}>
						<div style={{ display: 'flex', gap: 20 }}>
							<div
								className={language === 'ar' ? 'input_ltr' : 'draft_ltr_div'}
								style={{ width: '50%' }}
								dir='ltr'
							>
								<FormInput
									label={enFirst}
									name={['first', 'en']}
									initialValue={data?.translations?.first?.en}
									rules={[
										{
											message: t('Please enter the EN First Name'),
											validator: (rule, value) => {
												value = value?.trim()
												if (value?.length == 0) {
													return Promise.reject(
														t('Please enter the EN First Name')
													)
												}
												return Promise.resolve()
											}
										}
									]}
								/>
							</div>
							<div style={{ width: '50%' }} className={'input_rtl'}>
								<FormInput
									label={arFirst}
									name={['first', 'ar']}
									initialValue={data?.translations?.first?.ar}
									rules={[
										{
											message: t('Please enter the AR First Name'),
											validator: (rule, value) => {
												value = value?.trim()
												if (value?.length == 0) {
													return Promise.reject(
														t('Please enter the AR First Name')
													)
												}
												return Promise.resolve()
											}
										}
									]}
								/>
							</div>
						</div>

						<div style={{ display: 'flex', gap: 20 }}>
							<div
								className={language === 'ar' ? 'input_ltr' : 'draft_ltr_div'}
								style={{ width: '50%' }}
								dir='ltr'
							>
								<FormInput
									label={enLast}
									name={['last', 'en']}
									initialValue={data?.translations?.last?.en}
									rules={[
										{
											message: t('Please enter the EN Last Name'),
											validator: (rule, value) => {
												value = value?.trim()
												if (value?.length == 0) {
													return Promise.reject(
														t('Please enter the EN Last Name')
													)
												}
												return Promise.resolve()
											}
										}
									]}
								/>
							</div>
							<div style={{ width: '50%' }} className={'input_rtl'}>
								<FormInput
									label={arLast}
									name={['last', 'ar']}
									initialValue={data?.translations?.last?.ar}
									rules={[
										{
											message: t('Please enter the AR Last Name'),
											validator: (rule, value) => {
												value = value?.trim()
												if (value?.length == 0) {
													return Promise.reject(
														t('Please enter the AR Last Name')
													)
												}
												return Promise.resolve()
											}
										}
									]}
								/>
							</div>
						</div>
					</div>

					<div className={'add_edit_content'}>
						<Row>
							<Col lg={12} className='gutter-row'>
								<FormInput
									label={t('Email')}
									name={'email'}
									initialValue={data?.email}
									rules={[{ required: true }]}
								/>

								<FormInput
									label={t('Date of Birth')}
									name={'dob'}
									initialValue={data?.dob}
									inputType={'date'}
									rules={[
										{
											validator: (rule, value) => {
												if (value) {
													if (dayjs().diff(value, 'year') < 18) {
														return Promise.reject('min age 18')
													}
												} else {
													return Promise.resolve()
												}
											}
										}
									]}
								/>

								<FormInput
									label={t('Gender')}
									name={'gender'}
									inputType={'resourceSelect'}
									rules={[{ required: true }]}
									initialValue={data?.gender}
									initialData={Resources?.Gender}
								/>
								<FormInput
									label={t('Status')}
									name={'status'}
									inputType={'resourceSelect'}
									rules={[{ required: true }]}
									disableClear={true}
									initialValue={data?.status ? data?.status : 2}
									initialData={Resources.Status}
								/>
								<FormInput
									textSecurity={'disc'}
									label={t('Password')}
									name={'password'}
									rules={[{ required: !params.id }]}
								/>
								<FormInput
									textSecurity={'disc'}
									label={t('Password Confirmation')}
									name={'password_confirmation'}
									rules={[{ required: !params.id }]}
								/>
							</Col>
							<Col lg={12} className='gutter-row'>
								<FormInput
									label={t('Nationality number')}
									name={'nationality_number'}
									initialValue={data?.nationality_number}
								/>

								<div style={{ display: 'flex', gap: 10 }}>
									<div style={{ width: '20%' }}>
										<FormInput
											label={t('Country Code')}
											name={'phone_country_code'}
											inputType={'resourceSelect'}
											rules={[{ required: true }]}
											initialValue={
												data?.phone_country_code
													? `(${data?.phone_country_code})`
													: `(966) ${
															language === 'ar'
																? 'المملكة العربية السعودية'
																: 'Saudi Arabia'
													  }`
											}
											handleMapItems={handleMapItems}
											customSearchKey={'phone_code'}
											resource={'Country'}
										/>
									</div>
									<div style={{ width: '80%' }}>
										<FormInput
											label={t('Phone number')}
											maxLength={10}
											name={'phone_number'}
											initialValue={data?.phone_number}
											rules={[{ required: true }]}
										/>
									</div>
								</div>
								<FormInput
									label={t('Plid')}
									name={'plid'}
									initialValue={data?.plid}
									rules={[{ required: true }]}
								/>
								<FormInput
									label={t('Plid expired at')}
									name={'plid_expired_at'}
									initialValue={data?.plid_expired_at}
									inputType={'date'}
									disabledDate={current =>
										dayjs(current).isBefore(dayjs(), 'day')
									}
									rules={[{ required: true }]}
								/>
								<FormInput
									inputProps={{ mode: 'multiple' }}
									label={t('languages')}
									name={'languages'}
									inputType={'resourceSelect'}
									rules={[{ required: true }]}
									initialValue={data?.languages?.map(e => e.id)}
									initialData={data?.languages ?? []}
									resource={'Language'}
								/>
								<FormInput
									label={t('Role')}
									name={'role'}
									inputType={'resourceSelect'}
									rules={[{ required: true }]}
									initialValue={data?.roles
										?.filter(
											e => e.key === 'nurse' || e.key === 'lab-technician'
										)
										.map(e => e.id)}
									initialData={data?.roles ?? []}
									resourceParams={{
										medical_staff: 1
									}}
									resource={'Role'}
								/>
							</Col>
						</Row>
						<FileManager
							text1={t('Avatar')}
							text2={t('Download the file')}
							name={'avatar'}
							uploadIcon={<InboxOutlined />}
							initialFileList={[data?.avatar]}
							limit={1}
							formRef={formRef}
							type={'drag'}
						/>
					</div>

					<Space className={'create_apdate_btns'}>
						<Button
							loading={saveLoading}
							size={'large'}
							type={'primary'}
							htmlType='submit'
						>
							{t('Save')}
						</Button>
						<CancelComponent
							changeValuesState={changeValuesState}
							resource={resource}
						/>
					</Space>
				</Form>
			)}
		</div>
	)
}

export default MedicalStaff
