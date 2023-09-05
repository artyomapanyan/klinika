import {Button, Result} from "antd";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import React from "react";
import dayjs from "dayjs";

export function FinishedContent({onCancel, loading}){



    return<div>
        <Result
            title={t("Your notes for the patient")}
        />

        <FormInput label={t('Doctor notes')} name={'doctor_notes'} inputType={'textArea'} castomReq={true} rules={[
            // {required: true},
            {
                message: t('Please enter doctor notes'),
                validator:(rule,value)=>{
                    value=value.trim();
                    if(value.length==0){
                        return Promise.reject('Please enter doctor notes')
                    }
                    return Promise.resolve();
                }
            }
        ]}/>
        <FormInput label={t('Prescriptions')} name={'prescriptions'} inputType={'textArea'} castomReq={true} rules={[
             {reqIcon: true},
            {
                message: t('Please enter doctor notes'),
                validator:(rule,value)=>{
                    value=value.trim();
                    if(value.length==0){
                        return Promise.reject('Please enter doctor notes')
                    }
                    return Promise.resolve();
                }
            }
        ]}/>
        <div style={{display: 'flex', gap: 5}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >{t('Cancel')}</Button>
            <Button loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>{t('Submit')}</Button>
        </div>

    </div>
}