import {Button, Carousel, Checkbox, Form} from "antd";
import React, {useEffect, useRef, useState} from 'react';
import "./Login.sass";
import logo from "../../../dist/Img/logo.svg";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import axios from "axios";
import api from "../../../Api";

import FormInput from "../../Fragments/FormInput";
import {t} from "i18next";
import AuthHeader from "../AuthHeader";
import "../../../dist/styles/Styles.sass";
import {Link} from "react-router-dom";
import checkout from "../../../dist/icons/checkout.svg";


function Login() {
    let dispatch = useDispatch()

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
        setRolesState([])
    }
    useEffect(()=>{
        dispatch({
            type: 'LOGOUT'
        })
    },[])
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
                if (response.user?.id) {
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
            <AuthHeader />
            <div className={'card_div'}>
                <Carousel dots={false} ref={carouselRef}>
                    <div className={'logo_div'}>
                        <img src={logo} alt={'logo'}/>
                        <div className={'form_div'}>
                            <Form
                                ref={formRef}
                                onFinish={handleLogin}>
                                <FormInput className={'test'} name={'email'} label={'Email'} formRef={formRef} initialFocused={true}/>

                                <FormInput className={'test'} inputType={'password'}  formRef={formRef} inputProps={{
                                    iconrender:() => (<Link onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                                            to="/forgot">Forgot?</Link>)
                                }} initialFocused={true} name={'password'} label={'Password'} />
                                <div className={'log_check_div'}>
                                    <Button className={'login_btn'} loading={loading.save} type={'primary'}
                                            htmlType={'submit'}>{t("Login")}</Button>
                                    <Checkbox>{t("Remember me")}</Checkbox>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div style={{scrollBehavior: 'smooth'}}>
                        <div className={"head_account_drop1"}>
                            <h2 style={{fontWeight: 700, margin:20}}>Select Role</h2>
                                        {rolesState.map(role => <Button className={'role_btn'} key={role.id}  onClick={() => handleLoginWithRole(role)} loading={loading[role.id]}>
                                            <div className={'div_icon'}><img className={"head_drop_icon"} alt={'icons'} src={checkout}/></div>
                                            <div >
                                                <div className={"head_account_drop_text"}>{role?.name}</div>
                                                <div className={'role_key'} align={'start'}>{role?.key}</div>
                                            </div>
                                        </Button>)}
                            <div>
                                <Button className={'role_logouth'} type={'secondary'} onClick={handleLogout}>{t('Log out') }</Button>
                            </div>

                        </div>

                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Login;
