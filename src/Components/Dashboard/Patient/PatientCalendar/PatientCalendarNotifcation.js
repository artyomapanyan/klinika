
import React from 'react';
import {Col, Row} from "antd";
import PatientCalendar from "./PatientCalendar";
import PatientNotifcation from "./PatientNotifcation";

function PatientCalendarNotifcation() {
    return(
        <div style={{margin:'0 20px'}} className={'clinics_owner'}>
            <Row gutter={24}>
                <Col lg={18} >
                    <PatientCalendar />
                </Col>
                <Col lg={6}>
                    <PatientNotifcation />
                </Col>
            </Row>
        </div>
    )
}

export default PatientCalendarNotifcation;