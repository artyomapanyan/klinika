import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import React, {useEffect, useRef} from "react";
import {Button, Result} from "antd";
import dayjs from "dayjs";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";

export function RascheduledContent({onCancel, recorddata, date}){
    let token = useSelector((state) => state.auth.token);


    const disabledDate = (current) => {
        return current.add(1, 'day') < dayjs()
    };



// console.log(recorddata,date?.booked_at?.format('DD-MM-YYYY'), 'dad')
    // useEffect(() => {
    //     if (data?.appointment_date) {
    //         postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, data?.doctor_id + "/" + data?.clinic_id, {
    //             service: data?.service_type,
    //             date: data?.appointment_date.format('YYYY-MM-DD')
    //         }).then((responce) => {
    //
    //             setAvailableTimesState(responce.map((el) => {
    //                 return {
    //                     label: 'Break Time',
    //                     options: el.map((el1) => {
    //                         return {
    //                             lebel: el1,
    //                             value: el1
    //                         }
    //                     })
    //                 }
    //             }))
    //         })
    //     }
    //
    // }, [data?.booked_at, data?.doctor_id])


    return<div>

        <div style={{display: 'flex', gap: 5, marginTop: 20}}>
            <div style={{width: '50%'}}>
                <FormInput label={t('Appointment date')}
                           disabledDate={disabledDate}
                           name={'booked_at'}
                           inputType={'date'}
                           rules={[{required: true}]}
                />
            </div>
            <div style={{width: '50%'}}>
                <FormInput label={t('Appointment time')}
                           name={'appointment_time'}
                           inputType={'resourceSelect'}
                           initialData={[]}
                />
            </div>
        </div>


        <div style={{display: 'flex', gap: 3}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >Cancel</Button>
            <Button size={'large'} type={'primary'} htmlType={'submit'}>Submit</Button>
        </div>

    </div>
}