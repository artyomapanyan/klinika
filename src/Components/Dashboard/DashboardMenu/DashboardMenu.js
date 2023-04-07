import React, {useMemo} from 'react';
import logo from "../../../dist/Img/logo.svg";
import logoShort from "../../../dist/Img/Logo-short.svg";
import {Button, Divider, Menu} from "antd";
import {
    MenuOutlined,
    NotificationOutlined,
    PercentageOutlined,
    RedEnvelopeOutlined,
    DiffOutlined,
    DollarOutlined
} from "@ant-design/icons";
import dash4 from "../../../dist/icons/frame4.svg";
import dash1 from "../../../dist/icons/frame1.svg";
import dash2 from "../../../dist/icons/frame2.svg";
import dash3 from "../../../dist/icons/frame3.svg";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router";
import {useSelector} from "react-redux";

function DashboardMenu({mouseCollapsed,fixCollapse}){
    const {t} = useTranslation();
    const navigate = useNavigate();
    let {pathname} = useLocation();
    const permissions = useSelector(state=>state.auth.user.permissions);
    const handleFilterMenus = (item)=>{
        if(item.children){
            item.children = item.children.map(handleFilterMenus).filter(e=>e)
            return item
        }else if(item.permission){
            return permissions.includes(item.permission+':viewAny')?item:false
        }
        return item
    }
    const items = useMemo(()=>[
       /* {
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
        },*/
        {
            label: t(`Inputs`),
            icon: <img alt={'icons'} src={dash1}/>,
            key:'inputs',
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
                {
                    key: 'sub-services',
                    label: t(`Sub services`),
                    permission:'SubService'
                },
                {
                    key: 'nursing-tasks',
                    label: t(`Nursing tasks`),
                    permission:'NursingTask'
                },
                {
                    key: 'insurance-companies',
                    label: t(`Insurance companies`),
                    permission:'InsuranceCompany'
                },
                {
                    key: 'bug-reports',
                    label: t(`Bug Report Topics`),
                    permission:'Taxonomy'
                },
                {
                    key: 'payment-methods',
                    label: t(`Payment Methods`),
                    permission:'PaymentMethod'
                },
                {
                    key: 'specialties',
                    label: t(`Specialties`),
                    permission:'Taxonomy'
                },
                {
                    key: 'sub-specialties',
                    label: t(`Sub Specialties`),
                    permission:'Taxonomy'
                },
                {
                    key: 'posts',
                    label: t(`Posts`),
                    permission:'Post'
                },
                {
                    key: 'translations',
                    label: t(`Translations`),
                    permission:'Translation'
                },
                {
                    key: 'preferences',
                    label: t(`Preferences`),
                    permission:'Preference'
                },
                {
                    key: 'taxonomies',
                    label: t(`Laboratory`),
                    permission:'Taxonomy'
                },
            ]
        },
        {
            label: t(`User`),
            icon: <img alt={'icons'} src={dash4}/>,
            children: [
                {
                    key: 'roles',
                    label: t(`Roles`),
                    permission:'Role'
                },
                {
                    key: 'users',
                    label: t(`Users`),
                    permission:'User'
                },
            ]
        },
        {
            label: t(`Accounts`),
            icon: <img alt={'icons'} src={dash2}/>,
            children: [
                {
                    key: 'doctors',
                    label: t(`Doctors`),
                    permission:'Doctor'
                },
                {
                    key: 'clinics',
                    label: t(`Clinics`),
                    permission:'Clinic'
                },
            ]
        },
        {
            key: 'appointments',
            icon: <DiffOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Appointments`),
        },
        {
            label: t(`Invoices`),
            icon: <DollarOutlined style={{color:'#ce4e99', fontSize:20}}  />,
            children: [
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoice-items',
                    label:  t(`Invoice Items`),
                    permission:'InvoiceItem'
                },
            ]
        },
        {
            label: t(`Marketing`),
            icon: <NotificationOutlined style={{color:'#ce4e99', fontSize:20}}  />,
            children: [
                {
                    icon:<PercentageOutlined style={{color:'#c98a1e', fontSize:20}} />,
                    key: 'offers',
                    label:  t(`Offers`),
                    permission:'Offer'
                },
                {
                    icon:<RedEnvelopeOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'coupons',
                    label:  t(`Coupons`),
                    permission:'Coupon'
                },
            ]
        },


        {
            key: 'clinics-owner',
            icon: <img alt={'icons'} src={dash3}/>,
            label: `Clinics owner`,

        },
        {
            key: 'patients',
            icon: <img alt={'icons'} src={dash3}/>,
            label: 'Doctor flow',
        },
        {
            key: 'clinic-manager',
            icon: <img alt={'icons'} src={dash3}/>,
            label: 'Clinic Manager',
        },
        {
            key: 'doctor-reworked',
            icon: <img alt={'icons'} src={dash3}/>,
            label: 'Doctor reworked',
        },
        {
            key: 'super-admin',
            icon: <img alt={'icons'} src={dash3}/>,
            label: 'Super admin',
        },
        /*{
            key: `/match-event-naturess`,
            label: t(`Reviews`),
            icon: <img alt={'icons'} src={dash5}/>,
        },*/
    ].map(handleFilterMenus).filter((e)=>e),[permissions]);


    const selectedItem = useMemo(()=>{
       return  items.find(e=>{
           if(pathname.includes(e.key)){
               return true
           }else{
               return e.children?.find(u=>pathname.includes(u.key));
           }

       })
    },[pathname])
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
        <div >
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
                defaultOpenKeys={[selectedItem?.key].filter(e=>e)}
                defaultSelectedKeys={[selectedItem?.children?.find(u=>pathname.includes(u.key))?.key].filter(e=>e)}
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
