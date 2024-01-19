import {useDispatch, useSelector} from "react-redux";
import NavbarOffersHeader from "../OfferBookNew/Fragment/NavbarOffersHeader";
import React, {useEffect, useState} from "react";
import NewThankYouBookContent from "./Fragment/NewThankYouBookContent";
import {changeLanguage} from "i18next";
import {postResource} from "../../Functions/api_calls";

function NewThankYouOffer() {
    let token = useSelector(state => state.auth.token)
    let lngs = useSelector(state => state?.app?.current_locale)
    let dispatch = useDispatch()

    const [chargeResponse, setChargeResponse] = useState({})

    useEffect(()=>{
        if(lngs!=='ar'){
            changeLanguage('ar')
            dispatch({
                type:'LANGUAGE_STATE',
                payload:'ar'
            })
            window.location.reload()
        }
    },[])

    useEffect(()=>{
        let currentURL = window.location.href;
        let urlParts = currentURL.split("?");
        let queryParams = urlParts[1];
        let paramsArray = queryParams.split("&");
        let invoiceParam = null;
        for (let i = 0; i < paramsArray.length; i++) {
            if (paramsArray[i].startsWith("invoice=")) {
                invoiceParam = paramsArray[i].split("=")[1];
                break;
            }
        }

        console.log(invoiceParam);

        postResource('PublicOffersCharge','GetPublicOffersCharge', token,  744, {
            charge:'chg_TS03A0220241435Ph1g1801422'
        }).then((response) => {
            console.log(response)
            setChargeResponse(response)


        })
    },[])

    return (
        <div>
            {/*<div
				style={{
					backgroundColor: 'black',
					width: '100%',
					position: 'sticky',
					top: '0%',
					zIndex: '999',
					padding: '10px'
				}}
			>
				back to offers
			</div>*/}

            <div className={'offers_book_padding_bottom'}>
                <div className={'offer_logo_div_new'}>
                    <NavbarOffersHeader headerState={true} />
                </div>
                <div
                    style={
                        lngs === 'en'
                            ? {}
                            : {
                                direction: 'rtl'
                            }
                    }
                >
                    <div className={'menu_div_new'} style={{ minHeight: 500}}>
                        <NewThankYouBookContent chargeResponse={chargeResponse} />
                    </div>

                    {/**<OffersFooter />**/}
                </div>
            </div>
        </div>
    )
}
export default NewThankYouOffer