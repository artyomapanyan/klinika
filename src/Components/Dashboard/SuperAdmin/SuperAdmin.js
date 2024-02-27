import {Col, Row} from "antd";
import React from 'react';


import SuperAdminIncomesChart from "../../Fragments/Charts/SuperAdminIncomesChart";
import SuperAdminProfitableTable from "./SuperAdminProfitableTable/SuperAdminProfitableTable";
import SuperAdminRegisteredClinics from "./SuperAdminHeadCharts/SuperAdminRegisteredClinics";
import SuperAdminCurrentMonth from "./SuperAdminHeadCharts/SuperAdminCurrentMonth";
import SuperAdminClinicsStatuses from "./SuperAdminHeadCharts/SuperAdminClinicsStatuses";
import SuperAdminClinicPatientChart from "./SuperAdminClinic&patientChart/SuperAdminClinicPatientChart";
import SuperAdminGradientChart from "./SuperAdminGradientChart/SuperAdminGradientChart";
import SuperAdminPlatformStats from "./SuperAdminPlatformStats/SuperAdminPlatformStats";
import SuperAdminGenderChart from "./superAdminGenderChart/SuperAdminGenderChart";
import SuperAdminClinicLicenseChart from "./SuperAdminClinicLicenseChart/SuperAdminClinicLicenseChart";





function SuperAdmin() {
    window.addEventListener("error", (e) => console.error(e))

    return(
        <div>
            <div style={{margin:20}} className={'clinics_owner'}>
                <Row gutter={[16,16]}>
                    <Col  lg={8} md={12} sm={24} xs={24} >
                        <div className="gutter_row">
                            <SuperAdminRegisteredClinics />
                        </div>
                    </Col>
                    {/*<Col lg={6} md={12} sm={24} xs={24}>*/}
                    {/*    <div className="gutter_row">*/}
                    {/*        {*/}
                    {/*            //<CounterGreenChart data={purpleData} />*/}
                    {/*        }*/}
                    {/*        </div>*/}
                    {/*</Col>*/}
                    <Col lg={8} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <SuperAdminClinicsStatuses/>
                        </div>

                    </Col>
                    <Col lg={8} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <SuperAdminCurrentMonth />
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={24}>
                        <SuperAdminClinicPatientChart />
                    </Col>
                    {/*<Col lg={6} >*/}
                    {/*    <IncomeChannelsChart />*/}
                    {/*</Col>*/}
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={18}>
                        <SuperAdminGradientChart />
                    </Col>
                    <Col lg={6} >
                        <SuperAdminPlatformStats />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    {/*<Col lg={8}>*/}
                    {/*    <IncomesVsConversRate data={incomeVsConvertData}/>*/}
                    {/*</Col>*/}
                    <Col lg={24}>
                        <SuperAdminIncomesChart />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={12}>
                        <SuperAdminProfitableTable sort={'asc'} />
                    </Col>
                    <Col lg={12}>
                        <SuperAdminProfitableTable sort={'desc'}/>
                        {/*<SuperAdminUnprofitableTable />*/}
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <SuperAdminGenderChart />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <SuperAdminClinicLicenseChart/>
                    </Col>
                    {/*<Col lg={8} md={12} sm={24} xs={24}>*/}
                    {/*    <SuperAdminPlatformIssues data={issuesData}/>*/}
                    {/*</Col>*/}
                </Row>
            </div>
            <div>
                {/*<ClinicFeedback />*/}
            </div>
        </div>
    )
}
export default SuperAdmin;
