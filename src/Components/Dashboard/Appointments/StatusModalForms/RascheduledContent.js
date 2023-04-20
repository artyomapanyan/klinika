import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import React from "react";
import {Button, Result} from "antd";
import dayjs from "dayjs";

export function RascheduledContent({onCancel}){

    const disabledDate = (current) => {
        return current.add(1, 'day') < dayjs()
    };


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