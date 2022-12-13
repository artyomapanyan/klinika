import React from "react";
import {Button} from "antd";
import "./HeaderAccountDropdown.sass"
import frame4 from "../../../../../dist/icons/frame4.svg";
import checkout from "../../../../../dist/icons/checkout.svg";
import settings from "../../../../../dist/icons/settings.svg";
import logout from "../../../../../dist/icons/logout.svg";
import axios from "axios";
import api from "../../../../../Api";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
function HeaderAccountDropdown() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
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
        dispatch({
            type:'ROLE_CHANGE',
            payload: el

        })

    }



    return (
        <div>
            <div className={"head_account_drop"}>

                <h3 style={{fontWeight: 700}}>Select Role :</h3>

                {roles.map((el) =><Button type ={auth?.selected_role?.id===el?.id?'primary':'default'} key={el.id} onClick={()=>onRoleChange(el)} >
                            <div >
                                <div className={"head_account_drop_text"}>{el?.name}</div>
                                <div>{el?.key}</div>
                            </div>
                            <div><img className={"head_drop_icon"} alt={'icons'} src={checkout}/></div>
                        </Button>)
                }


                {/*<Button  type={'primary'} >*/}
                {/*    <div >*/}
                {/*        <div className={"head_account_drop_text"}>Therapist</div>*/}
                {/*        <div>Lakeside General Hospital</div>*/}
                {/*    </div>*/}
                {/*    <div><img className={"head_drop_icon"} alt={'icons'} src={frame4}/></div>*/}
                {/*</Button>*/}
                {/*<Button type={'default'} >*/}
                {/*    <div>*/}
                {/*        <div className={"head_account_drop_text"}>Reumatologist therapist</div>*/}
                {/*        <div style={{display:"flex"}}>Flowerhill Clinic</div>*/}
                {/*    </div>*/}
                {/*    <div><img className={"head_drop_icon"} alt={'icons'} src={checkout}/></div>*/}

                {/*</Button>*/}
                {/*<Button >*/}
                {/*    <div>*/}
                {/*        <div className={"head_account_drop_text"}>Sushkov Aleksey</div>*/}
                {/*        <div style={{display:"flex"}}>Patient profile</div>*/}
                {/*    </div>*/}
                {/*    <div><img className={"head_drop_icon"} alt={'icons'} src={checkout}/></div>*/}
                {/*</Button>*/}
        </div>
            <div className={"head_acc_bottom_div"}>
                <Button style={{justifyContent:"none"}}>
                    <div><img alt={'icons'} src={settings}/>   Account setings</div>

                </Button>
                <Button onClick={handleLogout} >
                    <div><img alt={'icons'} src={logout}/>   Logout</div>
                </Button>
            </div>
        </div>
    )
}
export default HeaderAccountDropdown;