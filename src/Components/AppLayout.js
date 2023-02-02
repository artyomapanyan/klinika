import React, {useState} from "react";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import 'react-multi-carousel/lib/styles.css';
import {useSelector} from "react-redux";
import "../dist/styles/Styles.sass"
import 'draft-js/dist/Draft.css';
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
import PaymentMethod from "./Dashboard/PaymentMethods/PaymentMethod";
import Roles from "./Dashboard/User/Roles/Roles";
import Role from "./Dashboard/User/Roles/Role";
import Specialties from "./Dashboard/Specialties/Specialties";
import Specialty from "./Dashboard/Specialties/Specialty";
import SubSpecialties from "./Dashboard/SubSpecialties/SubSpecialties";
import SubSpecialty from "./Dashboard/SubSpecialties/SubSpecialty";
import Doctors from "./Dashboard/Doctors/Doctors";
import Doctor from "./Dashboard/Doctors/Doctor";
import Users from "./Dashboard/User/Users/Users";
import User from "./Dashboard/User/Users/User";
import Posts from "./Dashboard/Posts/Posts";
import Post from "./Dashboard/Posts/Post";
import ClinicsOwner from "./Dashboard/ClinicsOwner/ClinicsOwner";
import Translations from "./Dashboard/Translations/Translations";
import Preferences from "./Dashboard/Preferences/Preferences";
import ClinicManager from "./Dashboard/ClinicManager/ClinicManager";
import Clinics from "./Dashboard/Clinics/Clinics";
import Clinic from "./Dashboard/Clinics/Clinic";
import Offers from "./Dashboard/Offers/Offers";
import Offer from "./Dashboard/Offers/Offer";
import Coupons from "./Dashboard/Coupons/Coupons";
import Coupon from "./Dashboard/Coupons/Coupon";
import DoctorReworked from "./Dashboard/DoctorReworked/DoctorReworked";
import SuperAdmin from "./Dashboard/SuperAdmin/SuperAdmin";


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
            url:'bug-reports',
            resource:'Taxonomy',
            singleComp:<BugReportTopic/>,
            indexComp:<BugReportTopics/>
        },
        {
            url:'payment-methods',
            resource:'PaymentMethod',
            singleComp:<PaymentMethod/>,
            indexComp:<PaymentMethods/>
        },
        {
            url:'roles',
            resource:'Role',
            singleComp:<Role/>,
            indexComp:<Roles/>
        },
        {
            url:'specialties',
            resource:'Taxonomy',
            singleComp:<Specialty/>,
            indexComp:<Specialties/>
        },
        {
            url:'sub-specialties',
            resource:'Taxonomy',
            singleComp:<SubSpecialty/>,
            indexComp:<SubSpecialties/>
        },
        {
            url:'doctors',
            resource:'Doctor',
            singleComp:<Doctor/>,
            indexComp:<Doctors/>
        },
        {
            url:'users',
            resource:'User',
            singleComp:<User/>,
            indexComp:<Users/>
        },
        {
            url:'posts',
            resource:'Post',
            singleComp:<Post/>,
            indexComp:<Posts/>
        },
        {
            url:'translations',
            resource:'Translation',
            singleComp:null,
            indexComp:<Translations/>
        },
        {
            url:'preferences',
            resource:'Preference',
            singleComp:null,
            indexComp:<Preferences/>
        },
        {
            url:'clinics',
            resource:'Clinic',
            singleComp:<Clinic/>,
            indexComp:<Clinics/>
        },
        {
            url:'offers',
            resource:'Offer',
            singleComp:<Offer/>,
            indexComp:<Offers/>
        },
        {
            url:'coupons',
            resource:'Coupon',
            singleComp:<Coupon/>,
            indexComp:<Coupons/>
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
            <Content id={'layout-content'}  style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>

                <Routes>
                    {resourceRoutes.map((item,key)=><Route path={item.url+'/*'} key={key} element={ <Routes>
                        {item.indexComp&&<Route key={key+'_i'} path={''} element={<AuthCheck permission={`${item.resource}:viewAny`}>{item.indexComp}</AuthCheck>}/>}
                        {item.singleComp&&<Route key={key+'_n'} path={`new`} element={<AuthCheck permission={`${item.resource}:create`}>{item.singleComp}</AuthCheck>}/>}
                        {item.singleComp&& <Route key={key+'_u'} path={`:id`} element={<AuthCheck permission={`${item.resource}:update`}>{item.singleComp}</AuthCheck>}/>}
                    </Routes>}/>

                        )}

                    <Route path={'patients'} element={<Patient />}/>
                    <Route path={'clinics-owner'} element={<ClinicsOwner />}/>
                    <Route path={'clinic-manager'} element={<ClinicManager />}/>
                    <Route path={'doctor-reworked'} element={<DoctorReworked />}/>
                    <Route path={'super-admin'} element={<SuperAdmin />}/>

                </Routes>
            </Content>
                {/*<AppointmentStats/>*/}
            <div style={!redux.globalState ?{marginLeft: btnCollapsed ? 130 : 0}:{marginRight: btnCollapsed ? 130 : 0}}>

            </div>
            </div>

    </Layout>

}
export default AppLayout
