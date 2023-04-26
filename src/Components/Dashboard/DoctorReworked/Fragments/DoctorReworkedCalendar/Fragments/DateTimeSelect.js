import React, {useState} from 'react'
import arrow_right_white from "../../../../../../dist/icons/arrow_right_white.png";
import dayjs from "dayjs";
import {Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {t} from "i18next";
import {GMBK} from "../../../../../../functions";
import Resources from "../../../../../../store/Resources";
import {postResource} from "../../../../../Functions/api_calls";

function DateTimeSelect() {
    const [startDate, setStartDate] = useState(dayjs())
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [timeLoading, setTimeLoading] = useState(false)
    const [availableTimes, setAvailableTimes] = useState([])
    const handleChangeMonth = (count) => {
        setStartDate((prevState) => prevState.add(count, 'month'))
    }
    const handleChangeDay = (count) => {
        if (startDate.add(count, 'month') < dayjs()) {
            setStartDate(dayjs())
        } else {
            setStartDate((prevState) => prevState.add(count, 'day'))
        }

    }


    const onDateClick = (e) => {
        setDate(e)
        setTimeLoading(true)
        ///postResource('')
        //setAvailableTimes(response)
        //setTimeLoading(false)

    }

    return <div className={'drawer_cal_bog_div'}>
        <div className={'drawer_cal_top_div'}>
            <div className={'drawer_cal_head_div'}>
                <div className={'top_div_title'}>
                    Pick Date
                </div>
                <div className={'next_prev_div'}>
                    <Button className={'next_prev_btn'} disabled={startDate.add(-1, 'month') < dayjs()}
                            onClick={() => handleChangeMonth(-1)}><LeftOutlined style={{color: '#ffffff'}}/></Button>
                    <div className={'top_div_title'}>{t(GMBK(startDate.month()))}</div>
                    <Button className={'next_prev_btn'} onClick={() => handleChangeMonth(1)}><RightOutlined
                        style={{color: '#ffffff'}}/></Button>
                </div>
            </div>
            <div>
                <div>
                    <div className={'big_date_div'}>
                        <Button className={'next_btn'} disabled={startDate == dayjs()}
                                onClick={() => handleChangeDay(-5)}>
                            <img alt={'arrow_right_white'} src={arrow_right_white}/>
                        </Button>
                        {[...[...Array(5).keys()]].map((e, key) => {
                            return <div key={key} className={`week_date_div ${date.format('DD-MM-YYYY')===startDate.add(key, 'day').format('DD-MM-YYYY')?'selected':''}`}
                                        onClick={() => onDateClick(startDate.add(key, 'day'))}>
                                <div className={'date_div_in_map'}>
                                    {Resources.Days[startDate.add(key, 'day').day()]}
                                </div>
                                <div style={{borderBottom: '1px solid #ffffff77', width: '100%'}}></div>
                                <div key={key} className={'date_div_in_map'}>
                                    {startDate.add(key, 'day').format('DD')}
                                </div>
                            </div>
                        })}
                        <Button className={'next_btn'} onClick={() => handleChangeDay(5)}>
                            <img alt={'arrow_right_white'} src={arrow_right_white}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>


        <div className={'drawer_cal_bottom_div'}>
            <div className={'drawer_cal_head_div'}>
                <div className={'top_div_title'}>
                    Select Time
                </div>
            </div>
        </div>
    </div>
}

export default DateTimeSelect