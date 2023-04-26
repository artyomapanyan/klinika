import React from "react";

function CalendarDataCell({data}) {
    return(
        <div>
            <div>
                {data.appointmentData.text}
            </div>
            <div>
                {data.appointmentData.booked_at.iso_string}
            </div>

        </div>
    )
}
export default CalendarDataCell;
