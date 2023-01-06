import {Col, Progress, Row, Space} from "antd";
import React from 'react';
import CounterGreenChart from "../../Fragments/Charts/CounterGreenChart";
import CounterOrangeChart from "../../Fragments/Charts/CounterOrangeChart";
import CounterMultipleChart from "../../Fragments/Charts/CounterMultipleChart";

function ClinicsOwner() {

    return(
        <div style={{margin:20}} className={'clinics_owner'}>
            <Row gutter={16}>
                <Col  span={5} >
                    <div className="gutter-row">
                        <CounterGreenChart />
                    </div>
                </Col>
                <Col span={5}>
                    <div className="gutter-row">
                        <CounterOrangeChart/>
                    </div>
                </Col>
                <Col span={7}>
                    <div className="gutter-row">
                        <Space direction={'vertical'}>
                            <div>
                                123.4K
                            </div>
                            <div>
                                123.4K
                            </div>
                        </Space>
                        <Space direction={'vertical'}>
                            <div>
                                123.4K
                            </div>
                            <div>
                                123.4K
                            </div>
                        </Space>
                    </div>
                </Col>
                <Col span={7}>
                    <div className="gutter-row">
                        <CounterMultipleChart />
                    </div>
                </Col>
            </Row>


        </div>
    )
}
export default ClinicsOwner;