import React from "react";
import logo from "../../../../dist/Img/Logo-short.svg";
import {Rate} from "antd";
import {t} from "i18next";

function OfferBookDetails({data}) {

    return(
        <div className={'offer_details'}>
            <div>
                <h2>{t('Offer_Details')}</h2>
                <div dangerouslySetInnerHTML={{__html: data?.content}} />
            </div>

            <div className={'clinic_card_div'}>
                <div align={'center'}>
                    <img style={{width: '60%'}} src={logo} alt={'logo'}/>
                </div>
                <div style={{padding:25}}>
                    <div style={{display:"block"}}>
                        <h3 style={{fontWeight: 600}}>{data?.clinic?.name}</h3>
                        <div>
                            <Rate disabled value={4} />
                            {/*<span style={{marginLeft:15, fontSize: 14}}>`${}${t('Reviews')}`</span>*/}
                        </div>
                        <div style={{marginTop: 25}}><h3 style={{fontWeight: 600}}>{t('Address')}:</h3></div>
                        <div style={{color: '#8d8c8c'}}>
                            {t('Address')}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OfferBookDetails;