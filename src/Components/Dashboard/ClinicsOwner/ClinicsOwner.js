import {Button, Col, Row, Space} from "antd";
import React, {useState} from 'react';
import CounterGreenChart from "../../Fragments/Charts/CounterGreenChart";
import CounterOrangeChart from "../../Fragments/Charts/CounterOrangeChart";
import CounterMultipleChart from "../../Fragments/Charts/CounterMultipleChart";
import arrowGreen from "../../../dist/icons/arrow-green.svg";
import '../../Fragments/Charts/ChartStyles.sass'
import {t} from "i18next";
import GradientChart from "../../Fragments/Charts/GradientChart";

function ClinicsOwner() {
    const [greenData,setGreenData] = useState([0.1,4.9]);
    const handleAddCount = ()=>{
        setGreenData((prevState)=>[(+prevState[0]+0.1).toFixed(1),(+prevState[1]-0.1).toFixed(1)])
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
                        <CounterOrangeChart/>
                    </div>
                </Col>
                <Col lg={7} md={12} sm={24} xs={24}>
                    <div className="gutter_row">
                        <Space>
                            <Space direction={'vertical'}>
                                <div className={'clinic_owner_big_text'}>
                                    123.4K
                                </div>
                                <div style={{color:"#6DAF56"}}>
                                    <img alt={'icons'} src={arrowGreen}/>
                                    11% / + 12287 $
                                </div>
                            </Space>
                            <Space></Space>
                            <Space direction={'vertical'}>
                                <div>
                                    {t("Current month")}
                                </div>
                                <div className={'chart_counter_bold_text'}>
                                    {t("incomes")}
                                </div>
                            </Space>
                        </Space>

                    </div>
                </Col>
                <Col lg={7} md={12} sm={24} xs={24}>
                    <div className="gutter_row">
                        <CounterMultipleChart />
                    </div>
                </Col>
            </Row>
            <GradientChart />


        </div>
    )
}
export default ClinicsOwner;
