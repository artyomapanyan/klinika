import React, { useRef} from "react";


function DoctorReworkedCalendar() {
    let calendarRef = useRef();




    return(
        <div>
            <div ref={calendarRef} id="scheduler"></div>
        </div>
    )
}
export default DoctorReworkedCalendar;