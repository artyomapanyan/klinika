import React from "react";
import {Col, Row} from "antd";
import StatusesChart from "../../Fragments/Charts/StatusesChart";
import ClinicManagerProgressCount from "../../Fragments/Charts/ClinicManagerProgressCount";
import ClinicManagerCalendar from "./Fragments/ClinicManagerCalendar/ClinicManagerCalendar";
import ClinicManagerAppointmentsTable from "./Fragments/ClinicManagerAppointmentsTable/ClinicManagerAppointmentsTable";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import NursLabCalendar from "./NursingLaboratoryCalendar/NursLabCalendar";


function ClinicManager() {
    let ownerClinics = useSelector((state) => state?.owner);
    let role = useSelector((state) => state?.auth?.selected_role?.key);

    return(
        <div>
            {!ownerClinics?.month_key?<Preloader/>:<div style={{margin:20}} className={'clinics_owner'}>
                {
                    role === 'receptionist' ? <div></div> : <Row gutter={[16,16]}>
                        <Col  lg={8} md={12} sm={24} xs={24} >
                            <div className="gutter_row">
                                <ClinicManagerProgressCount dataKey={'MonthlyAppointments'}/>
                            </div>
                        </Col>
                        {/* <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterPurpleChart data={purpleData} />
                        </div>
                    </Col>*/}
                        <Col lg={8} md={12} sm={24} xs={24}>
                            <div className="gutter_row">
                                <StatusesChart/>
                            </div>
                        </Col>
                        <Col lg={8} md={12} sm={24} xs={24}>
                            <div className="gutter_row">
                                <ClinicManagerProgressCount dataKey={'MonthlyTelehealths'}/>
                            </div>
                        </Col>
                    </Row>
                }

                <div>
                    <ClinicManagerCalendar />
                </div>
                {/*<div>*/}
                {/*    <NursLabCalendar />*/}
                {/*</div>*/}
                <div>
                    <ClinicManagerAppointmentsTable />
                </div>
                {/*<Row gutter={[16, 16]}>*/}
                {/*    <Col lg={12}>*/}
                {/*        <ClinicManagerConfirmation />*/}
                {/*    </Col>*/}
                {/*    <Col lg={12}>*/}
                {/*        <ClinicManagerDoctorsLicensesTable />*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <div>
                    {/*<ClinicFeedback />*/}
                </div>
            </div>}
        </div>
    )
}
export default ClinicManager;

