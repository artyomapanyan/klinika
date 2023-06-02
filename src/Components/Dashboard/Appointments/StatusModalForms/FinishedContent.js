import {Button, Result} from "antd";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import React from "react";
import dayjs from "dayjs";

export function FinishedContent({onCancel, loading}){



    return<div>
        <Result
            title="Your notes for the patient"
        />

        <FormInput label={t('Doctor notes')} name={'doctor_notes'} inputType={'textArea'} rules={[
            {required: true},
            {
                validator:(rule,value)=>{
                    value=value.trim();
                    if(value.length==0){
                        return Promise.reject('Please enter valid text')
                    }
                    return Promise.resolve();
                }
            }
        ]}/>
        <FormInput label={t('Prescriptions')} name={'prescriptions'} inputType={'textArea'} rules={[
            {required: true},
            {
                validator:(rule,value)=>{
                    value=value.trim();
                    if(value.length==0){
                        return Promise.reject('Please enter valid text')
                    }
                    return Promise.resolve();
                }
            }
        ]}/>
        <div style={{display: 'flex', gap: 5}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >Cancel</Button>
            <Button loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>Submit</Button>
        </div>

    </div>
}