import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { postResource } from '../../../../../Functions/api_calls'
import { Space, Spin } from 'antd'
import arrowGreen from '../../../../../../dist/icons/arrow-green.svg'
import arrowRed from '../../../../../../dist/icons/arrow-red.svg'
import { t } from 'i18next'

function InvoiceIncomesGraphic() {
	const [loading, setLoading] = useState(false)
	const token = useSelector(state => state.auth.token)
	const role = useSelector(state => state.auth.selected_role?.key)
	const headerFilters = useSelector(state => state?.owner)

	const [data, setData] = useState({
		incomes: 0,
		incomes_prev_month: 0,
		percentage: 0
	})

	useEffect(() => {
		setLoading(true)
		postResource(
			role === 'clinic-owner' ? 'ClinicOwner' : 'ClinicManager',
			'MonthlyIncomes',
			token,
			null,
			{
				year: new Date().getFullYear().toString(),
				month: headerFilters?.month_key,
				clinic: headerFilters.id === 'all' ? undefined : headerFilters.id
			}
		).then(response => {
			setData(response)
			setLoading(false)
		})
	}, [headerFilters])

	return (
		<Spin spinning={loading}>
			<Space>
				<Space direction={'vertical'} className={'progress_big_div'}>
					<div className={'clinic_owner_big_text'}>{data?.incomes}</div>
					<div
						style={{
							color:
								data.percentage > 0
									? '#6DAF56'
									: 200
									? '#a4a2a2'
									: 'rgba(207, 83, 62, 1)'
						}}
					>
						{data.percentage !== 0 ? (
							<img
								alt={'icons'}
								src={data?.percentage > 0 ? arrowGreen : arrowRed}
							/>
						) : (
							<div></div>
						)}
						<span style={{ fontWeight: 700, marginLeft: 5 }}>
							{data?.percentage}%
						</span>
					</div>
				</Space>

				<Space direction={'vertical'} style={{ marginLeft: 17 }}>
					<div className={'avg_montly'}>
						<span>{t('Current month')}</span>
					</div>
					<div className={'dr_counter_text'} style={{ fontWeight: 700 }}>
						{t('incomes')}
					</div>
				</Space>
			</Space>
		</Spin>
	)
}

export default InvoiceIncomesGraphic
