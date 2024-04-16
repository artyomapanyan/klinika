import React from 'react';
import Country from "../Countries/Country/Country";
import Countries from "../Countries/Countries";
import Region from "../Areas/Region";
import Regions from "../Areas/Regions";
import City from "../Cities/City";
import Cities from "../Cities/Cities";
import Category from "../Categories/Category";
import Categories from "../Categories/Categories";
import SubCategory from "../SubCategories/SubCategory";
import SubCategories from "../SubCategories/SubCategories";
import Service from "../Services/Service";
import Services from "../Services/Services";
import SubService from "../SubServices/SubService";
import SubServices from "../SubServices/SubServices";
import NursingTask from "../NursingTasks/NursingTask";
import NursingTasks from "../NursingTasks/NursingTasks";
import LabPackage from "../LabPackages/LabPackage";
import LabPackages from "../LabPackages/LabPackages";
import LabTest from "../LabTests/LabTest";
import LabTests from "../LabTests/LabTests";
import InsuranceCompany from "../InsuranceCompanies/InsuranceCompany";
import InsuranceCompanies from "../InsuranceCompanies/InsuranceCompanies";
import BugReportTopic from "../BugReportTopics/BugReportTopic";
import BugReportTopics from "../BugReportTopics/BugReportTopics";
import PaymentMethod from "../PaymentMethods/PaymentMethod";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import Role from "../User/Roles/Role";
import Roles from "../User/Roles/Roles";
import Specialty from "../Specialties/Specialty";
import Specialties from "../Specialties/Specialties";
import SubSpecialty from "../SubSpecialties/SubSpecialty";
import SubSpecialties from "../SubSpecialties/SubSpecialties";
import Doctor from "../Doctors/Doctor";
import Doctors from "../Doctors/Doctors";
import DoctorShow from "../Doctors/DoctorShow";
import User from "../User/Users/User";
import Users from "../User/Users/Users";
import Post from "../Posts/Post";
import Posts from "../Posts/Posts";
import Translations from "../Translations/Translations";
import Preferences from "../Preferences/Preferences";
import Clinic from "../Clinics/Clinic";
import Clinics from "../Clinics/Clinics";
import ShowClinic from "../Clinics/Fragments/ShowClinic/ShowClinic";
import Offer from "../Offers/Offer";
import Offers from "../Offers/Offers";
import Coupon from "../Coupons/Coupon";
import Coupons from "../Coupons/Coupons";
import Laboratory from "../Laboratory/Laboratory";
import LabPackageCategory from "../LabPackagesCategory/LabPackageCategory";
import LabPackagesCategories from "../LabPackagesCategory/LabPackagesCategories";
import LabTestCategory from "../LabTestCategories/LabTestCategory";
import LabTestCategories from "../LabTestCategories/LabTestCategories";
import Appointment from "../Appointments/Appointment";
import Appointments from "../Appointments/Appointments";
import ShowAppointment from "../Appointments/Fragments/ShowAppointment";
import InvoiceItem from "../Invoices/InvoiceItems/InvoiceItem";
import InvoiceItems from "../Invoices/InvoiceItems/InvoiceItems";
import ShowInvoiceItems from "../Invoices/InvoiceItems/ShowInvoiceItems";
import Invoice from "../Invoices/Invoices/Invoice";
import Invoices from "../Invoices/Invoices/Invoices";
import Reports from "../Reports/Reports";
import Patients from "../Patients/Patients";
import ShowPatient from "../Patients/ShowPatient";
import {Route, Routes} from "react-router";
import AuthCheck from "../../Fragments/AuthCheck";
import ClinicDoctorUpdate from "../Clinics/Fragments/ManageDoctors/ClinicDoctorUpdate/ClinicDoctorUpdate";
import Report from "../Reports/Report";
import Patient from "../Patient/Patient";
import ClinicsOwner from "../ClinicsOwner/ClinicsOwner";
import ClinicManager from "../ClinicManager/ClinicManager";
import DoctorReworked from "../DoctorReworked/DoctorReworked";
import SuperAdmin from "../SuperAdmin/SuperAdmin";
import UpdateSelf from "../../Auth/UpdateSelf";
import AllNotifications from "../AllNotifications/AllNotifications";
import DoctorProfile from "../DoctorProfile/DoctorProfile";
import RadiologyTask from '../RadiologyTasks/RadiologyTask'
import RadiologyTasks from '../RadiologyTasks/RadiologyTasks'

