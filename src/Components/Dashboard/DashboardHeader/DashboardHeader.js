import React, {useState} from 'react'
import {Button, Col, Row} from "antd";
import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";
import {LeftOutlined} from "@ant-design/icons";
import {useLocation} from "react-router";
import ClinicOwnerHeader from "../ClinicsOwner/Fragments/ClinicOwnerHeader";


function DashboardHeader() {
    const {pathname} = useLocation()
    const [loading,setLoading] = useState(false);



    const handleReturnHeaderPart = ()=>{
        switch (true){
            case pathname.includes('/clinics-owner'):
                return <ClinicOwnerHeader />
            case pathname.includes('/doctor-reworked'):
            case pathname.includes('/clinic-manager'):
            case pathname.includes('/admin'):
                return <ClinicOwnerHeader noClinicSelect={true} />
            case pathname.includes('/patients'):
                return   <div>
                    <Button style={{margin:"40px 24px", height:45, width:45}}><LeftOutlined /></Button>
                    <span style={{fontSize:24, fontWeight:700}}>Patient Card</span>
                </div>
            default:

                return null
        }


    }


    return <Row>
        <Col lg={14} md={24}>
            {loading?null:handleReturnHeaderPart()}
        </Col>
        <Col lg={10} md={24} style={{display:"flex", justifyContent:"flex-end", alignItems: "center", padding:pathname==='clinics' ? 0 :'15px 36px'}} className={'lng_select'}>
            {pathname==='clinics'  ? <div></div> : <HeaderAccount />}
        </Col>
    </Row>
}

export default DashboardHeader
