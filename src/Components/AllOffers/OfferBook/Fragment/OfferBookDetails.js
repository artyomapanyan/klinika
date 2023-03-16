import React from "react";
import logo from "../../../../dist/Img/Logo-short.svg";
import {Rate} from "antd";

function OfferBookDetails({data}) {
    return(
        <div className={'offer_details'}>
            <div>
                <h2>Offer Details?</h2>
                <div dangerouslySetInnerHTML={{__html: data?.content}} />
            </div>

            <div className={'clinic_card_div'}>
                <div align={'center'}>
                    <img style={{width: '60%'}} src={logo} alt={'logo'}/>
                </div>
                <div style={{padding:25}}>
                    <div style={{display:"block"}}>
                        <h3 style={{fontWeight: 600}}>Klinika Center</h3>
                        <div>
                            <Rate disabled value={4} />
                            <span style={{marginLeft:15, fontSize: 14}}>(5 Reviews)</span>
                        </div>
                        <div style={{marginTop: 25}}><h3 style={{fontWeight: 600}}>Address:</h3></div>
                        <div style={{color: '#8d8c8c'}}>
                            طريق الملك عبدالعزيز الفرعي، 13321 الصحافة، الرياض3321 Saudi Arabia Riyadh As Sulimaniyah
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OfferBookDetails;