import React, { useMemo } from 'react'
import AppointmentCalendarInnCollapse from './AppointmentCalendarInnCollapse'

function AppointmentCalendarCollapse({
	item,
	search,
	appointmentObj,
	setappointmentObj
}) {

	const filteredData = useMemo(() => {
		return [...Object.values(item?.doctors ?? {})]
			.map(e => {
				if (!search?.length) {
					return e
				}
				let doctor = [e.doctor].filter(doc => {
					const fullName = `${doc.first} ${doc.last}`
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
			{filteredData.map((doctor, key) => (
				<AppointmentCalendarInnCollapse
					key={key}
					docObj={doctor}
					specialty={item?.speciality}
					appointmentObj={appointmentObj}
					setappointmentObj={setappointmentObj}
				/>
			))}
		</>
	)
}
export default AppointmentCalendarCollapse
