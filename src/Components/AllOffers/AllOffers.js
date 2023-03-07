import React, {useState} from "react";
import "./AllOffers.sass"
import off_head from "../../dist/Img/off_head.png";
import AuthHeader from "../Auth/AuthHeader";
import {Divider, Menu, Radio} from "antd";
import OffersPrices from "./Fragments/OffersPrices";
import {t} from "i18next";


function AllOffers() {
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

            </div>
        </div>
    )
}

export default AllOffers;