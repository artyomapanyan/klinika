import {Button, Result} from "antd";

import {t} from "i18next";
import React from "react";

export function Confirmed({onCancel, loading}){



    return<div>
        <Result
            title={t('Are you sure want to change status?')}
        />

        <div style={{display: 'flex', gap: 5}} >
            <Button size={'large'} type={'secondary'} onClick={onCancel} >{t('Cancel')}</Button>
            <Button loading={loading} size={'large'} type={'primary'} htmlType={'submit'}>{t('Submit')}</Button>
        </div>

    </div>
}