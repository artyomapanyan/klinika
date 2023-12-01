import React from "react";
import Logo_short from "../../../dist/Img/Logo-short.svg";
import app_store from "../../../dist/Img/app_store.png";
import playMarket from "../../../dist/Img/play_market.png";
import {Button, Input, Space} from "antd";
import {t} from "i18next";


function OffersFooter() {

    const goAppStore = () => {
        document.location.href = 'https://apps.apple.com/ru/app/%D9%83%D9%84%D9%8A%D9%86%D9%8A%D9%83%D8%A7-klinika-%D9%86%D9%87%D8%AA%D9%85-%D8%A8%D9%83/id6450057463?l=en-GB'
    }

    const goGooglePlay = () => {
        document.location.href = 'https://play.google.com/store/apps/details?id=com.klinikatech.klinika2'
    }

    return(
        <div className={'footer_footer_big_div'}>
            <div className={'footer_content_div'}>

                <div>
                    <img src={Logo_short} alt={'Logo_short'} className={'footer_site_logo'} />
                </div>

                <div className={"all_offers_footer_2div"}>
                    <Space direction={'vertical'}>
                        <div className={'big_bold_text'}>
                            KLINIKA
                        </div>
                        <div style={{fontSize:14, color:'#ebc8f3'}}>{t('Find Your Best Healthcare')}</div>
                        <div style={{fontSize:14, color:'#ebc8f3'}}>{t('Professional')}</div>
                        <a href="mailto:CS@klinikatech.com" className={'white_text'}>{t('Help')}</a>
                    </Space>
                    {/*<Space direction={'vertical'}>*/}
                    {/*    <div className={'white_text'}>{t('Services')}</div>*/}
                    {/*    <div className={'gray_text'}>{t('Physical Therapy')}</div>*/}
                    {/*    <div className={'gray_text'}>{t('Clinic Visit')}</div>*/}
                    {/*    <div className={'gray_text'}>{t('Home Visit')}</div>*/}
                    {/*    <div className={'gray_text'}>{t('Telehealth')}</div>*/}
                    {/*    <div className={'gray_text'}>{t('Laboratory')}</div>*/}
                    {/*    <div className={'gray_text'}>{t('Nursing')}</div>*/}

                    {/*</Space>*/}
                </div>


                <div className={"all_offers_footer_3div"}>
                    {/*<Space direction={'vertical'}>*/}
                    {/*    <div className={'white_text'}>{t('Sign Up For Special Offers')}</div>*/}
                    {/*    <div>*/}
                    {/*        <Input size={'large'} placeholder="Basic usage" style={{height:50, width:'110%'}}/>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <Button size={'large'} type={"primary"} style={{fontWeight:600, height:50}}>{t('Subscribe')}</Button>*/}
                    {/*    </div>*/}
                    {/*</Space>*/}
                    <Space direction={'vertical'}>
                        <div className={'white_text'}>
                            {t('Or You Can use our App!')}
                        </div>
                        <div>
                            <img onClick={goAppStore} src={app_store} alt={'app_store'} className={'logo_app_store'} />
                        </div>
                        <div>
                            <img onClick={goGooglePlay} src={playMarket} alt={'playMarket'} className={'logo_app_store'} />
                        </div>
                    </Space>
                </div>






            </div>

        </div>
    )
}
export default OffersFooter;