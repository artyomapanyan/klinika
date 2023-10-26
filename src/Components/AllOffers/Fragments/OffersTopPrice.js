import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Button, Col, Dropdown, Input, Row, Slider, Space} from "antd";
import {t} from "i18next";
import low_to_high_icon from "../../../dist/icons/low_to_high_icon.png";
import all_offers_clinic_icon from "../../../dist/icons/all_offers_clinic_icon.png";
import {CaretDownOutlined} from "@ant-design/icons";
import search_icon_black from "../../../dist/icons/search_icon_black.png";

function OffersTopPrice({
                          clinics,
                          setParams,
                          params,
                          setResetState,
                          currentUrl
                      }) {
    let redux = useSelector(state => state)
    const [lowHighState, setLowHighState] = useState(false)
    const [items, setItems] = useState([])



    useEffect(() =>{

            if(clinics) {
                let it = [
                    {
                        key: '',
                        label: t('All Clinics')
                    },
                    ...clinics?.map(el => {
                        return {
                            key: el?.id,
                            label: el?.name
                        }

                    })

                ]
                setItems(it)

            }


    }, [clinics])






    const onClick = ({ key }) => {
        setParams({
            ...params,
            page: 1,
            clinic: key
        })
    }

    const onReset = () => {
        setResetState(true)
        setParams({
            order_by: 'new_price',
            page: 1,
            per_page: 15
        })
        setTimeout(() => {
            setResetState(false)
        }, 100)
    }

    const changeInputSearch = e => {
        if (e?.target?.value?.length >= 1) {
            setTimeout(() => {
                setParams({
                    ...params,
                    page: 1,
                    title: e?.target?.value
                })
            }, 500)
        }
    }
    const onLowHigh = () => {
        setLowHighState(!lowHighState)
        if (lowHighState) {
            setParams({
                ...params,
                page: 1,
                order: 'desc'
            })
        } else {
            setParams({
                ...params,
                page: 1,
                order: 'asc'
            })
        }
    }

    return (
        <div
            style={
                redux.app.current_locale === 'en'
                    ? {width: '100%'}
                    : {
                        direction: 'rtl'
                    }
            }
        >
            <div className={'filter_div'} style={{paddingTop: 7}}>


                <div style={{width: '100%'}} className={'all_offers_filter_clinics'}>
                    <div align={'center'} style={{width: '100%'}}>
                        {currentUrl.includes('thank-you') ? (
                            <div></div>
                        ) : (
                            <div style={{ marginTop: 3, width:'100%' }}>
                                <img
                                    src={all_offers_clinic_icon}
                                    alt={'all_offers_clinic_icon'}
                                />
                                <Dropdown
                                    style={{width: '100%'}}
                                    menu={{
                                        items,
                                        onClick
                                    }}
                                    trigger={['click']}
                                >
                                    <Space direction={'horizontal'} style={{ cursor: 'pointer'}}>
                                        <div style={{ marginLeft: 10, fontSize: 14 }}>
                                            {params?.clinic
                                                ? items?.find(el => {
                                                    return el?.key === +params?.clinic
                                                })?.label
                                                : `${t('All Clinics')} (${clinics?.length})`}
                                        </div>
                                        <div>
                                            <CaretDownOutlined style={{ color: '#ce4e99' }} />
                                        </div>
                                    </Space>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{width: '100%', paddingTop: 3}}>
                    <div
                        align={'center'}
                        style={{ cursor: 'pointer' }}
                        onClick={onLowHigh}
                    >
                        <img src={low_to_high_icon} alt={'low_to_high_icon'} />
                        <span style={{ fontSize: 14, marginLeft: 12, fontWeight: 400 }}>
							{lowHighState ? t('Price: Low to High') : t('Price: High to Low')}
						</span>
                    </div>
                </div>
                <div className={'all_offers_filter_input_div'}
                    style={
                        redux.app.current_locale === 'en'
                            ? {
                                marginRight: '10px',
                                width: '100%'
                            }
                            : {
                                marginRight: '-48px',
                                marginLeft: '10px',
                                width: '100%'
                            }
                    }
                >
                    <div align={redux.app.current_locale === 'en' ? 'right' : 'left'} style={{width: '100%'}}>
                        <Input
                            className={'offers_search_input'}
                            style={{width: '80%'}}
                            size='large'
                            placeholder={t('Search')}
                            onChange={e => changeInputSearch(e)}
                            prefix={<img src={search_icon_black} alt={'search_icon_black'} />}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OffersTopPrice