import React, {useEffect, useState} from 'react'
import {Col, Row} from "antd";
import PatientCardMedications from "./OverviewItems/PatientCardMedications";
import PatientCardRiskFactors from "./OverviewItems/PatientCardRiskFactors";
import PatientCardAllergy from "./OverviewItems/PatientCardAllergy";
import PatientCardChronicDiseases from "./OverviewItems/PatientCardChronicDiseases";
import PatientCardRight from "./OverviewItems/PatientCardRight";
import PatientCardChart from "../../../Fragments/Charts/PatientCardChart";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
function PatientOverviewTab({tab = {tab}, id, patientId, dataClinic}){



    return <Row gutter={[16,16]}>
        <Col lg={16}>
            <div style={{display:"flex", gap: 24, padding: 24}}>
                <div style={{width: '50%'}}>
                    <PatientCardMedications tab={tab} dataClinic={dataClinic}/>
                </div>
                <div style={{width: '50%'}}>
                    <PatientCardRiskFactors patientId={patientId} dataClinic={dataClinic} tab={tab}/>
                </div>
            </div>
            <div style={{display:"flex", gap: 24, padding: 24, marginTop: -24}}>
                <div style={{width: '50%'}}>
                    <PatientCardAllergy patientId={patientId} dataClinic={dataClinic} tab={tab}/>
                </div>
                <div style={{width: '50%'}}>
                    <PatientCardChronicDiseases patientId={patientId} dataClinic={dataClinic} tab={tab}/>
                </div>
            </div>
            {/*<div style={{padding: 24}}>*/}
            {/*    <PatientCardChart />*/}
            {/*</div>*/}

        </Col>
        <Col lg={8}>
            <PatientCardRight id={id} patientId={patientId} dataClinic={dataClinic}/>
        </Col>

    </Row>
}
export default PatientOverviewTab