import React, {useEffect, useState} from "react";
import "./HeaderAccount.sass"
import notification from "../../../../dist/icons/notification.svg";
import alert from "../../../../dist/icons/alert.svg";
import arrowDownPurple from "../../../../dist/icons/arrowDownPurple.svg";
import {Avatar, Button, Card, Divider, Dropdown, Space} from "antd";
import HeaderAccountDropdown from "./Fragment/HeaderAccountDropdown";
import {useSelector} from "react-redux";
import {t} from "i18next";
import Languages from "./Languages";
import PermCheck from "../../../Fragments/PermCheck";
import {postResource} from "../../../Functions/api_calls";


function HeaderAccount() {
    let token = useSelector((state) => state.auth.token);
    let user = useSelector((state) => state?.auth?.user);

    const [approve, setApprove] = useState({})

    useEffect(() => {
        postResource('ApproveClinicDoctor','single', token, ``, ).then((response) => {
            console.log(response, 'fe')
            setApprove(response)
        });
    }, [])

    return(
        <div>

            <Space  className="header-properties small-gap">
                <Dropdown  dropdownRender={()=><div>
                    <div>Clinic Name</div>
                    <Button style={{margin:3}} type={'primary'} size={'small'}>Ok</Button>
                    <Button type={'secondary'} size={'small'}>Cancel</Button>
                </div>} trigger={['click']} placement="bottomRight">
                    <Button type="link" className="header_call_dropdown"><Space><img alt={'icons'} src={notification}/>32</Space></Button>
                </Dropdown>


                {PermCheck('User:viewAny')?<Button type="link" className="header_report"><Space><img alt={'icons'} src={alert}/>{t("Report")}</Space></Button>:<div></div>}
                    <Divider type={"vertical"} style={{height: 32, margin:16}} />


                <Dropdown dropdownRender={()=><Card className={"head_account_dropdown"}><HeaderAccountDropdown /></Card>} placement="bottomRight" trigger={['click']}>
                    <Button type={"link"} className={'head_user_db'}  >
                        <Space>
                            <Avatar size={'large'} className="header_avatar">A</Avatar>
                            <div >{user?.first} {user?.last}</div>
                            <img alt={'icons'} src={arrowDownPurple}/>
                        </Space>
                    </Button>
                </Dropdown>
                <Divider type={'vertical'} style={{height: 32, margin:16}} />
                <Languages />



            </Space>
        </div>
    )
}

export default HeaderAccount;
