import React, { useState } from 'react'
import { Modal } from 'antd'
import AppointmentCalendarModal from './AppointmentCalendarModal'
import gray_grid from '../../../../../dist/icons/gray_grid.png'
import dayjs from 'dayjs'

function NursLabCalendarCollapse({ item, appointmentObj, setappointmentObj }) {
	const [selectedDate, setSelectedDate] = useState(false)
	let thisDate = dayjs().format('YYYY-MM-DD')

	return (
		<>
			<tbody>
				<tr>
					{Object.keys(item?.availability ?? {}).map((key, k) => {
						return (
							<td
								key={key}
								style={{
									paddingLeft: k === 0 ? '20px' : 0,
									cursor:
										thisDate > key || !item?.availability[key]?.available
											? ''
											: 'pointer'
								}}
								onClick={
									thisDate > key || item.availability[key]?.percentage === null
										? null
										: () => setSelectedDate(key)
								}
							>
								<div
									className={'progressPurple'}
									style={{
										background: !item.availability[key]?.available
											? 'url(' + gray_grid + ')'
											: '#6DAF5620'
									}}
								>
									<div
										className='progress-bar '
										role='progressbar'
										style={{
											width: item.availability[key]?.percentage + '%',
											background:
												item.availability[key]?.percentage === null
													? 'url(' + gray_grid + ')'
													: '#6DAF56'
										}}
										aria-valuenow={item.availability[key]}
										aria-valuemin='0'
										aria-valuemax='100'
									></div>
									{item.availability[key]?.percentage === null ? (
										<div></div>
									) : (
										<div className='progressText'>
											{item.availability[key]?.percentage?.toFixed()}%
										</div>
									)}
								</div>
							</td>
						)
					})}
				</tr>
			</tbody>
			<Modal
				open={selectedDate}
				onCancel={() => setSelectedDate(false)}
				width={'400px'}
				footer={null}
			>
				{selectedDate ? (
					<AppointmentCalendarModal
						key={Math.random()}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						appointmentObj={appointmentObj}
						setappointmentObj={setappointmentObj}
					/>
				) : null}
			</Modal>
		</>
	)
}
export default NursLabCalendarCollapse
