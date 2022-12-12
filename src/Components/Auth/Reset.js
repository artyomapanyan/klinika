import React, {useRef, useState} from 'react'
import {Button, Form, Input} from "antd";
import axios from "axios";
import api from "../../Api";
import {useNavigate, useParams} from "react-router";
import {useDispatch} from "react-redux";
function Reset(){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const params = useParams()
    const formRef = useRef();

    const handleResetPassword = (values)=>{
        setLoading(true)
        values.device_name= 'React app'
        axios.request({
            url:api.Auth.reset.url,
            method:api.Auth.reset.method,
            data:values
        }).then(response=>{
            if(response){
                dispatch({
                    type:'AUTH',
                    payload:response
                })
                navigate('/dashboard')
            }
            setLoading(false)
        })
    }
    return <Form onFinish={handleResetPassword} ref={formRef} initialValues={{
        reset_token: params.token
    }}>
        <Form.Item name={'reset_token'} hidden={true}/>
        <Form.Item name={'email'} rules={[
            {
                type:'email'
            }
        ]}>
            <Input/>
        </Form.Item>
        <Form.Item name={'password'}  rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
        ]}>
            <Input.Password/>
        </Form.Item>
        <Form.Item name={'password_confirmation'}  rules={[
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
        ]}>
            <Input.Password/>
        </Form.Item>
        <Button type={'primary'} htmlType={'submit'} loading={loading}>Reset</Button>
    </Form>
}
export default Reset;
