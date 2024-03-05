import { Button, Card, List, Tag, Form, Modal } from 'antd'
import plusPurple from '../../../../../dist/icons/plus-purple.svg'
import { t } from 'i18next'
import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
import { postResource } from '../../../../Functions/api_calls'
import { useSelector } from 'react-redux'
import { RascheduledContent } from '../../../Appointments/StatusModalForms/RascheduledContent'
import {FollowUpContent} from "../../../Appointments/StatusModalForms/FollowUpContent";

function AppointmentFollowUpHistory({ appointment }) {
	const [modal, setModal] = useState(false)
	const [history, setHistory] = useState(appointment.follow_up_history)
	const [loading, setLoading] = useState(false)
	let token = useSelector(state => state.auth.token)
	const [date, setDate] = useState(false)
	const formRef = useRef()

	const onStatusChange = () => {
		setModal({
			...appointment,
			key: '6'
		})
	}

	console.log(appointment)

	const onFinish = values => {
		setLoading(true)

		if (values?.booked_at) {
			values.booked_at =
				values.booked_at.format('YYYY-MM-DD') + ' ' + values.appointment_time
		}
		postResource(
			'Appointment',
			'appointmentStatus',
			token,
			`${modal.id}/switch-status`,
			{
				status: modal.key,
				...values
			}
		)
			.then(response => {
				setHistory(response?.follow_up_history)
				setModal(null)
				setLoading(false)
			})
			.finally(() => {
				setLoading(true)
				setTimeout(() => {
					setLoading(false)
				}, 3000)
			})
	}

	const onCancel = () => {
		setModal(null)
	}

	function constconvertDateToStatus(date) {
		let color, backgroundColor, text
		if (dayjs(date).isSame(dayjs(), 'day')) {
			text = 'Current'
			color = '#BF539E'
			backgroundColor = '#BF539E1F'
		} else if (dayjs(date).isBefore(dayjs(), 'day')) {
			text = 'Completed'
			color = '#6DAF56'
			backgroundColor = '#6DAF561A'
		} else if (dayjs(date).isAfter(dayjs(), 'day')) {
			text = 'Upcoming'
			color = '#F5A348'
			backgroundColor = '#F5A3481A'
		}
		return { color, backgroundColor, text }
	}

	return (
		<div className={'current_medications_card'}>
			<Card
				title={t('Follow up history')}
				extra={
					<Button onClick={onStatusChange} className={'patient_card_btn'} disabled={appointment.status != 2}>
						{' '}
						<img alt={'icons'} src={plusPurple} />
						<span style={{ marginLeft: 10 }}>{t('Add')}</span>
					</Button>
				}
				style={{ padding: 20 }}
			>
				{history?.length ? (
					<List
						className='demo-loadmore-list'
						itemLayout='horizontal'
						dataSource={history}
						renderItem={e => (
							<List.Item>
								<List.Item.Meta
									title={<span style={{ color: '#bfbfbf' }}>Date & Time</span>}
									description={
										<span style={{ color: '#000', fontWeight: 'bold' }}>
											{dayjs(e).format('ddd, MMM DD, HH:mm')}
										</span>
									}
								/>
								<div>
									{' '}
									{
										<Tag
											className={'ant_tag'}
											style={{
												color: constconvertDateToStatus(e).color,
												backgroundColor: constconvertDateToStatus(e)
													.backgroundColor,
												margin: '0 8px',
												fontSize: 11
											}}
										>
											{constconvertDateToStatus(e).text}
										</Tag>
									}
								</div>
							</List.Item>
						)}
					/>
				) : null}
			</Card>
			<Modal
				key={Math.random()}
				maskClosable={true}
				open={modal?.id}
				footer={null}
				onCancel={onCancel}
				centered
			>
				<Form onFinish={onFinish} ref={formRef}>
					{/*<RascheduledContent*/}
					{/*	loading={loading}*/}
					{/*	modal={modal}*/}
					{/*	onCancel={onCancel}*/}
					{/*	date={date}*/}
					{/*	formRef={formRef}*/}
					{/*/>*/}
					<FollowUpContent
						loading={loading}
						modal={modal}
						onCancel={onCancel}
						date={date}
						formRef={formRef}
					/>
				</Form>
			</Modal>
		</div>
	)
}
export default AppointmentFollowUpHistory
