import React, { useState, useMemo } from 'react'
import AppointmentCalendarInnCollapse from './AppointmentCalendarInnCollapse'

function AppointmentCalendarCollapse({
	item,
	search,
	appointMentObj,
	setAppointMentObj
}) {
	const [btnCollapsed, setBtnCollapsed] = useState(true)

	const filteredData = useMemo(() => {
		return [...Object.values(item?.doctors ?? {})]
			.map(e => {
				if (!search?.length) {
					return e
				}
				let doctor = [e.doctor].filter(doc => {
                    const fullName = `${doc.first} ${doc.last}`;
					return fullName.toLowerCase().includes(search.toLowerCase())
				})
				if (doctor.length === 0) {
					return null
				}
				return {
					...e,
					doctor: doctor[0]
				}
			})
			.filter(e => e)
	}, [search, item])

	console.log(item, 'items')
	return (
		<>
			{btnCollapsed
				? filteredData.map((doctor, key) => (
						<AppointmentCalendarInnCollapse
							key={key}
							docObj={doctor}
							specialty={item?.speciality}
							appointMentObj={appointMentObj}
							setAppointMentObj={setAppointMentObj}
						/>
				  ))
				: null}
		</>
	)
}
export default AppointmentCalendarCollapse
