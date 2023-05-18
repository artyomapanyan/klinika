import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import React, {useEffect, useState} from "react";
import {Button} from "antd";
import dayjs from "dayjs";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";

export function RascheduledContent({onCancel, modal, loading}){
    let token = useSelector((state) => state.auth.token);
    const [date,setDate] = useState(null);
    const [availableTimes,setAvailableTimesState] = useState([]);


    const disabledDate = (current) => {
        return current.add(1, 'day') < dayjs()
    };




   useEffect(() => {

       if (date && modal?.doctor?.id) {
           postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, modal?.doctor?.id + "/" + modal?.clinic?.id, {
               service: modal?.service_type,
               date: date.format('YYYY-MM-DD')
           }).then((responce) => {
               setAvailableTimesState(responce.map((el) => {
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
           })
       }else if(date && !modal?.doctor?.id){
           postResource('Clinic', 'AvailableTimes', token, modal?.clinic?.id, {
               service: modal?.service_type,
               date: date.format('YYYY-MM-DD')
           }).then((res) => {

               setAvailableTimesState(res.map((el) => {
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
           })
       }

   }, [date])


    return<div>

        <div style={{display: 'flex', gap: 5, marginTop: 20}}>
            <div style={{width: '50%'}}>
                <FormInput label={t('Appointment date')}
                           disabledDate={disabledDate}
                           inputProps={{onChange:e=>setDate(e)}}
                           name={'booked_at'}
                           inputType={'date'}
                           rules={[{required: true}]}
                />
            </div>
            <div style={{width: '50%'}}>
                <FormInput label={t('Appointment time')}
                           name={'appointment_time'}
                           inputType={'resourceSelect'}
                           options={availableTimes}
                           initialData={[]}
                />
            </div>
        </div>


        <div style={{display: 'flex', gap: 3}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >Cancel</Button>
            <Button loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>Submit</Button>
        </div>

    </div>
}