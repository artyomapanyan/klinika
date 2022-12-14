import {Button, Form, Input, Spin} from "antd";
import React, {useState} from 'react';
import axios from "axios";
import api from "../../Api";
import logo from "../../dist/Img/logo.svg";


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
            <div className={'card_div'}>
                <div className={'logo_div'}>
                    <img src={logo} alt={'logo'}/>
                    <div className={'form_div'}>
                        <div className={'login_title'}>Reset Your Password</div>
                        <Form
                            onFinish={handleForgot}>
                            <Form.Item
                                name={'email'}>
                                <Input/>
                            </Form.Item>

                            <Button size={'large'} className={'forgot_submit'} loading={loading} type={'primary'} htmlType={'submit'}>Send instruction to email</Button>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot;
