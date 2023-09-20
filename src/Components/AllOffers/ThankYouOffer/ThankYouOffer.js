import React, {useEffect, useState} from "react";
import "../AllOffers.sass"
import {Button, Col, Divider, Drawer, Dropdown, Radio, Result, Row} from "antd";
import {t} from "i18next";
import {useSearchParams} from "react-router-dom";
import {paramsToObject} from "../../../functions";
import {useGetResourceIndex} from "../../Functions/api_calls";
import AuthHeader from "../../Auth/AuthHeader";
import Preloader from "../../Preloader";
import OffersPrices from "../Fragments/OffersPrices";
import OfferCard from "../Fragments/OfferCard";
import OffersFooter from "../Fragments/OffersFooter";
import off_head from "../../../dist/Img/off_head.png"
import img_thank_you from "../../../dist/Img/thank_you.png"
import CongratulationsText from "./Fragments/CongratulationsText";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import AllOffersHeader from "../Fragments/AllOffersHeader";
import AllOffersMobileHeader from "../Fragments/AllOffersMobileHeader";
import mobile_filter_icon from "../../../dist/icons/mobile_filter_icon.png";
import OfferPriceMobile from "../Fragments/OfferPriceMobile";




function ThankYouOffer() {
    const currentUrl = window.location.href;
    let clinicRedux = useSelector((state) => state?.publicClinic);
    let navigate = useNavigate();

    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({
        clinic: clinicRedux?.id,
        ...paramsToObject(searchParams.entries())
    })

    const [resetState, setResetState] = useState(false)

    const {loadingState, dataState, addData} = useGetResourceIndex('PublicOffer', params,false,false,false,false, {
        PublicClinic:{per_page:5000},
        PublicCategory:{},
    })


    const {loading} = loadingState;
    const {data} = dataState;
    const [filterClinic, setFilterClinic] = useState('')
    const [open, setOpen] = useState(false);


    useEffect(()=>setSearchParams(params),[params])
    const onChangeRadio = (e) => {
        setParams({
            ...params,
            category: e?.target?.value
        })
    }

    const onClick = (e) => {

        setParams({
            ...params,
            sub_category: e?.key,
            //category: null
        })
    }

    const onDropBtnChange = (e) => {

        setParams({
            ...params,
            category: e?.id,
            sub_category: null
        })
    }

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const onApply = () => {
        setOpen(false);
    }


    return(
        <div>
            <div className={'header_img_lng'}>
                <div className={'bac_div'}>
                    <img src={off_head} alt={'off_head'} style={{width:'100%'}}/>
                </div>
                <div className={'offer_logo_div'}>
                    <AllOffersHeader headerState={true}/>
                </div>
            </div>




            <div className={'menu_div'}>
                <div className={'tab_div_mobile'}>
                    <AllOffersMobileHeader/>
                    <div className={'tab_div_mobile_filter_drp'} onClick={showDrawer}>
                        <img src={mobile_filter_icon} alt={'mobile_filter_icon'}/>
                        <span className={'tab_div_mobile_filter_text'}>{t('Filter')}</span>
                    </div>
                </div>

                <Drawer title="" placement="top" onClose={onClose} open={open} closeIcon={false} className={'all_offers_drawer'} height={414}>
                    <OfferPriceMobile setOpen={setOpen} currentUrl={currentUrl} clinics={addData?.PublicClinic?.items} resetState={resetState} setResetState={setResetState} setParams={setParams} params={params} data={data?.items} onApply={onApply}/>
                </Drawer>


                <div className={'tab_div_1'} >
                    <div className={'thank_you_img_text'}>
                        <div className={'thank_you_image_div'}>
                            <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image'}/>
                        </div>
                        <div className={'thank_you_congretulation_div'}>
                            <CongratulationsText clinicRedux={clinicRedux} />
                        </div>
                    </div>

                </div>
            </div>
            <div className={'clinic_name'}>
                <div className={'clinic_name_inn'} >
                    <div style={{color:'#ce4e99', fontSize:32}}>
                        {t('Discover other offers from')}
                    </div>
                    <div style={{fontSize:40, fontWeight:600}}>
                        {clinicRedux?.name}
                    </div>
                </div>
            </div>
            { resetState ? <Preloader /> :
                <div className={'menu_div'} >
                    <div className={'tab_div'}>
                        <Button  type={params?.category || params?.sub_category ?  'secondary' : 'primary'} onClick={onChangeRadio} className={'all_offer_btn_style'} style={{color:params?.category || params?.sub_category ? '#000000' : "#ffffff" }} >{t("All offers")}</Button>
                        {
                            addData?.PublicCategory?.items?.map((el) => {
                                let subCategories = el?.sub_categories?.map((e) => {
                                    return {
                                        label: e?.name,
                                        key: e?.id,
                                    }
                                })
                                return <Dropdown
                                    key={el?.id}
                                    menu={{
                                        items: subCategories,
                                        onClick
                                    }}
                                    placement="bottom"
                                    arrow
                                >

                                    <Button style={{color: params?.category === el?.id ? "#ffffff" : '#000000'}} className={'all_offers_category_radio_button'} type={params?.category === el?.id ? 'primary' : 'secondary'} onClick={() => onDropBtnChange(el)}>{el?.name}</Button>


                                </Dropdown>
                            })
                        }
                        {/*<Radio.Group onChange={onChangeRadio} defaultValue={params.category??''} className={'radio_grup'}>*/}
                        {/*    <Radio.Button value={''}>{t("All offers")}</Radio.Button>*/}
                        {/*    {*/}
                        {/*        addData?.PublicCategory?.items?.map((el) => {*/}
                        {/*            return <Radio.Button key={el?.id} value={el?.id} >{el?.name}</Radio.Button>*/}
                        {/*        })*/}
                        {/*    }*/}
                        {/*</Radio.Group>*/}
                        <Divider />
                        <div>
                            <OffersPrices currentUrl={currentUrl} filterClinic={filterClinic} clinics={addData?.PublicClinic?.items} resetState={resetState} setResetState={setResetState} setParams={setParams} params={params} data={data?.items}/>
                        </div>
                    </div>





                    <div className={'big_div_cards'}>

                        {loading ? <Preloader /> :    <Row gutter={[20, 20]} style={{marginTop:20}}>

                            {
                                data?.items?.length < 1 ? <div className={'no_offers'}>
                                    <Result
                                        title={t("No offers found")}

                                    />
                                </div> : data?.items?.map((el) => {
                                    return <OfferCard key={el?.id} data={el} id={el?.id} />})
                            }

                        </Row>}

                        <div className={'load_more_div'}>
                            <div style={{fontSize: 40, fontWeight: 600}}>
                                {t('Offers from other clinics')}
                            </div>
                            <Button size={'large'} type={'primary'} onClick={()=> navigate('/offers')} >{t('Show All')}</Button>
                        </div>
                    </div>

                </div>}

            <OffersFooter />
        </div>
    )
}

export default ThankYouOffer;