import React, {useState} from 'react'
import arrow_right_white from "../../../../../../dist/icons/arrow_right_white.png";
import dayjs from "dayjs";
import {Button, Form, Radio, Spin} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {t} from "i18next";
import {GMBK} from "../../../../../../functions";
import Resources from "../../../../../../store/Resources";
import {postResource} from "../../../../../Functions/api_calls";
import {useSelector} from "react-redux";

function DateTimeSelect({setBookedAtState, formState}) {
    let token = useSelector((state) => state.auth.token);
    const authRedux = useSelector((state) => state?.auth);

    const [startDate, setStartDate] = useState(dayjs())
    const [date, setDate] = useState(null)

    const [timeLoading, setTimeLoading] = useState(false)
    const [availableTimes, setAvailableTimes] = useState([])
    const [timesIndex, setTimesIndex] = useState(0)
    const [isClicked, setIsClicked] = useState(false)


    const handleChangeMonth = (count) => {
        if(startDate.add(count, 'month') < dayjs()){
            setStartDate(dayjs())
        }else{
            setStartDate((prevState) => prevState.add(count, 'month'))
        }


    }
    const handleChangeDay = (count) => {
        if (startDate.add(count, 'day') < dayjs()) {
            setStartDate(dayjs())
        } else {
            setStartDate((prevState) => prevState.add(count, 'day'))
        }

    }


    let clinicId = authRedux?.clinics?.find(e=>e?.id===formState?.clinic_id)?.id
    const onDateClick = (e) => {
        setDate(e)
        setTimeLoading(true)
        postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, authRedux?.user?.id + "/" + clinicId, {
            service: formState?.service_type,
            date: dayjs(e).format('YYYY-MM-DD')
        }).then((response) => {
            setTimesIndex(0)
            setAvailableTimes(response.flat())
            setTimeLoading(false)

        })
        setBookedAtState(dayjs(e).format('YYYY-MM-DD'))
        setIsClicked(true)

        ///postResource('')
        //setAvailableTimes(response)
        //setTimeLoading(false)

    }
    const handleChangeTime = (count) => {
        if (timesIndex + count < 0 || timesIndex + count >= availableTimes.length) {
            return setTimesIndex(0)
        }
        setTimesIndex(prevState => prevState + count)
    }


    return <div className={'drawer_cal_bog_div'}>
        <div className={'drawer_cal_top_div'}>
            <div className={'drawer_cal_head_div'}>
                <div className={'top_div_title'}>
                    Pick Date
                </div>
                <div className={'next_prev_div'}>
                    <Button className={'next_prev_btn'} disabled={startDate.format('DD-MM-YYYY')== dayjs().format('DD-MM-YYYY')}
                            onClick={() => handleChangeMonth(-1)}><LeftOutlined style={{color: '#ffffff'}}/></Button>
                    <div className={'top_div_title'}>{t(GMBK(startDate.month()))}</div>
                    <Button className={'next_prev_btn'} onClick={() => handleChangeMonth(1)}><RightOutlined
                        style={{color: '#ffffff'}}/></Button>
                </div>
            </div>
            <div>
                <div>
                    <div className={'big_date_div'}>
                        { formState?.clinic_id && formState?.patient_id && formState?.service_type && formState?.specialty_id ? [...[...Array(6).keys()]].map((e, key) => {
                            return <div key={key}
                                        className={`week_date_div ${date?.format('DD-MM-YYYY') === startDate.add(key, 'day').format('DD-MM-YYYY') ? 'selected' : ''}`}
                                        onClick={() => onDateClick(startDate.add(key, 'day'))}>
                                <div className={'date_div_in_map'} style={{fontWeight: 400}}>
                                    {Resources.Days[startDate.add(key, 'day').day()]}
                                </div>
                                <div style={{borderBottom: '1px solid #ffffff77', width: '100%'}}></div>
                                <div key={key} className={'date_div_in_map'}>
                                    {startDate.add(key, 'day').format('DD')}
                                </div>
                            </div>
                        }): <div></div>
                        }
                        {
                            startDate.format('DD-MM-YYYY') === dayjs().format('DD-MM-YYYY') ?
                                <Button className={'next_btn'} onClick={() => handleChangeDay(6)}>
                                    <img alt={'arrow_right_white'} src={arrow_right_white}/>
                                </Button> : <div>
                                    <Button className={'Next_btn_small'} disabled={startDate == dayjs()}
                                            onClick={() => handleChangeDay(-6)}>
                                        <img style={{transform: 'rotateY(180deg)'}} alt={'arrow_right_white'}
                                             src={arrow_right_white}/>
                                    </Button>
                                    <Button className={'Next_btn_small'} onClick={() => handleChangeDay(6)}>
                                        <img alt={'arrow_right_white'} src={arrow_right_white}/>
                                    </Button>
                                </div>
                        }
                        {/*<Button className={'next_btn'} onClick={() => handleChangeDay(6)}>*/}
                        {/*    <img alt={'arrow_right_white'} src={arrow_right_white}/>*/}
                        {/*</Button>*/}
                    </div>
                </div>
            </div>
        </div>

        <Spin spinning={timeLoading}>
            <div className={'drawer_cal_bottom_div'}>
                <div className={'drawer_cal_foot_div'}>
                    <div className={'top_div_title'}>
                        Select Time
                    </div>
                    <div align={'center'} className={'big_time_div'}>
                        {
                            availableTimes.length === 0 ? isClicked ? <div className={'no_available_times'}>No available times</div> : <div></div> : <Form.Item name={'booked_time'}>
                                <Radio.Group
                                    className={'hours_select'}
                                    options={availableTimes.slice(timesIndex, timesIndex + 8).map((e) => {
                                        return {
                                            label: e,
                                            value: e
                                        }
                                    })}
                                    optionType="button"
                                    buttonStyle="solid"

                                />
                            </Form.Item>
                        }

                        <Button className={'next_btn_time'} onClick={() => handleChangeTime(8)}>
                            <img alt={'arrow_right_white'} src={arrow_right_white}/>
                        </Button>

                    </div>
                </div>
            </div>
        </Spin>

    </div>
}

export default DateTimeSelect