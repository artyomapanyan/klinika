import React from "react";
import {EnvironmentOutlined} from "@ant-design/icons";
import {t} from "i18next";

function CongratulationsText({clinicRedux}) {

    return(
        <div>
            <div className={'congratulations_text'}>
                {t('Congratulations')}
            </div>
            <div style={{lineHeight:1.5,fontSize:16, marginTop:15}}>
                {clinicRedux?.description}
            </div>
            <div style={{fontWeight: 600,fontSize:16, marginTop:25}}>
                {t('Your_booking')}
            </div>
            <div style={{fontSize:16, marginTop:12}}>
                {clinicRedux?.date}<span style={{color:'#ce4e99', fontWeight:600, marginLeft:15}}>{clinicRedux?.time}</span>
            </div>
            <div style={{fontSize:16, marginTop:12}}>
                {clinicRedux?.location?.address1?.en}
            </div>
            <a target={'_blank'} href={`https://www.google.com/maps/search/?api=1&query=${clinicRedux?.location?.latitude},${clinicRedux?.location?.longitude}`}><div style={{marginTop:12, cursor:'pointer'}}>
                <EnvironmentOutlined style={{color:"#ce4e99", fontSize:16}}/> <span style={{color:"#ce4e99", fontSize:16, fontWeight:600}}>{t('Show on map')}</span>
            </div></a>

        </div>


    )
}
export default CongratulationsText;