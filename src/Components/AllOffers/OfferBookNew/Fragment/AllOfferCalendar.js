import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {postResource} from "../../../Functions/api_calls";
import {Button, Radio, Spin} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {t} from "i18next";
import {GMBK} from "../../../../functions";
import Resources from "../../../../store/Resources";
import arrow_right_white from "../../../../dist/icons/arrow_right_white.png";


function AllOfferCalendar({
                              formState,
                              bookedAtState,
                              date,
                              setDataState,
                              dataState,
                              data,
                              setDate,
                              setDataTimes
                          }) {
    let language = useSelector((state) => state.app.current_locale)
    let token = useSelector((state) => state.auth.token);



    let [startDate, setStartDate] = useState(dayjs())
    let [getStartDate, setGetStartDate] = useState(dayjs())

    let [firstCall, setFirstCall] = useState(false)



    const [timeLoading, setTimeLoading] = useState(false)

    const [timesIndex, setTimesIndex] = useState(0)
    let [daysData, setDaysData] = useState([])
    const [timeCount, setTimeCount] = useState()


//new
    const [availableTimes, setAvailableTimes] = useState([])
    const [dayOff, setDayOff] = useState([]);
    const [loadingDate, setLoadingDate] = useState(false);


    const createAvailableDate = () => {
        return new Promise((resolve, reject) => {
            postResource('AvailableDayByDoctorAndClinic', 'single', token, dataState?.doctor_id + "/" + data?.clinic?.id, {
                service: 'clinic_visit',
            }).then((response) => {
                startDate = dayjs(response?.date)
                setStartDate(startDate);
                setGetStartDate(dayjs(response?.date))
                resolve();
            }).catch(reject)
        })

    }



    const handleChangeDay = (count, unit) => {
        if (startDate.add(count, unit) < getStartDate) {
            setStartDate(getStartDate)
        } else {
            let startCopy = startDate.clone().add(count, unit);
            if (daysData.find(e => e.key === startCopy.diff(dayjs(), 'days'))) {

            } else {
                daysData = [...daysData, ...[...Array(6).keys()].map((key) => ({
                    key: startCopy.clone().add(key, 'day').format('YYYY-MM-DD'),
                    disabled: dayOff.includes(startCopy.clone().add(key, 'day').day())
                })).filter(v => !daysData.find(u => u.key === v.key))];
                setDaysData(daysData);

                // setDaysData((prevState) => ([...prevState, ...[...Array(6).keys()].map((key) => ({
                //     key: startCopy.clone().add(key, 'day').format('YYYY-MM-DD'),
                //     disabled: dayOff.includes(startCopy.clone().add(key, 'day').day())
                // })).filter(v=>!prevState.find(u=>u.key===v.key))]))

            }

            setStartDate((prevState) => prevState.add(count, unit))
        }

    }


    const onDateClick = (e) => {


        setDataState(prevState => ({
            ...prevState,
            date: e?.format('YYYY-MM-DD')
        }))
        setDate(e)

        if (e) {
            setTimeLoading(true)
            postResource('PublicClinicDoctorAvailableTimes', 'single', token, dataState?.doctor_id + "/" + data?.clinic?.id, {
                service: 'clinic_visit',
                date: dayjs(e).format('YYYY-MM-DD')
            }).then((response) => {

                setAvailableTimes(response?.flat() ?? [])
                // setTimesIndex(0)
                // setAvailableTimes(response?.flat()??[])
                setTimeLoading(false)
            })
        }

    }

   // const currentDate = dayjs();


    const f = () => {
        if (dataState?.doctor_id) {
            setLoadingDate(true)
            postResource('PublicClinicDoctorWorkingHours', 'single', token, dataState?.doctor_id + '/' + data?.clinic?.id, {service: 'clinic_visit'}).then(response => {
                const res = response?.working_hours

                let day = [];
                Object.keys(res)?.forEach((key) => {
                    if (res[key][0]?.is_day_off) {
                        day.push(key)
                    }
                })

                setDayOff(day)
                setLoadingDate(false)
                daysData = [...Array(6).keys()].map(key => ({
                    //key: currentDate.add(key, 'day').format('YYYY-MM-DD'),
                    key: startDate.add(key, 'day').format('YYYY-MM-DD'),
                    //disabled: day.includes(currentDate.add(key, 'day').day())
                    disabled: day.includes(startDate.add(key, 'day').day())
                }));
                setDaysData(daysData);

                // setDaysData([...Array(6).keys()].map(key => ({
                //     key: currentDate.add(key, 'day').format('YYYY-MM-DD'),
                //     disabled: day.includes(currentDate.add(key, 'day').day())
                // })))


            })
        }
    }

    const f1 = () => {
        if(dataState?.doctor_id) {

        let callableDays = []
        if (!daysData.length) {
            callableDays = [...Array(6).keys()].map(key => ({
                // key: currentDate.add(key, 'day').format('YYYY-MM-DD'),
                // disabled: dayOff.includes(currentDate.add(key, 'day').day())
                key: startDate.add(key, 'day').format('YYYY-MM-DD'),
                disabled: dayOff.includes(startDate.add(key, 'day').day())
            }))
        } else {
            callableDays = [...daysData].filter(e => !e.called)
        }


        Promise.all(callableDays.map((callableDay, i) => {
            return postResource('PublicClinicDoctorAvailableTimes', 'single', token, dataState?.doctor_id + '/' + data?.clinic?.id, {
                service: 'clinic_visit',
                date: callableDay.key
            }).then((response) => {
                return {
                    key: callableDay.key,
                    hasDays: response ? response?.flat()?.length : 0,
                }

            })

        })).then(responses => {


            setDaysData(daysData.map(e => {
                let data = responses.find(u => e.key == u.key);
                if (data?.key) {
                    e.disabled = !data.hasDays;

                }
                e.called = true;

                return e
            }));
            setFirstCall(true)

            // setDaysData(prevState =>[...prevState.map(e => {
            //     let data = responses.find(u => e.key == u.key);
            //     e.disabled = !data.hasDays;
            //     e.called = true;
            //     // if (data?.key) {
            //     //     e.disabled = !data.hasDays;
            //     //     e.called = true;
            //     // }
            //
            //     return e
            // })]
            // )
        })
            }
    }


    useEffect(() => {

        // Make sure the state is in the initial state when the component mounts
        setStartDate(dayjs());
        setGetStartDate(dayjs());
        setFirstCall(false);
        setTimesIndex(0);
        setDaysData([]);
        setAvailableTimes([]);
        setDayOff([]);
        setLoadingDate(false);

        // Make the request for the new doctor
        (async () => {
            await createAvailableDate();
            f();
            f1();
        })();
    }, []);


    useEffect(() => {
        if (firstCall) {
            f1();
        }

    }, [startDate])

//useEffect(() => {
//         f();
//         let callableDays =[]
//         if(!daysData.length){
//             callableDays = [...Array(6).keys()].map(key => ({
//                 key: currentDate.add(key, 'day').format('YYYY-MM-DD'),
//                 disabled: dayOff.includes(currentDate.add(key, 'day').day())
//             }))
//         }else{
//             callableDays =  [...daysData].filter(e => !e.called)
//         }
//
//
//         Promise.all(callableDays.map((callableDay, i) => {
//             return postResource('PublicClinicDoctorAvailableTimes', 'single', token, dataState?.doctor_id + '/' + data?.clinic?.id, {
//                 service: 'clinic_visit',
//                 date: callableDay.key
//             }).then((response) => {
//
//                 return {
//                     key: callableDay.key,
//                     hasDays: response ? response[0]?.length : 0,
//                 }
//
//             })
//
//         })).then(responses => {
//
// //daysData
//             setDaysData(daysData.map(e => {
//
//                 let data = responses.find(u => e.key == u.key);
//                 // let data = daysData.find(u => e.key == u.key);
//
//                 if(data?.key) {
//                     e.disabled = !data.hasDays;
//
//                 }
//                 e.called = true;
//
//
//                 return e
//             }));
//
//
//             // setDaysData(prevState =>[...prevState.map(e => {
//             //     let data = responses.find(u => e.key == u.key);
//             //     e.disabled = !data.hasDays;
//             //     e.called = true;
//             //     // if (data?.key) {
//             //     //     e.disabled = !data.hasDays;
//             //     //     e.called = true;
//             //     // }
//             //
//             //     return e
//             // })]
//             // )
//         })

//    }, [dataState?.doctor_id, startDate])


    useEffect(() => {
        if (formState?.patient_id && formState?.clinic_id && formState?.service_type && formState?.specialty_id && bookedAtState) {
            onDateClick(date)
        }
    }, [formState?.clinic_id, formState?.service_type])

    const handleChangeTime = (count) => {
        setTimeCount(count)
        if (timesIndex + count < 0 || timesIndex + count >= availableTimes.length) {
            return setTimesIndex(0)
        }
        setTimesIndex(prevState => prevState + count)

    }


    const timeChange = (e) => {

        setDataState((prevState) => ({
            ...prevState,
            time: e.target.value,
        }))
        setDataTimes(e.target.value)
    }



    return <div className={'drawer_cal_bog_div'}>
        <div className={''} style={{backgroundColor: '#BF539E', height: 160,}}>
            <div className={'drawer_cal_head_div'}>
                <div className={'top_div_title'}>
                    {t('Pick Date')}
                </div>
                <div className={'next_prev_div'}>
                    <Button className={'next_prev_btn'}
                            disabled={startDate.format('DD-MM-YYYY') == getStartDate.format('DD-MM-YYYY')}
                            onClick={() => handleChangeDay(-1, 'month')}>
                        {language === 'en' ? <LeftOutlined style={{color: '#ffffff'}}/> :
                            <RightOutlined style={{color: '#ffffff'}}/>}
                    </Button>
                    <div className={'top_div_title'}>{t(GMBK(startDate.month()))}</div>
                    <Button className={'next_prev_btn'} onClick={() => handleChangeDay(1, 'month')}>
                        {language === 'en' ? <RightOutlined style={{color: '#ffffff'}}/> :
                            <LeftOutlined style={{color: '#ffffff'}}/>}
                    </Button>
                </div>
            </div>
            <div>
                <div>
                    <div className={'big_date_div'} style={{padding: 0}}>

                        {[...Array(6).keys()].map((key) => {
                            let e = daysData.find(u => u.key === startDate.add(key, 'day').format('YYYY-MM-DD'))

                            return <Button key={key}
                                           loading={!e?.called}
                                           disabled={dayOff?.includes(startDate.add(key, 'day').format('dddd').toLowerCase()) || e?.disabled || !e}
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
                            startDate.format('DD-MM-YYYY') === getStartDate.format('DD-MM-YYYY') ?
                                <Button className={'next_btn'} onClick={() => handleChangeDay(6, 'day')}>
                                    <img alt={'arrow_right_white'} src={arrow_right_white}
                                         style={{transform: language === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'}}/>
                                </Button> : <div>
                                    <Button className={'Next_btn_small'} disabled={startDate == dayjs()}
                                            onClick={() => handleChangeDay(-6, 'day')}>
                                        <img style={{transform: language === 'ar' ? 'rotateY(0deg)' : 'rotateY(180deg)'}}
                                             alt={'arrow_right_white'} src={arrow_right_white}/>
                                    </Button>
                                    <Button className={'Next_btn_small'} onClick={() => handleChangeDay(6, 'day')}>
                                        <img alt={'arrow_right_white'} src={arrow_right_white}
                                             style={{transform: language === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'}}/>
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
                            dataState?.date ?
                                // availableTimes.length === 0 ?
                                //         <div className={'no_available_times'}>{t('No available times')}</div>  :
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
                                : <div className={'no_available_times'}>{t('Select a date')}</div>
                        }

                        {
                            timesIndex !== 0 ? <div>
                                <Button className={'Next_btn_small'}
                                        style={{backgroundColor: '#ffffff10', border: '1px solid #774D9D10'}}
                                        disabled={startDate == dayjs()}
                                        onClick={() => handleChangeTime(-8)}>
                                    <img style={{transform: language === 'ar' ? 'rotateY(0deg)' : 'rotateY(180deg)'}}
                                         alt={'arrow_right_white'} src={arrow_right_white}/>
                                </Button>
                                <Button style={{backgroundColor: '#ffffff10', border: '1px solid #774D9D10'}}
                                        disabled={timesIndex + timeCount >= availableTimes.length}
                                        className={'Next_btn_small'} onClick={() => handleChangeTime(8)}>
                                    <img alt={'arrow_right_white'} src={arrow_right_white}
                                         style={{transform: language === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'}}/>
                                </Button>
                            </div> : <Button className={'next_btn_time'} style={{marginTop: 0}}
                                             onClick={() => handleChangeTime(8)}>
                                <img alt={'arrow_right_white'} src={arrow_right_white}
                                     style={{transform: language === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'}}/>
                            </Button>
                        }


                    </div>
                </div>
            </div>
        </Spin>

    </div>
}

export default AllOfferCalendar