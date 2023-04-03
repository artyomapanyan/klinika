import React from 'react'
import {Button, Col, Dropdown, Row, Space} from "antd";
import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";
import {DownOutlined, LeftOutlined} from "@ant-design/icons";
import {useLocation} from "react-router";
import {t} from "i18next";
import ClinicOwnerHeade from "../ClinicsOwner/Fragments/ClinicOwnerHeade";




function DashboardHeader() {
    const {pathname} = useLocation()

    const handleReturnHeaderPart = ()=>{
        switch (true){
            case pathname.includes('/clinics-owner'):
                return <ClinicOwnerHeade />
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
        <Col lg={10} md={24} style={{display:"flex", justifyContent:"flex-end", alignItems: "center", padding:'15px 40px'}} className={'lng_select'}>
            <HeaderAccount />

        </Col>
    </Row>
}

export default DashboardHeader
