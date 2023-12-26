// import React, {useEffect, useState} from 'react'
// import arrow_right_white from "../../../../../../dist/icons/arrow_right_white.png";
// import dayjs from "dayjs";
// import {Button, Form, Radio, Spin} from "antd";
// import {LeftOutlined, RightOutlined} from "@ant-design/icons";
// import {t} from "i18next";
// import {GMBK} from "../../../../../../functions";
// import Resources from "../../../../../../store/Resources";
// import {postResource} from "../../../../../Functions/api_calls";
// import {useSelector} from "react-redux";
//
// function DateTimeSelect({setBookedAtState, formState, bookedAtState, date, setDate1, dataClinic}) {
//     let language = useSelector((state) => state.app.current_locale)
//     let token = useSelector((state) => state.auth.token);
//     const authRedux = useSelector((state) => state?.auth);
//     let role = useSelector((state) => state.auth.selected_role.key);
//
//     const [startDate, setStartDate] = useState(dayjs())
//
//
//     const [timeLoading, setTimeLoading] = useState(false)
//     const [availableTimes, setAvailableTimes] = useState([])
//     const [timesIndex, setTimesIndex] = useState(0)
//     const [isClicked, setIsClicked] = useState(false)
//     const [disabledDays, setDisabledDays] = useState([])
//
//
//     const handleChangeMonth = (count) => {
//         if(startDate.add(count, 'month') < dayjs()){
//             setStartDate(dayjs())
//         }else{
//             setStartDate((prevState) => prevState.add(count, 'month'))
//         }
//     }
//     const handleChangeDay = (count) => {
//         if (startDate.add(count, 'day') < dayjs()) {
//             setStartDate(dayjs())
//         } else {
//             setStartDate((prevState) => prevState.add(count, 'day'))
//         }
//
//     }
//
//     let clinicId = authRedux?.clinics?.find(e=>e?.id===formState?.clinic_id)?.id
//
//     const onDateClick = (e) => {
//         setDate1(e)
//         setTimeLoading(true)
//         if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
//             postResource('Clinic', 'ClinicsAvailableTimes', token, (role === 'doctor' ? clinicId : dataClinic?.clinic?.id), {
//                 date: dayjs(e).format('YYYY-MM-DD'),
//                 service: formState?.service_type,
//             }).then((res) => {
//                 setAvailableTimes(res?.flat()??[])
//                 setTimeLoading(false)
//
//             })
//         } else {
//             postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, (role === 'doctor' ? authRedux?.user?.id : dataClinic?.doctor?.id) + "/" + (role === 'doctor' ? clinicId : dataClinic?.clinic?.id), {
//                 service: formState?.service_type,
//                 date: dayjs(e).format('YYYY-MM-DD')
//             }).then((response) => {
//
//                 setTimesIndex(0)
//                 setAvailableTimes(response?.flat()??[])
//                 setTimeLoading(false)
//             })
//         }
//         setBookedAtState(dayjs(e).format('YYYY-MM-DD'))
//         setIsClicked(true)
//     }
//
//
//
//
//
//
//     useEffect(() => {
//         if (formState?.clinic_id &&  formState?.service_type && formState?.specialty_id) {
//
//             postResource('ClinicDoctorWorkingHours', 'single', token, (role === 'doctor' ? authRedux?.user?.id : dataClinic?.doctor?.id)+'/'+formState?.clinic_id, {service: formState?.service_type}).then(responses => {
//                 const res = responses?.working_hours
//
//                 let day = [];
//                 Object.keys(res)?.forEach((key) => {
//                     if(res[key][0]?.is_day_off){
//                         day.push(key)
//                     }
//                 })
//                 setDisabledDays(day)
//
//
//             })
//         }
//
//         if(formState?.clinic_id &&  formState?.service_type === 'nursing') {
//             postResource('Clinic','WorkingHours',token,formState?.clinic_id,{service:'nursing'}).then(response => {
//
//                 //const res = response?.working_hours
//                 let day = [];
//                 Object.keys(response)?.forEach((key) => {
//                     if(response[key][0]?.is_day_off){
//                         day.push(key)
//                     }
//                 })
//                 setDisabledDays(day)
//             })
//         }
//         if(formState?.clinic_id &&  formState?.service_type === 'laboratory_home_visit' || formState?.service_type === 'laboratory_clinic_visit') {
//             postResource('Clinic','WorkingHours',token,formState?.clinic_id,{service:'laboratory_home_visit'}).then(response => {
//
//                 //const res = response?.working_hours
//                 let day = [];
//                 Object.keys(response)?.forEach((key) => {
//                     if(response[key][0]?.is_day_off){
//                         day.push(key)
//                     }
//                 })
//                 setDisabledDays(day)
//             })
//         }
//
//
//
//     }, [formState?.clinic_id, formState?.service_type, formState?.specialty_id])
//
//
//
//
//
//
//
//     useEffect(() => {
//         if(formState?.patient_id && formState?.clinic_id && formState?.service_type && formState?.specialty_id && bookedAtState) {
//             onDateClick(date)
//         }
//     }, [formState?.clinic_id, formState?.service_type])
//
//     const handleChangeTime = (count) => {
//         if (timesIndex + count < 0 || timesIndex + count >= availableTimes.length) {
//             return setTimesIndex(0)
//         }
//         setTimesIndex(prevState => prevState + count)
//     }
//
//
//     return <div className={'drawer_cal_bog_div'}>
//         <div className={'drawer_cal_top_div'}>
//             <div className={'drawer_cal_head_div'}>
//                 <div className={'top_div_title'}>
//                     {t('Pick Date')}
//                 </div>
//                 <div className={'next_prev_div'}>
//                     <Button className={'next_prev_btn'} disabled={startDate.format('DD-MM-YYYY')== dayjs().format('DD-MM-YYYY')} onClick={() => handleChangeMonth(-1)}>
//                         {language === 'en' ? <LeftOutlined style={{color: '#ffffff'}}/> : <RightOutlined style={{color: '#ffffff'}}/>}
//                     </Button>
//                     <div className={'top_div_title'}>{t(GMBK(startDate.month()))}</div>
//                     <Button className={'next_prev_btn'} onClick={() => handleChangeMonth(1)}>
//                         {language === 'en' ? <RightOutlined style={{color: '#ffffff'}}/> : <LeftOutlined style={{color: '#ffffff'}}/>}
//                     </Button>
//                 </div>
//             </div>
//             <div>
//                 <div>
//                     <div className={'big_date_div'}>
//                         { formState?.clinic_id &&  formState?.service_type || formState?.specialty_id || formState?.nursing_tasks ? [...[...Array(6).keys()]].map((e, key) => {
//
//                             return  <Button key={key}
//                                             disabled={disabledDays?.includes(startDate.add(key, 'day').format('dddd').toLowerCase())}
//                                             className={`week_date_div ${date?.format('DD-MM-YYYY') === startDate.add(key, 'day').format('DD-MM-YYYY') ? 'selected' : ''}`}
//                                             onClick={() => onDateClick(startDate.add(key, 'day'))}>
//                                 <div className={'date_div_in_map'} style={{fontWeight: 400}}>
//                                     {Resources.Days[startDate.add(key, 'day').day()]}
//                                 </div>
//                                 <div style={{borderBottom: '1px solid #ffffff77', width: '100%'}}></div>
//                                 <div key={key} className={'date_div_in_map'}>
//
//                                     {startDate.add(key, 'day').format('DD')}
//                                 </div>
//                             </Button>
//                         }): <div></div>
//                         }
//                         {
//                             startDate.format('DD-MM-YYYY') === dayjs().format('DD-MM-YYYY') ?
//                                 <Button className={'next_btn'} onClick={() => handleChangeDay(6)}>
//                                     <img alt={'arrow_right_white'} src={arrow_right_white}/>
//                                 </Button> : <div>
//                                     <Button className={'Next_btn_small'} disabled={startDate == dayjs()}
//                                             onClick={() => handleChangeDay(-6)}>
//                                         <img style={{transform: 'rotateY(180deg)'}} alt={'arrow_right_white'}
//                                              src={arrow_right_white}/>
//                                     </Button>
//                                     <Button className={'Next_btn_small'} onClick={() => handleChangeDay(6)}>
//                                         <img alt={'arrow_right_white'} src={arrow_right_white}/>
//                                     </Button>
//                                 </div>
//                         }
//                         {/*<Button className={'next_btn'} onClick={() => handleChangeDay(6)}>*/}
//                         {/*    <img alt={'arrow_right_white'} src={arrow_right_white}/>*/}
//                         {/*</Button>*/}
//                     </div>
//                 </div>
//             </div>
//         </div>
//
//         <Spin spinning={timeLoading}>
//             <div className={'drawer_cal_bottom_div'}>
//                 <div className={'drawer_cal_foot_div'}>
//                     <div className={'top_div_title'}>
//                         {t('Select Time')}
//                     </div>
//                     <div align={'center'} className={'big_time_div'}>
//                         {
//                             date ? availableTimes.length === 0 ? isClicked ? <div className={'no_available_times'}>{t('No available times')}</div> : <div></div> : <Form.Item name={'booked_time'}>
//                                 <Radio.Group
//                                     className={'hours_select'}
//                                     options={availableTimes.slice(timesIndex, timesIndex + 8).map((e) => {
//                                         return {
//                                             label: dayjs('2023-10-10' + e).format('h:mmA'),
//                                             value: e,
//                                         }
//                                     })}
//                                     optionType="button"
//                                     buttonStyle="solid"
//
//                                 />
//                             </Form.Item> : <div></div>
//                         }
//
//                         <Button className={'next_btn_time'} onClick={() => handleChangeTime(8)}>
//                             <img alt={'arrow_right_white'} src={arrow_right_white}/>
//                         </Button>
//
//                     </div>
//                 </div>
//             </div>
//         </Spin>
//
//     </div>
// }
//
// export default DateTimeSelect




