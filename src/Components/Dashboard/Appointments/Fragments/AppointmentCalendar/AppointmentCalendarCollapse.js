import React, { useMemo } from 'react'
import AppointmentCalendarInnCollapse from './AppointmentCalendarInnCollapse'

function AppointmentCalendarCollapse({
	item,
	search,
	appointmentObj,
	setappointmentObj,
	createAppointment
}) {
	const filteredData = useMemo(() => {
		return [...Object.values(item?.doctors ?? {})]
			.filter(e => !appointmentObj.doctor_id || e.doctor.id === appointmentObj.doctor_id)
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


	return (
		<>
			{filteredData.map((doctor, key) => (
				<AppointmentCalendarInnCollapse
					key={key}
					docObj={doctor}
					specialty={item?.speciality}
					appointmentObj={appointmentObj}
					setappointmentObj={setappointmentObj}
					createAppointment={createAppointment}

				/>
			))}
		</>
	)
}
export default AppointmentCalendarCollapse
