import React, {useState} from "react";
import {Button, Col, Dropdown, Input, Row, Slider, Space} from "antd";
import {
    CaretDownOutlined,

} from "@ant-design/icons";
import {t} from "i18next";
import low_to_high_icon from "../../../dist/icons/low_to_high_icon.png";
import all_offers_clinic_icon from "../../../dist/icons/all_offers_clinic_icon.png";
import search_icon_black from "../../../dist/icons/search_icon_black.png";


function OffersPrices({clinics, setParams, params,  setResetState, currentUrl}) {
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
            order_by: 'new_price',
            page:1,
            per_page:15,
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
            <Col lg={7} xs={24}>
                <div className={'price'}>
                    <div className={'price_text'}>
                        {t('Price')}:
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
                                    page:1,
                                    min_price: val1,
                                    max_price: val2
                                })}
                        />
                    </div>
                </div>


            </Col>
            <Col lg={4}  xs={24} >
                <div align={'center'} style={{cursor:'pointer'}} onClick={onLowHigh}>
                    <img src={low_to_high_icon} alt={'low_to_high_icon'}/>
                    <span style={{fontSize: 14, marginLeft: 12, fontWeight: 400}} >
                        {
                            lowHighState ? t("Price: Low to High") : t('Price: High to Low')
                        }

                    </span>
                </div>
            </Col>
            <Col lg={6}  xs={24} className={'all_offers_filter_clinics'}>
                <div align={'center'}>
                    {
                        currentUrl.includes('thank-you') ? <div></div> : <div style={{marginTop: 3}}>
                            <img src={all_offers_clinic_icon} alt={'all_offers_clinic_icon'}/>
                            <Dropdown
                                menu={{
                                    items,
                                    onClick,}}
                                trigger={['click']}

                            >
                                <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                                    <div style={{marginLeft:10, fontSize:14}}>{params?.clinic ? items?.find((el) => {
                                        return el?.key === +params?.clinic})?.label : `${t('All Clinics')} (${clinics?.length})`}</div>
                                    <div><CaretDownOutlined style={{color:'#ce4e99'}} /></div>
                                </Space>

                            </Dropdown>
                        </div>
                    }

                </div>
            </Col>
            <Col lg={5}  xs={24} className={'all_offers_filter_input_div'}>
                <div align={'center'}>
                    <Input className={'offers_search_input'} size="large" placeholder={t("Search")} onChange={(e)=>changeInputSearch(e)} prefix={<img src={search_icon_black} alt={'search_icon_black'}/>} />
                </div>
            </Col>
            <Col lg={2}  xs={24} align={'center'} className={'all_offers_filter_input_div'}>
                <div>
                    <Button type={"secondary"} style={{backgroundColor:'#F3F3F3', border:'none', color:'#8d8c8d', fontWeight:600, height:37}} onClick={onReset}>{t('Reset')}</Button>
                </div>
            </Col>
        </Row>
    )
}

export default OffersPrices;