import React, {useState} from "react";
import {Button, Spin} from "antd";
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

function HeaderAccountDropdown({setAuthOpen}) {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
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

    let roles = auth?.user?.roles
    const onRoleChange = (el) => {
        setLoading(true)
        postResource('Auth','switchRole', auth.token,null,{role_id:el.id}).then((response)=>{
            dispatch({
                type: 'AUTH',
                payload: response
            })
            setAuthOpen(false)
            setLoading(false)
            setTimeout(() => {
                switch (response.selected_role.key){
                    case 'clinic-manager':
                        return navigate('/dashboard/clinic-manager')
                    case 'clinic-owner':
                        return navigate('/dashboard/clinics-owner')
                    case 'doctor':
                        return navigate('/dashboard/doctor-reworked')
                    case 'super':
                        return navigate('/dashboard/admin')

                    default:
                        return  navigate('/dashboard')

                }
            }, 500)



        })
    }


    return (
        <Spin spinning={loading}>
            <div>
                    <div className={"head_account_drop"}>

                        <h3 style={{fontWeight: 700}}>Select Role :</h3>

                        {roles.map((el) =><Button className={'btn_roles'} type ={auth?.selected_role?.id===el?.id?'primary':'default'} key={el.id} onClick={()=>onRoleChange(el)} >
                            <div >
                                <div className={"head_account_drop_text"}>{el?.name}</div>
                                <div>{el?.key}</div>
                            </div>
                            <div><img className={"head_drop_icon"} alt={'icons'} src={checkout}/></div>
                        </Button>)
                        }

                    </div>
                    <div className={"head_acc_bottom_div"}>
                        <Button style={{justifyContent:"none"}}>
                            <div><img alt={'icons'} src={settings}/> {t("Account setings")}</div>

                        </Button>
                        <Button style={{marginTop:7}} onClick={handleLogout} >
                            <div><img alt={'icons'} src={logout}/> {t("Logout")}</div>
                        </Button>
                    </div>
                </div>
        </Spin>



    )
}
export default HeaderAccountDropdown;
