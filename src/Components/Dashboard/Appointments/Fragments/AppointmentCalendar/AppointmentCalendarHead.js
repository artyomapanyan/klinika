import { Button, DatePicker, Space } from 'antd'
import { t } from 'i18next'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { GMBK } from '../../../../../functions'
import React from 'react'
import arrow_next from '../../../../../dist/icons/arrow-next.svg'
import arrow_prev from '../../../../../dist/icons/arrow-prev.svg'
import FormInput from '../../../../Fragments/FormInput'

function AppointmentCalendarHead({
	date,
	setDate,
	hideData,
	showMonth = false,
	getDates,
	calendarTitle,
	appointmentObj,
	setappointmentObj,
	servicesList
}) {
	dayjs.extend(customParseFormat)
	const customWeekStartEndFormat = value =>
		`${dayjs(value).format('DD MMM')} - ${dayjs(value)
			.add(6, 'day')
			.format('DD MMM')}`

	let data = [
		t('HCP Load'),
		t('Day off/Weekend')
		//'Holidays/Weekend'
	]

	const handleSwitchWeek = val => {
		setDate(prevState => {
			const newStart = prevState[0].add(val, 'week')
			if (getDates) {
				getDates([newStart, newStart.add(6, 'day')])
			}
			return [newStart, newStart.add(6, 'day')]
		})
	}
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				padding: 24
			}}
		>
			<Space className={'app_clinic'} style={{ fontSize: 24, fontWeight: 600 }}>
				{t(calendarTitle)}
				{appointmentObj?.future_visit_id  && (appointmentObj.service_type === 'laboratory_clinic_visit' || appointmentObj.service_type === 'laboratory_home_visit')? (
					<div style={{ marginTop: 22, width: 200 }}>
						<FormInput
							label={t('Service Type')}
							name={'service_type'}
							inputType={'resourceSelect'}
							rules={[{ required: true }]}
							initialData={servicesList}
							initialValue={appointmentObj?.service_type}
							inputProps={{
								onChange: e =>
									setappointmentObj(prevState => ({
										...prevState,
										service_type: e
									}))
							}}
						/>
					</div>
				) : null}

				{!hideData &&
					data.map((itemKey, key) => (
						<Space
							key={key}
							className={`withDot WD-color-clinic-man-calendar-LN-${key}`}
						>
							{itemKey}
						</Space>
					))}
			</Space>

			<div>
				<Space className={'arrow_button'}>
					{!showMonth ? (
						<div className={'clinic_man_month_btn'}>
							{GMBK(date[0].month())}
						</div>
					) : (
						<div></div>
					)}

					<Button
						className={'chart_button'}
						style={{ paddingTop: 1 }}
						onClick={() => handleSwitchWeek(-1)}
					>
						<img src={arrow_prev} alt={'arrow_prev'} />
					</Button>
					<DatePicker
						suffixIcon={null}
						allowClear={false}
						className={'chart_clinic_manager_date_picker'}
						value={date[0]}
						defaultValue={dayjs()}
						onChange={e => setDate([dayjs(e), dayjs(e).add(6, 'day')])}
						format={customWeekStartEndFormat}
						picker='week'
					/>
					<Button
						className={'chart_button'}
						style={{ paddingTop: 1 }}
						onClick={() => handleSwitchWeek(1)}
					>
						<img src={arrow_next} alt={'arrow_next'} />
					</Button>
				</Space>
			</div>
		</div>
	)
}
export default AppointmentCalendarHead
