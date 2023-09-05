import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import React from "react";
import {Button, Result} from "antd";

export function CanceledContent({onCancel, loading}){
    return<div>
        <Result
            status="error"
            title="Type the reason for the"
            subTitle="cancellation"

        />

            <FormInput label={t('Reason')} name={'cancellation_reason'} inputType={'textArea'} castomReq={true} rules={[

                {
                    message: t('Please enter valid text'),
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
                <Button  size={'large'} type={'secondary'} onClick={onCancel} >{t('Cancel')}</Button>
                <Button loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>{t('Submit')}</Button>
            </div>

    </div>
}

