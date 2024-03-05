import React, {useEffect, useMemo, useState} from "react";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import 'react-multi-carousel/lib/styles.css';
import {useSelector} from "react-redux";
import "../dist/styles/Styles.sass"
import 'draft-js/dist/Draft.css';
import DashboardMenu from "./Dashboard/DashboardMenu/DashboardMenu";
import DashboardHeader from "./Dashboard/DashboardHeader/DashboardHeader";
import DashboardRoutes from "./Dashboard/DashboardMenu/DashboardRoutes";


function AppLayout(){
    let redux = useSelector((state) => state);

    const [mouseCollapsed, setMauseCollapsed] = useState(true);
    const [btnCollapsed, setBtnCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setMauseCollapsed(true);
    };
    const toggleCollapsed1 = () => {
        setMauseCollapsed(false);
    };
    const fixCollapse = () => {
        setBtnCollapsed(!btnCollapsed)
    }


    const child = useMemo(() => <DashboardRoutes />, []);
    return <Layout className={'main-container'} >
            <div className={'side-menu'} >
                <Sider collapsed={mouseCollapsed} style={{position: 'fixed', height: "100%", zIndex: 999}}
                       onMouseEnter={toggleCollapsed1}
                       onMouseLeave={!btnCollapsed ? toggleCollapsed : toggleCollapsed1}
                       trigger={null} collapsible
                >
                    <DashboardMenu mode="inline" theme="dark" defaultSelectedKeys={['1']} mouseCollapsed={mouseCollapsed} fixCollapse={fixCollapse}/>
                </Sider>

            </div>
            <div className={'app-content'}>


            <div  style={redux.app.current_locale === 'en' ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>
                <DashboardHeader/>
            </div>

            <Content id={'layout-content'}  style={redux.app.current_locale === 'en' ? {marginLeft: btnCollapsed ? 130 : 0, height: '100%'}:{marginRight: btnCollapsed ? 130 : 0, height: '100%'}}>
                {child}

            </Content>

            </div>

    </Layout>

}
export default AppLayout
