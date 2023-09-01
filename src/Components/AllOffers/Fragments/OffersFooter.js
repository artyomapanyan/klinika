import React from "react";
import Logo_short from "../../../dist/Img/Logo-short.svg";
import app_store from "../../../dist/Img/app_store.png";
import playMarket from "../../../dist/Img/play_market.png";
import {Button, Input, Space} from "antd";
import {t} from "i18next";


function OffersFooter() {
    return(
        <div className={'footer_footer_big_div'}>
            <div className={'footer_content_div'}>
                <div>
                    <img src={Logo_short} alt={'Logo_short'} style={{width:70}}/>
                </div>
                <Space direction={'vertical'}>
                    <div className={'big_bold_text'}>
                        KLINIKA
                    </div>
                    <div style={{fontSize:14, color:'#ebc8f3'}}>Find Your Best Healthcare</div>
                    <div style={{fontSize:14, color:'#ebc8f3'}}>Professional</div>
                    <div className={'white_text'}>Help</div>
                </Space>
                <Space direction={'vertical'}>
                    <div className={'white_text'}>{t('Services')}</div>
                    <div className={'gray_text'}>{t('Physical Therapy')}</div>
                    <div className={'gray_text'}>{t('Clinic Visit')}</div>
                    <div className={'gray_text'}>{t('Home Visit')}</div>
                    <div className={'gray_text'}>{t('Telehealth')}</div>
                    <div className={'gray_text'}>{t('Laboratory')}</div>
                    <div className={'gray_text'}>{t('Nursing')}</div>

                </Space>
                <Space direction={'vertical'}>
                    <div className={'white_text'}>{t('Sign Up For Special Offers')}</div>
                    <div>
                        <Input size={'large'} placeholder="Basic usage" style={{height:50, width:'110%'}}/>
                    </div>
                    <div>
                        <Button size={'large'} type={"primary"} style={{fontWeight:600, height:50}}>{t('Subscribe')}</Button>
                    </div>
                </Space>
                <Space direction={'vertical'}>
                    <div className={'white_text'}>
                        {t('Or You Can use our App!')}
                    </div>
                    <div>
                        <img src={app_store} alt={'app_store'} style={{width:220, borderRadius: 12, border:'2px solid gray'}}/>
                    </div>
                    <div>
                        <img src={playMarket} alt={'playMarket'} style={{width:220, borderRadius: 12, border:'2px solid gray'}}/>
                    </div>
                </Space>


            </div>

        </div>
    )
}
export default OffersFooter;