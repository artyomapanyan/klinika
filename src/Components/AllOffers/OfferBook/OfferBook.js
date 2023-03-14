import React from "react";
import off_head from "../../../dist/Img/off_head.png";
import AuthHeader from "../../Auth/AuthHeader";
import OffersFooter from "../Fragments/OffersFooter";
import OfferBookContent from "./Fragment/OfferBookContent";

function OfferBook() {
    return(
        <div>
            <div className={'bac_div'}>
                <img src={off_head} alt={'off_head'} style={{width:'120%'}}/>
            </div>
            <div className={'offer_logo_div'}>
                <AuthHeader headerState={true}/>
            </div>
            <div className={'menu_div'} style={{minHeight: 500}}>
                <OfferBookContent />
            </div>

            <OffersFooter />
        </div>
    )
}
export default OfferBook;