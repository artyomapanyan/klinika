import React from "react";
import "./HeaderAccount.sass"
import notification from "../../../../dist/icons/notification.svg";
import alert from "../../../../dist/icons/alert.svg";
import arrowDownPurple from "../../../../dist/icons/arrow-down-purple.svg";
import {Avatar, Button, Card, Divider, Dropdown, Space} from "antd";


function HeaderAccount() {

    return(
        <div>

            <Space  className="header-properties small-gap">
                <Dropdown  dropdownRender={()=><Card>111</Card>} trigger={['click']} placement="bottomRight">
                    <Button type="link" className="header_call_dropdown"><Space><img alt={'icons'} src={notification}/>32</Space></Button>
                </Dropdown>


                    <Button type="link" className="header_report"><Space><img alt={'icons'} src={alert}/>Report</Space></Button>
                    <Divider type={"vertical"} style={{height: 32, margin:16}} />


                <Dropdown dropdownRender={()=><Card>111</Card>} placement="bottomLeft" trigger={['click']}>
                    <Button type={"link"} className={'head_user_db'} style={{marginBottom: 20, width:40}} >
                        <Space>
                            <Avatar className="header_avatar"/>
                            <div >Alexey Sushkov</div>
                            <img alt={'icons'} src={arrowDownPurple}/>
                        </Space>
                    </Button>
                </Dropdown>




            </Space>
        </div>
    )
}

export default HeaderAccount;