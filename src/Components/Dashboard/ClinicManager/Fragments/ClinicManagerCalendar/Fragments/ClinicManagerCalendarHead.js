import {Button, DatePicker, Space} from "antd";
import {t} from "i18next";
import { LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {GMBK} from "../../../../../../functions";
import React, {useState} from "react";
import arrow_next from "../../../../../../dist/icons/arrow-next.svg";
import arrow_prev from "../../../../../../dist/icons/arrow-prev.svg";
function ClinicManagerCalendarHead({date,setDate,hideData}) {


    dayjs.extend(customParseFormat);
    const weekFormat = 'MM/DD';

    const customWeekStartEndFormat = (value) =>
        `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
            .endOf('week')
            .format(weekFormat)}`;


    let data = ['Specialty Load', 'Day off', 'HCP Load', 'Holidays/Weekend']

    const handleSwitchWeek = (val)=>{
        setDate((prevState)=>{
            const newStart = prevState[0].add(val,'week')
            return [newStart.startOf('week'),newStart.endOf('week')]
        })
    }
    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:30}}>
            <Space className={'app_clinic'} style={{fontSize:24, fontWeight:600}}>
                {t("Appointments :")}
                {!hideData && data.map((itemKey,key)=><Space  key={key} className={`withDot WD-color-clinic-man-calendar-${key}`}>{itemKey}</Space>)}
            </Space>
            <div>
                <Space>
                    <div className={'clinic_man_month_btn'}>{GMBK(date[0].month())}</div>
                    <Button className={'chart_button'} onClick={()=>handleSwitchWeek(-1)}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
                    <DatePicker  className={'chart_clinic_manager_date_picker'} value={date[0]} defaultValue={dayjs()} onChange={e=>setDate([dayjs(e).startOf('week'),dayjs(e).endOf('week')])} format={customWeekStartEndFormat} picker="week" />
                    <Button className={'chart_button'} onClick={()=>handleSwitchWeek(1)}><img src={arrow_next} alt={'arrow_next'}/></Button>
                </Space>
            </div>
        </div>
    )
}
export default ClinicManagerCalendarHead;