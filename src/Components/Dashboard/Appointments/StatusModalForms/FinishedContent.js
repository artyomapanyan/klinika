import {Button, Result} from "antd";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import React from "react";

export function FinishedContent({onCancel}){
    return<div>
        <Result
            title="Your notes for the patient"
        />

        <FormInput label={t('Doctor notes')} name={'doctor_notes'} inputType={'textArea'}/>
        <FormInput label={t('Prescriptions')} name={'prescriptions'} inputType={'textArea'}/>
        <div style={{display: 'flex', gap: 5}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >Cancel</Button>
            <Button size={'large'} type={'primary'} htmlType={'submit'}>Submit</Button>
        </div>

    </div>
}