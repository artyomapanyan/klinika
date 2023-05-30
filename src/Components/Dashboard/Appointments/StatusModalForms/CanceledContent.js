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

            <FormInput label={t('Reason')} name={'cancellation_reason'} inputType={'textArea'} rules={[{required: true}]}/>
            <div style={{display: 'flex', gap: 5}} >
                <Button  size={'large'} type={'secondary'} onClick={onCancel} >Cancel</Button>
                <Button loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>Submit</Button>
            </div>

    </div>
}

