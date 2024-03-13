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
import dayjs from "dayjs";


var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
function HeaderAccount() {
	let token = useSelector(state => state.auth.token)
	let user = useSelector(state => state?.auth?.user)
	let role = useSelector(state => state?.auth?.selected_role?.key)
	let navigate = useNavigate()
	let language = useSelector((state) => state?.app?.current_locale);

	const [approve, setApprove] = useState([])
	const [elem, setElem] = useState([])
	const [authOpen, setAuthOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [approveLoading, setApproveLoading] = useState(false)
	const [notifications, setNotifications] = useState([])
	const [nameLastName, setNameLastName] = useState({})

	useEffect(() => {
		if(role == 'doctor') {
			setApproveLoading(true)
			setLoading(true)
			postResource('ApproveClinicDoctor', 'single', token, ``).then(response => {

				setApprove(response)

				if(response) {
					setTimeout(() => {
						setApproveLoading(false)
						setLoading(false)
					}, 1000)
				}

			})
		}

	}, [role, ])

	useEffect(() => {
		//setInterval(() => {
			setLoading(true)
			postResource('Notifications', 'UnreadLastNotification', token, ``).then(response => {
				setNotifications(response)
				setLoading(false)
			})
		//}, 60000)



	}, [role])

	const onOk = (el, key) => {
		setApproveLoading(true)
		setLoading(true)
		setElem(el)
		postResource('ClinicDoctor', 'ApproveDecline', token, `/${el?.id}/approve`, { approve: 1 }).then(response => {})


		postResource('ApproveClinicDoctor', 'single', token, ``).then(response => {

			setApprove(response)

			if(response) {
				setTimeout(() => {
					setApproveLoading(false)
					setLoading(false)
				}, 1000)
			}

		})
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

	useEffect(() => {
		if(role === 'doctor') {
			setLoading(true)
			postResource('DoctorUpdateProfile', 'GetDoctorProfile', token, '').then((response) => {
				setNameLastName(response)

			})
		}

	}, [])



	return (
		<div>
			<div className='header-properties small-gap'>
				<div className={'header_2_div'}>
					{role === 'doctor' ? (
							<div>
								{
									approveLoading ? <Preloader small={10}/> :	<Dropdown
										dropdownRender={() => {
											return (
												<div className={'approve_drop_div'}>
													{approveLoading ? (
														<Preloader small={10}/>
													) : (
														<div>
															{approve?.length < 1 ? (
																<div>{t('No clinics to approve')}!</div>
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
								}
							</div>


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
											<div className={'popup_header'}>
												<div className={'popup_header_not_text'}>{t('Notifications')}</div>
												<div>
													<Button className={'mark_all_read_btn'}>{t('Mark all as read')}</Button>
												</div>

											</div>
											<div className={'popup_lini'}></div>
											{notifications?.items?.length < 1 ? (
												<div>{t('No notifications')}!</div>
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
															<div className={'popup_info_big_div'}>
																<div >
																	<div className={'notifications_drop_title_div'}>
																		{el?.data?.title}
																	</div>
																	<div className={'notifications_drop_descript_div'}>
																		{el?.data?.description}
																	</div>
																</div>

																<div className={'popup_ago_date'}>
																	{
																		dayjs(el?.created_at).format('D') > dayjs().format('D') ? dayjs().to(dayjs(el?.created_at)) : dayjs(el?.created_at).format('YYYY-MM-DD HH:mm')

																	}
																</div>
															</div>





														</div>
													)
												})
											)}
										</div>
									)}
									<Button size={'large'} className={'popup_load_more_btn'} type={'primary'}>{t('Load more')}</Button>
									{/*<Button onClick={()=>navigate('notifications')} className={'notifications_drop_all_notifi_btn'}>*/}
									{/*	Show all notifacations*/}
									{/*</Button>*/}
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


					<Button onClick={()=>navigate('reports')} type='link' className='header_report'>
						<Space>
							<img alt={'icons'} src={alert} />
							<span className={'report_text'}>{t('Report')}</span>
						</Space>
					</Button>

					<Divider type={'vertical'} style={{ height: 32 }} />
				</div>
				<div className={'header_2_div'}>
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
								<Avatar size={'large'} className='header_avatar' src={nameLastName?.avatar?.url ? <img src={nameLastName?.avatar?.url} /> : ''}>
									{user?.first.slice(0, 1)}
									{user?.last.slice(0, 1)}
								</Avatar>
								<div style={{ margin: '0 8px' }}>
									<div className={'first_name'}>{role === 'doctor' ? nameLastName?.first : user?.first}</div>
									<div className={'last_name'}>{role === 'doctor' ? nameLastName?.last : user?.last}</div>
								</div>
								<div style={{ marginLeft: language === 'en' ? 15 : 0, display: 'flex' }}>
									<img alt={'icons'} src={arrowDownPurple} />
								</div>
							</div>
						</Button>
					</Dropdown>
					<Divider type={'vertical'} style={{ height: 32 }} />
					<Languages />
				</div>



			</div>
		</div>
	)
}

export default HeaderAccount
