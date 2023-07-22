import React, {useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import Scheduler from 'devextreme-react/scheduler';
import DoctorReworkedCalendarHeader from "./Fragments/DoctorReworkedCalendarHeader";
import CalendarDataCell from "./Fragments/CalendarDataCell";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

import {Spin} from "antd";
import Resources from "../../../../../store/Resources";



function DoctorReworkedCalendar() {
    let token = useSelector((state) => state.auth.token);

    const [date, setDate] = useState({
        from: dayjs().format('YYYY-MM-DD'),
        to: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    })
    const [view, setView] = useState('3 Days')

    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
        setLoading(true)
        postResource('DoctorReworked', 'DoctorCalendar', token, '', date).then((response) => {
            let data = Object.values(response.calendar).flat().map(e =>{
            // console.log(Resources.AppointmentStatuses,Resources.AppointmentStatuses.find(s=>s.key==e.status)?.label,'sss')
                return {
                    text: Resources.AppointmentStatuses.find(s=>s.key==e.status)?.label ,
                    startDate: e.booked_at.iso_string,
                    endDate: e.booked_to.iso_string,
                    content: e.service_name,
                    ...e
                }
            });
            setAppointments(data)
            setLoading(false)
        })
    }, [date])

    console.log(appointments)

    return (<div className={'dr_reworked_not'}>
            <DoctorReworkedCalendarHeader setDate={setDate}/>

            <div className={'dr_reworked_calendar_div'}>
                <Spin spinning={loading}>
                    <Scheduler
                    dataSource={appointments}
                    height={500}

                    currentView={view}
                    onCurrentDateChange={(e) => {
                        setDate(() => {
                            const currentDate = dayjs(e).utc();
                            return {
                                from: currentDate.add(-10, 'day').format('YYYY-MM-DD'),
                                to: currentDate.add(10, 'day').format('YYYY-MM-DD')
                            }
                        })
                    }}
                    onCurrentViewChange={(e) => {
                        setView(e)
                    }}
                    defaultCurrentDate={date.from}

                    appointmentRender={(e) => <CalendarDataCell data={e}/>}
                    views={[{
                        type: 'day', name: '3 Days', intervalCount: 3,
                    }, 'week']}
                    editing={{
                        allowAdding: false,
                        allowDeleting: false,
                        allowUpdating: false,
                        allowResizing: false,
                        allowDragging: false,
                        allowTimeZoneEditing: false,
                    }}
                    onAppointmentClick={(e) => e.cancel = true}
                    onAppointmentDblClick={(e) => e.cancel = true}
                    onCellClick={(e) => e.cancel = true}
                    onAppointmentTooltipShowing={(e) => e.cancel = true}
                    onAppointmentFormOpening={e => e.cancel = true}
                    showAllDayPanel={false}

                >

                </Scheduler>
                </Spin>


            </div>

        </div>)
}

export default DoctorReworkedCalendar;