import React from 'react'
import {Button, Col, Dropdown, Row, Space} from "antd";
import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";
import {DownOutlined, LeftOutlined} from "@ant-design/icons";
import {useLocation} from "react-router";
import {t} from "i18next";
import ClinicOwnerHeader from "../ClinicsOwner/Fragments/ClinicOwnerHeader";




function DashboardHeader() {
    const {pathname} = useLocation()

    const handleReturnHeaderPart = ()=>{
        switch (true){
            case pathname.includes('/clinics-owner'):
                return <ClinicOwnerHeader />
            case pathname.includes('/clinic-manager'):
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
            {handleReturnHeaderPart()}
        </Col>
        <Col lg={10} md={24} style={{display:"flex", justifyContent:"flex-end", alignItems: "center", padding:pathname.includes('clinics') ? 0 :'15px 36px'}} className={'lng_select'}>
            {pathname.includes('clinics')  ? <div></div> : <HeaderAccount />}
        </Col>
    </Row>
}

export default DashboardHeader
