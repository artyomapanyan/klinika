import React, {useState} from "react";
import "./AllOffers.sass"
import off_head from "../../dist/Img/off_head.png";
import AuthHeader from "../Auth/AuthHeader";
import {Divider, Radio, Row} from "antd";
import OffersPrices from "./Fragments/OffersPrices";
import {t} from "i18next";
import OfferCard from "./Fragments/OfferCard";
import off_image_1 from "../../dist/Img/off_image_1.jpg";
import off_image_2 from "../../dist/Img/off_image_2.jpg";
import off_image_3 from "../../dist/Img/off_image_3.jpg";
import off_image_4 from "../../dist/Img/off_image_4.jpg";
import OffersFooter from "./Fragments/OffersFooter";


function AllOffers() {

    const [cardState, setCardState] = useState([
        {
            image: <img src={off_image_1} alt={'off_image_1'} className={'offer_card_image'}/>,
            id: 1,
        },
        {
            image: <img src={off_image_2} alt={'off_image_2'} className={'offer_card_image'}/>,
            id: 2,
        },
        {
            image: <img src={off_image_3} alt={'off_image_3'} className={'offer_card_image'}/>,
            id: 3,
        },
        {
            image: <img src={off_image_4} alt={'off_image_4'} className={'offer_card_image'}/>,
            id: 4,
        },
        {
            image: <img src={off_image_1} alt={'off_image_1'} className={'offer_card_image'}/>,
            id: 5,
        },
        {
            image: <img src={off_image_2} alt={'off_image_2'} className={'offer_card_image'}/>,
            id: 6,
        },
        {
            image: <img src={off_image_3} alt={'off_image_3'} className={'offer_card_image'}/>,
            id: 7,
        },
        {
            image: <img src={off_image_4} alt={'off_image_4'} className={'offer_card_image'}/>,
            id: 8,
        },
    ])

    return(
        <div>
            <div className={'bac_div'}>
                <img src={off_head} alt={'off_head'} style={{width:'130%'}}/>
            </div>
            <div className={'offer_logo_div'}>
                <AuthHeader headerState={true}/>
            </div>
            <div className={'menu_div'}>
                <div className={'tab_div'}>
                    <Radio.Group defaultValue="all_offers" className={'radio_grup'}>
                        <Radio.Button value="all_offers">{t("All offers")}</Radio.Button>
                        <Radio.Button value="hair">{t("Hair")}</Radio.Button>
                        <Radio.Button value="dental_are">{t("Dental Care")}</Radio.Button>
                        <Radio.Button value="laser">{t("Laser")}</Radio.Button>
                        <Radio.Button value="fitness">{t("Fitness")}</Radio.Button>
                        <Radio.Button value="skin">{t("Skin")}</Radio.Button>
                        <Radio.Button value="beauty">{t("Beauty")}</Radio.Button>
                        <Radio.Button value="scans">{t("Scans")}</Radio.Button>
                        <Radio.Button value="labs">{t("Labs")}</Radio.Button>
                        <Radio.Button value="ob_gyn">{t("OB - GYN")}</Radio.Button>
                    </Radio.Group>
                    <Divider />
                    <div>
                        <OffersPrices />

                    </div>
                </div>
                <div className={'big_div_cards'}>
                    <Row gutter={[20, 20]} style={{marginTop:20}}>

                        {
                            cardState.map((el) => {
                                return <OfferCard key={el.id} el={el}/>
                            })
                        }

                    </Row>
                </div>
            </div>
            <OffersFooter />
        </div>
    )
}

export default AllOffers;