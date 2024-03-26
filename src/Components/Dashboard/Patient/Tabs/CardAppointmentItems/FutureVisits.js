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
	createResource,
	updateResource,
	deleteResource
} from '../../../../Functions/api_calls'

const FutureVisits = ({ disabled = false, appointment_id }) => {
	const formRef = useRef()
	let token = useSelector(state => state.auth.token)
	const [loading, setLoading] = useState(false)
    const [visitsState, setVisitsState] = useState([])
	const [visitTypesState, setVisitTypesState] = useState(
		Resources.futureVisitTypes
	)
    const [newVisit, setnewVisit] = useState({})
	const [addLoading, setAddLoading] = useState(false)


	useEffect(() => {
		loadVisits()
	}, [])

	const loadVisits = () => {
		setLoading(true)
		postResource('FutureVisits', 'single', token, '', {
			appointment: appointment_id
		}).then(response => {
			setLoading(false)
			if (!response.errors) {
				setVisitsState(response.items)
			}
		})
	}

    const handleMapLabTests = (item, name) => {
		name = item.lab_test.name
		item.id = item.lab_test.id
		return [name, item]
	}

	const handleMapNursingTasks = (item, name) => {
		name = item.nursing_task.name
		item.id = item.nursing_task.id
		return [name, item]
	}

    const handleValuesChange = e => {
		setnewVisit(prevState => ({
			...prevState,
			...e
		}))
	}

	const addVisit = () => {
		setAddLoading(true)
		createResource('FutureVisits', { ...newVisit, appointment_id }, token).then(
			response => {
				setAddLoading(false)
				if (response.id) {
					setVisitsState(prevState => [...prevState, response])
					formRef.current.resetFields()
					setnewVisit({})
				}
			}
		)
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
		}
	}

	const changeGap = (event, visit, visitIndex) => {
		if (event.target?.value) {
			if(event.target?.value <= 120)
				updateVisit({ ...visit, gap: event.target?.value }, visitIndex)
			else{
				notification.error({
					message: 'Error',
					description: t('the gap must be 120 or less'),
					placement: 'bottomRight'
				})
			}
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
		postResource(
			'FutureVisits',
			'single',
			token,
			visit.id,
			{ action: action },
			{ method: 'POST' },
			'/reorder'
		).then(response => {
			if (response.id) {
				loadVisits()
			}
		})
	}

	return (
		<div className='future-visits'>
			<h1 style={{ marginTop: 20 }} className={'h1'}>
				{t('Future Visits')}
			</h1>
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
							initialData={visitTypesState}
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
								handleMapItems={handleMapLabTests}
								resource={'ClinicLabTest'}
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
								handleMapItems={handleMapNursingTasks}
								resource={'ClinicNursingTask'}
							/>
						) : null}
						{newVisit?.service_type == 'clinic_visit' ? (
							<FormInput
								label={t('Specialty')}
								name={'specialty_id'}
								inputType={'resourceSelect'}
								rules={[{ required: true }]}
								resource={'Taxonomy'}
								customSearchKey={'title'}
								resourceParams={{
									type: Resources.TaxonomyTypes.SPECIALTY,
									has_doctor: 1
								}}
							/>
						) : null}
					</Col>
					<Col lg={2}>
						<Button
							loading={addLoading}
							size={'large'}
							type={'primary'}
							htmlType='submit'
							style={{ top: 5, height: 48, width: 77 }}
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
						<Row key={visitIndex}>
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
									onClick={() => reorderVisit(visit, 'raise')}
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
									onClick={() => reorderVisit(visit, 'reduce')}
								></Button>
							</Col>
							<Col lg={13}>
								{visit.service_type === 'clinic_visit' ||
								visit.nursing_tasks.length === 1 ||
								visit.lab_tests.length === 1 ? (
									<Card style={{ height: 48, padding: 0, marginTop: 5 }}>
										{visit.specialty?.title}
										{visit.nursing_tasks[0]?.name}
										{visit.lab_tests[0]?.name}
									</Card>
								) : (
									<Card style={{ padding: 0, marginTop: 5 }}>
										{visit.service_type === 'laboratory' ? (
											<div>
												<h4 style={{ fontWeight: 700 }}>{t('LAB TESTS')}:</h4>
												{visit.lab_tests?.map((test, testIndex) => {
													return (
														<Row
															key={testIndex}
															style={{
																borderTop: '1px dashed #A6A7BA',
																padding: 0
															}}
														>
															<Col lg={22} className='gutter-row'>
																{test.name}
															</Col>
															<Col lg={1} className='gutter-row'>
																<Space>
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
															</Col>
														</Row>
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
														<Row
															key={taskIndex}
															style={{
																borderTop: '1px dashed #A6A7BA',
																padding: 0
															}}
														>
															<Col lg={22} className='gutter-row'>
																{task.name}
															</Col>
															<Col lg={1} className='gutter-row'>
																<Space>
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
															</Col>
														</Row>
													)
												})}
											</div>
										)}
									</Card>
								)}
							</Col>
							<Col lg={7}>
								<Form name='gap'>
									<Row>
										<Col lg={12}>
											<FormInput
												label={t('When')}
												name={'queue_type'}
												inputType={'resourceSelect'}
												initialData={Resources.queue}
												initialValue={visit?.queue_type}
												inputProps={{
													onChange: e => {
														changeQueue(e, visit, visitIndex)
													}
												}}
											/>
										</Col>
										<Col lg={12}>
											<FormInput
												label={t('Gap, days')}
												name={'gap'}
												inputType={'number'}
												disabled={visitsState?.length < 1}
												initialValue={visit?.gap}
												onChange={e => changeGap(e, visit, visitIndex)}
												max={100}
											/>
										</Col>
									</Row>
								</Form>
							</Col>
							<Col lg={1}>
								<div style={{ marginTop: 18, float: 'inline-end' }}>
									<img
										src={dark_delete_icon}
										alt={'dark_delete_icon'}
										onClick={e => deleteVisit(e, visit)}
										style={{ cursor: 'pointer' }}
									/>
								</div>{' '}
							</Col>
						</Row>
					)
				})
			)}
		</div>
	)
}

export default FutureVisits
