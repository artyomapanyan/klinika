import React, { useState, useMemo } from 'react'
import { Button } from 'antd'
import AppointmentCalendarInnCollapse from './AppointmentCalendarInnCollapse'
import gray_grid from '../../../../../dist/icons/gray_grid.png'
import arrowDownPurple from '../../../../../dist/icons/arrowDownPurple.svg'

function AppointmentCalendarCollapse({
	item,
	setDate,
	clinicID,
	clinic,
	setUpdate,
	search
}) {
	const [btnCollapsed, setBtnCollapsed] = useState(true)

	// const openCollapse = () => {
	// 	setBtnCollapsed(!btnCollapsed)
	// }

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
			{/* <tbody>
            <tr>
                <td>
                    <Button className="appointmentsBranch" onClick={openCollapse} style={{width: '100%', display:'flex', justifyContent:'space-between'}}>
                        <span className={'cl_manager_collapse_specialty'}>{item?.speciality}</span>
                        <img src={arrowDownPurple} alt={'arrowDownPurple'}/>
                    </Button>
                </td>
                {Object.keys(item?.availability??{}).map((key, k)=>   {
                    return <td key={key} style={{paddingLeft:k===0?'20px':0}}>

                    <div className={"progressPurple"} style={{background: item.availability[key] === null ? 'url('+gray_grid+')' : '#774d9d20'}}>
                        <div className="progress-bar "
                             role="progressbar"
                             style={{width: item.availability[key]+'%', background: item.availability[key] === null ? 'url('+gray_grid+')' : '#774d9d'}} aria-valuenow={item.availability[key]} aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                        {
                            item.availability[key] === null ? <div ></div> : <div className="progressText">{item.availability[key]?.toFixed()}%</div>
                        }

                    </div>
                </td>})}
            </tr>
            </tbody> */}

			{btnCollapsed
				? filteredData.map((doctor, key) => (
						<AppointmentCalendarInnCollapse
							setUpdate={setUpdate}
							key={key}
							setDate={setDate}
							clinic={clinic}
							clinicID={clinicID}
							speciality_id={item?.speciality_id}
							specialty={item?.speciality}
							docItem={doctor}
						/>
				  ))
				: null}
		</>
	)
}
export default AppointmentCalendarCollapse
