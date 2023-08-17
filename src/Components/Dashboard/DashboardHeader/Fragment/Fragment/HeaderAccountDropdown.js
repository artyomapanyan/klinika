import React, {useEffect, useState} from "react";
import {Button, Modal, Result, Spin} from "antd";
import "./HeaderAccountDropdown.sass"
import checkout from "../../../../../dist/icons/checkout.svg";
import settings from "../../../../../dist/icons/settings.svg";
import logout from "../../../../../dist/icons/logout.svg";
import axios from "axios";
import api from "../../../../../Api";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {t} from "i18next";
import {postResource} from "../../../../Functions/api_calls";
import dayjs from "dayjs";

function HeaderAccountDropdown({setAuthOpen}) {
    const auth = useSelector(state => state.auth)
    const app = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let menuState = useSelector((state) => state.dashboardMenuState);

    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logOuthState, setLogOuthState] = useState(false);
    const [roleEl, setRoleEl] = useState({});



    const handleLogout = () => {
        setLogOuthState(true)
        if(menuState === true) {
            setIsModalOpen(true);
        } else {
            axios.get(api.Auth.logout.url, {
                headers: {
                    'Authorization': auth.token,
                }
            }).then(() => {
                dispatch({
                    type: 'LOGOUT'
                })
                navigate('/')
            })
        }


    }

    let roles = auth?.user?.roles
    const onRoleChange = (el) => {
        setRoleEl(el)
        if(menuState === true) {
            setIsModalOpen(true);
        } else {
            setLoading(true)
            postResource('Auth', 'switchRole', auth.token, null, {role_id: el.id}).then((response) => {

                dispatch({
                    type: 'AUTH',
                    payload: response
                })
                dispatch({
                    type: 'CALENDAR_DATE',
                    payload: null
                })
                setAuthOpen(false)
                setLoading(false)
                setTimeout(() => {
                    switch (response.selected_role.key) {
                        case 'clinic-manager':
                            return navigate('/dashboard/clinic-manager')
                        case 'clinic-owner':
                            return navigate('/dashboard/clinics-owner')
                        case 'doctor':
                            return navigate('/dashboard/doctor-reworked')
                        case 'super':
                            return navigate('/dashboard/super-admin')
                        case 'admin':
                            return navigate('/dashboard/admin')

                        default:
                            return navigate('/dashboard')

                    }
                }, 500)


            })
        }
    }
    useEffect(()=>{
        postResource('Role','list',auth.token).then((data)=>{

            dispatch({
                type: 'ROLES_UPDATE',
                payload: data.items
            })
        })
    },[app.current_locale])


    const onSetings = () => {
        // if(auth?.selected_role?.key === 'doctor') {
        //     navigate(`profile`)
        // } else {
            navigate(`users/update-self`)
        //}

    }

    const handleOk = () => {

        setIsModalOpen(false);

        if(logOuthState) {
            axios.get(api.Auth.logout.url, {
                headers: {
                    'Authorization': auth.token,
                }
            }).then(() => {
                dispatch({
                    type: 'LOGOUT'
                })
                navigate('/')
            })
            setLogOuthState(false)
        } else {
            setLoading(true)
            postResource('Auth', 'switchRole', auth.token, null, {role_id: roleEl.id}).then((response) => {

                dispatch({
                    type: 'AUTH',
                    payload: response
                })
                dispatch({
                    type: 'CALENDAR_DATE',
                    payload: null
                })
                setAuthOpen(false)
                setLoading(false)
                setTimeout(() => {
                    switch (response.selected_role.key) {
                        case 'clinic-manager':
                            return navigate('/dashboard/clinic-manager')
                        case 'clinic-owner':
                            return navigate('/dashboard/clinics-owner')
                        case 'doctor':
                            return navigate('/dashboard/doctor-reworked')
                        case 'super':
                            return navigate('/dashboard/super-admin')
                        case 'admin':
                            return navigate('/dashboard/admin')

                        default:
                            return navigate('/dashboard')

                    }
                }, 500)


            })
        }





        dispatch({
            type: 'DASHBOARD_STATE',
            payload: false
        })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Spin spinning={loading}>
            <div>
                    <div className={"head_account_drop"}>

                        <h3 style={{fontWeight: 700}}>{t("Select Role :")}</h3>

                        {roles.map((el, i) =>{
                            return<Button key={el?.id} className={'btn_roles'} type ={auth?.selected_role?.id===el?.id?'primary':'default'}  onClick={()=>onRoleChange(el)} >
                            <div >
                                <div className={"head_account_drop_text"}>{el?.name}</div>
                                <div>{el?.key}</div>
                            </div>
                            <div><img className={"head_drop_icon"} alt={'icons'} src={checkout}/></div>
                        </Button>})
                        }

                    </div>
                    <div className={"head_acc_bottom_div"}>
                        <Button style={{justifyContent:"none"}} onClick={onSetings}>
                            <div><img alt={'icons'} src={settings}/> {t("Account settings")}</div>

                        </Button>
                        <Button style={{marginTop:7}} onClick={handleLogout} >
                            <div><img alt={'icons'} src={logout}/> {t("Logout")}</div>
                        </Button>
                    </div>
                </div>
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closeIcon={false} >
                <Result
                    title="Your changes will not be saved"

                />

            </Modal>
        </Spin>



    )
}
export default HeaderAccountDropdown;
