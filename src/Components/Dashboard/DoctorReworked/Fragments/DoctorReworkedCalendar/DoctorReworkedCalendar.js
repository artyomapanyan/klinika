import React from "react";
import 'devextreme/dist/css/dx.light.css';
import Scheduler, {Resource} from 'devextreme-react/scheduler';
import DoctorReworkedCalendarHeader from "./Fragments/DoctorReworkedCalendarHeader";



function DoctorReworkedCalendar() {

    const appointments = [

     {
        text: 'Website Re-Design Plan',
        startDate: new Date(2019, 4, 22, 9, 30),
        endDate: new Date(2019, 4, 22, 11, 30),
        roomId: [1],
    }, {
        text: 'Book Flights to San Fran for Sales Trip',
        startDate: new Date(2019, 4, 22, 12, 0),
        endDate: new Date(2019, 4, 22, 13, 0),
            roomId: [2],
    }, {
        text: 'Install New Router in Dev Room',
        startDate: new Date(2019, 4, 23, 10, 30),
        endDate: new Date(2019, 4, 23, 11, 30),
            roomId: [3],
    },
    {
         text: 'Website Re-Design Plan',
         startDate: new Date(2019, 4, 23, 11, 30),
         endDate: new Date(2019, 4, 23, 13, 30),
        roomId: [1],
    },
    {
         text: 'Book Flights to San Fran for Sales Trip',
         startDate: new Date(2019, 4, 24, 10, 0),
         endDate: new Date(2019, 4, 24, 11, 30),
        roomId: [4],
    },
    {
         text: 'Install New Router in Dev Room',
         startDate: new Date(2019, 4, 24, 14, 30),
         endDate: new Date(2019, 4, 24, 15, 30),
        roomId: [5],
    },
  ];
    const resourcesData = [
        {
            text: 'Room 101',
            id: 1,
            color: '#774D9D',
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
        <div className={'chart_incomes_div'}>
            <DoctorReworkedCalendarHeader />
            <div>
                <Scheduler
                    dataSource={appointments}
                    height={500}
                    defaultCurrentDate={new Date(2019, 4, 22)}
                    startDayHour={9}
                    endDayHour={19}
                    views={
                        [{
                            type: 'day',
                            name: '3 Days',
                            intervalCount: 3,
                        }, 'week']
                    }
                    editing={{
                        allowAdding: true,
                        allowDeleting: true,
                        allowUpdating: true,
                        allowResizing: true,
                        allowDragging: true,
                    }}
                    showAllDayPanel={false}

                >
                    <Resource
                        dataSource={resourcesData}
                        fieldExpr="roomId"
                        label="Room"
                    />
                </Scheduler>

                </div>

        </div>
    )
}
export default DoctorReworkedCalendar;