import dash3 from "../../../dist/icons/frame3.svg";
import React from "react";
import dash1 from "../../../dist/icons/frame1.svg";
import dash4 from "../../../dist/icons/frame4.svg";
import dash2 from "../../../dist/icons/frame2.svg";
import {
    DiffOutlined,
    DollarOutlined,
    NotificationOutlined,
    PercentageOutlined,
    RedEnvelopeOutlined
} from "@ant-design/icons";
import {t} from "i18next";

export default {
    'clinic-manager':[
        {
            key: 'clinic-manager',
            icon: <img alt={'icons'} src={dash3}/>,
            label: 'Clinic Manager',
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
    ],
    default:[
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
        // {
        //     key: 'clinics',
        //     icon: <img alt={'Clinic_icon'} src={Clinic_icon}/>,
        //     label: `Clinics`,
        //
        // },


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
    ]
}