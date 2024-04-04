import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {postResource, useGetResourceSingle} from "../../../Functions/api_calls";
import {LeftOutlined, PayCircleOutlined} from "@ant-design/icons";
import Preloader from "../../../Preloader";
import clinic2 from "../../../../dist/Img/clinic2.png";
import ThankYouOfferDetailsNew from "../../NewThankYouOffer/Fragment/ThankYouOfferDetailsNew";
import OfferHours from "../../OfferBookNew/Fragment/OfferHours";
import OfferPrice from "../../OfferBookNew/Fragment/OfferPrice";
import img_thank_you from "../../../../dist/Img/thank_you.png";
import {t} from "i18next";
import {Button, Drawer, Space} from "antd";
import PaymentFailed from "../../Fragments/PaymentFailed";
import MoyasarPage from "../MoyasarPage";


function MoyasarBookContent({chargeResponse, firstLoadingThankYou, onlineOrClinicPay,}) {
    let token = useSelector(state => state.auth.token)
    const params = useParams()
    let reduxIdsd = useSelector(state => state?.moyasarIds)
    let isSaudi = useSelector(state => state?.isSaudi)
    let lngs = useSelector(state => state?.app?.current_locale)
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = useState(window.innerWidth <= 600 ? true : false);
    const [goBackState, setGoBackState] = useState(false)
    const [paymentMethodState, setPaymentMethodState] = useState('')
    const [activePaymentMethodState, setActivePaymentMethodState] = useState(false)
    const [tryAgainLoading, setTryAgainLoading] = useState(false)
    const [totalState, setTotalState] = useState(false)




    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    const { loadingState, dataState } = useGetResourceSingle(
        'PublicOffer',
        reduxIdsd?.offer
    )

    const { loading } = loadingState
    const { data, setData } = dataState

    const onClick = () => {
        navigate(-1)
    }

    //choose the screen size
    const handleResize = () => {
        if (window.innerWidth < 600) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    // create an event listener
    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [isMobile])


    const ogOffer = () => {
        navigate('/offers')
    }

    const onGoBack = () => {
        setGoBackState(true)
        setTotalState(true)
    }

    const onpay = e => {
        setPaymentMethodState(e)
        setActivePaymentMethodState(true)

    }

    const rePayOfferAppointment = () => {
        setTryAgainLoading(true)
        postResource('RePayPublicAppointment', 'create', token, `${chargeResponse?.appointment?.id}/repay-offer-appointment`, {
                payment_method_id: 2
            }
        ).then((response) => {
                setTryAgainLoading(false)
                if (response?.appointment?.id) {
                    //setShowthank(true)
                    document.location.href = response?.redirect
                }
            }
        )
    }

    const onGoOffer = (e) => {
        e.view.location.pathname = `offers/${reduxIdsd?.offer}`;

    }

    const onReBookWidthPaymentMethod = () => {
        setTryAgainLoading(true)
        postResource('RePayPublicAppointment', 'create', token, `${chargeResponse?.appointment?.id}/repay-offer-appointment`, {
                payment_method_id: paymentMethodState
            }
        ).then((response) => {
                setTryAgainLoading(false)
                if (response?.appointment?.id) {
                    //setShowthank(true)
                    document.location.href = response?.redirect
                }
            }
        )
    }



    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left:'10px',
                    width: '40px',
                    height: '40px',
                    zIndex: '999'
                }}
            >
                <div className={'tab_div_mobile_new_offer_arrow'}>
                    <div onClick={onClick}>
                        <LeftOutlined style={{color:'white'}}/>
                    </div>
                </div>
            </div>

            {loading ? (
                <Preloader />
            ) : (
                <div className={'offer_book_card_new'}>
                    <div className={'offer_book_card_image_div'}>

                        <img
                            src={data?.cover?.url ? data?.cover?.url : clinic2}
                            alt='cover'
                            className={'offer_card_image_new'}
                        />


                        <div className={'offer_details_new1'}>

                            <ThankYouOfferDetailsNew data={data} showDrawer={showDrawer}/>

                            <div className={'offer_section'}>
                                <div>
                                    {isMobile ? (
                                        <div>
                                            <OfferHours data={data} />
                                            <div style={{ marginTop: '10px' }}>
                                                <OfferPrice data={data} totalState={true} verifyResponseNationality={isSaudi}/>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <OfferPrice data={data} totalState={true} verifyResponseNationality={isSaudi}/>
                                            <OfferHours data={data} />
                                        </div>
                                    )}
                                </div>

                                <div className={'offer_appointment_sec'}>
                                    <MoyasarPage data={data} isSaudi={isSaudi}/>
                                    <div style={{marginTop: -20}}>
                                        <Button
                                            onClick={(e)=>onGoOffer(e)}
                                            style={{border: 'none', backgroundColor: '#F5F6FA', color: '#000000'}}
                                            type={'secondary'} className={'all_offers_book_btns'}>{t('Cancel')}</Button>
                                    </div>
                                </div>

                                <div className={'thank_you_drawer'}>

                                    <Drawer

                                        placement={'bottom'}
                                        closable={false}
                                        onClose={onClose}
                                        open={open}
                                        height={chargeResponse?.status == "CAPTURED" ? 400 : 500}
                                        style={{borderRadius: '12px 12px 0 0'}}


                                    >

                                        <MoyasarPage data={data} isSaudi={isSaudi}/>
                                         <div style={{marginTop: -20}}>
                                             <Button
                                                 onClick={(e)=>onGoOffer(e)}
                                                 style={{border: 'none', backgroundColor: '#F5F6FA', color: '#000000'}}
                                                 type={'secondary'} className={'all_offers_book_btns'}>{t('Cancel')}</Button>
                                         </div>




                                    </Drawer>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default MoyasarBookContent