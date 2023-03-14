import React, {useState} from "react";
import {Button, Col, Dropdown, Input, Row, Slider, Space} from "antd";
import {DownOutlined, FunnelPlotOutlined, InsertRowRightOutlined, SearchOutlined} from "@ant-design/icons";
import {t} from "i18next";

function OffersPrices({clinics, setParams, params}) {
    const [lowHighState, setLowHighState] = useState(false)

    const items = clinics?.map((el) => {
        return{
            key: el?.id,
            label: el?.name,
        }
    })

    const onClick = ({key}) => {
        setParams({
            ...params,
            clinic_id: key
        })
    };

    const onReset = () => {
        setParams({})
    }

    const changeInputSearch = (e) => {
        setParams({
            ...params,
            offer_name: e?.target?.value
        })
    }
    const onLowHigh = () => {
        setLowHighState(!lowHighState)
        if(lowHighState) {
            setParams(
                {
                    ...params,
                    low_high: "low_to_high"
                }
            )
        } else {
            setParams(
                {
                    ...params,
                    low_high: "high_to_low"
                }
            )
        }
    }


    return(
        <Row className={'filter_div'}>
            <Col lg={7}>
                <div className={'price'}>
                    <div className={'price_text'}>
                        Price:
                    </div>
                    <div className={'price_text'}>
                        {params?.prices?.min ?? 0} SAR
                    </div>
                    <div className={'price_text'}>
                        -
                    </div>
                    <div className={'price_text'}>
                        {params?.prices?.max ?? 10000} SAR
                    </div>
                </div>
                <div style={{width:'100%'}} align={'right'}>
                    <div className={'slider_div'} >
                        <Slider range defaultValue={[0, 10000]}
                                max={10000}
                                onAfterChange={([val1, val2]) => setParams({
                                    ...params,
                                    prices : {
                                        min: val1,
                                        max: val2
                                    }

                                })}
                        />
                    </div>
                </div>


            </Col>
            <Col lg={4}>
                <div align={'center'} style={{cursor:'pointer'}} onClick={onLowHigh}>
                    <FunnelPlotOutlined style={{color:'#ce4e99', fontSize:20, paddingRight:10, }} />
                    <span style={{fontSize: 14}} >
                        {
                            lowHighState ? "Price: Low to High" : 'Price: High to Low'
                        }

                    </span>

                </div>
            </Col>
            <Col lg={6}>
                <div align={'center'}>
                    <InsertRowRightOutlined style={{color:'#ce4e99', fontSize: 18}}/>
                    <Dropdown
                        menu={{
                            items,
                            onClick,}}
                        trigger={['click']}

                    >
                        <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                            <div style={{marginLeft:10, fontSize:14}}>{params?.clinic_id ? items?.find((el) => {
                                return el?.key === +params?.clinic_id})?.label : `All Clinics (${clinics?.length})`}</div>
                            <div><DownOutlined style={{color:'#ce4e99'}}/></div>
                        </Space>

                    </Dropdown>
                </div>
            </Col>
            <Col lg={5}>
                <div align={'center'}>
                    <Input className={'offers_search_input'} size="large" placeholder="Search" onChange={(e)=>changeInputSearch(e)} prefix={<SearchOutlined />} />
                </div>
            </Col>
            <Col lg={2} align={'center'}>
                <div>
                    <Button type={"secondary"} style={{backgroundColor:'#F3F3F3', border:'none', color:'#8d8c8d', fontWeight:600, height:37}} onClick={onReset}>Reset</Button>
                </div>
            </Col>
        </Row>
    )
}

export default OffersPrices;