import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useSelector } from 'react-redux'
import { postResource } from '../../../../../Functions/api_calls'
import { Space, Spin } from 'antd'
import { t } from 'i18next'

function InvoiceStatusesGraphic() {
	let canvasRef = useRef()
	let appointmentChartRef = useRef(null)

	const [data, setData] = useState({
		1: 0,
		2: 0
	})

	const colors = ['#BF539E', '#6CAE56FF']
	const text = [null, 'New', 'Payed']

	const [loading, setLoading] = useState(false)
	const token = useSelector(state => state.auth.token)
	const role = useSelector(state => state.auth.selected_role?.key)
	const headerFilters = useSelector(state => state?.owner)

	useEffect(() => {
		setLoading(true)
		postResource(
			role === 'clinic-owner' ? 'ClinicOwner' : 'ClinicManager',
			'InvoicesStatuses',
			token,
			null,
			{
				year: new Date().getFullYear().toString(),
				month: headerFilters?.month_key,
				clinic: headerFilters.id === 'all' ? undefined : headerFilters.id
			}
		).then(response => {
			setData(response?.appointments)
			setLoading(false)
		})
	}, [headerFilters])

	useEffect(() => {
		if (appointmentChartRef?.current?.ctx) {
			appointmentChartRef.current.config.data.datasets = Object.values(
				data
			).map((number, key) => ({
				data: [100 - number, number],
				backgroundColor: ['#F5F6FA', colors[key]],
				weight: 0.5,
				spacing: 0,
				borderWidth: 2
			}))
			appointmentChartRef.current.update()
		}
	}, [data])

	const counterforGreenDoughnut = {
		id: 'counter',
		beforeDraw: chart => {
			const {
				ctx,
				chartArea: { top, width, height }
			} = chart
			ctx.save()
			ctx.font = '900 20px Roboto'
			ctx.textAlign = 'center'
			ctx.fillStyle = '#000000'
			ctx.fillText(
				Object.values(data).reduce((a, b) => a + b, 0),
				width / 2,
				top + height / 2
			)
			//ctx.fillText(chart.config.data.datasets[0].data[1], width / 2, top + height / 2);
		}
	}

	useEffect(() => {
		Chart.register(...registerables)
		appointmentChartRef.current = new Chart(
			canvasRef.current.getContext('2d'),
			{
				type: 'doughnut',
				data: {
					datasets: Object.values(data).map((number, key) => ({
						data: [100 - number, number],
						backgroundColor: ['#F5F6FA', colors[key]],
						weight: 0.5,
						spacing: 0,
						borderWidth: 3
					}))
				},
				responsive: true,
				options: {
					cutout: '45%',
					plugins: {
						tooltip: {
							enabled: false
						}
					}
				},
				plugins: [counterforGreenDoughnut]
			}
		)
		return () => {
			appointmentChartRef?.current?.destroy()
		}
	}, [data])
	return (
		<Spin spinning={loading}>
			<Space className={'round_charts_big_div'}>
				<div style={{ height: 93, width: 93 }}>
					<canvas id='CounterMultipleChart' ref={canvasRef}></canvas>
				</div>
				<Space></Space>
				<Space direction={'vertical'}>
					<div className={'chart_counter_bold_text'}>{t('Statuses')}</div>
					{Object.keys(data).map((itemKey, key) => (
						<div key={key} className={`withDot_fact WD-invoice-status-${key}`}>
							<span className={'plan_load_jaddah'}>{text[itemKey]}</span>{' '}
							<span className={'fact_percent'}>{data[itemKey]}</span>{' '}
						</div>
					))}
				</Space>
			</Space>
		</Spin>
	)
}
export default InvoiceStatusesGraphic
