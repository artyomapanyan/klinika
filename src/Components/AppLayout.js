import React, {useState} from "react";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import "../dist/styles/Styles.sass"
import DashboardMenu from "./Dashboard/DashboardMenu/DashboardMenu";
import DashboardHeader from "./Dashboard/DashboardHeader/DashboardHeader";
import {Route, Routes} from "react-router";
import Countries from "./Dashboard/Countries/Countries";
import Country from "./Dashboard/Countries/Country/Country";
import AuthCheck from "./Fragments/AuthCheck";
import Regions from "./Dashboard/Areas/Regions";
import Region from "./Dashboard/Areas/Region";
import Cities from "./Dashboard/Cities/Cities";
import City from "./Dashboard/Cities/City";
import Categories from "./Dashboard/Categories/Categories";
import Category from "./Dashboard/Categories/Category";
import SubCategories from "./Dashboard/SubCategories/SubCategories";
import SubCategory from "./Dashboard/SubCategories/SubCategory";
import Services from "./Dashboard/Services/Services";
import Service from "./Dashboard/Services/Service";
import SubServices from "./Dashboard/SubServices/SubServices";
import SubService from "./Dashboard/SubServices/SubService";
import NursingTasks from "./Dashboard/NursingTasks/NursingTasks";
import NursingTask from "./Dashboard/NursingTasks/NursingTask";



function AppLayout(){
    let redux = useSelector((state) => state);
    let dispatch = useDispatch()

    const {t} = useTranslation()

    const [mouseCollapsed, setMauseCollapsed] = useState(true);
    const [btnCollapsed, setBtnCollapsed] = useState(false);
    const ltrToRtl = () => {
        dispatch({
            type: 'GLOBAL_STATE',
            payload: !redux.globalState,
        })
    }
    const toggleCollapsed = () => {
        setMauseCollapsed(true);
    };
    const toggleCollapsed1 = () => {
        setMauseCollapsed(false);
    };
    const fixCollapse = () => {
        setBtnCollapsed(!btnCollapsed)
    }
    const resourceRoutes =[
        {
            url:'countries',
            resource:'Country',
            singleComp:<Country/>,
            indexComp:<Countries/>
        },
        {
            url:'regions',
            resource:'Region',
            singleComp:<Region/>,
            indexComp:<Regions/>
        },
        {
            url:'cities',
            resource:'City',
            singleComp:<City/>,
            indexComp:<Cities/>
        },
        {
            url:'categories',
            resource:'Category',
            singleComp:<Category/>,
            indexComp:<Categories/>
        },
        {
            url:'sub-categories',
            resource:'SubCategory',
            singleComp:<SubCategory/>,
            indexComp:<SubCategories/>
        },
        {
            url:'services',
            resource:'Service',
            singleComp:<Service/>,
            indexComp:<Services/>
        },
        {
            url:'sub-services',
            resource:'SubService',
            singleComp:<SubService/>,
            indexComp:<SubServices/>
        },
        {
            url:'nursing-tasks',
            resource:'NursingTask',
            singleComp:<NursingTask/>,
            indexComp:<NursingTasks/>
        },

    ]
    return <Layout className={'main-container'}>

            <div  style={{position: "relative", width: 80, zIndex: 99}}>
                <Sider collapsed={mouseCollapsed} style={{position: 'fixed', height: "100%"}}
                       onMouseEnter={toggleCollapsed1}
                       onMouseLeave={!btnCollapsed ? toggleCollapsed : toggleCollapsed1}>
                    <DashboardMenu mouseCollapsed={mouseCollapsed} fixCollapse={fixCollapse}/>
                </Sider>

            </div>
            <div className={'app-content'}>


            <div  style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>
                <DashboardHeader/>

            </div>
            <Content  style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>
                <Routes>
                    {resourceRoutes.map((item,key)=><>
                        <Route key={key+'_i'} path={item.url} element={<AuthCheck permission={`${item.resource}:viewAny`}>{item.indexComp}</AuthCheck>}/>
                        <Route key={key+'_n'} path={`${item.url}/new`} element={<AuthCheck permission={`${item.resource}:create`}>{item.singleComp}</AuthCheck>}/>
                        <Route key={key+'_u'} path={`${item.url}/:id`} element={<AuthCheck permission={`${item.resource}:update`}>{item.singleComp}</AuthCheck>}/>
                        </>)}

                    <Route path={'valod'} element={<div>valod</div>}/>

                </Routes>
            </Content>
            <div style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>

            </div>
            </div>

    </Layout>

}
export default AppLayout
