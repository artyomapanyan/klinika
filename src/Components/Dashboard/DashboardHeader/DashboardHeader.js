import React from 'react'
import {Col, Row} from "antd";
import "../../../dist/styles/Styles.sass"
import HeaderAccount from "./Fragment/HeaderAccount";




function DashboardHeader() {


    return <Row>
        <Col lg={14}>
        </Col>
        <Col lg={10} style={{display:"flex", justifyContent:"flex-end", alignItems: "center", paddingRight:40, paddingLeft:40}} className={'lng_select'}>
            <HeaderAccount />

        </Col>
    </Row>
}

export default DashboardHeader
