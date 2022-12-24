import React, {useState} from "react";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {useSelector} from "react-redux";
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
import Patient from "./Dashboard/Patient/Patient";
import LabPackages from "./Dashboard/LabPackages/LabPackages";
import LabPackage from "./Dashboard/LabPackages/LabPackage";
import LabTests from "./Dashboard/LabTests/LabTests";
import LabTest from "./Dashboard/LabTests/LabTest";
import InsuranceCompanies from "./Dashboard/InsuranceCompanies/InsuranceCompanies";
import InsuranceCompany from "./Dashboard/InsuranceCompanies/InsuranceCompany";
import BugReportTopics from "./Dashboard/BugReportTopics/BugReportTopics";
import BugReportTopic from "./Dashboard/BugReportTopics/BugReportTopic";
import PaymentMethods from "./Dashboard/PaymentMethods/PaymentMethods";



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
        {
            url:'lab-packages',
            resource:'LabPackage',
            singleComp:<LabPackage/>,
            indexComp:<LabPackages/>
        },
        {
            url:'lab-tests',
            resource:'LabTest',
            singleComp:<LabTest/>,
            indexComp:<LabTests/>
        },
        {
            url:'insurance-companies',
            resource:'InsuranceCompany',
            singleComp:<InsuranceCompany/>,
            indexComp:<InsuranceCompanies/>
        },
        {
            url:'taxonomies',
            resource:'Taxonomy',
            singleComp:<BugReportTopic/>,
            indexComp:<BugReportTopics/>
        },
        {
            url:'payment-methods',
            resource:'PaymentMethod',
           // singleComp:<BugReportTopic/>,
            indexComp:<PaymentMethods/>
        },

    ]
    return <Layout className={'main-container'}>

            <div className={'side-menu'}>
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
                <div className={'patient_content'}>


                </div>
                <Routes>
                    {resourceRoutes.map((item,key)=><Route path={item.url+'/*'} key={key} element={ <Routes>
                        <Route key={key+'_i21'} path={''} element={<AuthCheck permission={`${item.resource}:viewAny`}>{item.indexComp}</AuthCheck>}/>
                        <Route key={key+'_n312'} path={`new`} element={<AuthCheck permission={`${item.resource}:create`}>{item.singleComp}</AuthCheck>}/>
                        <Route key={key+'_u312'} path={`:id`} element={<AuthCheck permission={`${item.resource}:update`}>{item.singleComp}</AuthCheck>}/>
                    </Routes>}/>

                        )}

                    <Route path={'patients'} element={<Patient />}/>
                </Routes>
            </Content>
            <div style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>

            </div>
            </div>

    </Layout>

}
export default AppLayout
