import React from "react";
import {EnvironmentOutlined} from "@ant-design/icons";

function CongratulationsText({clinicRedux}) {

    return(
        <div>
            <div style={{fontSize: 40, fontWeight: 600}}>
                Congratulations
            </div>
            <div style={{lineHeight:1.5,fontSize:16, marginTop:15}}>
                {clinicRedux?.description}
            </div>
            <div style={{fontWeight: 600,fontSize:16, marginTop:25}}>
                Your booking:
            </div>
            <div style={{fontSize:16, marginTop:12}}>
                {clinicRedux?.date}<span style={{color:'#ce4e99', fontWeight:600, marginLeft:15}}>{clinicRedux?.time}</span>
            </div>
            <div style={{fontSize:16, marginTop:12}}>
                {clinicRedux?.location?.address1}
            </div>
            <a target={'_blank'} href={`https://www.google.com/maps/@${clinicRedux?.location?.latitude},${clinicRedux?.location?.longitude}`}><div style={{marginTop:12, cursor:'pointer'}}>
                <EnvironmentOutlined style={{color:"#ce4e99", fontSize:16}}/> <span style={{color:"#ce4e99", fontSize:16, fontWeight:600}}>Show on map</span>
            </div></a>

        </div>


    )
}
export default CongratulationsText;