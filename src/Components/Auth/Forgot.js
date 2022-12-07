import {Button, Form, Input, Spin} from "antd";
import React, {useState} from 'react';
import axios from "axios";
import api from "../../Api";


function Forgot() {

    const [loading, setLoading] = useState(false)
    const handleForgot = (values) => {
        setLoading(true);
        axios.request({
            url: api.Auth.forgot.url,
            method: api.Auth.forgot.method,
            data: values,
        }).then(response=>{
            setLoading(false)
        })
    }

    return (
        <div>
            <Form
                onFinish={handleForgot}>
                <Form.Item
                    name={'email'}>
                    <Input/>
                </Form.Item>

                <Button loading={loading??<Spin />} type={'primary'} htmlType={'submit'}>Submit</Button>

            </Form>
        </div>
    )
}

export default Forgot;