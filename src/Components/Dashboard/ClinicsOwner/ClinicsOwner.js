import {Button, Col, Row} from "antd";
import React, {useEffect, useState} from 'react';
import CounterGreenChart from "../../Fragments/Charts/CounterGreenChart";
import CounterOrangeChart from "../../Fragments/Charts/CounterOrangeChart";
import CounterMultipleChart from "../../Fragments/Charts/CounterMultipleChart";
import '../../Fragments/Charts/ChartStyles.sass'
import GradientChart from "../../Fragments/Charts/GradientChart";
import LineChartIncomes from "../../Fragments/Charts/LineChartIncomes";
import CounterProgress from "../../Fragments/Charts/CounterProgress";
import IncomeChannelsChart from "../../Fragments/Charts/IncomeChannelsChart";
import ClinicOwnerPatientsChart from "../../Fragments/Charts/ClinicOwnerPatientsChart";
import TopServices from "../../Fragments/Charts/TopServices";

import { useSelector } from 'react-redux';
import Preloader from '../../Preloader';


function ClinicsOwner() {
     let ownerClinics = useSelector((state) => state?.owner);

     const [multipleData,setMultipleData] = useState({'Jeddah clinic':67.3,
                                                               'Clinic name':87.3,});



    return(
        <div style={{marginBottom: 100}}>
            {!ownerClinics?.id || !ownerClinics?.month_key?<Preloader/>:<div style={{margin:'10px 20px'}} className={'clinics_owner'}>
                <Row gutter={[19,19]}>
                    <Col  lg={8} md={12} sm={24} xs={24} >
                        <div className="gutter_row">
                            <CounterGreenChart />
                        </div>
                    </Col>
                    <Col lg={8} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterOrangeChart />
                        </div>
                    </Col>
                    <Col lg={8} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterProgress  />
                        </div>
                    </Col>
                    {/*<Col lg={6} md={12} sm={24} xs={24}>*/}
                    {/*    <div className="gutter_row">*/}
                    {/*        <CounterMultipleChart  data={multipleData}/>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                </Row>
                <div>
                    <GradientChart />
                </div>
                <div>
                    <Row gutter={[20,20]}>
                        <Col lg={18} sm={24}>
                            <LineChartIncomes />
                        </Col>
                        <Col lg={6} sm={24}>
                            <IncomeChannelsChart />
                        </Col>
                    </Row>

                </div>
                <div>
                    {/*<ClinicOwnerTableTasks />*/}
                </div>
                <div>
                    <Row gutter={[20,20]}>
                        <Col lg={18} sm={24}>
                            <ClinicOwnerPatientsChart />
                        </Col>
                        <Col lg={6} sm={24}>
                            <TopServices />
                        </Col>
                    </Row>
                </div>
                {/*<div>*/}
                {/*    <Row gutter={[20,20]}>*/}
                {/*        <Col lg={9} sm={24}>*/}
                {/*            <PatientGenderChart  />*/}
                {/*        </Col>*/}
                {/*        <Col lg={9} sm={24}>*/}
                {/*            <DoctorLicensesChart />*/}
                {/*        </Col>*/}
                {/*        <Col lg={6} sm={24}>*/}
                {/*            <ResultsComponent />*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}
                <div>
                    {/*<ClinicFeedback />*/}
                </div>
            </div>}

        </div>

    )
}
export default ClinicsOwner;
