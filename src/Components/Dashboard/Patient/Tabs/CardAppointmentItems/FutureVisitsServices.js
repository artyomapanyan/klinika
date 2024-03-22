import { t } from 'i18next'
import { Button, Col, Row, Layout, Form, Modal, Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import FormInput from '../../../../Fragments/FormInput'
import dark_delete_icon from '../../../../../dist/icons/dark_delete_icon.png'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

const FutureVisits = () => {
	const [addLoading, setAddLoading] = useState(false)
	const [visitsState, setVisitsState] = useState([])

	const addVisit = () => {
		setVisitsState(prevState => [
			...prevState,
			{
				id: Math.random(),
				name: 'aaa'
			}
		])
	}

	const deleteVisit = (e, element, key) => {
		setVisitsState(
			visitsState?.filter((el, prevKey) => {
				return element?.id !== el?.id
			})
		)
	}

	return (
		<div>
			<h1 style={{ marginTop: 20 }} className={'h1'}>
				{t('Future Visits')}
			</h1>
			<Row>
				<Col lg={6}>
					<FormInput
						label={t('Type')}
						name={'type'}
						inputType={'resourceSelect'}
						// initialValue={data?.gender}
						// initialData={Resources?.Gender}
						rules={[{ required: true }]}
					/>
				</Col>
				<Col lg={16}>
					<FormInput
						label={t('Service Type')}
						name={'type'}
						inputType={'resourceSelect'}
						// initialValue={data?.gender}
						// initialData={Resources?.Gender}
						rules={[{ required: true }]}
					/>
				</Col>
				<Col lg={2}>
					<Button
						loading={addLoading}
						size={'large'}
						type={'primary'}
						htmlType='submit'
						onClick={addVisit}
						style={{ top: 5, height: 48, width: 77 }}
					>
						{t('Add')}
					</Button>
				</Col>
			</Row>
			{visitsState?.map((el, key) => {
				return (
					<Row>
						<Col lg={3}>
							<Button
								style={{
									height: 48,
									width: 48,
									margin: 6,
									background: '#f5f6fa',
									border: 'none'
								}}
								type='default'
								icon={<CaretDownOutlined />}
							></Button>
							<Button
								style={{
									height: 48,
									width: 48,
									margin: 6,
									background: '#f5f6fa',
									border: 'none'
								}}
								type='default'
								icon={<CaretUpOutlined />}
							></Button>
						</Col>
						<Col lg={13}>
							<FormInput
								label={t('Type')}
								name={'type'}
								inputType={'input'}
								initialValue={el.name}
								rules={[{ required: true }]}
							/>
						</Col>
						<Col lg={4}>
							<FormInput
								label={t('When')}
								name={'when'}
								inputType={'resourceSelect'}
								// initialValue={data?.gender}
								// initialData={Resources?.Gender}
								rules={[{ required: true }]}
							/>
						</Col>
						<Col lg={3}>
							<FormInput
								label={t('Gap, days')}
								name={'gap'}
								inputType={'input'}
								rules={[{ required: true }]}
							/>
						</Col>
						<Col lg={1}>
							<div style={{ marginTop: 18, float: 'inline-end' }}>
								<img
									src={dark_delete_icon}
									alt={'dark_delete_icon'}
									onClick={e => deleteVisit(e, el, key)}
									style={{ cursor: 'pointer' }}
								/>
							</div>{' '}
						</Col>
					</Row>
				)
			})}
		</div>
	)
}

export default FutureVisits
