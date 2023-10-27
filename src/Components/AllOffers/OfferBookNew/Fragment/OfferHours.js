import React from 'react'
import { Progress } from 'antd'
import {t} from "i18next";
import dayjs from "dayjs";
import {useSelector} from "react-redux";

function OfferHours({ data }) {
	let language = useSelector((state) => state.app.current_locale)

	const startDate = dayjs(data?.begins_at?.iso_string)
	const endDate = dayjs(data?.expired_at?.iso_string).add(1, 'day')
	const totalSeconds = (endDate - new Date()) / 1000
	const days = Math.floor(totalSeconds / 3600 / 24)
	const hours = Math.floor(totalSeconds / 3600) % 24

	let hoursAll = (endDate - startDate) / 1000 / 3600
	let hoursthisDay = (endDate - new Date()) / 1000 / 3600
	let percent = hoursthisDay * 100 / hoursAll





	return (
		<div className={'offer_hours_div'}>
			<div>
				<p className={'offer_hours_p'}>
					{
						dayjs(endDate) < dayjs() ? `${t('expired')}` : language === 'en' ? `${days} ${t('days')} ${hours} ${t('hours')} ${t('left')}` : `${t('left')} ${days} ${t('days')} ${hours} ${t('hours')}`
					}

				</p>
			</div>
			<div>
				<Progress
					percent={dayjs(endDate) < dayjs() ? 100 : 100 - percent}
					showInfo={false}
					trailColor='#E1E2E9'
					strokeColor='#4FB873'
				/>
			</div>
		</div>
	)
}

export default OfferHours
