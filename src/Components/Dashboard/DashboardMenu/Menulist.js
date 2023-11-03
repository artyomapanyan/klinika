import dash3 from "../../../dist/icons/frame3.svg";
import React from "react";
import dash1 from "../../../dist/icons/frame1.svg";
import dash4 from "../../../dist/icons/frame4.svg";
import dash2 from "../../../dist/icons/frame2.svg";
import invoices_icon from "../../../dist/icons/invoices_icon.png";
import clinic_icon from "../../../dist/icons/clinic_icon.png";
import {
    BellOutlined,
    BugFilled,
    DiffOutlined,
    DollarOutlined, NotificationOutlined,
    PercentageOutlined, ProfileOutlined,
    RedEnvelopeOutlined, UserOutlined
} from "@ant-design/icons";
import {t} from "i18next";
import PermCheck from "../../Fragments/PermCheck";

export default {
    'clinic-manager':[
        {
            key: 'clinic-manager',
            icon: <img alt={'icons'} src={dash1}/>,
            label: t(`Dashboard`),
        },
        {
            icon:<img alt={'clinic_icon'} src={clinic_icon}/>,
            key: 'clinics',
            label: t(`Clinics`),
            permission:'Clinic'
        },
        {
            key: 'appointments',
            icon: <DiffOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Appointments`),
        },
        {
            icon:<img alt={'invoices_icon'} src={invoices_icon}/>,
            key: 'invoices',
            label:  t(`Invoices`),
            permission:'Invoice'
        },
        {
            icon:<img alt={'icons'} src={dash3}/>,
            key: 'offers',
            label:  t(`Offers`),
            permission:'Offer'
        },
        {
            icon:<BugFilled style={{color:'#ce4e99', fontSize:20}}/>,
            key: 'reports/new',
            label: t(`Requests`),
            permission:'Report'
        },
        {
            icon:<img alt={'icons'} src={dash4}/>,
            key: 'users/patient-list',
            label: t(`Patients`),
            permission:'Patient'
        },
    ],
    'clinic-owner': [
        {
            key: 'clinics-owner',
            icon: <img alt={'icons'} src={dash1}/>,
            label: t(`Dashboard`),

        },
        {
            icon:<img alt={'clinic_icon'} src={clinic_icon}/>,
            key: 'clinics',
            label: t(`Clinics`),
            permission:'Clinic'
        },
        {
            key: 'appointments',
            icon: <DiffOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Appointments`),
        },
        {
            icon:<img alt={'invoices_icon'} src={invoices_icon}/>,
            key: 'invoices',
            label:  t(`Invoices`),
            permission:'Invoice'
        },
        {
            icon:<img alt={'icons'} src={dash3}/>,
            key: 'offers',
            label:  t(`Offers`),
            permission:'Offer'
        },
        {
            icon:<BugFilled style={{color:'#ce4e99', fontSize:20}}/>,
            key: 'reports/new',
            label: t(`Requests`),
            permission:'Report'
        },
        {
            icon:<img alt={'icons'} src={dash4}/>,
            key: 'users/patient-list',
            label: t(`Patients`),
            permission:'Patient'
        },
        // {
        //     icon:<img alt={'icons'} src={dash4}/>,
        //     key: 'users',
        //     label: t(`Users`),
        //     permission:'User'
        // },
    ],
    'doctor': [
        {
            key: 'doctor-reworked',
            icon: <img alt={'icons'} src={dash1}/>,
            label: t(`Dashboard`),

        },
        {
            icon:<img alt={'clinic_icon'} src={clinic_icon}/>,
            key: 'clinics',
            label: t(`Clinics`),
            permission:'Clinic'
        },
        {
            key: 'appointments',
            icon: <DiffOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Appointments`),
        },

        {
            icon:<img alt={'icons'} src={dash3}/>,
            key: 'offers',
            label:  t(`Offers`),
            permission:'Offer'
        },
        {
            icon:<BugFilled style={{color:'#ce4e99', fontSize:20}}/>,
            key: 'reports/new',
            label: t(`Requests`),
            permission:'Report'
        },
        {
            key: 'profile',
            icon: <UserOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`My profile`),
        },
        {
            key: 'notifications',
            icon: <BellOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Notifications`),
        },
        {
            icon:<img alt={'icons'} src={dash4}/>,
            key: 'users/patient-list',
            label: t(`Patients`),
            permission:'Patient'
        },
    ],
    'super': [
        {
            key: 'super-admin',
            icon: <img alt={'icons'} src={dash1}/>,
            label: t('Dashboard'),
        },
        {
            label: t(`Inputs`),
            icon: <ProfileOutlined style={{color:'#ce4e99', fontSize:20}} />,
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
                    label: t(`Report topics`),
                    permission:'Taxonomy'
                },
                {
                    key: 'reports',
                    label: t(`Reports`),
                    permission:'Report'
                },
                {
                    key: 'reports/new',
                    label: t(`Requests`),
                    permission:'Report'
                },
                {
                    key: 'payment-methods',
                    label: t(`Payment methods`),
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
                    label: t('Posts'),
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
            label: t(`Invoices`),
            icon: <DollarOutlined style={{color:'#ce4e99', fontSize:20}}  />,
            children: [
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoice-items',
                    label:  t(`Invoice Items`),
                    permission:'InvoiceItem'
                },
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoices',
                    label:  t(`Invoices`),
                    permission:'Invoice'
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
            key: 'appointments',
            icon: <DiffOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Appointments`),
        },
        {
            key: 'notifications',
            icon: <BellOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Notifications`),
        },


    ],
    'super-admin': [
        {
            key: 'super-admin',
            icon: <img alt={'icons'} src={dash1}/>,
            label: 'Dashboard',
        },
        {
            label: t(`Inputs`),
            icon: <ProfileOutlined style={{color:'#ce4e99', fontSize:20}} />,
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
                    label: t(`Report topics`),
                    permission:'Taxonomy'
                },
                {
                    key: 'reports',
                    label: t(`Reports`),
                    permission:'Report'
                },
                {
                    key: 'reports/new',
                    label: t(`Requests`),
                    permission:'Report'
                },
                {
                    key: 'payment-methods',
                    label: t(`Payment methods`),
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
            label: t(`Invoices`),
            icon: <DollarOutlined style={{color:'#ce4e99', fontSize:20}}  />,
            children: [
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoice-items',
                    label:  t(`Invoice Items`),
                    permission:'InvoiceItem'
                },
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoices',
                    label:  t(`Invoices`),
                    permission:'Invoice'
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
            key: 'appointments',
            icon: <DiffOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Appointments`),
        },
        {
            key: 'notifications',
            icon: <BellOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Notifications`),
        },


    ],

    'admin': [
        {
            key: 'admin',
            icon: <img alt={'icons'} src={dash1}/>,
            label: 'Dashboard',
        },
        {
            label: t(`Inputs`),
            icon: <ProfileOutlined style={{color:'#ce4e99', fontSize:20}} />,
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
                    label: t(`Report topics`),
                    permission:'Taxonomy'
                },
                {
                    key: 'reports',
                    label: t(`Reports`),
                    permission:'Report'
                },
                {
                    key: 'reports/new',
                    label: t(`Requests`),
                    permission:'Report'
                },
                {
                    key: 'payment-methods',
                    label: t(`Payment methods`),
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
            label: t(`Invoices`),
            icon: <DollarOutlined style={{color:'#ce4e99', fontSize:20}}  />,
            children: [
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoice-items',
                    label:  t(`Invoice Items`),
                    permission:'InvoiceItem'
                },
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoices',
                    label:  t(`Invoices`),
                    permission:'Invoice'
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
            key: 'appointments',
            icon: <DiffOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Appointments`),
        },
        {
            key: 'notifications',
            icon: <BellOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Notifications`),
        },


    ],

    'receptionist': [

        {
            key: 'receptionist',
            icon: <img alt={'icons'} src={dash1}/>,
            label: t(`Dashboard`),
        },
        {
            icon:<DollarOutlined style={{color:'#ce4e99', fontSize:20}}/>,
            key: 'invoices',
            label:  t(`Invoices`),
            permission:'Invoice'
        },

    ],









    default:[
        // {
        //     key: 'super-admin',
        //     icon: <img alt={'icons'} src={dash1}/>,
        //     label: t('Dashboard'),
        //     permission:'Dashboard-super',
        //     customPerm:'DashboardSuper'
        // },
        // {
        //     key: 'clinic-manager',
        //     icon: <img alt={'icons'} src={dash1}/>,
        //     label: t(`Dashboard`),
        //     customPerm:'DashboardManager'
        // },
        // {
        //     key: 'doctor-reworked',
        //     icon: <img alt={'icons'} src={dash1}/>,
        //     label: t(`Dashboard`),
        //     customPerm:'DashboardDoctor'
        //
        // },
        {
            label: t(`Inputs`),
            icon: <ProfileOutlined style={{color:'#ce4e99', fontSize:20}} />,
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
                    label: t(`Report topics`),
                    permission:'Taxonomy'
                },
                {
                    key: 'reports',
                    label: t(`Reports`),
                    permission:'Report'
                },
                {
                    key: 'reports/new',
                    label: t(`Requests`),
                    permission:'Report'
                },
                {
                    key: 'payment-methods',
                    label: t(`Payment methods`),
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
                    label: t('Posts'),
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
            label: t(`Invoices`),
            icon: <DollarOutlined style={{color:'#ce4e99', fontSize:20}}  />,
            children: [
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoice-items',
                    label:  t(`Invoice Items`),
                    permission:'InvoiceItem'
                },
                {
                    icon:<DollarOutlined style={{color:'#c98a1e', fontSize:20}}/>,
                    key: 'invoices',
                    label:  t(`Invoices`),
                    permission:'Invoice'
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
            key: 'appointments',
            icon: <DiffOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Appointments`),
        },
        {
            key: 'notifications',
            icon: <BellOutlined style={{color:'#ce4e99', fontSize:20}} />,
            label: t(`Notifications`),
        },



        // {
        //     key: 'clinics',
        //     icon: <img alt={'Clinic_icon'} src={Clinic_icon}/>,
        //     label: `Clinics`,
        //
        // },


        // {
        //     key: 'clinics-owner',
        //     icon: <img alt={'icons'} src={dash3}/>,
        //     label: `Clinics owner`,
        //
        // },
        // {
        //     key: 'doctor-flow',
        //     icon: <img alt={'icons'} src={dash3}/>,
        //     label: t('Doctor flow'),
        // },
        // {
        //     key: 'clinic-manager',
        //     icon: <img alt={'icons'} src={dash3}/>,
        //     label: t('Clinic Manager'),
        // },
        // {
        //     key: 'doctor-reworked',
        //     icon: <img alt={'icons'} src={dash3}/>,
        //     label: t('Doctor reworked'),
        // },
        // {
        //     key: 'admin',
        //     icon: <img alt={'icons'} src={dash3}/>,
        //     label: t('Super admin'),
        // },
        /*{
            key: `/match-event-naturess`,
            label: t(`Reviews`),
            icon: <img alt={'icons'} src={dash5}/>,
        },*/
    ]
}