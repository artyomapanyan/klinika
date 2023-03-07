import React, {useState} from "react";
import {Button, Col, Dropdown, Row, Slider, Space} from "antd";
import {DownOutlined, FunnelPlotOutlined, InsertRowRightOutlined} from "@ant-design/icons";
import {t} from "i18next";
import Search from "antd/es/input/Search";

function OffersPrices() {

    const [price, setPrice] = useState({});

    const items = [
        {
            label: 'First Clinic',
            key: '1',
        },
        {
            label: 'Second Clinic',
            key: '2',
        },
        {
            label: 'Firth Clinic',
            key: '3',
        },
        {
            label: 'First Clinic',
            key: '4',
        },
        {
            label: 'Second Clinic',
            key: '5',
        },

    ];
    const onClick = ({key}) => {
        console.log(key)
    };


    return(
        <Row className={'filter_div'}>
            <Col lg={7}>
                <div className={'price'}>
                    <div className={'price_text'}>
                        Price:
                    </div>
                    <div className={'price_text'}>
                        {price?.value1 ?? 0} SAR
                    </div>
                    <div className={'price_text'}>
                        -
                    </div>
                    <div className={'price_text'}>
                        {price?.value2 ?? 10000} SAR
                    </div>
                </div>
                <div style={{width:'100%'}} align={'right'}>
                    <div className={'slider_div'} >
                        <Slider range defaultValue={[0, 10000]}
                                max={10000}
                                onAfterChange={([val1, val2]) => setPrice({
                                    value1: val1,
                                    value2: val2
                                })}
                        />
                    </div>
                </div>


            </Col>
            <Col lg={5}>
                <div align={'center'}>
                    <FunnelPlotOutlined style={{color:'#ce4e99', fontSize:20, paddingRight:10}}/>
                    <span style={{fontSize: 16}}>
                        Price: Low to High
                    </span>

                </div>
            </Col>
            <Col lg={5}>
                <div align={'center'}>
                    <InsertRowRightOutlined style={{color:'#ce4e99', fontSize: 18}}/>
                    <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}
                        trigger={['click']}
                    >
                        <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                            <div style={{marginLeft:15, fontSize:16}}>{t("All clinic (32)")}</div>
                            <div><DownOutlined style={{color:'#ce4e99'}}/></div>
                        </Space>

                    </Dropdown>
                </div>
            </Col>
            <Col lg={5}>
                <div align={'center'}>
                        <Search
                            placeholder="input search text"
                            //onSearch={onSearch}
                            style={{
                                width: 200,
                            }}
                        />
                </div>
            </Col>
            <Col lg={2} align={'center'}>
                <div>
                    <Button>Reset</Button>
                </div>
            </Col>
        </Row>
    )
}

export default OffersPrices;