import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {postResource, useGetResourceSingle} from "../../../Functions/api_calls";
import {LeftOutlined, PayCircleOutlined} from "@ant-design/icons";
import Preloader from "../../../Preloader";
import clinic2 from "../../../../dist/Img/clinic2.png";
import OfferBookDetailsNew from "../../OfferBookNew/Fragment/OfferBookDetailsNew";
import OfferHours from "../../OfferBookNew/Fragment/OfferHours";
import OfferPrice from "../../OfferBookNew/Fragment/OfferPrice";
import BookAnAppointmentNew from "../../OfferBookNew/Fragment/BookAnAppointmentNew";
import img_thank_you from "../../../../dist/Img/thank_you.png";
import {t} from "i18next";
import {Button, Drawer, Space} from "antd";
import ThankYouOfferDetailsNew from "./ThankYouOfferDetailsNew";
import PaymentFailed from "../../Fragments/PaymentFailed";
import payment_failed_image from "../../../../dist/Img/payment_failed_image.png";

function NewThankYouBookContent({chargeResponse, firstLoadingThankYou, onlineOrClinicPay, isSaudi, moyasarPayStatusState}) {
    let token = useSelector(state => state.auth.token)
    let moyasarIds = useSelector(state => state?.moyasarIds)
    const params = useParams()
    let dispatch = useDispatch()
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
        params.id
    )

    const { loading } = loadingState
    const { data, setData } = dataState

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [loading]);

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
            dispatch({
                type: 'APP_INV_ID',
                payload: {
                    appointment_id: response?.appointment?.id,
                    invoice_id: response?.appointment?.invoices[0]?.id,
                    offer: response?.appointment?.offer?.id,
                    paymentMethodId: response?.appointment?.payment_method?.id
                }
            })
                if (response?.appointment?.id) {
                    //setShowthank(true)
                    document.location.href = response?.redirect
                }
            }
        )
    }

    const rePayOfferAppointmentMoyasar = (e) => {
        setTryAgainLoading(true)
        postResource('RePayPublicAppointment', 'create', token, `${moyasarIds?.appointment_id}/repay-offer-appointment`, {
                payment_method_id: moyasarIds?.paymentMethodId
            }
        ).then((response) => {
            console.log(response)
            dispatch({
                type: 'APP_INV_ID',
                payload: {
                    appointment_id: response?.appointment?.id,
                    invoice_id: response?.appointment?.invoices[0]?.id,
                    offer: response?.appointment?.offer?.id,
                    paymentMethodId: response?.appointment?.payment_method?.id
                }
            })
                setTryAgainLoading(false)
                if (response?.appointment?.id) {

                    document.location.href = response?.redirect
                }
            }
        )

        // e.view.location.pathname = `pay-online/moyasar`


    }

    const onGoOffer = (e) => {
        e.view.location.pathname = `offers/${chargeResponse?.appointment?.offer?.id}`;

    }

    const onGoOfferMoyasar = (e) => {
        e.view.location.pathname = `offers/${moyasarIds?.offer}`;

    }

    const onReBookWidthPaymentMethod = () => {
        setTryAgainLoading(true)
        postResource('RePayPublicAppointment', 'create', token, `${chargeResponse?.appointment?.id}/repay-offer-appointment`, {
                payment_method_id: paymentMethodState
            }
        ).then((response) => {
                setTryAgainLoading(false)
            dispatch({
                type: 'APP_INV_ID',
                payload: {
                    appointment_id: response?.appointment?.id,
                    invoice_id: response?.appointment?.invoices[0]?.id,
                    offer: response?.appointment?.offer?.id,
                    paymentMethodId: response?.appointment?.payment_method?.id
                }
            })
                if (response?.appointment?.id) {
                    //setShowthank(true)
                    document.location.href = response?.redirect
                }
            }
        )
    }

    const onReBookWidthPaymentMethodMoyasar = (e) => {
        setTryAgainLoading(true)
        postResource('RePayPublicAppointment', 'create', token, `${moyasarIds?.appointment_id}/repay-offer-appointment`, {
                payment_method_id: paymentMethodState
            }
        ).then((response) => {
                setTryAgainLoading(false)
            dispatch({
                type: 'APP_INV_ID',
                payload: {
                    appointment_id: response?.appointment?.id,
                    invoice_id: response?.appointment?.invoices[0]?.id,
                    offer: response?.appointment?.offer?.id,
                    paymentMethodId: response?.appointment?.payment_method?.id
                }
            })
                if (response?.appointment?.id) {
                    //setShowthank(true)
                    document.location.href = response?.redirect
                }
            }
        )

        // e.view.location.pathname = `pay-online/moyasar`
    }

    console.log(paymentMethodState, 'ddd')

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
                                {/*<div className={'offer_appointment_sec'}>*/}
                                {/*    /!*<BookAnAppointmentNew data={data} />*!/*/}
                                {/*    <div align={'center'} style={{padding: 24}}>*/}
                                {/*        <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>*/}
                                {/*        <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>*/}

                                {/*        <div style={{marginTop: 10}}>*/}
                                {/*            <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {
                                    firstLoadingThankYou ? <Preloader/> : <div>
                                        {
                                            !onlineOrClinicPay ?
                                                <div className={'offer_appointment_sec'}>
                                                {/*<BookAnAppointmentNew data={data} />*/}
                                                <div align={'center'} style={{padding: 24}}>
                                                    <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>
                                                    <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>

                                                    <div style={{marginTop: 10}}>
                                                        <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>
                                                    </div>
                                                </div>
                                            </div>
                                                : <div>
                                                {
                                                    chargeResponse?.status ?
                                                    chargeResponse?.status === "CAPTURED" ? <div className={'offer_appointment_sec'}>
                                                        {/*<BookAnAppointmentNew data={data} />*/}
                                                        <div align={'center'} style={{padding: 24}}>
                                                            <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>
                                                            <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>
                                                            {/*<div className={'thank_you_smoll_text'}>*/}
                                                            {/*    {t('A brief instruction on what to do next, that the manager will contact him and remind him about the reception')}.*/}
                                                            {/*</div>*/}
                                                            <div style={{marginTop: 10}}>
                                                                <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>
                                                            </div>
                                                        </div>
                                                    </div> : !goBackState ? <div className={'offer_appointment_sec'}>
                                                        <PaymentFailed onGoBack={onGoBack} rePayOfferAppointment={rePayOfferAppointment} tryAgainLoading={tryAgainLoading}/>
                                                    </div> : <div style={{marginTop: 20}} className={'offer_appointment_sec'}>
                                                        <Space className={'drawer_header_text'}>
                                                            <h2 className={'appointment_title'}>{t('Select payment method')}</h2>
                                                        </Space>


                                                        {/*<div className={'mobile_offer_price'}>*/}
                                                        {/*    <OfferPrice data={data} totalState={totalState} verifyResponseNationality={isSaudi}/>*/}
                                                        {/*</div>*/}

                                                        {data?.clinic?.payment_methods.map((item, key) => {
                                                            return <div key={key} className={'payment_section'}>

                                                                <div
                                                                    onClick={() => onpay(item.id)}
                                                                    className={paymentMethodState === item.id ? 'selected_payment_container' : 'payment_container'}
                                                                    //style={{background: paymentMethodState === (key+1) ? '#000000' : '#ffffff'}}
                                                                >
                                                                    <div style={{height: 24,display: 'flex', alignItems: 'center'}}>
                                                                        {
                                                                            item?.logo?.url ? <img src={item?.logo?.url} alt={'mobile_filter_icon'} style={{height: 30}} /> : <PayCircleOutlined />
                                                                        }
                                                                    </div>
                                                                    <div style={{margin: '0 12px', fontSize: 14, fontWeight: 500}}>
                                                                        {item.title}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        })}
                                                        <div>
                                                            {
                                                                activePaymentMethodState ? <div>

                                                                    <Button
                                                                        loading={tryAgainLoading}
                                                                        onClick={onReBookWidthPaymentMethod}
                                                                        type={'primary'}
                                                                        className={'all_offers_book_btns'}
                                                                        style={{marginTop: '20px'}}

                                                                        htmlType={'submit'}
                                                                    >
                                                                        {t('Book_now')}
                                                                    </Button>
                                                                    <div style={{marginTop: 10}}>
                                                                        <Button
                                                                            onClick={(e)=>onGoOffer(e)}
                                                                            style={{border: 'none', backgroundColor: '#F5F6FA', color: '#000000'}}
                                                                            type={'secondary'} className={'all_offers_book_btns'}>{t('Cancel')}</Button>
                                                                    </div>

                                                                </div> : <div></div>
                                                            }
                                                        </div>
                                                    </div> :
                                                        moyasarPayStatusState ? <div className={'offer_appointment_sec'}>
                                                            {/*<BookAnAppointmentNew data={data} />*/}
                                                            <div align={'center'} style={{padding: 24}}>
                                                                <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>
                                                                <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>
                                                                {/*<div className={'thank_you_smoll_text'}>*/}
                                                                {/*    {t('A brief instruction on what to do next, that the manager will contact him and remind him about the reception')}.*/}
                                                                {/*</div>*/}
                                                                <div style={{marginTop: 10}}>
                                                                    <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>
                                                                </div>
                                                            </div>
                                                        </div> : !goBackState ? <div className={'offer_appointment_sec'}>
                                                            <div align={'center'} className={'payment_failed_big_div'}>
                                                                <div style={{padding: '32px 32px 24px 32px'}}>
                                                                    <img src={payment_failed_image} alt={'payment_failed_image'}  />
                                                                </div>
                                                                <div className={'payment_failed_bold_text'}>
                                                                    {t("Payment failed")}
                                                                </div>
                                                                <div className={'payment_failed_light_text'}>
                                                                    {t('There are some problems with paying for a visit to the doctor. You can try again or choose another payment method')}.
                                                                </div>
                                                                <div style={{marginTop: 24}}>
                                                                    <Button loading={tryAgainLoading} onClick={(e)=>rePayOfferAppointmentMoyasar(e)} className={'all_offers_book_btns'} type={'primary'}>{t('Try again')}</Button>

                                                                </div>
                                                                <div style={{marginTop: 12}}>
                                                                    <Button onClick={onGoBack} className={'all_offers_book_btns'} type={'secondary'}>{t('Go back')}</Button>
                                                                </div>

                                                            </div>
                                                        </div> : <div style={{marginTop: 20}} className={'offer_appointment_sec'}>
                                                            <Space className={'drawer_header_text'}>
                                                                <h2 className={'appointment_title'}>{t('Select payment method')}</h2>
                                                            </Space>


                                                            {/*<div className={'mobile_offer_price'}>*/}
                                                            {/*    <OfferPrice data={data} totalState={totalState} verifyResponseNationality={isSaudi}/>*/}
                                                            {/*</div>*/}

                                                            {data?.clinic?.payment_methods.map((item, key) => {
                                                                return <div key={key} className={'payment_section'}>

                                                                    <div
                                                                        onClick={() => onpay(item.id)}
                                                                        className={paymentMethodState === item.id ? 'selected_payment_container' : 'payment_container'}
                                                                        //style={{background: paymentMethodState === (key+1) ? '#000000' : '#ffffff'}}
                                                                    >
                                                                        <div style={{height: 24,display: 'flex', alignItems: 'center'}}>
                                                                            {
                                                                                item?.logo?.url ? <img src={item?.logo?.url} alt={'mobile_filter_icon'} style={{height: 30}} /> : <PayCircleOutlined />
                                                                            }
                                                                        </div>
                                                                        <div style={{margin: '0 12px', fontSize: 14, fontWeight: 500}}>
                                                                            {item.title}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            })}
                                                            <div>
                                                                {
                                                                    activePaymentMethodState ? <div>

                                                                        <Button
                                                                            loading={tryAgainLoading}
                                                                            onClick={(e)=>onReBookWidthPaymentMethodMoyasar(e)}
                                                                            type={'primary'}
                                                                            className={'all_offers_book_btns'}
                                                                            style={{marginTop: '20px'}}

                                                                            htmlType={'submit'}
                                                                        >
                                                                            {t('Book_now')}
                                                                        </Button>
                                                                        <div style={{marginTop: 10}}>
                                                                            <Button
                                                                                onClick={(e)=>onGoOfferMoyasar(e)}
                                                                                style={{border: 'none', backgroundColor: '#F5F6FA', color: '#000000'}}
                                                                                type={'secondary'} className={'all_offers_book_btns'}>{t('Cancel')}</Button>
                                                                        </div>

                                                                    </div> : <div></div>
                                                                }
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }










                                <div className={'thank_you_drawer'}>

                                        <Drawer

                                            placement={'bottom'}
                                            closable={false}
                                            onClose={onClose}
                                            open={open}
                                            height={chargeResponse?.status == "CAPTURED" ? 400 : 500}
                                            style={{borderRadius: '12px 12px 0 0'}}


                                        >
                                            {/*<div >*/}
                                            {/*    /!*<BookAnAppointmentNew data={data} />*!/*/}
                                            {/*    <div align={'center'} style={{padding: 24}}>*/}
                                            {/*        <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>*/}
                                            {/*        <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>*/}
                                            {/*        /!*<div className={'thank_you_smoll_text'}>*!/*/}
                                            {/*        /!*    {t('A brief instruction on what to do next, that the manager will contact him and remind him about the reception.')}*!/*/}
                                            {/*        /!*</div>*!/*/}
                                            {/*        <div style={{marginTop: 10}}>*/}
                                            {/*            <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {
                                                firstLoadingThankYou ? <Preloader/> : <div>
                                                    {
                                                        !onlineOrClinicPay ? <div >
                                                            {/*<BookAnAppointmentNew data={data} />*/}
                                                            <div align={'center'} style={{padding: 24}}>
                                                                <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>
                                                                <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>
                                                                {/*<div className={'thank_you_smoll_text'}>*/}
                                                                {/*    {t('A brief instruction on what to do next, that the manager will contact him and remind him about the reception')}.*/}
                                                                {/*</div>*/}
                                                                <div style={{marginTop: 10}}>
                                                                    <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>
                                                                </div>
                                                            </div>
                                                        </div> : <div>
                                                            {
                                                                chargeResponse?.status ?
                                                                chargeResponse?.status == "CAPTURED" ? <div>
                                                                    {/*<BookAnAppointmentNew data={data} />*/}
                                                                    <div align={'center'} style={{padding: 24}}>
                                                                        <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>
                                                                        <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>
                                                                        {/*<div className={'thank_you_smoll_text'}>*/}
                                                                        {/*    {t('A brief instruction on what to do next, that the manager will contact him and remind him about the reception')}.*/}
                                                                        {/*</div>*/}
                                                                        <div style={{marginTop: 10}}>
                                                                            <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>
                                                                        </div>
                                                                    </div>
                                                                </div> : !goBackState ? <div>
                                                                    <PaymentFailed onGoBack={onGoBack} rePayOfferAppointment={rePayOfferAppointment} tryAgainLoading={tryAgainLoading}/>
                                                                </div> : <div style={{marginTop: 20}}>
                                                                    <Space className={'drawer_header_text'}>
                                                                        <h2 className={'appointment_title'}>{t('Select payment method')}</h2>
                                                                    </Space>


                                                                    <div className={'mobile_offer_price'}>
                                                                        <OfferPrice data={data} totalState={totalState} verifyResponseNationality={isSaudi}/>
                                                                    </div>

                                                                    {data?.clinic?.payment_methods.map((item, key) => {
                                                                        return <div key={key} className={'payment_section'}>

                                                                            <div
                                                                                onClick={() => onpay(item.id)}
                                                                                className={paymentMethodState === (key+1) ? 'selected_payment_container' : 'payment_container'}
                                                                                //style={{background: paymentMethodState === (key+1) ? '#000000' : '#ffffff'}}
                                                                            >
                                                                                <div style={{height: 24,display: 'flex', alignItems: 'center'}}>
                                                                                    {
                                                                                        item?.logo?.url ? <img src={item?.logo?.url} alt={'mobile_filter_icon'} style={{height: 30}} /> : <PayCircleOutlined />
                                                                                    }
                                                                                </div>
                                                                                <div style={{margin: '0 12px', fontSize: 14, fontWeight: 500}}>
                                                                                    {item.title}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    })}
                                                                    <div>
                                                                        {
                                                                            activePaymentMethodState ? <div>

                                                                                <Button
                                                                                    loading={tryAgainLoading}
                                                                                    onClick={onReBookWidthPaymentMethod}
                                                                                    type={'primary'}
                                                                                    className={'all_offers_book_btns'}
                                                                                    style={{marginTop: '20px'}}

                                                                                    htmlType={'submit'}
                                                                                >
                                                                                    {t('Book_now')}
                                                                                </Button>
                                                                                <div style={{marginTop: 10}}>
                                                                                    <Button
                                                                                        onClick={(e)=>onGoOffer(e)}
                                                                                        style={{border: 'none', backgroundColor: '#F5F6FA', color: '#000000'}}
                                                                                        type={'secondary'} className={'all_offers_book_btns'}>{t('Cancel')}</Button>
                                                                                </div>

                                                                            </div> : <div></div>
                                                                        }
                                                                    </div>
                                                                </div>:
                                                                    moyasarPayStatusState ? <div className={'offer_appointment_sec'}>
                                                                        {/*<BookAnAppointmentNew data={data} />*/}
                                                                        <div align={'center'} style={{padding: 24}}>
                                                                            <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>
                                                                            <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>
                                                                            {/*<div className={'thank_you_smoll_text'}>*/}
                                                                            {/*    {t('A brief instruction on what to do next, that the manager will contact him and remind him about the reception')}.*/}
                                                                            {/*</div>*/}
                                                                            <div style={{marginTop: 10}}>
                                                                                <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>
                                                                            </div>
                                                                        </div>
                                                                    </div> : !goBackState ? <div className={'offer_appointment_sec'}>
                                                                        <div align={'center'} className={'payment_failed_big_div'}>
                                                                            <div style={{padding: '32px 32px 24px 32px'}}>
                                                                                <img src={payment_failed_image} alt={'payment_failed_image'}  />
                                                                            </div>
                                                                            <div className={'payment_failed_bold_text'}>
                                                                                {t("Payment failed")}
                                                                            </div>
                                                                            <div className={'payment_failed_light_text'}>
                                                                                {t('There are some problems with paying for a visit to the doctor. You can try again or choose another payment method')}.
                                                                            </div>
                                                                            <div style={{marginTop: 24}}>
                                                                                <Button loading={tryAgainLoading} onClick={(e)=>rePayOfferAppointmentMoyasar(e)} className={'all_offers_book_btns'} type={'primary'}>{t('Try again')}</Button>

                                                                            </div>
                                                                            <div style={{marginTop: 12}}>
                                                                                <Button onClick={onGoBack} className={'all_offers_book_btns'} type={'secondary'}>{t('Go back')}</Button>
                                                                            </div>

                                                                        </div>
                                                                    </div> : <div style={{marginTop: 20}} className={'offer_appointment_sec'}>
                                                                        <Space className={'drawer_header_text'}>
                                                                            <h2 className={'appointment_title'}>{t('Select payment method')}</h2>
                                                                        </Space>


                                                                        {/*<div className={'mobile_offer_price'}>*/}
                                                                        {/*    <OfferPrice data={data} totalState={totalState} verifyResponseNationality={isSaudi}/>*/}
                                                                        {/*</div>*/}

                                                                        {data?.clinic?.payment_methods.map((item, key) => {
                                                                            return <div key={key} className={'payment_section'}>

                                                                                <div
                                                                                    onClick={() => onpay(item.id)}
                                                                                    className={paymentMethodState === (key+1) ? 'selected_payment_container' : 'payment_container'}
                                                                                    //style={{background: paymentMethodState === (key+1) ? '#000000' : '#ffffff'}}
                                                                                >
                                                                                    <div style={{height: 24,display: 'flex', alignItems: 'center'}}>
                                                                                        {
                                                                                            item?.logo?.url ? <img src={item?.logo?.url} alt={'mobile_filter_icon'} style={{height: 30}} /> : <PayCircleOutlined />
                                                                                        }
                                                                                    </div>
                                                                                    <div style={{margin: '0 12px', fontSize: 14, fontWeight: 500}}>
                                                                                        {item.title}
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        })}
                                                                        <div>
                                                                            {
                                                                                activePaymentMethodState ? <div>

                                                                                    <Button
                                                                                        loading={tryAgainLoading}
                                                                                        onClick={(e)=>onReBookWidthPaymentMethodMoyasar(e)}
                                                                                        type={'primary'}
                                                                                        className={'all_offers_book_btns'}
                                                                                        style={{marginTop: '20px'}}

                                                                                        htmlType={'submit'}
                                                                                    >
                                                                                        {t('Book_now')}
                                                                                    </Button>
                                                                                    <div style={{marginTop: 10}}>
                                                                                        <Button
                                                                                            onClick={(e)=>onGoOfferMoyasar(e)}
                                                                                            style={{border: 'none', backgroundColor: '#F5F6FA', color: '#000000'}}
                                                                                            type={'secondary'} className={'all_offers_book_btns'}>{t('Cancel')}</Button>
                                                                                    </div>

                                                                                </div> : <div></div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            }


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
export default NewThankYouBookContent