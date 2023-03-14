import React, {useEffect, useState} from "react";
import "./AllOffers.sass"
import off_head from "../../dist/Img/off_head.png";
import AuthHeader from "../Auth/AuthHeader";
import {Divider, Radio, Row} from "antd";
import OffersPrices from "./Fragments/OffersPrices";
import {t} from "i18next";
import OfferCard from "./Fragments/OfferCard";
import OffersFooter from "./Fragments/OffersFooter";
import {useGetResourceIndex} from "../Functions/api_calls";
import Preloader from "../Preloader";



function AllOffers() {
    const [params, setParams] = useState({})
    const {loadingState, dataState, addData} = useGetResourceIndex('PublicOffer', params,false,false,false,false, {
        PublicClinic:{per_page:5000},
        PublicService:{},
        PublicCategory:{},

    })
    const {setLoading, loading} = loadingState;
    const {setData, data} = dataState;

    const onChangeRadio = (e) => {
        setParams({
            ...params,
            category: e.target.value
        })
    }
console.log(loading, 'params')
    return(
        <div>
            <div className={'bac_div'}>
                <img src={off_head} alt={'off_head'} style={{width:'120%'}}/>
            </div>
            <div className={'offer_logo_div'}>
                <AuthHeader headerState={true}/>
            </div>
            <div className={'menu_div'}>
                <div className={'tab_div'}>
                    <Radio.Group onChange={onChangeRadio} defaultValue="all_offers" className={'radio_grup'}>
                        <Radio.Button value="all_offers">{t("All offers")}</Radio.Button>
                        {
                            addData?.PublicCategory?.items?.map((el) => {
                                return <Radio.Button key={el?.id} value={el?.name}>{el?.name}</Radio.Button>
                            })
                        }
                    </Radio.Group>
                    <Divider />
                    <div>
                        <OffersPrices clinics={addData?.PublicClinic?.items} setParams={setParams} params={params}/>

                    </div>
                </div>
                <div className={'big_div_cards'}>
                    {
                        loading ? <Preloader /> : <Row gutter={[20, 20]} style={{marginTop:20}}>

                            {
                                data?.items?.map((el) => {
                                    return <OfferCard key={el?.id} data={el} id={el?.id} />})
                            }

                        </Row>
                    }

                </div>
            </div>
            <OffersFooter />
        </div>
    )
}

export default AllOffers;