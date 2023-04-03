import React, {useEffect, useState} from "react";
import "../AllOffers.sass"
import {Button, Col, Divider, Radio, Result, Row} from "antd";
import {t} from "i18next";
import {useSearchParams} from "react-router-dom";
import {paramsToObject} from "../../../functions";
import {postResource, useGetResourceIndex} from "../../Functions/api_calls";
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




function ThankYouOffer() {
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

console.log(clinicRedux,'clinic')

    useEffect(()=>setSearchParams(params),[params])
    const onChangeRadio = (e) => {
        setParams({
            ...params,
            category: e?.target?.value
        })
    }
    return(
        <div>
            <div className={'bac_div'}>
                <img src={off_head} alt={'off_head'} style={{width:'120%'}}/>
            </div>
            <div className={'offer_logo_div'}>
                <AuthHeader headerState={true}/>
            </div>
            <div className={'menu_div'}>
                <div className={'tab_div'} style={{boxShadow: '0 0 10px 5px rgb(140 152 164 / 40%)'}}>
                    <Row>
                        <Col lg={10} style={{padding:80}}>
                            <img src={img_thank_you} alt={'img_thank_you'} style={{width:200}}/>
                        </Col>
                        <Col lg={14} style={{padding:60}}>
                            <CongratulationsText clinicRedux={clinicRedux} />
                        </Col>
                    </Row>

                </div>
            </div>
            <div className={'clinic_name'}>
                <div className={'clinic_name_inn'} >
                    <div style={{color:'#ce4e99', fontSize:32}}>
                        Discover other offers from
                    </div>
                    <div style={{fontSize:40, fontWeight:600}}>
                        {clinicRedux?.name}
                    </div>
                </div>
            </div>
            { resetState ? <Preloader /> :
                <div className={'menu_div'} >
                    <div className={'tab_div'}>
                        <Radio.Group onChange={onChangeRadio} defaultValue={params.category??''} className={'radio_grup'}>
                            <Radio.Button value={''}>{t("All offers")}</Radio.Button>
                            {
                                addData?.PublicCategory?.items?.map((el) => {
                                    return <Radio.Button key={el?.id} value={el?.id} >{el?.name}</Radio.Button>
                                })
                            }
                        </Radio.Group>
                        <Divider />
                        <div>
                            <OffersPrices filterClinic={filterClinic} clinics={addData?.PublicClinic?.items} resetState={resetState} setResetState={setResetState} setParams={setParams} params={params} data={data?.items}/>
                        </div>
                    </div>
                    <div className={'big_div_cards'}>

                        {loading ? <Preloader /> :    <Row gutter={[20, 20]} style={{marginTop:20}}>

                            {
                                data?.items?.length < 1 ? <div className={'no_offers'}>
                                    <Result
                                        title="No offers found"

                                    />
                                </div> : data?.items?.map((el) => {
                                    return <OfferCard key={el?.id} data={el} id={el?.id} />})
                            }

                        </Row>}

                        <div className={'load_more_div'}>
                            <div style={{fontSize: 40, fontWeight: 600}}>
                                Offers from other clinics
                            </div>
                            <Button size={'large'} type={'primary'} onClick={()=> navigate('/offers')} >Show All</Button>
                        </div>
                    </div>

                </div>}

            <OffersFooter />
        </div>
    )
}

export default ThankYouOffer;