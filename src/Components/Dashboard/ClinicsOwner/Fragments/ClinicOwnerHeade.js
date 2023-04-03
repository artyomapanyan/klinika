import React from 'react';
import {Dropdown, Space} from "antd";
import {t} from "i18next";
import {DownOutlined} from "@ant-design/icons";
function ClinicOwnerHeade() {
    const items = [
        {
            label: 'First Clinic',
            key: '1',
        },
        {
            label: 'Second Clinic',
            key: '2',
        },
        {
            label: 'Firth Clinic',
            key: '3',
        },
        {
            label: 'First Clinic',
            key: '4',
        },
        {
            label: 'Second Clinic',
            key: '5',
        },

    ];
    const onClick = ({key}) => {
        console.log(key)
    };
    return(
        <div className={'clinic_owner_header'}>
            <div style={{margin:"40px 24px", fontSize:40}}>Dashboard</div>
            <div>
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                    trigger={['click']}
                >
                    <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                        <div style={{color: "#BF539E", fontWeight: 400, fontSize:24, marginLeft:15}}>{t("April")}</div>
                        <div><DownOutlined /></div>
                    </Space>

                </Dropdown>
            </div>
            <div>
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                    trigger={['click']}
                >
                    <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                        <div style={{color: "#BF539E", fontWeight: 400, fontSize:24, marginLeft:15}}>{t("All clinic")}</div>
                        <div><DownOutlined /></div>
                    </Space>

                </Dropdown>
            </div>
        </div>
    )
}
export default ClinicOwnerHeade;