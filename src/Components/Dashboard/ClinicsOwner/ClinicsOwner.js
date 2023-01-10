import {Button, Col, Row} from "antd";
import React, {useState} from 'react';
import CounterGreenChart from "../../Fragments/Charts/CounterGreenChart";
import CounterOrangeChart from "../../Fragments/Charts/CounterOrangeChart";
import CounterMultipleChart from "../../Fragments/Charts/CounterMultipleChart";
import '../../Fragments/Charts/ChartStyles.sass'
import GradientChart from "../../Fragments/Charts/GradientChart";
import LineChartIncomes from "../../Fragments/Charts/LineChartIncomes";
import CounterProgress from "../../Fragments/Charts/CounterProgress";
import IncomeChannelsChart from "../../Fragments/Charts/IncomeChannelsChart";
import ClinicOwnerTableTasks from "./Fragments/ClinicOwnerTableTasks";
import ClinicOwnerPatientsChart from "../../Fragments/Charts/ClinicOwnerPatientsChart";
import TopServices from "../../Fragments/Charts/TopServices";
import PatientGenderChart from "../../Fragments/Charts/PatientGenderChart";
import DoctorLicensesChart from "../../Fragments/Charts/DoctorLicensesChart";
import RsultsComponent from "../../Fragments/Charts/RsultsComponent";


function ClinicsOwner() {
    const [greenData,setGreenData] = useState([0.1,4.9]);
    const [orangeData,setOrangeData] = useState([1.1,3.9]);
    const [progressData,setProgressData] = useState(123.4);
    const [multipleData,setMultipleData] = useState({'Jeddahclinic':67.3,
                                                               'Valod':15.3,
                                                               'Clinic name':87.3,});
    const [incomeChannelData,setIncomeChannelData] = useState({'All Apointments': 100,
                                                                         'Orders Mobile app':43.0,
                                                                         'Offers':18.4,});

    const [patientGenderData,setPatientGenderData] = useState({'Female': 1236,
                                                                        'Male':864,});

    const [doctorLicensesData,setDoctorLicensesData] = useState({'Actual': 1236,
                                                                        'Expire soon':785,
                                                                        'Expired':864});
    const handleAddCount = ()=>{
        setGreenData((prevState)=>[(+prevState[0]+0.1).toFixed(1),(+prevState[1]-0.1).toFixed(1)])
        setOrangeData((prevState)=>[(+prevState[0]+0.1).toFixed(1),(+prevState[1]-0.1).toFixed(1)])
        setProgressData((prevState)=>(+prevState+0.1).toFixed(1))
        setMultipleData((prevState)=> {
            let newObj = {}
           Object.keys(prevState).map((key)=>{
               newObj[key] =  (+prevState[key]+1).toFixed(1);
           })
            return newObj
        })
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
        <div style={{margin:20}} className={'clinics_owner'}>
            <Button onClick={handleAddCount}>increment</Button>
            <Row gutter={[16,16]}>
                <Col  lg={5} md={12} sm={24} xs={24} >
                    <div className="gutter_row">
                        <CounterGreenChart data={greenData} />
                    </div>
                </Col>
                <Col lg={5} md={12} sm={24} xs={24}>
                    <div className="gutter_row">
                        <CounterOrangeChart data={orangeData} />
                    </div>
                </Col>
                <Col lg={7} md={12} sm={24} xs={24}>
                    <div className="gutter_row">
                        <CounterProgress data={progressData} />
                    </div>
                </Col>
                <Col lg={7} md={12} sm={24} xs={24}>
                    <div className="gutter_row">
                        <CounterMultipleChart  data={multipleData}/>
                    </div>
                </Col>
            </Row>
            <div>
                <GradientChart />
            </div>
            <div>
                <Row gutter={[20,20]}>
                    <Col lg={18}>
                        <LineChartIncomes />
                    </Col>
                    <Col lg={6}>
                        <IncomeChannelsChart data={incomeChannelData} />
                    </Col>
                </Row>

            </div>
            <div>
                <ClinicOwnerTableTasks />
            </div>
            <div>
                <Row gutter={[20,20]}>
                    <Col lg={18}>
                        <ClinicOwnerPatientsChart />
                    </Col>
                    <Col lg={6}>
                        <TopServices />
                    </Col>
                </Row>
            </div>
            <div>
                <Row gutter={[20,20]}>
                    <Col lg={9}>
                        <PatientGenderChart data={patientGenderData} />
                    </Col>
                    <Col lg={9}>
                        <DoctorLicensesChart data={doctorLicensesData}/>
                    </Col>
                    <Col lg={6}>
                        <RsultsComponent />
                    </Col>
                </Row>
            </div>

        </div>
    )
}
export default ClinicsOwner;
