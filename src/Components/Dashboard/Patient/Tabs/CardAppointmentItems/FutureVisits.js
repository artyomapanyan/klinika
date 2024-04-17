import { t } from 'i18next'
import { Button, Col, Row, Form, Space, Card } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import FormInput from '../../../../Fragments/FormInput'
import dark_delete_icon from '../../../../../dist/icons/dark_delete_icon.png'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import Resources from '../../../../../store/Resources'
import { useSelector } from 'react-redux'
import x_black from '../../../../../dist/icons/x_black.png'
import { notification } from 'antd'
import './FutureVisits.css'
import Preloader from '../../../../Preloader'
import {
	postResource,
	postResource1,
	createResource,
	updateResource,
	deleteResource
} from '../../../../Functions/api_calls'

const FutureVisits = ({ appointment_id, status }) => {
	const formRef = useRef()
	let token = useSelector(state => state.auth.token)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const [visitsState, setVisitsState] = useState([])
	const [newVisit, setnewVisit] = useState({})
	const [defaultPagination, setDefaultPagination] = useState({
		order: 'desc',
		order_by: 'order',
		per_page: 100,
		page: 1
	})
	const [addLoading, setAddLoading] = useState(false)

	useEffect(() => {
		loadVisits()
	}, [])

	useEffect(() => {
		if (status == 0 || status == 2 || status == 3 || status == 5 || status == 7)
			setDisabled(true)
		else setDisabled(false)
	}, [status])

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

	const handleValuesChange = e => {
		setnewVisit(prevState => ({
			...prevState,
			...e
		}))
	}

	const addVisit = () => {
		setAddLoading(true)
		createResource(
			'FutureVisits',
			{
				...newVisit,
				appointment_id: appointment_id,
				queue_type: visitsState.length ? null : 1,
			},
			token
		).then(response => {
			setAddLoading(false)
			if (response.id) {
				loadVisits()
				formRef.current.resetFields()
				setnewVisit({})
			}
		})
	}

	const deleteVisit = (e, visit) => {
		deleteResource('FutureVisits', visit.id, token).then(response => {
			if (response.id) {
				setVisitsState(prevState => {
					return prevState.filter(item => item.id !== response.id)
				})
			}
		})
	}

	const removeVisitItem = (visitIndex, itemIndex, arrayName) => {
		if (visitsState[visitIndex]?.[arrayName].length > 1) {
			const visit = visitsState[visitIndex]
			visit[arrayName] = visit[arrayName].filter(
				(_, index) => index !== itemIndex
			)
			updateVisit(visit, visitIndex)
		} else {
			notification.error({
				message: 'Error',
				description: t('The Visit must have at least one item'),
				placement: 'bottomRight'
			})
		}
	}

	const changeQueue = (value, visit, visitIndex) => {
		if (value) {
			updateVisit({ ...visit, queue_type: value }, visitIndex)
		} else {
			updateVisit({ ...visit, queue_type: null }, visitIndex)
			//formRef.current.setFieldsValue({'When': 'From Begining'})
		}
	}


	const changeGap = (event, visit, visitIndex) => {
		if (event.target?.value) {
			if (event.target?.value <= 120 && event.target?.value >= 0)
				updateVisit({ ...visit, gap: event.target?.value }, visitIndex)
			else {
				notification.error({
					message: 'Error',
					description: t('the gap must be between 0 and 120 day'),
					placement: 'bottomRight'
				})
			}
		} else {
			updateVisit({ ...visit, gap: null }, visitIndex)
		}
	}

	const updateVisit = (visit, visitIndex) => {
		updateResource(
			'FutureVisits',
			visit.id,
			{
				...visit,
				lab_tests: visit.lab_tests.map(e => e.id),
				nursing_tasks: visit.nursing_tasks.map(e => e.id),
				specialty_id: visit.specialty?.id
			},
			token
		).then(response => {
			if (response.id) {
				setVisitsState(prevState => {
					const updatedState = [...prevState]
					updatedState[visitIndex] = response
					return updatedState
				})
			}
		})
	}

	const reorderVisit = (visit, action) => {
		setLoading(true)
		postResource1(
			'FutureVisits',
			'single',
			token,
			visit.id,
			{ action: action, ...defaultPagination },
			{},
			true,
			'/reorder'
		).then(response => {
			setLoading(false)
			if (!response.errors) {
				setVisitsState(response.items)
			}
		})
	}

	const validatePositiveNumber = (_, value) => {
		if (value < 0) {
			return Promise.reject(new Error(''))
		}
		return Promise.resolve()
	}

	return (
		<div className='future-visits' style={{width: '100%'}}>
			{!disabled || (disabled && visitsState.length) ? (
				<h2 style={{ marginTop: 20, fontSize: 20 }} className={'h1'}>
					{t('Future Visits')}
				</h2>
			) : null}
			{disabled ? (
				<div>
					{loading ? (
						<Preloader></Preloader>
					) : (
						visitsState?.map((visit, visitIndex) => {
							return (
								<Row
									key={visitIndex}
									style={{
										borderTop: visitIndex !== 0? '1px dashed #A6A7BA': 'none',
										height: 43,
										alignContent: 'center'
									}}
								>
									<Col
										lg={3}
										style={{
											borderInlineEnd: '1px solid #A6A7BA',
											marginInlineEnd: 40,
											alignContent: 'center'
										}}
									>
										{
											Resources.futureVisitTypes.find(
												e => e.id === visit.service_type
											)?.name
										}
									</Col>
									<Col lg={15} style={{ alignContent: 'center' }}>
										{visit.service_type === 'doctor_visit' ? (
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
									<Col lg={4} style={{ alignContent: 'center' }}>
										{
											Resources.futureVisitQueue.find(
												e => e.id === visit.queue_type
											)?.name
										}{' '}
										{visit.gap} {visit.gap != null ? 'days' : ''}
									</Col>
								</Row>
							)
						})
					)}
				</div>
			) : (
				<div>
					<Form
						name='future_visit'
						disabled={disabled}
						ref={formRef}
						onValuesChange={handleValuesChange}
						onFinish={addVisit}
					>
						<Row>
							<Col lg={6}>
								<FormInput
									label={t('Type')}
									name={'service_type'}
									inputType={'resourceSelect'}
									initialData={Resources.futureVisitTypes}
									rules={[{ required: true }]}
									inputProps={{
										onChange: e => {
											formRef?.current?.setFieldsValue({
												specialty_id: null,
												lab_tests: [],
												nursing_tasks: []
											})
											setnewVisit({
												service_type: e
											})
										}
									}}
								/>
							</Col>
							<Col lg={16}>
								{newVisit?.service_type == 'laboratory' ? (
									<FormInput
										label={t('Lab Tests')}
										name={'lab_tests'}
										inputProps={{
											mode: 'multiple'
										}}
										rules={[{ required: true }]}
										inputType={'resourceSelect'}
										resourceParams={{
											status: 2,
											has_clinic: 1
										}}
										resource={'LabTest'}
									/>
								) : null}
								{newVisit?.service_type == 'nursing' ? (
									<FormInput
										label={t('Nursing tasks')}
										name={'nursing_tasks'}
										inputProps={{
											mode: 'multiple'
										}}
										rules={[{ required: true }]}
										resourceParams={{
											status: 2,
											has_clinic: 1
										}}
										inputType={'resourceSelect'}
										resource={'NursingTask'}
									/>
								) : null}
								{newVisit?.service_type == 'doctor_visit' ? (
									<FormInput
										label={t('Specialty')}
										name={'specialty_id'}
										inputType={'resourceSelect'}
										rules={[{ required: true }]}
										resource={'Taxonomy'}
										customSearchKey={'title'}
										resourceParams={{
											type: Resources.TaxonomyTypes.SPECIALTY,
											has_doctor: 1,
											has_parent: 0,
											status: 2
										}}
									/>
								) : null}
							</Col>
							<Col lg={2}>
								<Button
									loading={addLoading}
									type={'primary'}
									htmlType='submit'
									className={"current_visit_add_btn"}
								>
									{t('Add')}
								</Button>
							</Col>
						</Row>
					</Form>
					{loading ? (
						<Preloader></Preloader>
					) : (
						visitsState?.map((visit, visitIndex) => {
							return (
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										width: '100%'
									}}
									key={visitIndex}
								>
									<div
										style={{ flex: '0 0 auto', marginRight: 10, marginTop: 5 }}
									>
										<Button
											style={{
												height: 48,
												width: 48,
												background: '#f5f6fa',
												border: 'none'
											}}
											disabled={
												visitsState.length === 1 ||
												visitIndex === visitsState.length - 1
											}
											type='default'
											icon={<CaretDownOutlined />}
											onClick={() => reorderVisit(visit, 'raise')}
										/>
									</div>
									<div
										style={{ flex: '0 0 auto', marginRight: 10, marginTop: 5 }}
									>
										<Button
											style={{
												height: 48,
												width: 48,
												background: '#f5f6fa',
												border: 'none'
											}}
											disabled={visitsState.length === 1 || visitIndex === 0}
											type='default'
											icon={<CaretUpOutlined />}
											onClick={() => reorderVisit(visit, 'reduce')}
										/>
									</div>
									<div style={{ flex: '1 1 auto', marginRight: 5 }}>
										{visit.service_type === 'doctor_visit' ||
										visit.nursing_tasks.length === 1 ||
										visit.lab_tests.length === 1 ? (
											<Card style={{ height: 48, padding: 0, marginTop: 5 }}>
												{visit.specialty?.title}
												{visit.nursing_tasks[0]?.name}
												{visit.lab_tests[0]?.name}
											</Card>
										) : (
											<Card style={{ padding: 0, marginTop: 5, marginBottom: 30 }}>
												{visit.service_type === 'laboratory' ? (
													<div>
														<h4 style={{ fontWeight: 700 }}>
															{t('LAB TESTS')}:
														</h4>
														{visit.lab_tests?.map((test, testIndex) => {
															return (
																<div
																	key={testIndex}
																	style={{
																		borderTop: '1px dashed #A6A7BA',
																		padding: 12
																	}}
																>
																	{test.name}
																	<Space style={{ float: 'inline-end' }}>
																		<div
																			style={{ cursor: 'pointer' }}
																			onClick={() => {
																				removeVisitItem(
																					visitIndex,
																					testIndex,
																					'lab_tests'
																				)
																			}}
																		>
																			<img
																				className={'del_icin'}
																				alt={'x_black'}
																				src={x_black}
																			/>
																		</div>
																	</Space>
																</div>
															)
														})}
													</div>
												) : (
													<div>
														<h4 style={{ fontWeight: 700 }}>
															{t('NURSING TASKS')}:
														</h4>
														{visit.nursing_tasks?.map((task, taskIndex) => {
															return (
																<div
																	key={taskIndex}
																	style={{
																		borderTop: '1px dashed #A6A7BA',
																		padding: 12
																	}}
																>
																	{task.name}
																	<Space style={{ float: 'inline-end' }}>
																		<div
																			style={{ cursor: 'pointer' }}
																			onClick={() => {
																				removeVisitItem(
																					visitIndex,
																					taskIndex,
																					'nursing_tasks'
																				)
																			}}
																		>
																			<img
																				className={'del_icin'}
																				alt={'x_black'}
																				src={x_black}
																			/>
																		</div>
																	</Space>
																</div>
															)
														})}
													</div>
												)}
											</Card>
										)}
									</div>
									<div style={{ flex: '0 0 auto', marginRight: 10 }}>
										<Form name='gap'>
											<div style={{ display: 'flex', flexDirection: 'row' }}>
												<div style={{ flex: '0 0 auto', width: 140 }}>
													<FormInput
														label={t('When')}
														name={'queue_type'}
														inputType={'resourceSelect'}
														initialData={Resources.futureVisitQueue}
														initialValue={visit?.queue_type}
														inputProps={{
															onChange: e => {
																changeQueue(e, visit, visitIndex)
															}
														}}
													/>
												</div>
												<div style={{ flex: '0 0 auto' }}>
													<FormInput
														label={t('Gap, days')}
														name={'gap'}
														inputType={'number'}
														disabled={visitsState?.length < 1}
														initialValue={visit?.gap}
														onChange={e => changeGap(e, visit, visitIndex)}
														max={120}
														min={0}
														rules={[{ validator: validatePositiveNumber }]}
													/>
												</div>
											</div>
										</Form>
									</div>
									<div style={{ flex: '0 0 auto', marginTop: 16 }}>
										<img
											src={dark_delete_icon}
											alt={'dark_delete_icon'}
											onClick={e => deleteVisit(e, visit)}
											style={{ cursor: 'pointer' }}
										/>
									</div>
								</div>
							)
						})
					)}
				</div>
			)}
		</div>
	)
}

export default FutureVisits
