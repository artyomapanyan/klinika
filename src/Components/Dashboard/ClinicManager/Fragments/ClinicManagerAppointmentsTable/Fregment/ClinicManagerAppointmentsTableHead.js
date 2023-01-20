import {Button, DatePicker, Space} from "antd";
import {t} from "i18next";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";


function ClinicManagerAppointmentsTableHead() {

    dayjs.extend(customParseFormat);
    const weekFormat = 'MM/DD';

    const customWeekStartEndFormat = (value) =>
        `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
            .endOf('week')
            .format(weekFormat)}`;

    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:30}}>
            <Space className={'app_clinic'} style={{fontSize:24, fontWeight:600}}>{t("Apointments")}</Space>
            <div>
                <Space>
                    <Button><LeftOutlined /></Button>
                    <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" />
                    <Button><RightOutlined /></Button>
                </Space>
            </div>
        </div>
    )
}
export default ClinicManagerAppointmentsTableHead;