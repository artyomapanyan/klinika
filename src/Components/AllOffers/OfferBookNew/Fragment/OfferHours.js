import React from 'react'
import { Progress } from 'antd'

function OfferHours({ data }) {
	//console.log('data hours',data)
	//console.log('data hours start',data.begins_at.date)
	//console.log('data hours end',data.expired_at.date)

	const startDate = new Date(data.begins_at.date)
	const endDate = new Date(data.expired_at.date)
	const totalSeconds = (endDate - startDate) / 1000
	const days = Math.floor(totalSeconds / 3600 / 24)
	const hours = Math.floor(totalSeconds / 3600) % 24

	//console.log('startDate',startDate)
	//console.log('endDate',endDate)

	return (
		<div className={'offer_hours_div'}>
			<div>
				<p className={'offer_hours_p'}>
					{days} days {hours} hours left
				</p>
			</div>
			<div>
				<Progress
					percent={50}
					showInfo={false}
					trailColor='#E1E2E9'
					strokeColor='#4FB873'
				/>
			</div>
		</div>
	)
}

export default OfferHours