function DashboardRoutes(){
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
            url:'radiology-tasks',
            resource:'RadiologyTask',
            singleComp:<RadiologyTask/>,
            indexComp:<RadiologyTasks/>
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
            indexComp:<Doctors/>,
            showComp:<DoctorShow/>
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
            indexComp:<Clinics/>,
            showComp:<ShowClinic/>
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
        {
            url:'taxonomies',
            resource:'Taxonomy',
            indexComp:<Laboratory/>
        },
        {
            url:'lab-packages-category',
            resource:'Taxonomy',
            singleComp:<LabPackageCategory/>,
            indexComp:<LabPackagesCategories/>
        },
        {
            url:'lab-tests-category',
            resource:'Taxonomy',
            singleComp:<LabTestCategory/>,
            indexComp:<LabTestCategories/>
        },
        {
            url:'appointments',
            resource:'Appointment',
            singleComp:<Appointment/>,
            indexComp:<Appointments/>,
            showComp:<ShowAppointment/>
        },
        {
            url:'invoice-items',
            resource:'InvoiceItem',
            singleComp:<InvoiceItem/>,
            indexComp:<InvoiceItems/>,
            showComp:<ShowInvoiceItems/>
        },
        {
            url:'invoices',
            resource:'Invoice',
            singleComp:<Invoice/>,
            indexComp:<Invoices/>
        },
        {
            url:'reports',
            resource:'Report',
            //singleComp:<Report/>,
            indexComp:<Reports/>
        },
        {
            url:'users/patient-list',
            resource:'Patient',
            singleComp:<Appointment isPatient={true}/>,
            indexComp:<Patients/>,
            showComp:<ShowPatient/>
        },






    ]
    return <Routes>
        {resourceRoutes.map((item,key)=><Route path={item.url+'/*'} key={key} element={ <Routes>
                {item.indexComp&&<Route key={key+'_i'} path={''} element={<AuthCheck permission={`${item.resource}:viewAny`}>{item.indexComp}</AuthCheck>}/>}
                {item.singleComp&&<Route key={key+'_n'} path={`new`} element={<AuthCheck permission={`${item.resource}:create`}>{item.singleComp}</AuthCheck>}/>}
                {item.singleComp&& <Route key={key+'_u'} path={`:id`} element={<AuthCheck permission={`${item.resource}:update`}>{item.singleComp}</AuthCheck>}/>}
                {item.showComp&& <Route key={key+'_e'} path={`:id/show`} element={<AuthCheck >{item.showComp}</AuthCheck>}/>}
            </Routes>}/>

        )}

        {/*<Route path={'owner-clinics'} element={<OwnerClinics />}/>*/}
        <Route path={'clinics/doctors/:id'} element={<ClinicDoctorUpdate />}/>
        <Route path={'Reports/new'} element={<Report />}/>

        <Route path={'appointments/:id/doctor'} element={<AuthCheck permission={'Patient:viewPatientCard'}> <Patient /></AuthCheck>}/>
        <Route path={'clinics-owner'} element={<AuthCheck roleKey={'clinic-owner'} ><ClinicsOwner /></AuthCheck>}/>
        <Route path={'clinic-manager'} element={<AuthCheck roleKey={'clinic-manager'} ><ClinicManager /></AuthCheck>}/>
        <Route path={'receptionist'} element={<AuthCheck roleKey={'receptionist'} ><ClinicManager /></AuthCheck>}/>
        <Route path={'doctor-reworked'} element={<AuthCheck roleKey={'doctor'} ><DoctorReworked /></AuthCheck>}/>
        <Route path={'super-admin'} element={<AuthCheck roleKey={'super' || 'super-admin'} ><SuperAdmin /></AuthCheck>}/>
        <Route path={'admin'} element={<AuthCheck roleKey={'admin'} ><SuperAdmin /></AuthCheck>}/>
        <Route path={'users/update-self'} element={<UpdateSelf/>}></Route>
        <Route path={'notifications'} element={<AllNotifications/>}></Route>
        <Route path={'profile'} element={<DoctorProfile/>}></Route>
        <Route path={'users/patient-list'} element={<Patients/>}></Route>




    </Routes>
}
export default DashboardRoutes;