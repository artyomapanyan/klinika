import React, {useMemo} from 'react';
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
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
function DashboardMenu({mouseCollapsed,fixCollapse}){
    const {t} = useTranslation();
    const navigate = useNavigate();
    const permissions = useSelector(state=>state.auth.user.permissions);
    const handleFilterMenus = (item)=>{
        if(item.children){
            return item.children.filter(handleFilterMenus).length
        }else if(item.permission){
            return permissions.includes(item.permission+':viewAny')
        }
        return true
    }
    const items = useMemo(()=>[
        {
            key: `/`,
            label: t("dashboard"),
            icon: <img alt={'icons'} src={dash1}/>,
        },
        {
            key: `/match-event-natures`,
            label: t(`Schedlue`),
            icon: <img alt={'icons'} src={dash2}/>,
        },
        {
            key: `/-categories`,
            label: t(`Offers`),
            icon: <img alt={'icons'} src={dash3}/>,
        },
        {
            label: t(`Inputs`),
            icon: <img alt={'icons'} src={dash4}/>,
            children: [
                {
                    key: 'countries',
                    label: t(`Countries`),
                    permission:'Country'
                },
                {
                    key: 'regions',
                    label: t(`Areas`),
                    permission:'Region'
                },
                {
                    key: 'cities',
                    label: t(`Cities`),
                    permission:'City'
                },
                {
                    key: 'categories',
                    label: t(`Categories`),
                    permission:'Category'
                },
                {
                    key: 'sub-categories',
                    label: t(`Sub categories`),
                    permission:'SubCategory'
                },
                {
                    key: 'services',
                    label: t(`Services`),
                    permission:'Service'
                },
            ]
        },
        {
            label: `Profile`,
            icon: <img alt={'icons'} src={dash4}/>,
            children: [
                {
                    key: 'road-expense-calculator',
                    label: t(`RoadExpenseCalculator`),
                },
                {
                    key: 'documents/new',
                    label: t(`NewDocuments`),
                },
            ]
        },
        {
            key: `/match-event-naturess`,
            label: t(`Reviews`),
            icon: <img alt={'icons'} src={dash5}/>,
        },
    ].filter(handleFilterMenus),[permissions]);

    const handleMenuClick = (e)=>{
        const link = e.key;
        const event = e.domEvent
        if(event.buttons===4 && link){
            window.open(window.location.origin+'/account/'+link,'_blank');
        }else{
            navigate(`/dashboard/${link}`)
        }
    }

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
                triggerSubMenuAction={'click'}
                subMenuCloseDelay={0}
                items={items}
                style={{fontSize: 16}}
                onClick={handleMenuClick}
            />
        </div>
    )
}
export default DashboardMenu
