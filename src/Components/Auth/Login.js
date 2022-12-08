import React, {useState} from 'react';
import {Button, Form, Input, Select, Spin} from "antd";
import axios from "axios";
import api from "../../Api.js"
import logo from "../../dist/Img/logo.svg";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

function Login(){
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
                if(response?.user?.roles?.length>1){
                    setRolesState(response?.user?.roles)

                }else{
                    console.log(response)
                    dispatch({
                        type:'AUTH',
                        payload:response
                    })
                    navigate('/dashboard')
                }
                setLoading(false)
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

                                {rolesState.length?<Form.Item
                                    name={'role'}>
                                    <Select>
                                        {rolesState.map((el) => {
                                            return <Select.Option key={el.id} value={el.id}>{el.name}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>:null}
                            <Form.Item>

                            <a className="login-form-forgot" href="/forgot">
                                Forgot password
                            </a>
                        </Form.Item>


                                <Button loading={loading??<Spin />} type={'primary'} htmlType={'submit'}>Submit</Button>

                            </Form>
                        </div>

                    </div>

                </div>
         </div>

}
export default Login
