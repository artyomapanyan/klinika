import React, {useEffect, useState} from "react";
import "./AllOffers.sass"
import off_head from "../../dist/Img/off_head.png";
import AuthHeader from "../Auth/AuthHeader";
import {Divider, Radio, Result, Row} from "antd";
import OffersPrices from "./Fragments/OffersPrices";
import {t} from "i18next";
import OfferCard from "./Fragments/OfferCard";
import OffersFooter from "./Fragments/OffersFooter";
import {useGetResourceIndex} from "../Functions/api_calls";
import Preloader from "../Preloader";
import {useSearchParams} from "react-router-dom";
import {paramsToObject} from "../../functions";



function AllOffers() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({
        order_by: 'new_price',
        ...paramsToObject(searchParams.entries())
    })

     const [resetState, setResetState] = useState(false)

    const {loadingState, dataState, addData} = useGetResourceIndex('PublicOffer', params,false,false,false,false, {
        PublicClinic:{per_page:5000},
        //PublicService:{},
        PublicCategory:{},
        })


    const {loading} = loadingState;
    const {data} = dataState;

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
            { resetState ? <Preloader /> :
             <div className={'menu_div'}>
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
                        <OffersPrices clinics={addData?.PublicClinic?.items} resetState={resetState} setResetState={setResetState} setParams={setParams} params={params} data={data?.items}/>
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


                </div>
            </div>}
            <OffersFooter />
        </div>
    )
}

export default AllOffers;