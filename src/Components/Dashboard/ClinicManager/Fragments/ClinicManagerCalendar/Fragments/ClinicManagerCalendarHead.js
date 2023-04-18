import {Button, DatePicker, Space} from "antd";
import {t} from "i18next";
import { LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {GMBK} from "../../../../../../functions";
import {useState} from "react";
function ClinicManagerCalendarHead({date,setDate}) {


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
                {t("Apointments")}
                {data.map((itemKey,key)=><Space  key={key} className={`withDot WD-color-${key}`}>{itemKey}</Space>)}
            </Space>
            <div>
                <Space>
                    <Button>{GMBK(date[0].month())}</Button>
                    <Button onClick={()=>handleSwitchWeek(-1)}><LeftOutlined /></Button>
                    <DatePicker value={date[0]} defaultValue={dayjs()} onChange={e=>setDate([dayjs(e).startOf('week'),dayjs(e).endOf('week')])} format={customWeekStartEndFormat} picker="week" />
                    <Button onClick={()=>handleSwitchWeek(1)}><RightOutlined /></Button>
                </Space>
            </div>
        </div>
    )
}
export default ClinicManagerCalendarHead;