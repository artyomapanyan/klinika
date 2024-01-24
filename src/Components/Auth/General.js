import React, {useState} from 'react';
import {Button, Form, Input, Select, Spin} from "antd";
import axios from "axios";
import api from "../../Api.js"
import logo from "../../dist/Img/logo.svg";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {t} from "i18next";

function General(){
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [rolesState, setRolesState] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleLogin = (values)=>{

      axios.get(`${api.endpoint}/sanctum/csrf-cookie`).then(() => {
          setLoading(true)
          values.device_name = 'React App'
            axios.request({
                url: api.Auth.login.url,
                method: api.Auth.login.method,
                data: values,
            }).then(response=>{
                if(response.user.id){
                    if(!response?.token){
                        setRolesState(response?.user?.roles.filter(item => item.key !== 'temp-patient' && item.key !== 'user'))

                    }else{
                        dispatch({
                            type:'AUTH',
                            payload:response
                        })
                        navigate('/dashboard')
                    }
                }
            }).finally(()=>{
                setLoading(false)
            })
        })

    }

    const goLoginPage = () => {
        navigate("/login")
    }
    return<div style={{display:"flex"}}>
                <div style={{border: "1px solid black", width: "67%"}}>

                </div>
                <div style={{border: "1px solid black", width: "33%"}}>
                    <div style={{display:"flex", flexDirection: "column", JustifyContent:"center", alignItems: "center" }}>

                            <img src={logo} alt={'logo'} style={{width: 200, height: 200}} />
                            <p>{t('Login to Your Account')}</p>
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

                                {rolesState.length?<Form.Item
                                    name={'role_id'}>
                                    <Select>
                                        {rolesState.map((el) => {
                                            return <Select.Option key={el.id} value={el.id}>{el.name}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>:null}
                            <Form.Item>

                            <a className="login-form-forgot" href="/forgot">
                                {t('Forgot password?')}
                            </a>
                        </Form.Item>
                                <Form.Item>
                                    <Button onClick={goLoginPage}>log</Button>
                                </Form.Item>


                                <Button loading={loading??<Spin />} type={'primary'} htmlType={'submit'}>{t('Submit')}</Button>

                            </Form>
                        </div>

                    </div>

                </div>
         </div>

}
export default General
