import React, {useState} from "react";
import {Button, Col, Row} from "antd";
import CounterPurpleChart from "../../Fragments/Charts/CounterPurpleChart";
import StatusesChart from "../../Fragments/Charts/StatusesChart";
import ClinicManagerProgressCount from "../../Fragments/Charts/ClinicManagerProgressCount";
import ClinicManagerCalendar from "./Fragments/ClinicManagerCalendar/ClinicManagerCalendar";



function ClinicManager() {
    const [purpleData,setPurpleData] = useState([25,75]);
    const [progressData1,setProgressData1] = useState(64.4);
    const [statusesData,setStatusesData] = useState([70,40, 20, 10]);
    const [progressData2,setProgressData2] = useState(16.4);

    const handleAddCount = ()=>{
        setStatusesData((prevState)=>[(+prevState[0]+1).toFixed(1),(+prevState[1]-1).toFixed(1), (+prevState[1]-1).toFixed(1), (+prevState[1]-1).toFixed(1)])
        setPurpleData((prevState)=>[(+prevState[0]+0.1).toFixed(1),(+prevState[1]-0.1).toFixed(1)])
        setProgressData1((prevState)=>(+prevState+0.1).toFixed(1))
        setProgressData2((prevState)=>(+prevState+0.1).toFixed(1))

    }
    return(
        <div>
            <div style={{margin:20}} className={'clinics_owner'}>
                <Button onClick={handleAddCount}>increment</Button>
                <Row gutter={[16,16]}>
                    <Col  lg={6} md={12} sm={24} xs={24} >
                        <div className="gutter_row">
                            <ClinicManagerProgressCount data={progressData1} />

                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterPurpleChart data={purpleData} />
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <StatusesChart data={statusesData}/>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <ClinicManagerProgressCount data={progressData2} />
                        </div>
                    </Col>
                </Row>
                <div>
                    <ClinicManagerCalendar />
                </div>
            </div>
        </div>
    )
}
export default ClinicManager;

