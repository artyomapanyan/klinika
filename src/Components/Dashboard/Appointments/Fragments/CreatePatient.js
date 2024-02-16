import React from 'react'
import { useSelector } from 'react-redux'
import { Form, Row, Col } from 'antd'
import { t } from 'i18next'
import FormInput from '../../../Fragments/FormInput'
import Resources from '../../../../store/Resources'

function CreatePatient({ data, formRef }) {
	let language = useSelector(state => state.app.current_locale)

	const handleMapItems = (item, name) => {
		name = item.phone_code ? `(${item.phone_code}) ${item.name}` : null
		item.id = item.phone_code
		return [name, item]
	}

	return (
		<Form
			name='patient'
			layout='vertical'
			disabled={data?.id}
			ref={formRef}
		>
			<div className={'add_edit_content'}>
				<h2 style={{ fontWeight: 'bold' }}>{t('Patient card')}</h2>
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
							rules={[{ required: !data?.id }]}
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
