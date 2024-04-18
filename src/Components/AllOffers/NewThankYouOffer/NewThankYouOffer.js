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
    let moyasarIds = useSelector(state => state?.moyasarIds)
    const [firstLoadingThankYou, setFirstLoadingThankYou] = useState(true)
    const [onlineOrClinicPay, setOnlineOrClinicPay] = useState(false)
    const [isSaudi, setIsSaudi] = useState(false)
    const [moyasarPayStatusState, setMoyasarPayStatusState] = useState(false)

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

        console.log(currentURL)
        console.log(currentURL?.includes('APPROVED'), 'r')

        if(currentURL?.includes('invoice')) {
            setOnlineOrClinicPay(true)

            let url = new URL(currentURL);
            let invoiceParam = url.searchParams.get("invoice");
            let tapIdParam = url.searchParams.get("tap_id");



            postResource('PublicOffersCharge','GetPublicOffersCharge', token,  invoiceParam, {
                charge: tapIdParam
            }).then((response) => {
                setFirstLoadingThankYou(false)
                setChargeResponse(response)
                setIsSaudi(response?.appointment?.patient?.is_saudi)


            })
        } else if(moyasarIds?.paymentMethodId == 5) {
            setMoyasarPayStatusState(currentURL?.includes('APPROVED'))
            setOnlineOrClinicPay(true)
            setFirstLoadingThankYou(false)
        } else {
            setOnlineOrClinicPay(false)
            setFirstLoadingThankYou(false)
        }


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
                        <NewThankYouBookContent moyasarPayStatusState={moyasarPayStatusState} isSaudi={isSaudi} chargeResponse={chargeResponse} firstLoadingThankYou={firstLoadingThankYou} onlineOrClinicPay={onlineOrClinicPay}/>
                    </div>

                    {/**<OffersFooter />**/}
                </div>
            </div>
        </div>
    )
}
export default NewThankYouOffer