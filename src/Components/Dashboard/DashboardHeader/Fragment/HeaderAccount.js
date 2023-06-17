import React, { useEffect, useState } from 'react'
import './HeaderAccount.sass'
import notification from '../../../../dist/icons/notification.svg'
import alert from '../../../../dist/icons/alert.svg'
import arrowDownPurple from '../../../../dist/icons/arrowDownPurple.svg'
import { Avatar, Button, Card, Divider, Dropdown, Space } from 'antd'
import HeaderAccountDropdown from './Fragment/HeaderAccountDropdown'
import { useSelector } from 'react-redux'
import { t } from 'i18next'
import Languages from './Languages'
import PermCheck from '../../../Fragments/PermCheck'
import { postResource } from '../../../Functions/api_calls'
import Preloader from '../../../Preloader'
import {MedicineBoxOutlined} from "@ant-design/icons";
import checked_calendar_icon from "../../../../dist/icons/checked_calendar_icon.png";
import yellow_calendar from "../../../../dist/icons/yellow_calendar.png";
import map_icon from "../../../../dist/icons/map_icon.png";
import message_icon from "../../../../dist/icons/message_icon.png";
import {useNavigate} from "react-router";

function HeaderAccount() {
	let token = useSelector(state => state.auth.token)
	let user = useSelector(state => state?.auth?.user)
	let role = useSelector(state => state?.auth?.selected_role?.key)
	let navigate = useNavigate()

	const [approve, setApprove] = useState([])
	const [elem, setElem] = useState([])
	const [authOpen, setAuthOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		if(role == 'doctor') {
			setLoading(true)
			postResource('ApproveClinicDoctor', 'single', token, ``).then(response => {
				setApprove(response)
				setLoading(false)
			})
		}

	}, [role, elem])

	useEffect(() => {

			setLoading(true)
			postResource('Notifications', 'UnreadLastNotification', token, ``).then(response => {
				setNotifications(response)
				setLoading(false)
			})


	}, [role])

	const onOk = (el, key) => {
		setElem(el)
		postResource('ClinicDoctor', 'ApproveDecline', token, `/${el?.id}/approve`, { approve: 1 }).then(response => {})
	}

	const onCancel = (el, key) => {
		setElem(el)
		postResource(
			'ClinicDoctor',
			'ApproveDecline',
			token,
			`/${el?.id}/approve`,
			{ approve: 0 }
		).then(response => {})

		// setApprove([
		//     approve.filter((elem) => {
		//         return elem.id === key
		//     })
		//
		// ])
	}



	return (
		<div>
			<Space className='header-properties small-gap'>

				{role === 'doctor' ? (
					<Dropdown
						dropdownRender={() => {
							return (
								<div className={'approve_drop_div'}>
									{loading ? (
										<Preloader />
									) : (
										<div>
											{approve?.length < 1 ? (
												<div>No clinics to approve!</div>
											) : (
												approve?.map((el, key) => {
													return (
														<div key={key} className={'approve_drop_inn_div'}>
															<div>Invite from {el?.clinic?.name}</div>
															<div>
																<Button
																	onClick={() => onOk(el, key)}
																	style={{ margin: 3 }}
																	type={'primary'}
																	size={'small'}
																>
																	Ok
																</Button>
																<Button
																	onClick={() => onCancel(el, key)}
																	style={{ margin: 3 }}
																	type={'secondary'}
																	size={'small'}
																>
																	Cancel
																</Button>
															</div>
														</div>
													)
												})
											)}
										</div>
									)}
								</div>
							)
						}}
						trigger={['click']}
						placement='bottom'
					>
						<Button type='link' className='header_call_dropdown'>
							<Space>
								<MedicineBoxOutlined style={{fontSize :24, marginTop:4}}/>
								<span style={{marginTop: 9}}>{approve.length}</span>

							</Space>
						</Button>
					</Dropdown>
				) : (
					<div></div>
				)}

				<Dropdown
					dropdownRender={() => {
						return (
							<div className={'approve_drop_div'}>
								{loading ? (
									<Preloader />
								) : (
									<div className={'notifications_drop_big_div'} >
										{notifications?.items?.length < 1 ? (
											<div>No clinics to approve!</div>
										) : (
											notifications?.notifications?.map((el, key) => {
												return (
													<div key={key} className={'notifications_drop_inn_div'}>
														<div className={'notification_icon_div'}>
															{
																el?.data?.icon === "calendar-check" ? <img src={checked_calendar_icon}
																										   alt={'checked_calendar_icon'}/> : el?.data?.icon === "yellow_calendar" ?
																	<img src={yellow_calendar} alt={'yellow_calendar'}/> :
																	el?.data?.icon === "map_icon" ? <img src={map_icon}
																										 alt={'map_icon'}/> : el?.data?.icon === "message_icon" ?
																		<img src={message_icon} alt={'message_icon'}/> : <div></div>
															}
														</div>
														<div>
															<div className={'notifications_drop_title_div'}>
																{el?.data?.title}
															</div>
															<div className={'notifications_drop_descript_div'}>
																{el?.data?.description}
															</div>
														</div>


													</div>
												)
											})
										)}
									</div>
								)}
								<Button onClick={()=>navigate('notifications')} className={'notifications_drop_all_notifi_btn'}>
									Show all notifacations
								</Button>
							</div>
						)
					}}
					trigger={['click']}
					placement='bottom'
				>
					<Button type='link' className='header_call_dropdown'>
						<Space>
							<img alt={'icons'} src={notification} />
							{notifications?.unread_notifications_count}
						</Space>
					</Button>
				</Dropdown>

				{
					<Button onClick={()=>navigate('reports')} type='link' className='header_report'>
						<Space>
							<img alt={'icons'} src={alert} />
							<span className={'report_text'}>{t('Report')}</span>
						</Space>
					</Button>
				}
				<Divider type={'vertical'} style={{ height: 32 }} />

				<Dropdown
					onOpenChange={e => setAuthOpen(e)}
					open={authOpen}
					dropdownRender={() => (
						<Card className={'head_account_dropdown'}>
							<HeaderAccountDropdown setAuthOpen={setAuthOpen} />
						</Card>
					)}
					placement='bottomRight'
					trigger={['click']}
				>
					<Button type={'link'} className={'head_user_db'}>
						<div className={'avatar_big_div'}>
							<Avatar size={'large'} className='header_avatar'>
								A
							</Avatar>
							<div style={{ marginLeft: 8 }}>
								<div className={'first_name'}>{user?.first}</div>
								<div className={'last_name'}>{user?.last}</div>
							</div>
							<div style={{ marginLeft: 15, display: 'flex' }}>
								<img alt={'icons'} src={arrowDownPurple} />
							</div>
						</div>
					</Button>
				</Dropdown>
				<Divider type={'vertical'} style={{ height: 32 }} />
				<Languages />
			</Space>
		</div>
	)
}

export default HeaderAccount
