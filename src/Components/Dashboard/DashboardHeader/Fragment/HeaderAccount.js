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

function HeaderAccount() {
	let token = useSelector(state => state.auth.token)
	let user = useSelector(state => state?.auth?.user)

	const [approve, setApprove] = useState([])
	const [elem, setElem] = useState([])
	const [authOpen, setAuthOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		postResource('ApproveClinicDoctor', 'single', token, ``).then(response => {
			setApprove(response)
			setLoading(false)
		})
	}, [elem])

	const onOk = (el, key) => {
		setElem(el)
		postResource(
			'ClinicDoctor',
			'ApproveDecline',
			token,
			`/${el?.id}/approve`,
			{ approve: 1 }
		).then(response => {})
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
				{PermCheck(!'Doctor:viewAny') ? (
					<Dropdown
						dropdownRender={() => {
							return (
								<div className={'approve_drop_div'}>
									{loading ? (
										<Preloader />
									) : (
										<div>
											{approve.length < 1 ? (
												<div>No clinics to approve!</div>
											) : (
												approve?.map((el, key) => {
													return (
														<div key={key} className={'approve_drop_inn_div'}>
															<div>{el?.clinic?.name}</div>
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
								<img alt={'icons'} src={notification} />
								32
							</Space>
						</Button>
					</Dropdown>
				) : (
					<div></div>
				)}

				{
					<Button type='link' className='header_report'>
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
