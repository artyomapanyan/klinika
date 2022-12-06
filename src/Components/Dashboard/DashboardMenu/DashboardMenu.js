import React from 'react';
import logo from "../../../dist/Img/logo.svg";
import logoShort from "../../../dist/Img/Logo-short.svg";
import {Button, Divider, Menu} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import dash1 from "../../../dist/icons/frame1.svg";
import dash2 from "../../../dist/icons/frame2.svg";
import dash3 from "../../../dist/icons/frame3.svg";
import dash4 from "../../../dist/icons/frame4.svg";
import dash5 from "../../../dist/icons/frame5.svg";
import {useTranslation} from "react-i18next";
function DashboardMenu({mouseCollapsed,fixCollapse}){
    const {t} = useTranslation()
    const items = [
        {
            key: `/age-categories`,
            label: t("dashboard"),
            icon: <img alt={'icons'} src={dash1}/>,
        },
        {
            key: `/match-event-natures`,
            label: `Schedlue`,
            icon: <img alt={'icons'} src={dash2}/>,
        },
        {
            key: `/age-categories`,
            label: `Offers`,
            icon: <img alt={'icons'} src={dash3}/>,
        },
        {
            label: `Profile`,
            icon: <img alt={'icons'} src={dash4}/>,
            children: [
                {
                    key: 'road-expense-calculator',
                    label: `RoadExpenseCalculator`,
                },
                {
                    key: 'documents/new',
                    label: `NewDocuments`,
                },
            ]
        },
        {
            key: `/match-event-naturess`,
            label: `Reviews`,
            icon: <img alt={'icons'} src={dash5}/>,
        },
    ];

    return (
        <div>
            <div style={{
                overflow: 'hidden', display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {!mouseCollapsed ? <div><img src={logo} alt={'logo'} style={{margin: 20}}/></div> :
                    <img src={logoShort} alt={'logo'} style={{margin: 20}}/>}
                {!mouseCollapsed ?
                    <Button onClick={fixCollapse} style={{border: 'none'}}><MenuOutlined/></Button> : null}
            </div>
            <Divider/>
            <Menu

                mode="inline"
                theme="light"
                inlineCollapsed={false}
                triggerSubMenuAction={'click'}
                subMenuCloseDelay={0}
                items={items}
                style={{fontSize: 16}}

            />
        </div>
    )
}
export default DashboardMenu
