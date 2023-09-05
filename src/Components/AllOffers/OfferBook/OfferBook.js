import React from "react";
import off_head from "../../../dist/Img/off_head.png";
import AuthHeader from "../../Auth/AuthHeader";
import OffersFooter from "../Fragments/OffersFooter";
import OfferBookContent from "./Fragment/OfferBookContent";
import {useParams} from "react-router";
import {useGetResourceSingle} from "../../Functions/api_calls";

function OfferBook() {
    const params = useParams();
    const {loadingState, dataState} = useGetResourceSingle('PublicOffer', params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
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