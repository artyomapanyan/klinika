import {Button, Form, Input, Spin} from "antd";
import React, {useState} from 'react';
import axios from "axios";
import api from "../../Api";
import logo from "../../dist/Img/logo.svg";
import FormInput from "../Fragments/FormInput";
import AuthHeader from "./AuthHeader";
import {t} from "i18next";


function Forgot() {

    const [loading, setLoading] = useState(false)
    const handleForgot = (values) => {
        setLoading(true);
        axios.request({
            url: api.Auth.forgot.url,
            method: api.Auth.forgot.method,
            data: values,
        }).then(response => {
            setLoading(false)
        })
    }

    return (
        <div className={'login_background'}>
            <AuthHeader />
            <div className={'card_div'}>
                <div className={'logo_div'}>
                    <img src={logo} alt={'logo'}/>
                    <div className={'form_div'}>
                        <div className={'login_title'}>{t("Reset Your Password")}</div>
                        <Form
                            onFinish={handleForgot}>
                            <FormInput name={'email'} label={t('Email')} initialValue={'test'}/>
                            <Button size={'large'} className={'forgot_submit'} loading={loading} type={'primary'} htmlType={'submit'}>{t("Send instruction to email")}</Button>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot;
