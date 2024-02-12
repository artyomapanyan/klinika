import { useNavigate, useParams } from 'react-router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	createResource,
	postResource,
	useGetResourceSingle
} from '../../../Functions/api_calls'
import { Button, Form, Space, Row, Col, Spin } from 'antd'
import { t } from 'i18next'
import Preloader from '../../../Preloader'
import FormInput from '../../../Fragments/FormInput'
import Resources from '../../../../store/Resources'
import dayjs from 'dayjs'
import {
	CopyOutlined,
	EditOutlined,
	FilePdfOutlined,
	LeftOutlined,
	MailOutlined,
	PhoneOutlined,
	UserOutlined
} from '@ant-design/icons'
import clinic_man_user_icon from '../../../../dist/icons/clinic_man_user_icon.png'

const resource = 'User'

function CreatePatient({ data, setData, formRef }) {
	let token = useSelector(state => state.auth.token)
	let language = useSelector(state => state.app.current_locale)
	const [saveLoading, setSaveLoading] = useState(false)
	let dispatch = useDispatch()

	const onFinish = values => {
		setSaveLoading(true)
		values.dob = values.dob.format('YYYY-MM-DD')
        values.status = 2;
        values.password = '12341234'
        values.password_confirmation  = '12341234'
        values.roles = [7];

		if (values?.phone_country_code) {
			if (values.phone_country_code.length > 3) {
				values.phone_country_code = values?.phone_country_code?.slice(
					values.phone_country_code.indexOf('(') + 1,
					values.phone_country_code?.indexOf(')')
				)
			}
		}

		if (values?.insurance_company_id) {
			values.insurance_company_id = values.insurance_company_id
		} else {
			values.insurance_company_id = null
		}
        setData(values);
	}

	const handleMapItems = (item, name) => {
		name = item.phone_code ? `(${item.phone_code}) ${item.name}` : null
		item.id = item.phone_code
		return [name, item]
	}

	return (
		<Form
			name='patient'
			onFinish={onFinish}
			layout='vertical'
			className={'add_create_form'}
			disabled={data?.id}
            ref={formRef}
		>
			<div className={'add_edit_content'}>
				<Row>
					<Col lg={8} className='gutter-row'>
						<FormInput
							label={t('First Name')}
							name={'first'}
							rules={[{ required: !data?.id }]}
							initialValue={data?.first}
						/>
					</Col>

					<Col lg={8} className='gutter-row'>
						<FormInput
							label={t('Nationality')}
							name={'country_id'}
							inputType={'resourceSelect'}
							initialValue={data?.nationality?.id}
							rules={[{ required: !data?.id }]}
							initialData={data?.nationality ? [data?.nationality] : []}
							resource={'Country'}
						/>
					</Col>
					<Col lg={8} className='gutter-row'>
						<FormInput
							label={t('Nationality Number')}
							name={'nationality_number'}
							initialValue={data?.nationality_number}
						/>
					</Col>
					<Col lg={8} className='gutter-row'>
						<FormInput
							label={t('Last Name')}
							name={'last'}
							initialValue={data?.last}
                            rules={[{ required: !data?.id }]}
						/>
					</Col>
					<Col lg={8} className='gutter-row'>
						<FormInput
							label={t('Gender')}
							name={'gender'}
							inputType={'resourceSelect'}
							initialValue={data?.gender}
							initialData={Resources?.Gender}
							rules={[{ required: !data?.id }]}
						/>
					</Col>
					<Col lg={8} className='gutter-row'>
						<FormInput
							label={t('Insurance company')}
							name={'insurance_company_id'}
							inputType={'resourceSelect'}
							initialValue={data?.insurance_company?.id}
							initialData={
								data?.insurance_company ? [data?.insurance_company] : []
							}
							resource={'InsuranceCompany'}
						/>
					</Col>
					<Col lg={3} className='gutter-row'>
						<FormInput
							label={t('Country Code')}
							name={'phone_country_code'}
							inputType={'resourceSelect'}
							rules={[{ required: !data?.id }]}
							initialValue={
								data?.phone_country_code
									? data?.phone_country_code
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
					</Col>
					<Col lg={5} className='gutter-row'>
						<FormInput
							label={t('Phone number')}
							name={'phone_number'}
							maxLength={10}
							initialValue={data?.phone_number}
							rules={[{ required: !data?.id }]}
						/>
					</Col>
					<Col lg={8} className='gutter-row'>
						<FormInput
							label={t('Date of Birth')}
							name={'dob'}
							initialValue={data?.dob}
							inputType={'date'}
							rules={[{required: !data?.id }]}
						/>
					</Col>
					<Col lg={8} className='gutter-row'>
						<FormInput
							label={t('Email')}
							name={'email'}
							rules={[{ required: !data?.id }]}
							initialValue={data?.email}
						/>
					</Col>
					<Col lg={24} className='gutter-row'>
						<FormInput
							label={t('Address')}
							name={'address'}
							initialValue={data?.address?.address1}
						/>
					</Col>
				</Row>
			</div>
		</Form>
	)
}

export default CreatePatient
