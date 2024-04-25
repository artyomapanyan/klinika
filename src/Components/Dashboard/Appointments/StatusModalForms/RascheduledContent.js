import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import React, { useEffect, useRef, useState } from 'react'
import {Button, Spin} from "antd";
import dayjs from "dayjs";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../../../Preloader";
import moment from 'moment'

export function RascheduledContent({onCancel, modal, loading, formRef}){
    let token = useSelector((state) => state.auth.token);
    const [date,setDate] = useState(null);
    const [availableTimes,setAvailableTimesState] = useState([]);
    const [dateLoading,setDateLoading] = useState(false);
    const [availableDateState, setAvailableDateState] = useState([])
    const [inputsLoading, setInputsLoading] = useState(false)
    const [defaultMonth, setDefaultMonth] = useState(null);
    const [emptyDaysLoading, setEmptyDaysLoading] = useState(false)
    const [timeOutId, setTimeOutId] = useState(null)
    const [dateWithEmptyHours, setDateWithEmptyHours] = useState([])
    const [currentMonth, setCurrentMonth] = useState(dayjs().month());



    useEffect(() => {
        getEmptyHours()
    }, [])

   useEffect(() => {


       if (date && modal?.doctor?.id) {

           setDateLoading(true)
           postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, modal?.doctor?.id + "/" + modal?.clinic?.id, {
               service: modal?.service_type,
               date: date.format('YYYY-MM-DD')
           }).then((responce) => {
               setAvailableTimesState(responce?.map((el) => {
                   return {
                       label: 'Break Time',
                       options: el.map((el1) => {
                           return {
                               lebel: el1,
                               value: el1
                           }
                       })
                   }
               }))

               setDateLoading(false)
           })

       }else if(date && !modal?.doctor?.id){

           setDateLoading(true)
           postResource('Clinic', 'ClinicsAvailableTimes', token, modal?.clinic?.id, {
               service: modal?.service_type,
               date: date.format('YYYY-MM-DD')
           }).then((res) => {

               setAvailableTimesState(res?.map((el) => {
                   return {
                       label: 'Break Time',
                       options: el.map((el1) => {
                           return {
                               lebel: el1,
                               value: el1
                           }
                       })
                   }
               }))
               setDateLoading(false)
           })
       }

   }, [date])

    useEffect(() => {

        if(modal?.service_type === 'telehealth' ||modal?.service_type === 'clinic_visit' || modal?.service_type === 'home_visit' || modal?.service_type === 'physical_therapy_clinic_visit' || modal?.service_type === 'physical_therapy_home_visit') {
            setInputsLoading(true)
            postResource('ClinicDoctorWorkingHours', 'single', token, modal?.doctor?.id+'/'+modal?.clinic?.id, {service: modal?.service_type}).then(responses => {
                const res = responses?.working_hours
                let day = [];
                // Object.values(res)?.map((el, i) => {
                //     return el.filter((el1) => el1.is_day_off === true)
                // }).map((el, i) => {
                //     if (el.length > 0) {
                //         day.push(i)
                //     }
                // })
                Object.keys(res)?.forEach((key) => {
                    if(res[key][0]?.is_day_off){
                        day.push(key)
                    }
                })


                setAvailableDateState(day)
                setInputsLoading(false)

            })
        } else if(modal?.service_type === 'nursing') {
            setInputsLoading(true)
            postResource('Clinic','WorkingHours',token, +modal?.clinic?.id,{service:'nursing'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setInputsLoading(false)


            })
        } else if(modal?.service_type === 'laboratory_clinic_visit') {
            setInputsLoading(true)
            postResource('Clinic','WorkingHours',token, +modal?.clinic?.id,{service:'laboratory_clinic_visit'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setInputsLoading(false)

            })
        } else if(modal?.service_type === 'laboratory_home_visit') {
            setInputsLoading(true)
            postResource('Clinic','WorkingHours',token, +modal?.clinic?.id,{service:'laboratory_home_visit'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setInputsLoading(false)

            })
        }

    }, [modal?.service_type])

    const getEmptyHours = (date = dayjs()) => {
        setCurrentMonth(date.month())
        if (!modal?.doctor) {
            return
        }
        setEmptyDaysLoading(!dateWithEmptyHours.map(el => {
            return String(moment(el).format('YYYY-MM'))
        }).includes(dayjs(date).startOf('day').format('YYYY-MM')))
        timeOutId && clearTimeout(timeOutId)

        setTimeOutId(setTimeout(() => {
            postResource('ClinicDoctorAvailableTimeForMonthByDoctorAndClinic', 'single', token, modal?.doctor?.id + "/" + modal?.clinic?.id, {
                service: modal?.service_type,
                date: date.format('YYYY-MM')
            }).then((res) => {
                setDateWithEmptyHours([...new Set([...dateWithEmptyHours, ...res?.working_hours_for_month])])
                setEmptyDaysLoading(false)
            })
        }, date?.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? 1 : 300))
    }

    const disabledDate = (current) => {
        return emptyDaysLoading ? true : current.add(1, 'day') <= dayjs().endOf('date') || current.add(-3, 'month') > dayjs().endOf('date') || current.add(1, 'day') < dayjs().day(1) || availableDateState.includes(dayjs(current).format('dddd').toLowerCase())
          || dateWithEmptyHours.includes(dayjs(current).startOf('day').format('YYYY-MM-DD HH:mm')) || current.month() !== currentMonth
    };

    // const disabledDateLength = () => {
    //     const currentDate = moment();
    //     const endDate = moment().add(1, 'year'); // End in one year (adjust as needed)
    //     return disabledDates.filter(disabledDate => {
    //         return moment(disabledDate).isBetween(currentDate, endDate, null, '[]'); // Check if the date is within the range
    //     }).length;
    // };

    return<div>

        {
            inputsLoading ? <Preloader/> : <div style={{display: 'flex', gap: 5, marginTop: 20}}>
                <div style={{width: '50%'}}>
                    <FormInput label={t('Appointment date')}
                               disabledDate={disabledDate}
                               inputProps={{
                                   defaultPickerValue:defaultMonth,
                                   onPanelChange:getEmptyHours,
                                   onChange:(e)=> {

                                       setDate(e)

                                       formRef?.current?.setFieldsValue({
                                           appointment_time: null,

                                       })

                                   }
                               }}
                               name={'booked_at'}
                               inputType={'date'}
                               rules={[{required: true}]}
                    />
                </div>
                <div style={{width: '50%'}}>
                    {
                        dateLoading ? <Preloader small={10}/> : <FormInput label={t('Appointment time')}
                                                                name={'appointment_time'}
                                                                inputType={'resourceSelect'}
                                                                options={availableTimes}
                                                                rules={[{required: true}]}
                                                                initialData={[]}
                        />
                    }

                </div>
            </div>
        }



        <div style={{display: 'flex', gap: 3}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >{t('Cancel')}</Button>
            <Button loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>{t('Submit')}</Button>
        </div>

    </div>
}