// import React, {useEffect, useState} from 'react'
// import arrow_right_white from "../../../../../../dist/icons/arrow_right_white.png";
// import dayjs from "dayjs";
// import {Button, Form, Radio, Spin} from "antd";
// import {LeftOutlined, RightOutlined} from "@ant-design/icons";
// import {t} from "i18next";
// import {GMBK} from "../../../../../../functions";
// import Resources from "../../../../../../store/Resources";
// import {postResource} from "../../../../../Functions/api_calls";
// import {useSelector} from "react-redux";
//
// function DateTimeSelect({setBookedAtState, setFormState, formState, bookedAtState, date, setDate1, dataClinic}) {
//     let language = useSelector((state) => state.app.current_locale)
//     let token = useSelector((state) => state.auth.token);
//     const authRedux = useSelector((state) => state?.auth);
//     let role = useSelector((state) => state.auth.selected_role.key);
//
//     const [startDate, setStartDate] = useState(dayjs())
//
//     let [getStartDate, setGetStartDate] = useState(dayjs())
//     const [radioValue, setRadioValue] = useState('')
//     const [timeCount, setTimeCount] = useState()
//
//
//     const [timeLoading, setTimeLoading] = useState(false)
//     const [availableTimes, setAvailableTimes] = useState([])
//     const [timesIndex, setTimesIndex] = useState(0)
//     const [isClicked, setIsClicked] = useState(false)
//     const [disabledDays, setDisabledDays] = useState([])
//     const [dateLoading, setDateLoading] = useState(false)
//
//     const [dayOff, setDayOff] = useState([]);
//     let [daysData, setDaysData] = useState([])
//     let [firstCall, setFirstCall] = useState(false)
//
//
//
//
//
//     const handleChangeMonth = (count) => {
//         if(startDate.add(count, 'month') < dayjs()){
//             setStartDate(dayjs())
//         }else{
//             setStartDate((prevState) => prevState.add(count, 'month'))
//         }
//     }
//     // const handleChangeDay = (count) => {
//     //     if (startDate.add(count, 'day') < getStartDate) {
//     //         setStartDate(getStartDate)
//     //     } else {
//     //         setStartDate((prevState) => prevState.add(count, 'day'))
//     //     }
//     //
//     //
//     // }
//
//     const handleChangeDay = (count, unit) => {
//         if (startDate.add(count, unit) < getStartDate) {
//             setStartDate(getStartDate)
//         } else {
//             let startCopy = startDate.clone().add(count, unit);
//             if (daysData.find(e => e.key === startCopy.diff(dayjs(), 'days'))) {
//
//             } else {
//                 daysData = [...daysData, ...[...Array(6).keys()].map((key) => ({
//                     key: startCopy.clone().add(key, 'day').format('YYYY-MM-DD'),
//                     disabled: dayOff.includes(startCopy.clone().add(key, 'day').day())
//                 })).filter(v => !daysData.find(u => u.key === v.key))];
//                 setDaysData(daysData);
//
//             }
//
//             setStartDate((prevState) => prevState.add(count, unit))
//         }
//
//     }
//
//     const createAvailableDate = () => {
//         setDateLoading(true)
//
//             setTimeLoading(true)
//
//             if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
//             return     postResource('ClinicAvailableFrom', 'single', token, formState?.clinic_id, {
//                     service: formState?.service_type,
//                 }).then((response) => {
//
//
//                     setStartDate(dayjs(response.date));
//
//                     setFormState(prevState => ({
//                         ...prevState,
//                         date: dayjs(response.date)?.format('YYYY-MM-DD')
//                     }))
//                     setDate1(dayjs(response.date))
//
//                    return postResource('Clinic', 'ClinicsAvailableTimes', token, formState?.clinic_id, {
//                         date: dayjs(response.date).format('YYYY-MM-DD'),
//                         service: formState?.service_type,
//                     }).then((res) => {
//
//                         setAvailableTimes(res?.flat()??[])
//
//
//                         setTimeLoading(false)
//                         setDateLoading(false)
//                        return response.date
//                     })
//                 })
//
//
//
//
//
//             } else {
//                return  postResource('AvailableDayByDoctorAndClinic', 'single', token, authRedux?.user?.id + "/" + formState?.clinic_id, {
//                     service: formState?.service_type,
//                 }).then((responset) => {
//
//                     //startDate = dayjs(response?.date)
//
//
//
//                     setGetStartDate(dayjs(responset?.date).add(1,'day'))
//                     setFormState(prevState => ({
//                         ...prevState,
//                         date: dayjs(responset?.date)?.format('YYYY-MM-DD')
//                     }))
//                     setDate1(dayjs(responset?.date))
//
//
//                        return postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, authRedux?.user?.id + "/" + formState?.clinic_id, {
//                             service: formState?.service_type,
//                             date: dayjs(responset.date).format('YYYY-MM-DD')
//                         }).then((response) => {
//
//                            setStartDate(dayjs(responset?.date));
//                             if(response) {
//                                 setAvailableTimes(response?.flat() ?? [])
//                             }
//                             setTimeLoading(false)
//                            setDateLoading(false)
//                            return dayjs(responset.date)
//                         })
//
//
//                 })
//             }
//
//
//
//
//     }
//
//
//
//     let clinicId = authRedux?.clinics?.find(e=>e?.id===formState?.clinic_id)?.id
//
//     const onDateClick = (e) => {
//         setFormState(prevState => ({
//             ...prevState,
//             date: e?.format('YYYY-MM-DD'),
//             time: ''
//         }))
//
//         setDate1(e)
//         setTimeLoading(true)
//         if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
//             postResource('Clinic', 'ClinicsAvailableTimes', token, (role === 'doctor' ? clinicId : dataClinic?.clinic?.id), {
//                 date: e?.format('YYYY-MM-DD'),
//                 service: formState?.service_type,
//             }).then((res) => {
//                 setAvailableTimes(res?.flat()??[])
//                 setTimeLoading(false)
//
//             })
//         } else {
//             postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, (role === 'doctor' ? authRedux?.user?.id : dataClinic?.doctor?.id) + "/" + (role === 'doctor' ? clinicId : dataClinic?.clinic?.id), {
//                 service: formState?.service_type,
//                 date: e?.format('YYYY-MM-DD')
//             }).then((response) => {
//
//                 setTimesIndex(0)
//                 setAvailableTimes(response?.flat()??[])
//                 setTimeLoading(false)
//             })
//         }
//         setBookedAtState(dayjs(e).format('YYYY-MM-DD'))
//         setIsClicked(true)
//     }
//
//
//     useEffect(() => {
//         if (formState?.clinic_id &&  formState?.service_type) {
//             if(!['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
//                 postResource('ClinicDoctorWorkingHours', 'single', token, (role === 'doctor' ? authRedux?.user?.id : dataClinic?.doctor?.id)+'/'+formState?.clinic_id, {
//                     service: formState?.service_type
//                 }).then(responses => {
//                     const res = responses?.working_hours
//
//                     let day = [];
//                     Object.keys(res)?.forEach((key) => {
//                         if(res[key][0]?.is_day_off){
//                             day.push(key)
//                         }
//                     })
//                     setDisabledDays(day)
//
//
//                 })
//             }
//
//
//         }
//
//         if(formState?.clinic_id &&  formState?.service_type === 'nursing') {
//             postResource('Clinic','WorkingHours',token,formState?.clinic_id,{service:'nursing'}).then(response => {
//
//                 //const res = response?.working_hours
//                 let day = [];
//                 Object.keys(response)?.forEach((key) => {
//                     if(response[key][0]?.is_day_off){
//                         day.push(key)
//                     }
//                 })
//                 setDisabledDays(day)
//             })
//         }
//         if(formState?.clinic_id &&  formState?.service_type === 'laboratory_home_visit' || formState?.service_type === 'laboratory_clinic_visit') {
//             postResource('Clinic','WorkingHours',token,formState?.clinic_id,{service:'laboratory_home_visit'}).then(response => {
//
//                 //const res = response?.working_hours
//                 let day = [];
//                 Object.keys(response)?.forEach((key) => {
//                     if(response[key][0]?.is_day_off){
//                         day.push(key)
//                     }
//                 })
//                 setDisabledDays(day)
//             })
//         }
//
//
//
//     }, [formState?.clinic_id, formState?.service_type])
//
//
//
//
//
//
//
//
//
//
//     const timeChange = (e) => {
//         setFormState((prevState) => ({
//             ...prevState,
//             time: e.target.value,
//         }))
//        // setDataTimes(e.target.value)
//         setRadioValue(e.target.value)
//     }
//
//
//
//     const f = (date= startDate) => {
//         if (formState?.service_type) {
//             if(!['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
//                 setDateLoading(true)
//                 postResource('ClinicDoctorWorkingHours', 'single', token, authRedux?.user?.id + '/' + formState?.clinic_id, {service: formState?.service_type}).then(response => {
//                     const res = response?.working_hours
//
//                     let day = [];
//                     Object.keys(res)?.forEach((key) => {
//                         if (res[key][0]?.is_day_off) {
//                             day.push(key)
//                         }
//                     })
//
//                     setDayOff(day)
//                     setDateLoading(false)
//                     daysData = [...Array(6).keys()].map(key => ({
//                         key: date.clone().add(key, 'day').format('YYYY-MM-DD'),
//                         disabled: day.includes(date.clone().add(key, 'day').day())
//                     }));
//                     setDaysData(daysData);
//
//                 })
//             } else {
//                 setDateLoading(true)
//                 postResource('Clinic', 'WorkingHours', token, formState?.clinic_id, {service: formState?.service_type}).then(response => {
//
//                     const res = response
//
//                     let day = [];
//                     Object.keys(res)?.forEach((key) => {
//                         if (res[key][0]?.is_day_off) {
//                             day.push(key)
//                         }
//                     })
//
//                     setDayOff(day)
//                     setDateLoading(false)
//                     daysData = [...Array(6).keys()].map(key => ({
//                         key: dayjs(date).add(key, 'day').format('YYYY-MM-DD'),
//                         disabled: day.includes(dayjs(date).add(key, 'day').day())
//                     }));
//                     setDaysData(daysData);
//
//                 })
//             }
//
//         }
//     }
//
//
//     const f1 = (date = startDate) => {
//         if(formState?.service_type) {
//             if(!['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
//                 setDateLoading(true)
//                 let callableDays = []
//                 if (!daysData.length) {
//                     callableDays = [...Array(6).keys()].map(key => ({
//
//                         key: date.add(key, 'day').format('YYYY-MM-DD'),
//                         disabled: dayOff.includes(date.add(key, 'day').day())
//                     }))
//                 } else {
//                     callableDays = [...daysData].filter(e => !e.called)
//                 }
//
//                 Promise.all(callableDays.map((callableDay, i) => {
//                     return postResource('PublicClinicDoctorAvailableTimes', 'single', token, authRedux?.user?.id + '/' + formState?.clinic_id, {
//                         service: formState?.service_type,
//                         date: callableDay.key
//                     }).then((response) => {
//
//                         return {
//                             key: callableDay.key,
//                             hasDays: response ? response?.flat()?.length : 0,
//                         }
//
//
//                     })
//
//                 })).then(responses => {
//
//
//                     setDaysData(daysData.map(e => {
//                         let data = responses.find(u => e.key == u.key);
//                         if (data?.key) {
//                             e.disabled = !data.hasDays;
//
//                         }
//                         e.called = true;
//
//                         return e
//                     }));
//                     setFirstCall(true)
//                     setDateLoading(false)
//
//                 })
//             }
//             else {
//                 setDateLoading(true)
//                 let callableDays = []
//                 if (!daysData.length) {
//                     callableDays = [...Array(6).keys()].map(key => ({
//
//                         key: dayjs(date).add(key, 'day').format('YYYY-MM-DD'),
//                         disabled: dayOff.includes(dayjs(date).add(key, 'day').day())
//                     }))
//                 } else {
//                     callableDays = [...daysData].filter(e => !e.called)
//                 }
//
//                 Promise.all(callableDays.map((callableDay, i) => {
//                     return postResource('Clinic', 'ClinicsAvailableTimes', token, formState?.clinic_id, {
//                         service: formState?.service_type,
//                         date: callableDay.key
//                     }).then((response) => {
//
//                         return {
//                             key: callableDay.key,
//                             hasDays: response ? response?.flat()?.length : 0,
//                         }
//
//
//                     })
//
//                 })).then(responses => {
//
//
//                     setDaysData(daysData.map(e => {
//                         let data = responses.find(u => e.key == u.key);
//                         if (data?.key) {
//                             e.disabled = !data.hasDays;
//
//                         }
//                         e.called = true;
//
//                         return e
//                     }));
//                     setFirstCall(true)
//                     setDateLoading(false)
//
//                 })
//             }
//
//         }
//
//     }
//
//
//     useEffect( () => {
//         if(formState?.clinic_id && formState?.service_type) {
//             createAvailableDate().then(e=>{
//                              f(e);
//                              f1(e);
//                      });
//
//             }
//
//     }, [formState?.service_type]);
//
//
//     useEffect(() => {
//         if (firstCall) {
//             f1();
//         }
//     }, [startDate])
//
//
//
//     // useEffect(() => {
//     //    if(formState?.clinic_id && formState?.service_type) {
//     //        if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
//     //            onDateClick(formState?.date)
//     //        }
//     //
//     //    }
//     // }, [formState?.clinic_id, formState?.service_type])
//
//     const handleChangeTime = (count) => {
//         setTimeCount(count)
//         if (timesIndex + count < 0 || timesIndex + count >= availableTimes.length) {
//             return setTimesIndex(0)
//         }
//         setTimesIndex(prevState => prevState + count)
//     }
//
//
//     return <div className={'drawer_cal_bog_div'}>
//         <div className={'drawer_cal_top_div'}>
//             <div className={'drawer_cal_head_div'}>
//                 <div className={'top_div_title'}>
//                     {t('Pick Date')}
//                 </div>
//                 <div className={'next_prev_div'}>
//                     <Button className={'next_prev_btn'}
//                             disabled={startDate.format('DD-MM-YYYY') === getStartDate.format('DD-MM-YYYY')}
//                             onClick={() => handleChangeDay(-1, 'month')}>
//                         {language === 'en' ? <LeftOutlined style={{color: '#ffffff'}}/> :
//                             <RightOutlined style={{color: '#ffffff'}}/>}
//                     </Button>
//                     <div className={'top_div_title'}>{t(GMBK(startDate.month()))}</div>
//                     <Button className={'next_prev_btn'} onClick={() => handleChangeDay(1, 'month')}>
//                         {language === 'en' ? <RightOutlined style={{color: '#ffffff'}}/> :
//                             <LeftOutlined style={{color: '#ffffff'}}/>}
//                     </Button>
//                 </div>
//             </div>
//             <div>
//                 <div>
//                     <div className={'big_date_div'}>
//                         { [...Array(6).keys()].map((key) => {
//                             let e = daysData.find(u => u.key === startDate.add(key, 'day').format('YYYY-MM-DD'))
//                             console.log(e)
//                             return  <Button key={key}
//                                      disabled={dayOff?.includes(startDate.add(key, 'day').format('dddd').toLowerCase()) || e?.disabled || !e}
//                                      // disabled={disabledDays?.includes(startDate.add(key, 'day').format('dddd').toLowerCase())}
//                                      className={`week_date_div ${date?.format('DD-MM-YYYY') === startDate.add(key, 'day').format('DD-MM-YYYY') ? 'selected' : ''}`}
//                                      onClick={() => onDateClick(startDate.add(key, 'day'))}>
//                                 {
//                                     dateLoading ? <Spin/> : <div>
//                                         <div className={'date_div_in_map'} style={{fontWeight: 400}}>
//                                             {Resources.Days[startDate.add(key, 'day').day()]}
//                                         </div>
//                                         <div style={{borderBottom: '1px solid #ffffff77', width: '100%'}}></div>
//                                         <div key={key} className={'date_div_in_map'}>
//
//                                             {startDate.add(key, 'day').format('DD')}
//                                         </div>
//                                     </div>
//                                 }
//
//                                 </Button>
//                         })
//                         }
//                         {
//                             startDate.format('DD-MM-YYYY') === getStartDate.format('DD-MM-YYYY') ?
//                                 <Button className={'next_btn'} onClick={() => handleChangeDay(6, 'day')}>
//                                     <img alt={'arrow_right_white'} src={arrow_right_white}
//                                          style={{transform: language === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'}}/>
//                                 </Button> : <div>
//                                     <Button className={'Next_btn_small'} disabled={startDate == dayjs()}
//                                             onClick={() => handleChangeDay(-6, 'day')}>
//                                         <img style={{transform: language === 'ar' ? 'rotateY(0deg)' : 'rotateY(180deg)'}}
//                                              alt={'arrow_right_white'} src={arrow_right_white}/>
//                                     </Button>
//                                     <Button className={'Next_btn_small'} onClick={() => handleChangeDay(6, 'day')}>
//                                         <img alt={'arrow_right_white'} src={arrow_right_white}
//                                              style={{transform: language === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'}}/>
//                                     </Button>
//                                 </div>
//                         }
//                         {/*<Button className={'next_btn'} onClick={() => handleChangeDay(6)}>*/}
//                         {/*    <img alt={'arrow_right_white'} src={arrow_right_white}/>*/}
//                         {/*</Button>*/}
//                     </div>
//                 </div>
//             </div>
//         </div>
//
//         <Spin spinning={timeLoading}>
//             <div className={'drawer_cal_bottom_div'}>
//                 <div className={'drawer_cal_foot_div'}>
//                     <div className={'top_div_title'}>
//                         {t('Select Time')}
//                     </div>
//                     <div align={'center'} className={'big_time_div'}>
//                         {
//                            formState?.date ? <Form.Item name={'booked_time'}>
//                                 <Radio.Group
//                                     className={'hours_select'}
//                                     onChange={timeChange}
//                                     value={radioValue}
//                                     options={availableTimes.slice(timesIndex, timesIndex + 8).map((e) => {
//                                         return {
//                                             label: dayjs('2023-10-10' + e).format('h:mmA'),
//                                             value: e,
//                                         }
//                                     })}
//                                     optionType="button"
//                                     buttonStyle="solid"
//
//                                 />
//                            </Form.Item> : <div></div>
//                         }
//
//                         {
//                             timesIndex !== 0 ? <div>
//                                 <Button className={'Next_btn_small'}
//                                         style={{backgroundColor: '#ffffff10', border: '1px solid #774D9D10', marginTop: -20}}
//                                         disabled={startDate == dayjs()}
//                                         onClick={() => handleChangeTime(-8)}>
//                                     <img style={{transform: language === 'ar' ? 'rotateY(0deg)' : 'rotateY(180deg)'}}
//                                          alt={'arrow_right_white'} src={arrow_right_white}/>
//                                 </Button>
//                                 <Button style={{backgroundColor: '#ffffff10', border: '1px solid #774D9D10'}}
//                                         disabled={timesIndex + timeCount >= availableTimes.length}
//                                         className={'Next_btn_small'} onClick={() => handleChangeTime(8)}>
//                                     <img alt={'arrow_right_white'} src={arrow_right_white}
//                                          style={{transform: language === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'}}/>
//                                 </Button>
//                             </div> : <Button className={'next_btn_time'} style={{marginTop: -20}}
//                                              onClick={() => handleChangeTime(8)}>
//                                 <img alt={'arrow_right_white'} src={arrow_right_white}
//                                      style={{transform: language === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'}}/>
//                             </Button>
//                         }
//
//
//
//                     </div>
//                 </div>
//             </div>
//         </Spin>
//
//     </div>
// }
//
// export default DateTimeSelect


