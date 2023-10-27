import React, {useEffect, useState} from "react";
import {Button, Col, Dropdown, Input, Row, Slider, Space} from "antd";
import {t} from "i18next";
import {CaretDownOutlined, DownOutlined, SearchOutlined} from "@ant-design/icons";
import Line_42 from "../../../dist/icons/Line_42.png";
import low_to_high_icon from "../../../dist/icons/low_to_high_icon.png";
import all_offers_clinic_icon from "../../../dist/icons/all_offers_clinic_icon.png";
import search_icon_black from "../../../dist/icons/search_icon_black.png";
import {useSelector} from "react-redux";

function OfferPriceMobile({clinics, setParams, params,  setResetState, currentUrl, onApply, setOpen}) {
    let lngs = useSelector(state => state?.app?.current_locale)
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

    // const items = clinics?.map((el) => {
    //     return{
    //         key: el?.id,
    //         label: el?.name,
    //     }
    // })

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
        setOpen(false)
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
        <div style={{width: '100%'}}>
            <div style={{width: '100%', padding: 16}}>
                <div align={'center'} style={{width: '100%'}}>
                    <Input className={'offers_search_input_mobile'} size="large" placeholder={t("Search")} onChange={(e)=>changeInputSearch(e)} prefix={<img src={search_icon_black} alt={'search_icon_black'}/>} />
                </div>
                <div style={{width: '100%', marginTop: 28}} >

                    <div style={{width:'100%'}} align={'center'}>
                        <div className={'slider_div_mobile'} >
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
                    {
                        lngs === 'ar' ? <div className={'price_mobile'}>
                                            <div className={'price_text_mobile'}>
                                                <div style={{fontSize: 12, color: '#635D6B'}}>
                                                    {t('Price to')}
                                                </div>
                                                <div style={{fontSize: 16, fontWeight: 600, marginTop: 4}}>
                                                    {params?.max_price ?? 5000} {t('SAR')}
                                                </div>

                                            </div>

                                            <div className={'price_text'}>
                                                <img src={Line_42} alt={'Line_42'}  style={{transform: 'rotate(180deg)'}}/>
                                            </div>


                                            <div className={'price_text_mobile'}>
                                                <div style={{fontSize: 12, color: '#635D6B'}}>
                                                    {t('Price from')}
                                                </div>
                                                <div style={{fontSize: 16, fontWeight: 600, marginTop: 4}}>
                                                    {params?.min_price ?? 0} {t('SAR')}
                                                </div>
                                            </div>
                                        </div> : <div className={'price_mobile'}>
                                                    <div className={'price_text_mobile'}>
                                                        <div style={{fontSize: 12, color: '#635D6B'}}>
                                                            {t('Price from')}
                                                        </div>
                                                        <div style={{fontSize: 16, fontWeight: 600, marginTop: 4}}>
                                                            {params?.min_price ?? 0} {t('SAR')}
                                                        </div>
                                                    </div>

                                                    <div className={'price_text'}>
                                                        <img src={Line_42} alt={'Line_42'}/>
                                                    </div>
                                                    <div className={'price_text_mobile'}>
                                                        <div style={{fontSize: 12, color: '#635D6B'}}>
                                                            {t('Price to')}
                                                        </div>
                                                        <div style={{fontSize: 16, fontWeight: 600, marginTop: 4}}>
                                                            {params?.max_price ?? 5000} {t('SAR')}
                                                        </div>

                                                    </div>
                                                </div>
                    }



                </div>
                <div className={'mobile_filter_line'}></div>
                <div style={
                    lngs === 'en'
                        ? {width: '100%', marginTop: 28}
                        : {
                            direction: 'rtl',
                            marginTop: 28
                        }
                }>
                    <div style={{cursor:'pointer'}} onClick={onLowHigh}>
                        <img src={low_to_high_icon} alt={'low_to_high_icon'}/>
                        <span style={{fontSize: 14, margin: '0 10px'}} >
                        {
                            lowHighState ? t("Price: Low to High") : t('Price: High to Low')
                        }

                    </span>
                    </div>
                </div>
                <div style={
                    lngs === 'en'
                        ? {width: '100%'}
                        : {
                            direction: 'rtl'
                        }
                }>
                    <div style={{marginTop: 28}}>
                        {
                            currentUrl.includes('thank-you') ? <div></div> : <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img src={all_offers_clinic_icon} alt={'all_offers_clinic_icon'} style={{marginLeft: lngs === 'en' ? 0 : 10}}/>
                                <Dropdown
                                    menu={{
                                        items,
                                        onClick,}}
                                    trigger={['click']}
                                    style={{width: '100%', height: 402}}


                                >
                                    <div style={{cursor:"pointer", width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                        <div style={{marginLeft:10, fontSize:14}}>{params?.clinic ? items?.find((el) => {
                                            return el?.key === +params?.clinic})?.label : `${t('All Clinics')} (${clinics?.length})`}</div>
                                        <div align={'right'}><CaretDownOutlined style={{color:'#ce4e99'}} /></div>
                                    </div>

                                </Dropdown>
                            </div>
                        }

                    </div>
                </div>
            </div>


            <div className={'all_offers_reset_apply_div'}>
                <div style={{display: 'flex', gap: 16}}>
                    <Button className={'all_offers_apply_btn'} type={"primary"} onClick={onApply}>{t('Apply filters')}</Button>
                    <Button className={'all_offers_reset_btn'} type={"secondary"} onClick={onReset}>{t('Reset')}</Button>
                </div>
            </div>
        </div>
    )
}

export default OfferPriceMobile;