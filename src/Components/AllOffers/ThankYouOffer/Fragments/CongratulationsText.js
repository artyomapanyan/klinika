import React from "react";
import {EnvironmentOutlined} from "@ant-design/icons";

function CongratulationsText() {
    return(
        <div>
            <div style={{fontSize: 40, fontWeight: 600}}>
                Congratulations
            </div>
            <div style={{lineHeight:1.5,fontSize:16, marginTop:15}}>
                A text with a brief description of the next steps for the patient. A brief instruction on what to do next, that the manager will contact him and remind him about the reception.
            </div>
            <div style={{fontWeight: 600,fontSize:16, marginTop:25}}>
                Your booking:
            </div>
            <div style={{fontSize:16, marginTop:12}}>
                27 Jan 2022 <span style={{color:'#ce4e99', fontWeight:600, marginLeft:15}}>Tuesday 09.30</span>
            </div>
            <div style={{fontSize:16, marginTop:12}}>
                King Fahd Rd, Al Olaya, Riyadh 12214, Saudi Arabia
            </div>
            <div style={{marginTop:12, cursor:'pointer'}}>
                <EnvironmentOutlined style={{color:"#ce4e99", fontSize:16}}/> <span style={{color:"#ce4e99", fontSize:16, fontWeight:600}}>Show on map</span>
            </div>
        </div>


    )
}
export default CongratulationsText;