import {Button, Col, Row} from "antd";
import React from 'react';
import { useState } from 'react';


import ClinicManagerProgressCount from "../../Fragments/Charts/ClinicManagerProgressCount";
import StatusesChart from "../../Fragments/Charts/StatusesChart";
import CounterGreenChart from "../../Fragments/Charts/CounterGreenChart";
import CounterProgress from "../../Fragments/Charts/CounterProgress";
import ClinicOwnerPatientsChart from "../../Fragments/Charts/ClinicOwnerPatientsChart";
import IncomeChannelsChart from "../../Fragments/Charts/IncomeChannelsChart";
import GradientChart from "../../Fragments/Charts/GradientChart";
import MonthStatistics from "../../Fragments/Charts/MonthStatistics";
import ClinicFeedback from "../ClinicsOwner/Fragments/ClinicFeedback";
import SuperAdminIncomesChart from "../../Fragments/Charts/SuperAdminIncomesChart";
import SuperAdminIncVsConvers from "../../Fragments/Charts/SuperAdminIncVsConvers";
import SuperAdminProfitableTable from "./SuperAdminProfitableTable/SuperAdminProfitableTable";
import SuperAdminUnprofitableTable from "./SuperAdminUnprofitableTable/SuperAdminUnprofitableTable";
import PatientGenderChart from "../../Fragments/Charts/PatientGenderChart";
import DoctorLicensesChart from "../../Fragments/Charts/DoctorLicensesChart";
import SuperAdminPlatformIssues from "./SuperAdminPlatformIssues/SuperAdminPlatformIssues";





function SuperAdmin() {
    const [purpleData,setPurpleData] = useState([25,75]);
    const [progressData1,setProgressData1] = useState(64.4);
    const [statusesData,setStatusesData] = useState([70,40, 20, 10]);
    const [progressData2,setProgressData2] = useState(16.4);
    const [incomeChannelData,setIncomeChannelData] = useState({'All Apointments': 100,
        'Orders Mobile app':43.0,
        'Offers':18.4,});
    const [patientGenderData,setPatientGenderData] = useState({'Female': 1236,
        'Male':864,});

    const [doctorLicensesData,setDoctorLicensesData] = useState({'Actual': 1236,
        'Expire soon':785,
        'Expired':864});

    const handleAddCount = ()=> {
        setStatusesData((prevState) => [(+prevState[0] + 1).toFixed(1), (+prevState[1] - 1).toFixed(1), (+prevState[1] - 1).toFixed(1), (+prevState[1] - 1).toFixed(1)])
        setPurpleData((prevState) => [(+prevState[0] + 0.1).toFixed(1), (+prevState[1] - 0.1).toFixed(1)])
        setProgressData1((prevState) => (+prevState + 0.1).toFixed(1))
        setProgressData2((prevState) => (+prevState + 0.1).toFixed(1))
        setIncomeChannelData((prevState)=> {
            let newObj = {}
            Object.keys(prevState).map((key)=>{
                newObj[key] =  (+prevState[key]+1).toFixed(1);
            })
            return newObj
        })
        setPatientGenderData((prevState)=> {
            let newObj = {}
            Object.keys(prevState).map((key)=>{
                newObj[key] =  (+prevState[key]+1).toFixed(1);
            })
            return newObj
        })

        setDoctorLicensesData((prevState)=> {
            let newObj = {}
            Object.keys(prevState).map((key)=>{
                newObj[key] =  (+prevState[key]+1).toFixed(1);
            })
            return newObj
        })
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
                            <CounterGreenChart data={purpleData} />
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <StatusesChart data={statusesData}/>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterProgress data={progressData2} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={18}>
                        <ClinicOwnerPatientsChart />
                    </Col>
                    <Col lg={6} >
                        <IncomeChannelsChart data={incomeChannelData} />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={18}>
                        <GradientChart />
                    </Col>
                    <Col lg={6} >
                        <MonthStatistics />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={8}>
                        <SuperAdminIncVsConvers />
                    </Col>
                    <Col lg={16}>
                        <SuperAdminIncomesChart />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={12}>
                        <SuperAdminProfitableTable />
                    </Col>
                    <Col lg={12}>
                        <SuperAdminUnprofitableTable />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col lg={8}>
                        <PatientGenderChart data={patientGenderData} />
                    </Col>
                    <Col lg={8}>
                        <DoctorLicensesChart data={doctorLicensesData}/>
                    </Col>
                    <Col lg={8}>
                        <SuperAdminPlatformIssues />
                    </Col>
                </Row>
            </div>
            <div>
                <ClinicFeedback />
            </div>






        </div>
    )
}
export default SuperAdmin;
