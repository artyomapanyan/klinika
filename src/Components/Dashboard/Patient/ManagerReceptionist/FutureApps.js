import { t } from 'i18next'
import { Button, Col, Row, Form, Space, Card, Checkbox } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import FormInput from '../../../Fragments/FormInput'
import dark_delete_icon from '../../../../dist/icons/dark_delete_icon.png'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import Resources from '../../../../store/Resources'
import { useSelector } from 'react-redux'
import x_black from '../../../../dist/icons/x_black.png'
import { notification } from 'antd'
import Preloader from '../../../Preloader'
import {
	postResource,
	postResource1,
	createResource,
	updateResource,
	deleteResource
} from '../../../Functions/api_calls'
import { CheckBox } from 'devextreme-react'
import './FutureApps.sass'

const FutureApps = ({ appointment_id, disabled = false }) => {
	let token = useSelector(state => state.auth.token)
	const [loading, setLoading] = useState(false)
	const [addLoading, setAddLoading] = useState(false)
	const [visitsState, setVisitsState] = useState([])
	const [defaultPagination, setDefaultPagination] = useState({
		order: 'desc',
		order_by: 'order',
		per_page: 100,
		page: 1
	})

	useEffect(() => {
		loadVisits()
	}, [])

	const loadVisits = () => {
		setLoading(true)
		postResource('FutureVisits', 'single', token, '', {
			appointment: appointment_id,
			...defaultPagination
		}).then(response => {
			setLoading(false)
			if (!response.errors) {
				setVisitsState(response.items)
			}
		})
	}

	return (
		<div
			style={{ background: '#ffffff', margin: '24px 24px', borderRadius: 12 }}
		>
			<div style={{ padding: 20 }}>
				<h2 style={{ marginTop: 20 }} className={'h1'}>
					<span>{t('Future')}: </span>
					<span style={{ fontWeight: 400 }}>{t('Appointments')}</span>
				</h2>
				<div>
					{loading ? (
						<Preloader></Preloader>
					) : (
						visitsState?.map((visit, visitIndex) => {
							return (
								<Row
									key={visitIndex}
									style={{
										borderTop: '1px dashed #A6A7BA',
										minHeight: 60,
										alignContent: 'center'
									}}
								>
									<Col lg={1} style={{ alignSelf: 'center' }}>
										<Checkbox key={visit.id}>{visitIndex + 1}</Checkbox>
									</Col>
									<Col lg={9} style={{ alignSelf: 'center' }}>
										{visit.service_type === 'clinic_visit' ? (
											<div>{visit.specialty?.title}</div>
										) : null}
										{visit.service_type === 'laboratory' ? (
											<div>
												{visit.lab_tests.map(item => item.name).join(', ')}
											</div>
										) : null}
										{visit.service_type === 'nursing' ? (
											<div>
												{visit.nursing_tasks.map(item => item.name).join(', ')}
											</div>
										) : null}
									</Col>
									<Col lg={6} style={{ alignSelf: 'center' }}>
										{
											Resources.futureVisitTypes.find(
												e => e.id === visit.service_type
											)?.name
										}
									</Col>
									<Col lg={5} style={{ alignSelf: 'center' }}>
										<span style={{ fontWeight: 700 }}>500 SAR</span>
									</Col>
									<Col lg={3} style={{ alignSelf: 'center' }}>
										<Button
											loading={addLoading}
											size={'large'}
											type={'primary'}
											htmlType='submit'
										>
											{t('Book Appointment')}
										</Button>
									</Col>
								</Row>
							)
						})
					)}
				</div>
			</div>
		</div>
	)
}

export default FutureApps
