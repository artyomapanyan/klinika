import React, {useEffect, useState} from "react";
import "./AllOffers.sass"
import off_head from "../../dist/Img/off_head.png";

import {Button, Divider, Radio, Result, Row, Dropdown} from "antd";
import OffersPrices from "./Fragments/OffersPrices";
import {t} from "i18next";
import OfferCard from "./Fragments/OfferCard";
import OffersFooter from "./Fragments/OffersFooter";
import {useGetResourceIndex} from "../Functions/api_calls";
import Preloader from "../Preloader";
import {useSearchParams} from "react-router-dom";
import {paramsToObject} from "../../functions";

import AllOffersHeader from "./Fragments/AllOffersHeader";



function AllOffers() {
    const currentUrl = window.location.href;
    const [dataLength, setDataLength] = useState(9)
    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({
        order_by: 'new_price',
        page:1,
        per_page: 15,
        ...paramsToObject(searchParams.entries())
    })


     const [resetState, setResetState] = useState(false)

    const {loadingState, dataState, addData} = useGetResourceIndex('PublicOffer', params,false,false,false,false, {
        PublicClinic:{per_page:5000},
        PublicCategory:{},
        }, {
        loadMore:true
    })


    const {loading} = loadingState;
    const {data} = dataState;

    useEffect(()=>setSearchParams(params),[params])
    const handleNextPage = ()=>{
        setParams((prevState)=>({
            ...prevState,
            page: (+prevState.page)+1
        }))

    //     setDataLength((prevState)=>(
    //         prevState + 5
    // ))

    }
    const onChangeRadio = (e) => {
        setParams({
            ...params,
            category: null,
            sub_category: null
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



    return(
        <div>
            <div className={'bac_div'}>
                <img src={off_head} alt={'off_head'} style={{width:'100%'}}/>
            </div>
            <div className={'offer_logo_div'}>
                <AllOffersHeader headerState={true}/>
            </div>
            { resetState ? <Preloader /> :
             <div className={'menu_div'}>
                <div className={'tab_div'} style={{boxShadow: '0 0 10px 5px rgb(140 152 164 / 40%)'}}>


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




                                // <Dropdown
                                //     key={el?.id}
                                //    // icon={<DownOutlined />}
                                //     //loading={loadings[1]}
                                //     menu={{
                                //         items: subCategories,
                                //         onClick,
                                //     }}
                                //     type={"secondary"}
                                //     //onClick={() => onDropBtnChange(el)}
                                //
                                // >
                                //     {el?.name}
                                // </Dropdown>
                               // return <Radio.Button key={el?.id} value={el?.id} >{el?.name}</Radio.Button>
                            })
                        }

                    <Divider />
                    <div>
                        <OffersPrices currentUrl={currentUrl} clinics={addData?.PublicClinic?.items} resetState={resetState} setResetState={setResetState} setParams={setParams} params={params} data={data?.items}/>
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


                </div>
            </div>}
            <div align={'center'} style={{marginTop:30}}>
                <Button type={'primary'} onClick={handleNextPage} disabled={data?.pagination?.total<=data?.items?.length}>{t('Load more')}</Button>
            </div>
            <div style={{width: '100%'}}>
                <OffersFooter />
            </div>

        </div>
    )
}

export default AllOffers;