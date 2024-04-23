import { Avatar, Modal } from 'antd'
import React, { useState } from 'react'
import AppointmentCalendarModal from './AppointmentCalendarModal'
import dayjs from 'dayjs'
import gray_grid from '../../../../../dist/icons/bg_pattern.jpg'

function AppointmentCalendarInnCollapse({
	docObj,
	specialty,
	appointmentObj,
	setappointmentObj,
	createAppointment
}) {
	const [selectedDate, setSelectedDate] = useState(false)
	let thisDate = dayjs().format('YYYY-MM-DD')

	return (
		<tbody>
			<tr id='hidden_row1' className='hide'>
				{!appointmentObj?.doctor_id ? (
					<td style={{paddingRight: 20 }} className='hiddenTableRow__col'>
						<div className='hiddenTableRow__col-item'>
							<div className='circleImageHolder'>
								<Avatar size={36} src={docObj.doctor.avatar?.url} />
							</div>
							<p className={'cl_manager_calendar_dr_name'}>
								{docObj?.doctor?.first} {docObj?.doctor?.last}
							</p>
						</div>
					</td>
				) : null}
				{Object.keys(docObj?.availability ?? {}).map((key, k) => {
					return (
						<td
							key={key}
							className='hiddenTableRow__col'
							onClick={
								thisDate > key || !docObj.availability[key]?.available
									? null
									: () => setSelectedDate(key)
							}
						>
							<div
								className='progress progressGreen'
								style={{
									cursor:
										thisDate > key || !docObj.availability[key]?.available
											? ''
											: 'pointer',
									background:
										docObj.availability[key]?.percentage === null
											? 'url(' + gray_grid + ')'
											: '#6DAF5620'
								}}
							>
								<div
									className='progress-bar progressGreen__inside'
									role='progressbar'
									style={{
										width: docObj.availability[key]?.percentage + '%',
										background:
											docObj?.availability[key]?.percentage === null
												? 'url(' + gray_grid + ')'
												: '#6DAF56'
									}}
									aria-valuenow='85'
									aria-valuemin='0'
									aria-valuemax='100'
								></div>
								{docObj.availability[key]?.percentage === null ? (
									<div></div>
								) : (
									<div className='progressText'>
										{docObj.availability[key]?.percentage?.toFixed()}%
									</div>
								)}
							</div>
						</td>
					)
				})}
				<Modal
					open={selectedDate}
					onCancel={() => setSelectedDate(false)}
					width={'550px'}
					footer={null}
				>
					{selectedDate ? (
						<AppointmentCalendarModal
							key={Math.random()}
							doctor={docObj?.doctor}
							specialty={specialty}
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
							appointmentObj={appointmentObj}
							setappointmentObj={setappointmentObj}
							createAppointment={createAppointment}
						/>
					) : null}
				</Modal>
			</tr>
		</tbody>
	)
}

export default AppointmentCalendarInnCollapse
