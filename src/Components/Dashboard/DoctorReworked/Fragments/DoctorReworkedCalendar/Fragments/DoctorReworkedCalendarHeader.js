import {Button, Drawer, Space} from "antd";
import {t} from "i18next";

import React, {useState} from "react";
import DoctorReworkedCalendarDrawer from "./DoctorReworkedCalendarDrawer";

function DoctorReworkedCalendarHeader({textApp=true}) {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    let data = ['New', 'Confirmed', 'Cancelled', 'Rescheduled']
    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", }}>
            <Space className={'app_clinic'} style={{marginLeft: textApp ? 0 : -15}}>
                {t(textApp ? "Appointments" : '')}

                {data.map((itemKey,key)=><Space  key={key} className={`withDot WD-colorCalendar-${key}`}>{itemKey}</Space>)}
            </Space>
            <div>
                <Space>
                    <Button type={'primary'} onClick={showDrawer}>+ Add entry</Button>
                </Space>
                <Drawer width={411} title="Add Appointment" placement="right" onClose={onClose} open={open}>
                    {open?<DoctorReworkedCalendarDrawer setOpen={setOpen} />:null}
                </Drawer>
            </div>
        </div>
    )
}
export default DoctorReworkedCalendarHeader;