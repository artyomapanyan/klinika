import React from "react";
import dayjs from "dayjs";

import walking_man_icon from "../../../../../../dist/icons/walking_man_icon.png";
import walking_man_black from "../../../../../../dist/icons/walking_man_black.png";
import {InstagramOutlined} from "@ant-design/icons";


function CalendarDataCell({data}) {


    let time = (dayjs(data?.appointmentData?.booked_to?.iso_string) - dayjs(data?.appointmentData?.booked_at?.iso_string))/1000/60


    console.log(time)

    return(
        <div className={'appointment-container'}
            style={{padding: time < 60 ? 0 : 8}}
        >
            <div className={'appointment-item'}>
                <div className={'appointment-icon-delete'}>
                    {/*<img className={'icon'} src={delete_icon} alt={'delete_icon'}/>*/}
                </div>
                <div className={'service_type_icons'}>
                    {
                        data.appointmentData.service_type === "telehealth" ? <InstagramOutlined style={{color: [3,4].includes(data.appointmentData.status) ? '#000000' : '#ffffff'}} /> :
                            [0,1].includes(data.appointmentData.status) ?  <img src={walking_man_icon} alt={'walking_man_icon'}/> : <img src={walking_man_black} alt={'walking_man_black'}/>
                    }
                </div>
                <div className={'appointment-data'} style={{lineHeight: time < 60 ? 1 : 1.5}}>
                    <div className={'appointment_name'} style={{color:[3,4].includes(data.appointmentData.status)? '#000000' : '#ffffff', fontSize: time < 60 ? 14 : 14}}>
                        {data.appointmentData?.patient?.first} {data.appointmentData?.patient?.last}
                    </div>
                    <div style={{display: time < 60 ? 'flex' : 'block', gap: time < 60 ? 10 : 0}}>
                        <div className={'appointment_time'} style={{color: [3,4].includes(data.appointmentData.status) ? '#42394D' : '#ffffff', }}>
                            {dayjs(data.appointmentData.booked_at.iso_string).format('h:mm')} - {dayjs(data.appointmentData.booked_to.iso_string).format('h:mm A')}
                        </div>
                        <div className={'status'} style={{color: [3,4].includes(data.appointmentData.status)? '#42394D' : '#ffffff', fontSize: time < 60 ? 12 : 14}}>
                            {data.appointmentData.service_name}
                        </div>
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
