import React from 'react'
import {Col, Row} from "antd";
import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";




function DashboardHeader() {


    return <Row>
        <Col lg={14}>
        </Col>
        <Col lg={10} style={{display:"flex", justifyContent:"flex-end", alignItems: "center", padding:'15px 40px'}} className={'lng_select'}>
            <HeaderAccount />

        </Col>
    </Row>
}

export default DashboardHeader
