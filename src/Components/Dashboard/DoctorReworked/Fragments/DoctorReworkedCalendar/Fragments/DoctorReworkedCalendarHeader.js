import {Button, Drawer, Space} from "antd";
import {t} from "i18next";

import React, {useState} from "react";
import DoctorReworkedCalendarDrawer from "./DoctorReworkedCalendarDrawer";

function DoctorReworkedCalendarHeader({setDate}) {
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
            <Space className={'app_clinic'}>
                {t("Appointments")}
                {data.map((itemKey,key)=><Space  key={key} className={`withDot WD-colorCalendar-${key}`}>{itemKey}</Space>)}
            </Space>
            <div>
                <Space>
                    <Button type={'primary'} onClick={showDrawer}>+ Add entry</Button>
                </Space>
                <Drawer width={411} title="Add User" placement="right" onClose={onClose} open={open}>
                    {open?<DoctorReworkedCalendarDrawer setDate={setDate} setOpen={setOpen} />:null}
                </Drawer>
            </div>
        </div>
    )
}
export default DoctorReworkedCalendarHeader;