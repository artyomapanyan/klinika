import React, {useState} from "react";
import {Button, Col, Row} from "antd";
import CounterPurpleChart from "../../Fragments/Charts/CounterPurpleChart";
import StatusesChart from "../../Fragments/Charts/StatusesChart";
import ClinicManagerProgressCount from "../../Fragments/Charts/ClinicManagerProgressCount";
import ClinicManagerCalendar from "./Fragments/ClinicManagerCalendar/ClinicManagerCalendar";
import ClinicManagerAppointmentsTable from "./Fragments/ClinicManagerAppointmentsTable/ClinicManagerAppointmentsTable";
import ClinicManagerConfirmation from "./Fragments/ClinicManagerConfirmation/ClinicManagerConfirmation";
import ClinicManagerDoctorsLicensesTable from "./Fragments/ClinicManagerDoctorsLicensesTable/ClinicManagerDoctorsLicensesTable";
import ClinicFeedback from "../ClinicsOwner/Fragments/ClinicFeedback";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import dayjs from "dayjs";



function ClinicManager() {
    let ownerClinics = useSelector((state) => state?.owner);

    const [purpleData,setPurpleData] = useState([25,75]);

    const [statusesData,setStatusesData] = useState([70,40, 20, 10]);


    const handleAddCount = ()=>{
        setStatusesData((prevState)=>[(+prevState[0]+1).toFixed(1),(+prevState[1]-1).toFixed(1), (+prevState[1]-1).toFixed(1), (+prevState[1]-1).toFixed(1)])
        setPurpleData((prevState)=>[(+prevState[0]+0.1).toFixed(1),(+prevState[1]-0.1).toFixed(1)])


    }
    return(
        <div>
            {!ownerClinics?.month_key?<Preloader/>:<div style={{margin:20}} className={'clinics_owner'}>
                <Row gutter={[16,16]}>
                    <Col  lg={6} md={12} sm={24} xs={24} >
                        <div className="gutter_row">
                            <ClinicManagerProgressCount dataKey={'MonthlyAppointments'}/>
                        </div>
                    </Col>
                   {/* <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterPurpleChart data={purpleData} />
                        </div>
                    </Col>*/}
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <StatusesChart data={statusesData}/>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <ClinicManagerProgressCount dataKey={'MonthlyTelehealths'}/>
                        </div>
                    </Col>
                </Row>
                <div>
                    <ClinicManagerCalendar />
                </div>
                <div>
                    <ClinicManagerAppointmentsTable />
                </div>
                <Row gutter={[16, 16]}>
                    <Col lg={12}>
                        <ClinicManagerConfirmation />
                    </Col>
                    <Col lg={12}>
                        <ClinicManagerDoctorsLicensesTable />
                    </Col>
                </Row>
                <div>
                    <ClinicFeedback />
                </div>
            </div>}
        </div>
    )
}
export default ClinicManager;

