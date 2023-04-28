import React from "react";

function CalendarDataCell({data}) {
    return(
        <div className={'appointment-container'}>
            <div className={'appointment-item'}>
                {data.appointment?.icon&&<div className={'appointment-icon'}>
                    <img src={data.appointment?.icon}/>
                </div>}
                <div className={'appointment-data'}>
                    <div>
                        {data.appointmentData.content}
                    </div>
                    <div>
                        {data.appointmentData.booked_at.iso_string}
                    </div>
                </div>
            </div>

            <div className={'road-trip'}>

            </div>
            <div className={'delete-icon'}>

            </div>

        </div>
    )
}
export default CalendarDataCell;
