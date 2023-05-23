import React, {useState} from "react";
import {Button, Col, Dropdown, Input, Row, Slider, Space} from "antd";
import {DownOutlined, FunnelPlotOutlined, InsertRowRightOutlined, SearchOutlined} from "@ant-design/icons";


function OffersPrices({clinics, setParams, params,  setResetState}) {
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
            page:1,
            clinic: key
        })
    };

    const onReset = () => {
        setResetState(true)
        setParams({
            page:1
        })
        setTimeout(() => {
            setResetState(false)
        }, 100)
    }

    const changeInputSearch = (e) => {
        if(e?.target?.value?.length >= 3) {
            setTimeout(() => {
                setParams({
                    ...params,
                    page:1,
                    title: e?.target?.value
                })
            }, 500)

        }

    }
    const onLowHigh = () => {
        setLowHighState(!lowHighState)
        if(lowHighState) {
            setParams(
                {
                    ...params,
                    page:1,
                    order: 'desc'
                }
            )
        } else {
            setParams(
                {
                    ...params,
                    page:1,
                    order: "asc"
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
                        {params?.min_price ?? 0} SAR
                    </div>
                    <div className={'price_text'}>
                        -
                    </div>
                    <div className={'price_text'}>
                        {params?.max_price ?? 5000} SAR
                    </div>
                </div>
                <div style={{width:'100%'}} align={'right'}>
                    <div className={'slider_div'} >
                        <Slider range defaultValue={[0, 5000]}
                                max={5000}
                                onAfterChange={([val1, val2]) => setParams({
                                    ...params,
                                    min_price: val1,
                                    max_price: val2
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
                    {
                        params?.clinic ? <div></div> : <div>
                            <InsertRowRightOutlined style={{color:'#ce4e99', fontSize: 18}}/>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick,}}
                                trigger={['click']}

                            >
                                <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                                    <div style={{marginLeft:10, fontSize:14}}>{params?.clinic ? items?.find((el) => {
                                        return el?.key === +params?.clinic})?.label : `All Clinics (${clinics?.length})`}</div>
                                    <div><DownOutlined style={{color:'#ce4e99'}}/></div>
                                </Space>

                            </Dropdown>
                        </div>
                    }

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