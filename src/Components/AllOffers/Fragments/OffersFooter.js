import React from "react";
import Logo_short from "../../../dist/Img/Logo-short.svg";
import app_store from "../../../dist/Img/app_store.png";
import playMarket from "../../../dist/Img/play_market.png";
import {Button, Input, Space} from "antd";
import {t} from "i18next";


function OffersFooter() {

    const goAppStore = () => {
        //document.location.href = 'https://apps.apple.com/ru/app/%D9%83%D9%84%D9%8A%D9%86%D9%8A%D9%83%D8%A7-klinika-%D9%86%D9%87%D8%AA%D9%85-%D8%A8%D9%83/id6450057463?l=en-GB'

        window.open(
            'https://apps.apple.com/ru/app/%D9%83%D9%84%D9%8A%D9%86%D9%8A%D9%83%D8%A7-klinika-%D9%86%D9%87%D8%AA%D9%85-%D8%A8%D9%83/id6450057463?l=en-GB',
            '_blank' // <- This is what makes it open in a new window.
        )
    }

    const goGooglePlay = () => {
        //document.location.href = 'https://play.google.com/store/apps/details?id=com.klinikatech.klinika2'

        window.open(
            'https://play.google.com/store/apps/details?id=com.klinikatech.klinika2',
            '_blank' // <- This is what makes it open in a new window.
        )
    }

    const goLandingPage = () => {
        window.open(
            'https://klinikatech.com/',
            '_blank' // <- This is what makes it open in a new window.
        )
    }

    return(
        <div className={'footer_footer_big_div'}>
            <div className={'footer_content_div'}>


                <div style={{cursor: 'pointer', display: 'flex'}} onClick={goLandingPage}>
                    <img src={Logo_short} alt={'Logo_short'} className={'footer_site_logo'} />
                    <div>
                        <Space direction={'vertical'} style={{margin: 10}}>
                            <div className={'big_bold_text'} style={{}}>
                                KLINIKA
                            </div>
                            <div style={{fontSize:14, color:'#ebc8f3'}}>
                                {/*{t('Find Your Best Healthcare')}*/}
                                {t('نبحث عن أفضل رعاية صحية لك')}
                            </div>
                        </Space>


                        <div className={'hidden_url_small'}>
                            <a href="mailto:CS@klinikatech.com" className={'white_text'} style={{fontSize: 20, fontWeight: 800}}>
                                {t('تواصل معنا')}
                            </a>
                            <span className={'white_text'} style={{margin: 5}}>
                            {t('للمساعدة')}
                        </span>
                        </div>
                    </div>

                </div>

                <div className={"all_offers_footer_2div"}>
                    <div  className={'hidden_url_big'}>
                        <a href="mailto:CS@klinikatech.com" className={'white_text'} style={{fontSize: 20, fontWeight: 800}}>
                            {t('تواصل معنا')}
                        </a>
                        <span className={'white_text'} style={{margin: 5}}>
                            {t('للمساعدة')}
                        </span>
                    </div>
                    {/*<Space direction={'vertical'}>*/}
                        {/*<div className={'white_text'}>{t('Services')}</div>*/}
                        {/*<div className={'gray_text'}>{t('Physical Therapy')}</div>*/}
                        {/*<div className={'gray_text'}>{t('Clinic Visit')}</div>*/}
                        {/*<div className={'gray_text'}>{t('Home Visit')}</div>*/}
                        {/*<div className={'gray_text'}>{t('Telehealth')}</div>*/}
                        {/*<div className={'gray_text'}>{t('Laboratory')}</div>*/}
                        {/*<div className={'gray_text'}>{t('Nursing')}</div>*/}

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
                        <div className={'app_play_logos_div'} >
                            <img onClick={goAppStore} src={app_store} alt={'app_store'} className={'logo_app_store'} />

                            <img onClick={goGooglePlay} src={playMarket} alt={'playMarket'} className={'logo_app_store'} />
                        </div>
                    </Space>
                </div>






            </div>

        </div>
    )
}
export default OffersFooter;