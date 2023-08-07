import React from 'react'
import {Col, Row} from "antd";
import PatientCardMedications from "./OverviewItems/PatientCardMedications";
import PatientCardRiskFactors from "./OverviewItems/PatientCardRiskFactors";
import PatientCardAllergy from "./OverviewItems/PatientCardAllergy";
import PatientCardChronicDiseases from "./OverviewItems/PatientCardChronicDiseases";
import PatientCardRight from "./OverviewItems/PatientCardRight";
import PatientCardChart from "../../../Fragments/Charts/PatientCardChart";
function PatientOverviewTab(){
    return <Row gutter={[16,16]}>
        <Col lg={16}>
            <div style={{display:"flex", gap: 24, padding: 24}}>
                <PatientCardMedications/>
                <PatientCardRiskFactors/>
            </div>
            <div style={{display:"flex", gap: 24, padding: 24}}>
                <PatientCardAllergy/>
                <PatientCardChronicDiseases/>
            </div>
            {/*<div style={{padding: 24}}>*/}
            {/*    <PatientCardChart />*/}
            {/*</div>*/}

        </Col>
        <Col lg={8}>
            <PatientCardRight/>
        </Col>

    </Row>
}
export default PatientOverviewTab