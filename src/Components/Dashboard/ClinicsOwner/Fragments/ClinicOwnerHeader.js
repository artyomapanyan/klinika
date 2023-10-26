import React, { useEffect, useState } from 'react'
import { Dropdown } from 'antd'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import arrow_black from '../../../../dist/icons/arrow-black.svg'
import dayjs from 'dayjs'
import Resources from '../../../../store/Resources'

const currentMonth = new Date().getMonth()
function ClinicOwnerHeader({ noClinicSelect = false, dashboardText=false }) {
	let reduxInfo = useSelector((state) => state?.auth?.clinics);
	const [items, setItems] = useState([])

	let dispatch = useDispatch()
	let ownerClinics = useSelector(state => state?.owner)



	useEffect(() => {
		if (!noClinicSelect) {

				if (reduxInfo) {
						let itm = [
							{
								key:'all',
								label: t('All Clinics')
							},
							...reduxInfo.map((el, key) => {
								if (key === 0) {
									dispatch({
										type: 'OWNER_DATA',
										payload: {
											id: el?.id,
											month_key: currentMonth
										}
									})
								}
								return {
									label: el?.name,
									key: el?.id
								}
							})
						]

					console.log(itm)

					setItems(itm)
				}


		}
	}, [])

	const onClick = ({ key }) => {
		dispatch({
			type: 'OWNER_DATA',
			payload: {
				id: key
			}
		})
	}

	const handleChange = ({ key }) => {
		dispatch({
			type: 'OWNER_DATA',
			payload: {
				month_key: key
			}
		})
	}


	const { Months } = Resources
	return (
		<div className={'clinic_owner_header'} style={{zIndex: 999}}>
			<div style={{ margin: '40px 24px', fontSize: 40, fontWeight: 400 }}>
				{
					dashboardText ? t('Invoices Details') : t('Dashboard')
				}

			</div>
			<div>
				<Dropdown
					menu={{
						items: Months,
						onClick: handleChange
					}}
					trigger={['click']}
					className={'own_head_clinics'}
				>
					<div
						className={'dashboard_head_dropdown'}
						style={{ cursor: 'pointer' }}
					>
						<div style={{ fontWeight: 400, fontSize: 20 }}>
							{Months.find(e => e.key == ownerClinics.month_key)?.label ??
								dayjs().format('MMM')}
						</div>
						<div style={{ marginLeft: 20 }}>
							{' '}
							<img alt={'arrow_black'} src={arrow_black} />
						</div>
					</div>
				</Dropdown>
			</div>
			{!noClinicSelect && (
				<div>
					<Dropdown
						menu={{
							items: items,
							onClick: onClick
						}}
						trigger={['click']}
						className={'own_head_clinics'}
					>
						<div
							className={'dashboard_head_dropdown'}
							style={{ cursor: 'pointer' }}
						>
							<div style={{ fontWeight: 400, fontSize: 20 }}>
								{items.find(e => e.key == ownerClinics.id)?.label ??
									t('All Clinics')}
							</div>
							<div style={{ marginLeft: 20 }}>
								{' '}
								<img alt={'arrow_black'} src={arrow_black} />
							</div>
						</div>
					</Dropdown>
				</div>
			)}
		</div>
	)
}
export default ClinicOwnerHeader
