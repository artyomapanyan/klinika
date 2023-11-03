import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useGetResourceSingle} from "../../../Functions/api_calls";
import {LeftOutlined} from "@ant-design/icons";
import Preloader from "../../../Preloader";
import clinic2 from "../../../../dist/Img/clinic2.png";
import OfferBookDetailsNew from "../../OfferBookNew/Fragment/OfferBookDetailsNew";
import OfferHours from "../../OfferBookNew/Fragment/OfferHours";
import OfferPrice from "../../OfferBookNew/Fragment/OfferPrice";
import BookAnAppointmentNew from "../../OfferBookNew/Fragment/BookAnAppointmentNew";
import img_thank_you from "../../../../dist/Img/thank_you.png";
import {t} from "i18next";
import {Button, Drawer} from "antd";
import ThankYouOfferDetailsNew from "./ThankYouOfferDetailsNew";

function NewThankYouBookContent() {
    const params = useParams()
    let lngs = useSelector(state => state?.app?.current_locale)
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate()
    const [open, setOpen] = useState(window.innerWidth <= 600 ? true : false);

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


                        <div className={'offer_details_new'}>
                            <ThankYouOfferDetailsNew data={data} showDrawer={showDrawer}/>

                            <div className={'offer_section'}>
                                <div>
                                    {isMobile ? (
                                        <div>
                                            <OfferHours data={data} />
                                            <div style={{ marginTop: '10px' }}>
                                                <OfferPrice data={data} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <OfferPrice data={data} />
                                            <OfferHours data={data} />
                                        </div>
                                    )}
                                </div>

                                <div className={'offer_appointment_sec'}>
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
                                </div>



                                <div className={'thank_you_drawer'}>

                                        <Drawer

                                            placement={'bottom'}
                                            closable={false}
                                            onClose={onClose}
                                            open={open}
                                            height={400}
                                            style={{borderRadius: '12px 12px 0 0'}}


                                        >
                                            <div >
                                                {/*<BookAnAppointmentNew data={data} />*/}
                                                <div align={'center'} style={{padding: 24}}>
                                                    <img src={img_thank_you} alt={'img_thank_you'} className={'thank_you_image_new'}/>
                                                    <div className={'thank_you_bold_text'}>{t('You book an offer')}!</div>
                                                    {/*<div className={'thank_you_smoll_text'}>*/}
                                                    {/*    {t('A brief instruction on what to do next, that the manager will contact him and remind him about the reception.')}*/}
                                                    {/*</div>*/}
                                                    <div style={{marginTop: 10}}>
                                                        <Button onClick={ogOffer}  type={'secondary'} className={'all_offers_book_btns'} style={{border: 'none', color: '#000000', backgroundColor: '#F5F6FA'}}>{t('Close')}</Button>
                                                    </div>
                                                </div>
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
export default NewThankYouBookContent