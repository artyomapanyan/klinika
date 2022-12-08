import React from "react";
import {Button} from "antd";
import "./HeaderAccountDropdown.sass"
import frame4 from "../../../../../dist/icons/frame4.svg";
import checkout from "../../../../../dist/icons/checkout.svg";
import settings from "../../../../../dist/icons/settings.svg";
import logout from "../../../../../dist/icons/logout.svg";
function HeaderAccountDropdown() {
    return (
        <div>
            <div className={"head_account_drop"}>

                <h3 style={{fontWeight: 700}}>Select Role :</h3>
                <Button  type={'primary'} >
                    <div >
                        <div className={"head_account_drop_text"}>Therapist</div>
                        <div>Lakeside General Hospital</div>
                    </div>
                    <div><img style={{filter: 'invert(100%)' }} alt={'icons'} src={frame4}/></div>
                </Button>
                <Button type={'default'} >
                    <div>
                        <div className={"head_account_drop_text"}>Reumatologist therapist</div>
                        <div style={{display:"flex"}}>Flowerhill Clinic</div>
                    </div>
                    <div><img alt={'icons'} src={checkout}/></div>

                </Button>
                <Button >
                    <div>
                        <div className={"head_account_drop_text"}>Sushkov Aleksey</div>
                        <div style={{display:"flex"}}>Patient profile</div>
                    </div>
                    <div><img alt={'icons'} src={checkout}/></div>
                </Button>
        </div>
            <div className={"head_acc_bottom_div"}>
                <Button style={{justifyContent:"none"}}>
                    <div><img alt={'icons'} src={settings}/>   Account setings</div>

                </Button>
                <Button >
                    <div><img alt={'icons'} src={logout}/>   Logout</div>

                </Button>
            </div>


        </div>
    )
}
export default HeaderAccountDropdown;