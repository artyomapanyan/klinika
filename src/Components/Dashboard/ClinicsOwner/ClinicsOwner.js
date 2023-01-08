import {Button, Col, Row} from "antd";
import React, {useState} from 'react';
import CounterGreenChart from "../../Fragments/Charts/CounterGreenChart";
import CounterOrangeChart from "../../Fragments/Charts/CounterOrangeChart";
import CounterMultipleChart from "../../Fragments/Charts/CounterMultipleChart";
import '../../Fragments/Charts/ChartStyles.sass'
import GradientChart from "../../Fragments/Charts/GradientChart";
import LineChartIncomes from "../../Fragments/Charts/LineChartIncomes";
import CounterProgress from "../../Fragments/Charts/CounterProgress";

function ClinicsOwner() {
    const [greenData,setGreenData] = useState([0.1,4.9]);
    const [orangeData,setOrangeData] = useState([1.1,3.9]);
    const [progressData,setProgressData] = useState(123.4);
    const [multipleData,setMultipleData] = useState({'Jeddahclinic':67.3,
                                                               'Valod':15.3,
                                                               'Clinic name':87.3,});
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
                <LineChartIncomes />
            </div>


        </div>
    )
}
export default ClinicsOwner;
