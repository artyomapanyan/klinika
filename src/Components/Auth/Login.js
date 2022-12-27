import React from 'react';
import {Button, Form, Input} from "antd";
import axios from "axios";
import api from "../../Api.js"
import logo from "../../dist/Img/logo.svg";
import {useTranslation} from "react-i18next";

function Login(){

    const {t} = useTranslation()
    const handleLogin = (values)=>{
        axios.get(`${api}/sanctum/csrf-cookie`).then(response => {
            const Data = new FormData();
            Data.append('email', values.email)
            Data.append('password', values.password)
            axios.request({
                url: api.Auth.login.url,
                method: api.Auth.login.method,
                data: values,
            })
        })
        console.log(values)

    }
    console.log(api, "as")
    return<div style={{display:"flex"}}>
                <div style={{border: "1px solid black", width: "67%"}}>

                </div>
                <div style={{border: "1px solid black", width: "33%"}}>
                    <div style={{display:"flex", flexDirection: "column", JustifyContent:"center", alignItems: "center" }}>

                            <img src={logo} alt={'logo'} style={{width: 200, height: 200}} />
                            <p>Login to Your Account</p>

                        <div>
                            <Button type={"primary"}>As Doctor</Button>
                            <Button type={"secondary"}>As Clinic</Button>
                        </div>
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