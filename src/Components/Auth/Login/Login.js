import {Button, Carousel, Checkbox, Form, Input, Space} from "antd";
import React, {useRef, useState} from 'react';
import "./Login.sass";
import logo from "../../../dist/Img/logo.svg";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import axios from "axios";
import api from "../../../Api";
import {Link} from "react-router-dom";


function Login() {
    const dispatch = useDispatch();
    const carouselRef = useRef();
    const formRef = useRef();
    const navigate = useNavigate();

    const [rolesState, setRolesState] = useState([]);
    const [login, setLogin] = useState({});
    const [loading, setLoading] = useState({});
    const handleLoginWithRole = (role) => {
        handleLogin({
            ...login,
            role_id: role.id
        })
    }
    const handleLogout = () => {
        formRef.current.resetFields()
        carouselRef.current.prev()
    }
    const handleLogin = (values) => {
        setLoading({
            [values.role_id ?? 'save']: true
        })
        axios.get(`${api.endpoint}/sanctum/csrf-cookie`).then(() => {

            values.device_name = 'React App'
            axios.request({
                url: api.Auth.login.url,
                method: api.Auth.login.method,
                data: values,
            }).then(response => {
                if (response.user.id) {
                    if (!response?.token) {
                        setRolesState(response?.user?.roles)
                        setLogin(values)
                        carouselRef.current.next()
                    } else {
                        dispatch({
                            type: 'AUTH',
                            payload: response
                        })
                        navigate('/dashboard')
                    }
                }
            }).finally(() => {
                setLoading({})
            })
        })

    }

    return (
        <div className={'login_background'}>
            <div className={'card_div'}>

                <Carousel dots={false} ref={carouselRef}>
                    <div className={'logo_div'}>
                        <img src={logo} alt={'logo'}/>
                        <div className={'form_div'}>
                            <Form
                                ref={formRef}
                                onFinish={handleLogin}>
                                <Form.Item
                                    name={'email'}
                                >

                                    <Input placeholder="Email"/>
                                </Form.Item>

                                <Form.Item
                                    name={'password'}
                                >
                                    <Input.Password
                                        iconRender={() => (<Link onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation()
                                        }}
                                                                 style={{position: 'absolute', marginLeft: -60}}
                                                                 to="/forgot">Forgot?</Link>)}
                                        placeholder="Password"
                                        style={{position: 'static'}}
                                    />
                                </Form.Item>
                                <div className={'log_check_div'}>
                                    <Button className={'login_btn'} loading={loading.save} type={'primary'}
                                            htmlType={'submit'}>Login</Button>
                                    <Checkbox>Remember me</Checkbox>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className={'logo_div'}>
                        <Space direction={'vertical'}>
                            {rolesState.map(role => <Button key={role.id} type={'primary'}
                                                            onClick={() => handleLoginWithRole(role)}
                                                            loading={loading[role.id]}>{role.name}</Button>)}
                            <Button type={'secondary'} onClick={handleLogout}>Log out</Button>
                        </Space>
                    </div>
                </Carousel>


            </div>
        </div>
    )
}

export default Login;
