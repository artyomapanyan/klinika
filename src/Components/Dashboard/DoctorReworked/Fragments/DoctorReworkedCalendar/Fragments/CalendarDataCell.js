import React from "react";
import dayjs from "dayjs";

import foto_icon from "../../../../../../dist/icons/foto_icon.png";
import delete_icon from "../../../../../../dist/icons/delete_icon.png";
import walking_man_icon from "../../../../../../dist/icons/walking_man_icon.png";
import walking_man_black from "../../../../../../dist/icons/walking_man_black.png";
import {InstagramOutlined} from "@ant-design/icons";


function CalendarDataCell({data}) {


    return(
        <div className={'appointment-container'}>
            <div className={'appointment-item'}>
                <div className={'appointment-icon-delete'}>
                    {/*<img className={'icon'} src={delete_icon} alt={'delete_icon'}/>*/}
                </div>
                <div className={'service_type_icons'}>
                    {
                        data.appointmentData.service_type === "telehealth" ? <InstagramOutlined style={{color: data.appointmentData.status == 3 || data.appointmentData.status == 4 ? '#000000' : '#ffffff'}} /> :
                            data.appointmentData.status == 0 || data.appointmentData.status == 1 ?  <img src={walking_man_icon} alt={'walking_man_icon'}/> : <img src={walking_man_black} alt={'walking_man_black'}/>
                    }
                </div>
                <div className={'appointment-data'}>
                    <div className={'appointment_name'} style={{color: data.appointmentData.status == 3 || data.appointmentData.status == 4 ? '#000000' : '#ffffff'}}>
                        {data.appointmentData?.patient?.first} {data.appointmentData?.patient?.last}
                    </div>
                    <div className={'appointment_time'} style={{color: data.appointmentData.status == 3 || data.appointmentData.status == 4 ? '#42394D' : '#ffffff'}}>
                        {dayjs(data.appointmentData.booked_at.iso_string).format('HH:mm A')} - {dayjs(data.appointmentData.booked_to.iso_string).format('HH:mm A')}
                    </div>
                    <div className={'status'} style={{color: data.appointmentData.status == 3 || data.appointmentData.status == 4 ? '#42394D' : '#ffffff'}}>
                        {data.appointmentData.service_name}
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
