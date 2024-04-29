import React, {useState} from 'react'
import {Button, Col, Row} from "antd";
import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";
import {LeftOutlined} from "@ant-design/icons";
import {useLocation} from "react-router";
import ClinicOwnerHeader from "../ClinicsOwner/Fragments/ClinicOwnerHeader";
import {t} from "i18next";
import {useSelector} from "react-redux";


function DashboardHeader() {
    let role = useSelector((state) => state?.auth?.selected_role?.key);
    const {pathname} = useLocation()
    const [loading,setLoading] = useState(false);



    const handleReturnHeaderPart = ()=>{
        switch (true){
            case pathname.includes('/clinics-owner'):
                return <ClinicOwnerHeader />
            case pathname.includes('/doctor-reworked'):
            case pathname.includes('/clinic-manager'):
            case pathname.includes('/admin'):
            case pathname.includes('/super-admin'):
                return <ClinicOwnerHeader noClinicSelect={true} />
            case pathname.includes('/invoices/'):
                return <div></div>
            case pathname.includes('/invoices'):
                return role === 'receptionist' ? <ClinicOwnerHeader noClinicSelect={true}/> : <ClinicOwnerHeader />
            case pathname.includes('/patients'):
                return   <div>
                    <Button style={{margin:"40px 24px", height:48, width:48, border: 'none', borderRadius: 12}}><LeftOutlined /></Button>
                    <span style={{fontSize:24, fontWeight:700, fontFamily: "Inter"}}>{t('Patient Card')}</span>
                </div>
            case pathname.includes('/receptionist'):
                return <div style={{ margin: '40px 24px', fontSize: 40, fontWeight: 400 }}>{t('Dashboard')}</div>
            default:

                return null
        }


    }


    return <Row>
        <Col lg={18} md={24}>
            {loading?null:handleReturnHeaderPart()}
        </Col>
        <Col lg={6} md={24}  className={'lng_select'}>
            {pathname==='clinics'  ? <div></div> : <HeaderAccount />}
        </Col>
    </Row>
}

export default DashboardHeader