import React, {useEffect, useState} from 'react'
import arrow_right_white from "../../../../../../dist/icons/arrow_right_white.png";
import dayjs from "dayjs";
import {Button, Form, Radio, Spin} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {t} from "i18next";
import {GMBK} from "../../../../../../functions";
import Resources from "../../../../../../store/Resources";
import {postResource} from "../../../../../Functions/api_calls";
import {useSelector} from "react-redux";

function DateTimeSelect({setBookedAtState, setFormState, formState, bookedAtState, date, setDate1, dataClinic}) {
    let language = useSelector((state) => state.app.current_locale)
    let token = useSelector((state) => state.auth.token);
    const authRedux = useSelector((state) => state?.auth);
    let role = useSelector((state) => state.auth.selected_role.key);

    const [startDate, setStartDate] = useState(dayjs())

    let [getStartDate, setGetStartDate] = useState(dayjs())
    const [radioValue, setRadioValue] = useState('')
    const [timeCount, setTimeCount] = useState()


    const [timeLoading, setTimeLoading] = useState(false)
    const [availableTimes, setAvailableTimes] = useState([])
    const [timesIndex, setTimesIndex] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [disabledDays, setDisabledDays] = useState([])
    const [dateLoading, setDateLoading] = useState(false)

    const [dayOff, setDayOff] = useState([]);
    let [daysData, setDaysData] = useState([])
    let [firstCall, setFirstCall] = useState(false)




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

            }

            setStartDate((prevState) => prevState.add(count, unit))
        }

    }

    const createAvailableDate = () => {
        setDateLoading(true)

            setTimeLoading(true)

            if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
            return     postResource('ClinicAvailableFrom', 'single', token, formState?.clinic_id, {
                    service: formState?.service_type,
                }).then((response) => {


                    setStartDate(dayjs(response.date));

                    setFormState(prevState => ({
                        ...prevState,
                        date: dayjs(response.date)?.format('YYYY-MM-DD')
                    }))
                    setDate1(dayjs(response.date))

                   return postResource('Clinic', 'ClinicsAvailableTimes', token, formState?.clinic_id, {
                        date: dayjs(response.date).format('YYYY-MM-DD'),
                        service: formState?.service_type,
                    }).then((res) => {

                        setAvailableTimes(res?.flat()??[])


                        setTimeLoading(false)
                        setDateLoading(false)
                       return response.date
                    })
                })





            } else {
               return  postResource('AvailableDayByDoctorAndClinic', 'single', token, authRedux?.user?.id + "/" + formState?.clinic_id, {
                    service: formState?.service_type,
                }).then((responset) => {

                    //startDate = dayjs(response?.date)

                    setGetStartDate(dayjs(responset?.date))
                    setFormState(prevState => ({
                        ...prevState,
                        date: dayjs(responset?.date)?.format('YYYY-MM-DD')
                    }))
                    setDate1(dayjs(responset?.date))

                       return postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, authRedux?.user?.id + "/" + formState?.clinic_id, {
                            service: formState?.service_type,
                            date: dayjs(responset.date).format('YYYY-MM-DD')
                        }).then((response) => {

                           setStartDate(dayjs(responset?.date));
                            if(response) {
                                setAvailableTimes(response?.flat() ?? [])
                            }
                            setTimeLoading(false)
                           setDateLoading(false)
                           return dayjs(responset.date)
                        })
                })
            }
    }



    let clinicId = authRedux?.clinics?.find(e=>e?.id===formState?.clinic_id)?.id

    const onDateClick = (e) => {
        setFormState(prevState => ({
            ...prevState,
            date: e?.format('YYYY-MM-DD'),
            time: ''
        }))

        setDate1(e)
        setTimeLoading(true)
        if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
            postResource('Clinic', 'ClinicsAvailableTimes', token, (role === 'doctor' ? clinicId : dataClinic?.clinic?.id), {
                date: e?.format('YYYY-MM-DD'),
                service: formState?.service_type,
            }).then((res) => {
                setAvailableTimes(res?.flat()??[])
                setTimeLoading(false)

            })
        } else {
            postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, (role === 'doctor' ? authRedux?.user?.id : dataClinic?.doctor?.id) + "/" + (role === 'doctor' ? clinicId : dataClinic?.clinic?.id), {
                service: formState?.service_type,
                date: e?.format('YYYY-MM-DD')
            }).then((response) => {

                setTimesIndex(0)
                setAvailableTimes(response?.flat()??[])
                setTimeLoading(false)
            })
        }
        setBookedAtState(dayjs(e).format('YYYY-MM-DD'))
        setIsClicked(true)
    }


    useEffect(() => {
        if (formState?.clinic_id &&  formState?.service_type) {
            if(!['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
                postResource('ClinicDoctorWorkingHours', 'single', token, (role === 'doctor' ? authRedux?.user?.id : dataClinic?.doctor?.id)+'/'+formState?.clinic_id, {
                    service: formState?.service_type
                }).then(responses => {
                    const res = responses?.working_hours

                    let day = [];
                    Object.keys(res)?.forEach((key) => {
                        if(res[key][0]?.is_day_off){
                            day.push(key)
                        }
                    })
                    setDisabledDays(day)


                })
            }


        }

        if(formState?.clinic_id &&  formState?.service_type === 'nursing') {
            postResource('Clinic','WorkingHours',token,formState?.clinic_id,{service:'nursing'}).then(response => {

                //const res = response?.working_hours
                let day = [];
                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setDisabledDays(day)
            })
        }
        if(formState?.clinic_id &&  formState?.service_type === 'laboratory_home_visit' || formState?.service_type === 'laboratory_clinic_visit') {
            postResource('Clinic','WorkingHours',token,formState?.clinic_id,{service:'laboratory_home_visit'}).then(response => {

                //const res = response?.working_hours
                let day = [];
                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setDisabledDays(day)
            })
        }



    }, [formState?.clinic_id, formState?.service_type])










    const timeChange = (e) => {
        setFormState((prevState) => ({
            ...prevState,
            time: e.target.value,
        }))
       // setDataTimes(e.target.value)
        setRadioValue(e.target.value)
    }



    const f = (date= startDate) => {
        if (formState?.service_type) {
            if(!['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
                setDateLoading(true)
                postResource('ClinicDoctorWorkingHours', 'single', token, authRedux?.user?.id + '/' + formState?.clinic_id, {service: formState?.service_type}).then(response => {
                    const res = response?.working_hours

                    let day = [];
                    Object.keys(res)?.forEach((key) => {
                        if (res[key][0]?.is_day_off) {
                            day.push(key)
                        }
                    })

                    setDayOff(day)
                    setDateLoading(false)
                    daysData = [...Array(6).keys()].map(key => ({
                        key: date.clone().add(key, 'day').format('YYYY-MM-DD'),
                        disabled: day.includes(date.clone().add(key, 'day').day())
                    }));
                    setDaysData(daysData);

                })
            } else {
                setDateLoading(true)
                postResource('Clinic', 'WorkingHours', token, formState?.clinic_id, {service: formState?.service_type}).then(response => {

                    const res = response

                    let day = [];
                    Object.keys(res)?.forEach((key) => {
                        if (res[key][0]?.is_day_off) {
                            day.push(key)
                        }
                    })

                    setDayOff(day)
                    setDateLoading(false)
                    daysData = [...Array(6).keys()].map(key => ({
                        key: dayjs(date).add(key, 'day').format('YYYY-MM-DD'),
                        disabled: day.includes(dayjs(date).add(key, 'day').day())
                    }));
                    setDaysData(daysData);

                })
            }

        }
    }


    const f1 = (date = startDate) => {
        if(formState?.service_type) {
            if(!['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
                setDateLoading(true)
                let callableDays = []
                if (!daysData.length) {
                    callableDays = [...Array(6).keys()].map(key => ({

                        key: date.add(key, 'day').format('YYYY-MM-DD'),
                        disabled: dayOff.includes(date.add(key, 'day').day())
                    }))
                } else {
                    callableDays = [...daysData].filter(e => !e.called)
                }

                Promise.all(callableDays.map((callableDay, i) => {
                    return postResource('PublicClinicDoctorAvailableTimes', 'single', token, authRedux?.user?.id + '/' + formState?.clinic_id, {
                        service: formState?.service_type,
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
                    setDateLoading(false)

                })
            }
            else {
                setDateLoading(true)
                let callableDays = []
                if (!daysData.length) {
                    callableDays = [...Array(6).keys()].map(key => ({

                        key: dayjs(date).add(key, 'day').format('YYYY-MM-DD'),
                        disabled: dayOff.includes(dayjs(date).add(key, 'day').day())
                    }))
                } else {
                    callableDays = [...daysData].filter(e => !e.called)
                }

                Promise.all(callableDays.map((callableDay, i) => {
                    return postResource('Clinic', 'ClinicsAvailableTimes', token, formState?.clinic_id, {
                        service: formState?.service_type,
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
                    setDateLoading(false)

                })
            }

        }

    }


    useEffect( () => {
        if(formState?.clinic_id && formState?.service_type) {
            createAvailableDate().then(e=>{
                             f(e);
                             f1(e);
                     });

            }

    }, [formState?.service_type]);


    useEffect(() => {
        if (firstCall) {
            f1();
        }
    }, [startDate])



    // useEffect(() => {
    //    if(formState?.clinic_id && formState?.service_type) {
    //        if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(formState?.service_type)) {
    //            onDateClick(formState?.date)
    //        }
    //
    //    }
    // }, [formState?.clinic_id, formState?.service_type])

    const handleChangeTime = (count) => {
        setTimeCount(count)
        if (timesIndex + count < 0 || timesIndex + count >= availableTimes.length) {
            return setTimesIndex(0)
        }
        setTimesIndex(prevState => prevState + count)
    }


    return <div className={'drawer_cal_bog_div'}>
        <div className={'drawer_cal_top_div'}>
            <div className={'drawer_cal_head_div'}>
                <div className={'top_div_title'}>
                    {t('Pick Date')}
                </div>
                <div className={'next_prev_div'}>
                    <Button className={'next_prev_btn'}
                            disabled={startDate.format('DD-MM-YYYY') === getStartDate.format('DD-MM-YYYY')}
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
                    <div className={'big_date_div'}>
                        { [...Array(6).keys()].map((key) => {
                            let e = daysData.find(u => u.key === startDate.add(key, 'day').format('YYYY-MM-DD'))

                            return  <Button key={key}
                                     disabled={dayOff?.includes(startDate.add(key, 'day').format('dddd').toLowerCase()) || e?.disabled || !e}
                                     // disabled={disabledDays?.includes(startDate.add(key, 'day').format('dddd').toLowerCase())}
                                     className={`week_date_div ${date?.format('DD-MM-YYYY') === startDate.add(key, 'day').format('DD-MM-YYYY') ? 'selected' : ''}`}
                                     onClick={() => onDateClick(startDate.add(key, 'day'))}>
                                {
                                    dateLoading ? <Spin/> : <div>
                                        <div className={'date_div_in_map'} style={{fontWeight: 400}}>
                                            {Resources.Days[startDate.add(key, 'day').day()]}
                                        </div>
                                        <div style={{borderBottom: '1px solid #ffffff77', width: '100%'}}></div>
                                        <div key={key} className={'date_div_in_map'}>

                                            {startDate.add(key, 'day').format('DD')}
                                        </div>
                                    </div>
                                }

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
                    <div align={'center'} className={'big_time_div'}>
                        {
                           formState?.date ? <Form.Item name={'booked_time'}>
                                <Radio.Group
                                    className={'hours_select'}
                                    onChange={timeChange}
                                    value={radioValue}
                                    options={availableTimes.slice(timesIndex, timesIndex + 8).map((e) => {
                                        return {
                                            label: dayjs('2023-10-10' + e).format('h:mmA'),
                                            value: e,
                                        }
                                    })}
                                    optionType="button"
                                    buttonStyle="solid"

                                />
                           </Form.Item> : <div></div>
                        }

                        {
                            timesIndex !== 0 ? <div>
                                <Button className={'Next_btn_small'}
                                        style={{backgroundColor: '#ffffff10', border: '1px solid #774D9D10', marginTop: -20}}
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
                            </div> : <Button className={'next_btn_time'} style={{marginTop: -20}}
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

export default DateTimeSelect
//
