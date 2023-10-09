import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {postResource} from "../../../Functions/api_calls";
import {Button, Form, Radio, Spin} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {t} from "i18next";
import {GMBK} from "../../../../functions";
import Resources from "../../../../store/Resources";
import arrow_right_white from "../../../../dist/icons/arrow_right_white.png";
import Preloader from "../../../Preloader";

function AllOfferCalendar({setBookedAtState, formState, bookedAtState, date,  setDate1, dataClinic,        setDataState, dataState, data, setDate, setDataTimes}) {
    let language = useSelector((state) => state.app.current_locale)
    let token = useSelector((state) => state.auth.token);
    const authRedux = useSelector((state) => state?.auth);


    const [startDate, setStartDate] = useState(dayjs())


    const [timeLoading, setTimeLoading] = useState(false)

    const [timesIndex, setTimesIndex] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [disabledDays, setDisabledDays] = useState([])



//new
    const [availableTimes, setAvailableTimes] = useState([])
    const [dayOff, setDayOff] = useState([]);
    const [loadingDate, setLoadingDate] = useState(false);




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



    const onDateClick = (e) => {


        setDataState(prevState => ({
            ...prevState,
            date: e?.format('YYYY-MM-DD')
        }))
        setDate(e)

        if(e) {
                postResource('PublicClinicDoctorAvailableTimes', 'single', token,  dataState?.doctor_id+"/"+data?.clinic?.id, {
                    service:'clinic_visit',
                    date: dayjs(e).format('YYYY-MM-DD')
                }).then((response) => {
                    setAvailableTimes(response?.flat() ?? [])
                    // setTimesIndex(0)
                    // setAvailableTimes(response?.flat()??[])
                    // setTimeLoading(false)
                })
            }



        // setDate1(e)
        // setTimeLoading(true)
        // if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
        //     postResource('Clinic', 'ClinicsAvailableTimes', token, (role === 'doctor' ? clinicId : dataClinic?.clinic?.id), {
        //         date: dayjs(e).format('YYYY-MM-DD'),
        //         service: formState?.service_type,
        //     }).then((res) => {
        //         setAvailableTimes(res?.flat()??[])
        //         setTimeLoading(false)
        //
        //     })
        // } else {
        //     postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, (role === 'doctor' ? authRedux?.user?.id : dataClinic?.doctor?.id) + "/" + (role === 'doctor' ? clinicId : dataClinic?.clinic?.id), {
        //         service: formState?.service_type,
        //         date: dayjs(e).format('YYYY-MM-DD')
        //     }).then((response) => {
        //
        //         setTimesIndex(0)
        //         setAvailableTimes(response?.flat()??[])
        //         setTimeLoading(false)
        //     })
        // }
        // setBookedAtState(dayjs(e).format('YYYY-MM-DD'))
        // setIsClicked(true)
    }






    useEffect(() => {
        if(dataState?.doctor_id) {
            setLoadingDate(true)
            postResource('PublicClinicDoctorWorkingHours','single', token,  dataState?.doctor_id+ '/' + data?.clinic?.id, {service:'clinic_visit'}).then(response => {
                const res = response?.working_hours

                let day = [];
                Object.keys(res)?.forEach((key) => {
                    if(res[key][0]?.is_day_off){
                        day.push(key)
                    }
                })

                setDayOff(day)
                setLoadingDate(false)


            })
        }


    }, [dataState?.doctor_id])












    useEffect(() => {
        if(formState?.patient_id && formState?.clinic_id && formState?.service_type && formState?.specialty_id && bookedAtState) {
            onDateClick(date)
        }
    }, [formState?.clinic_id, formState?.service_type])

    const handleChangeTime = (count) => {
        if (timesIndex + count < 0 || timesIndex + count >= availableTimes.length) {
            return setTimesIndex(0)
        }
        setTimesIndex(prevState => prevState + count)
    }

    const timeChange = (e) => {

        setDataState((prevState)=>({
            ...prevState,
            time: e.target.value,
        }))
        setDataTimes(e.target.value)
    }



    return <div className={'drawer_cal_bog_div'}>
        <div className={'drawer_cal_top_div'}>
            <div className={'drawer_cal_head_div'}>
                <div className={'top_div_title'}>
                    {t('Pick Date')}
                </div>
                <div className={'next_prev_div'}>
                    <Button className={'next_prev_btn'} disabled={startDate.format('DD-MM-YYYY')== dayjs().format('DD-MM-YYYY')} onClick={() => handleChangeMonth(-1)}>
                        {language === 'en' ? <LeftOutlined style={{color: '#ffffff'}}/> : <RightOutlined style={{color: '#ffffff'}}/>}
                    </Button>
                    <div className={'top_div_title'}>{t(GMBK(startDate.month()))}</div>
                    <Button className={'next_prev_btn'} onClick={() => handleChangeMonth(1)}>
                        {language === 'en' ? <RightOutlined style={{color: '#ffffff'}}/> : <LeftOutlined style={{color: '#ffffff'}}/>}
                    </Button>
                </div>
            </div>
            <div>
                <div>
                    <div className={'big_date_div'} style={{padding: 0}}>

                        {[...[...Array(6).keys()]].map((e, key) => {

                            return  <Button key={key}
                                            loading={loadingDate}
                                            disabled={dayOff?.includes(startDate.add(key, 'day').format('dddd').toLowerCase())}
                                            className={`week_date_div ${date?.format('DD-MM-YYYY') === startDate.add(key, 'day').format('DD-MM-YYYY') ? 'selected' : ''}`}
                                            onClick={() => onDateClick(startDate.add(key, 'day'))}>
                                <div className={'date_div_in_map'} style={{fontWeight: 400}}>
                                    {Resources.Days[startDate.add(key, 'day').day()]}
                                </div>
                                <div style={{borderBottom: '1px solid #ffffff77', width: '100%'}}></div>
                                <div key={key} className={'date_div_in_map'}>

                                    {startDate.add(key, 'day').format('DD')}
                                </div>
                            </Button>
                        })
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
                        {t('Select Time')}
                    </div>
                    <div align={'center'} className={'big_time_div'} style={{height: 70}}>
                        {
                            date ? availableTimes.length === 0 ? isClicked ? <div className={'no_available_times'}>{t('No available times')}</div> : <div></div> :
                                <Radio.Group
                                    className={'hours_select'}
                                    onChange={timeChange}
                                    options={availableTimes?.slice(timesIndex, timesIndex + 8)?.map((e) => {
                                        return {
                                            label: dayjs('2023-10-10' + e).format('h:mmA'),
                                            value: e,
                                        }
                                    })}
                                    optionType="button"
                                    buttonStyle="solid"

                                />
                             : <div></div>
                        }

                        <Button className={'next_btn_time'} style={{marginTop: 0}} onClick={() => handleChangeTime(8)}>
                            <img alt={'arrow_right_white'} src={arrow_right_white}/>
                        </Button>

                    </div>
                </div>
            </div>
        </Spin>

    </div>
}

export default AllOfferCalendar