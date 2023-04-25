import {Button, Col, Row} from "antd";
import React from 'react';
import { useState } from 'react';

import DoctorReworkedNotifications from "./Fragments/DoctorReworkedNotifications/DoctorReworkedNotifications";
import ClinicManagerProgressCount from "../../Fragments/Charts/ClinicManagerProgressCount";
import CounterPurpleChart from "../../Fragments/Charts/CounterPurpleChart";
import StatusesChart from "../../Fragments/Charts/StatusesChart";
import ClinicFeedback from "../ClinicsOwner/Fragments/ClinicFeedback";
import DoctorReworkedCalendar from "./Fragments/DoctorReworkedCalendar/DoctorReworkedCalendar";
import AppointmentStats from "../../Fragments/Charts/AppointmentStats";
import MonthStatistics from "../../Fragments/Charts/MonthStatistics";
import DoctorRewProgress from "./Fragments/DoctorRewSmall/DoctorRewProgress";
import TelehealtCount from "./Fragments/DoctorRewSmall/TelehealtCount";
import DrReworkedStatuses from "./Fragments/DoctorRewSmall/DrReworkedStatuses";




function DoctorReworked() {
    // const [purpleData,setPurpleData] = useState([25,75]);
    // const [progressData1,setProgressData1] = useState(64.4);
    // const [statusesData,setStatusesData] = useState([70,40, 20, 10]);
    // const [progressData2,setProgressData2] = useState(16.4);
    //
    // const handleAddCount = ()=> {
    //     setStatusesData((prevState) => [(+prevState[0] + 1).toFixed(1), (+prevState[1] - 1).toFixed(1), (+prevState[1] - 1).toFixed(1), (+prevState[1] - 1).toFixed(1)])
    //     setPurpleData((prevState) => [(+prevState[0] + 0.1).toFixed(1), (+prevState[1] - 0.1).toFixed(1)])
    //     setProgressData1((prevState) => (+prevState + 0.1).toFixed(1))
    //     setProgressData2((prevState) => (+prevState + 0.1).toFixed(1))
    // }

    return(
        <div>
            <div style={{margin:20}} className={'clinics_owner'}>
                {/*<Button onClick={handleAddCount}>increment</Button>*/}
                <Row gutter={[16,16]}>
                    <Col  lg={6} md={12} sm={24} xs={24} >
                        <div className="gutter_row">
                            {/*<ClinicManagerProgressCount data={progressData1} />*/}
                            <DoctorRewProgress />
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            {/*<CounterPurpleChart data={purpleData} />*/}
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            {/*<StatusesChart data={statusesData}/>*/}
                            <DrReworkedStatuses />
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            {/*<ClinicManagerProgressCount data={progressData2} />*/}
                            <TelehealtCount />
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={18}>
                        <DoctorReworkedCalendar />
                    </Col>
                    <Col lg={6} >
                        <DoctorReworkedNotifications />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={18}>
                        <AppointmentStats />
                    </Col>
                    <Col lg={6} >
                        <MonthStatistics />
                    </Col>
                </Row>

            </div>
            <div>
                <ClinicFeedback />
            </div>






        </div>
    )
}
export default DoctorReworked;
