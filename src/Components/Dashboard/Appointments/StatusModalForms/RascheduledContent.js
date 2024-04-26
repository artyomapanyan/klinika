import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import React, {useEffect, useState} from "react";
import {Button, Spin} from "antd";
import dayjs from "dayjs";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../../../Preloader";

export function RascheduledContent({onCancel, modal, loading, formRef}){
    let token = useSelector((state) => state.auth.token);
    const [date,setDate] = useState(null);
    const [availableTimes,setAvailableTimesState] = useState([]);
    const [dateLoading,setDateLoading] = useState(false);
    const [availableDateState, setAvailableDateState] = useState([])
    const [inputsLoading, setInputsLoading] = useState(false)



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

    const disabledDate = (current) => {
        return current.add(1, 'day') <= dayjs().endOf('date') || current.add(-3, 'month') > dayjs().endOf('date') || current.add(1, 'day') < dayjs().day(1) || availableDateState.includes(dayjs(current).format('dddd').toLowerCase())
    };


    return<div>

        {
            inputsLoading ? <Preloader/> : <div style={{display: 'flex', gap: 5, marginTop: 20}}>
                <div style={{width: '50%'}}>
                    <FormInput label={t('Appointment date')}
                               disabledDate={disabledDate}
                               inputProps={{onChange:e=>setDate(e)}}
                               inputProps={{
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