import {Button, Carousel, Checkbox, Form, Input, Select, Spin, Tabs} from "antd";
import React, {useState} from 'react';
import "./Login.sass";
import logo from "../../../dist/Img/logo.svg";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import axios from "axios";
import api from "../../../Api";
import {EyeInvisibleOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";




function Login() {
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
                        setRolesState(response?.user?.roles)

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


    return (
        <div className={'login_background'}>
                <div className={'card_div'}>

                    <Carousel autoplay dots={false}>
                                <div className={'logo_div'}>
                                <img src={logo} alt={'logo'} />
                                <div className={'form_div'}>
                                    <Form
                                        onFinish={handleLogin}>
                                        <Form.Item
                                            name={'email'}
                                        >

                                            <Input placeholder="Email" />
                                        </Form.Item>

                                        <Form.Item
                                            name={'password'}
                                        >
                                            <Input.Password
                                                iconRender={() => (<Link onClick={(e)=>{
                                                    e.preventDefault();
                                                    e.stopPropagation()
                                                }}
                                                                         style={{position:'absolute', marginLeft: -60}} to="/forgot" >Forgot?</Link>)}
                                                placeholder="Password"
                                                style={{position:'static'}}
                                            />
                                        </Form.Item>



                                        {rolesState.length?<Form.Item
                                            name={'role_id'}>
                                            <Select>
                                                {rolesState.map((el) => {
                                                    return <Select.Option key={el.id} value={el.id}>{el.name}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>:null}
                                        <div className={'log_check_div'}>
                                            <Button className={'login_btn'} loading={loading??<Spin />} type={'primary'} htmlType={'submit'}>Login</Button>
                                            <Checkbox>Remember me</Checkbox>
                                        </div>


                                    </Form>
                                </div>
                                </div>
                        <div>dsadsadsa</div>
                    </Carousel>






                </div>
        </div>
    )
}

export default Login;