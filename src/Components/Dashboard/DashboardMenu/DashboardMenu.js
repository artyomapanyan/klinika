import React, {useMemo} from 'react';
import logo from "../../../dist/Img/logo.svg";
import logoShort from "../../../dist/Img/Logo-short.svg";
import {Button, Divider, Menu} from "antd";
import {
    MenuOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router";
import {useSelector} from "react-redux";
import Menulist from "./Menulist";

function DashboardMenu({mouseCollapsed,fixCollapse}){
    const navigate = useNavigate();
    let {pathname} = useLocation();
    const permissions = useSelector(state=>state.auth.user.permissions);
    const selected_role = useSelector(state=>state.auth.selected_role);
    const handleFilterMenus = (item)=>{
        if(item.children){
            item.children = item.children.map(handleFilterMenus).filter(e=>e)
            return item
        }else if(item.permission){
            return permissions.includes(item.permission+':viewAny')?item:false
        }
        return item
    }
    const items = useMemo(()=>{
        return (Menulist[selected_role.key]??Menulist.default).map(handleFilterMenus).filter((e)=>e)
    },[permissions,selected_role]);


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
