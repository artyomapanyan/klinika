import React from 'react';
import {Button, Form, Input} from "antd";
import axios from "axios";
import api from "../../Api.js"
import logo from "../../dist/Img/logo.svg";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogin = (values)=>{

      axios.get(`${api.endpoint}/sanctum/csrf-cookie`).then(response => {
          values.device_name = 'React App'
            axios.request({
                url: api.Auth.login.url,
                method: api.Auth.login.method,
                data: values,
            }).then(response=>{
                dispatch({
                    type:'AUTH',
                    payload:response
                })
                navigate('/dashboard')
            })
        })

    }
    return<div style={{display:"flex"}}>
                <div style={{border: "1px solid black", width: "67%"}}>

                </div>
                <div style={{border: "1px solid black", width: "33%"}}>
                    <div style={{display:"flex", flexDirection: "column", JustifyContent:"center", alignItems: "center" }}>

                            <img src={logo} alt={'logo'} style={{width: 200, height: 200}} />
                            <p>Login to Your Account</p>
                        <div>
                            <Form
                                onFinish={handleLogin}>
                                <Form.Item
                                    name={'email'}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    name={'password'}>
                                    <Input.Password/>
                                </Form.Item>

                                <Button type={'primary'} htmlType={'submit'}>Submit</Button>

                            </Form>
                        </div>

                    </div>

                </div>
         </div>

}
export default Login
