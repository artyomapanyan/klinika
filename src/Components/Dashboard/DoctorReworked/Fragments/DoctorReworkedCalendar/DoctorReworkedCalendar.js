import React, {useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import Scheduler, {Resource} from 'devextreme-react/scheduler';
import DoctorReworkedCalendarHeader from "./Fragments/DoctorReworkedCalendarHeader";
import CalendarDataCell from "./Fragments/CalendarDataCell";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Preloader from "../../../../Preloader";



function DoctorReworkedCalendar() {
    let token = useSelector((state) => state.auth.token);

    const [date, setDate] = useState({
        from: dayjs().add(-12, 'month').format('YYYY-MM-DD'),
        to: dayjs().format('YYYY-MM-DD'),
    })

    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);





    useEffect(() => {
        setLoading(true)
        postResource('DoctorReworked', 'DoctorCalendar', token, '', date).then((response) => {
            console.log(response,'res')
            let data = Object.values(response.calendar).flat().map(e=>({
                text: 'Website Re-Design Planfffffffffffffffffff',
                startDate: new Date(e.booked_at.iso_string),
                endDate: new Date(e.booked_to.iso_string),
                roomId: [1],

                ...e
            }));
            setAppointments(data)
            setLoading(false)
        })
    }, [])



  //   const a = [
  //    {
  //      text: 'Website Re-Design Plan',
  //      startDate: new Date('2022-06-22T12:30:00+04:00'),
  //      endDate: new Date('2022-06-22T13:30:00+04:00'),
  //       roomId: [1],
  //   },
  // ];


    const resourcesData = [
        {
            text: 'Room 101',
            id: 1,
            color: '#43285d',
        }, {
            text: 'Room 102',
            id: 2,
            color: '#6DAF56',
        }, {
            text: 'Room 103',
            id: 3,
            color: '#BF539E',
        }, {
            text: 'Meeting room',
            id: 4,
            color: '#FFBD0D',
        }, {
            text: 'Conference hall',
            id: 5,
            color: '#635D6B',
        },
    ];




    return(
        <div className={'dr_reworked_not'}>
            <DoctorReworkedCalendarHeader />

            <div className={'dr_reworked_calendar_div'}>
                {
                    loading ? <Preloader /> : <Scheduler
                        dataSource={appointments}
                        height={500}
                        defaultCurrentDate={new Date()}

                        appointmentRender={(e)=> <CalendarDataCell data={e}/>}
                        views={
                            [{
                                type: 'day',
                                name: '3 Days',
                                intervalCount: 3,
                            }, 'week']
                        }
                        editing={{
                            allowAdding: false,
                            allowDeleting: false,
                            allowUpdating: false,
                            allowResizing: false,
                            allowDragging: false,
                            allowTimeZoneEditing: false,
                        }}
                        onAppointmentClick={(e)=> e.cancel = true}
                        onAppointmentDblClick={(e)=> e.cancel = true}
                        onCellClick={(e)=> e.cancel = true}
                        onAppointmentTooltipShowing={(e)=> e.cancel = true}
                        onAppointmentFormOpening={e=>e.cancel=true}
                        showAllDayPanel={false}

                    >

                    </Scheduler>
                }


                </div>

        </div>
    )
}
export default DoctorReworkedCalendar;