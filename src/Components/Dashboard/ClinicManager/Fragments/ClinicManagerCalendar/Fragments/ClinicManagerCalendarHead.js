import {Button, DatePicker, Space} from "antd";
import {t} from "i18next";
import { LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
function ClinicManagerCalendarHead() {

    dayjs.extend(customParseFormat);
    const weekFormat = 'MM/DD';

    const customWeekStartEndFormat = (value) =>
        `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
            .endOf('week')
            .format(weekFormat)}`;


    let data = ['Specialty Load', 'Day off', 'HCP Load', 'Holidays/Weekend']


    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:30}}>
            <Space className={'app_clinic'} style={{fontSize:24, fontWeight:600}}>
                {t("Apointments")}
                {data.map((itemKey,key)=><Space  key={key} className={`withDot WD-color-${key}`}>{itemKey}</Space>)}
            </Space>
            <div>
                <Space>

                    <Button>July</Button>
                    <Button><LeftOutlined /></Button>
                    <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" />
                    <Button><RightOutlined /></Button>
                </Space>
            </div>
        </div>
    )
}
export default ClinicManagerCalendarHead;