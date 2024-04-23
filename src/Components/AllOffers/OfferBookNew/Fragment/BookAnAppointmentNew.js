import React, {useEffect, useRef, useState} from 'react'
import AppDoctor from './AppDoctor'
import AppDate from './AppDate'
import AppTime from './AppTime'
import AppPersonalDetails from './AppPersonalDetails'
import AppPaymentMethods from './AppPaymentMethods'
import {postResource} from '../../../Functions/api_calls'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate, useParams} from 'react-router'
import {t} from 'i18next'
import ThankYouOffer from './ThankYouOffer'
import {Avatar, Button, Collapse, Divider, Space} from 'antd'
import DateTimeSelect
    from "../../../Dashboard/DoctorReworked/Fragments/DoctorReworkedCalendar/Fragments/DateTimeSelect";
import AllOfferCalendar from "./AllOfferCalendar";
import img_thank_you from "../../../../dist/Img/thank_you.png";
import {UserOutlined} from "@ant-design/icons";
import gold_star from "../../../../dist/icons/gold_star.png";
import Preloader from "../../../Preloader";
import {log10} from "chart.js/helpers";
import HCP_Male from "../../../../dist/icons/HCP_Male.png";
import HCP_Female from "../../../../dist/icons/HCP_Female.png";
import PaymentFailed from "../../Fragments/PaymentFailed";

function BookAnAppointment({data, setOpen, setTotalState, setVerifyResponseNationality, totalState, verifyResponseNationality}) {
    let token = useSelector(state => state.auth.token)
    let params = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()


    const [dataState, setDataState] = useState({})
    const [date, setDate] = useState()
    const [dataTimes, setDataTimes] = useState()
    const [responseCodeState, setResponseCodeState] = useState()
    const [loading, setLoading] = useState(false)
    const [namesState, setNamesState] = useState({})
    const [show, setShow] = useState(false)
    const [showthank, setShowthank] = useState(false)
    const [showPayment, setShowPayment] = useState(false)
    const [showButtons, setShowButtons] = useState(true)
    const [verify, setVerify] = useState(0)
    const [doctorKey, setDoctorKey] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [a, seta] = useState(true)
    const personalForm = useRef();


    const [changeCount, setChangeCount] = useState(1)

    const [codeAndNumberState, setCodeAndNumberState] = useState({
        phone_country_code: '966'
    })
    const [emailValidationState, setEmailValidationState] = useState(false)
    const [emailLoadind, setEmailLoadind] = useState(false)



    const onBooking = () => {
        setLoading(true)

        postResource('PublicAppointment', 'create', token, '', dataState).then(
            response => {



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
                    document.location.href = response?.redirect
                } else {
                    if(response?.response?.status == 403) {
                        //setShow(false)
                        setShowPayment(false)
                        setVerify(0)
                        setResponseCodeState(null)
                        setNamesState({})
                        setDataState({
                            ...dataState,
                            payment_method_id: null
                        })
                        setShowButtons(true)
                        //setDoctorId('')
                        //setDoctorKey('')
                        setCodeAndNumberState(prevState => ({
                            phone_country_code: '966'
                        }))
                        setTotalState(false)
                    } else {
                        setShow(false)
                        setShowPayment(false)
                        setVerify(0)
                        setResponseCodeState(null)
                        setNamesState({})
                        setDataState({
                            doctor_id: dataState?.doctor_id
                        })
                        setShowButtons(true)
                        setCodeAndNumberState(prevState => ({
                            phone_country_code: '966'
                        }))
                        setTotalState(false)
                    }
                }


            }
        ).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (data?.clinic?.id) {
            dispatch({
                type: 'PUBLIC_CLINIC',
                payload: data?.clinic
            })
        }
    }, [data?.clinic?.id])

    useEffect(() => {
        if (dataState?.date) {
            dispatch({
                type: 'PUBLIC_CLINIC',
                payload: {
                    date: dataState?.date
                }
            })
        }
        if (dataState?.time) {
            dispatch({
                type: 'PUBLIC_CLINIC',
                payload: {
                    time: dataState?.time
                }
            })
        }
        if (dataState?.doctor_id && dataState?.date && dataState?.time) {
            // setShow(true)
        }

        if (responseCodeState?.patient) {
            //	setShowpay(true)
        }
    }, [dataState?.date, dataState?.time, namesState])

    const onShowCalendar = () => {
        setShow(true)
    }

    const handleShowPayment = () => {

        if(responseCodeState?.patient) {
            personalForm.current.validateFields({
                validateOnly: true
            }).then(

                () => {

                  setShowPayment(true)
                  setShowButtons(false)
                  setTotalState(true)
                  setEmailLoadind(false)


                },
                () => {

                },
            );
        } else {
            personalForm.current.validateFields({
                validateOnly: true
            }).then(

                () => {
                    setEmailLoadind(true)
                    postResource('PublicIsEmailFree', 'PublicIsEmailFreeCustom', token, '', {
                        email: emailValidationState
                    }).then((response) => {

                        if(response?.isEmailFree) {
                            setShowPayment(true)
                            setShowButtons(false)
                            setTotalState(true)
                            setEmailLoadind(false)
                        } else {
                            setEmailLoadind(false)
                        }
                    })

                },
                () => {

                },
            );
        }



    }

    const onCancel = () => {

        setShow(false)
        setShowPayment(false)
        setVerify(0)
        setResponseCodeState(null)
        setNamesState({})
        setDataState({})
        setDoctorId('')
        setDoctorKey('')
        setCodeAndNumberState(prevState => ({
            phone_country_code: '966',
        }))
        setTotalState(false)
    }


    const onCancelAll = () => {

        setShow(false)
        setShowPayment(false)
        setVerify(0)
        setResponseCodeState(null)
        setNamesState({})
        setDataState({})
        setShowButtons(true)
        setDoctorId('')
        setDoctorKey('')
        setCodeAndNumberState(prevState => ({
            phone_country_code: '966'
        }))
        setTotalState(false)

    }


    const onDoctor = (id, key) => {
        setDoctorId(id)
        //setDataState({})
        setDataState(prevState => ({
            ...prevState,
            doctor_id: id
        }));
        setDoctorKey(key.toString());

    }
    const onCancel0 = () => {
        setDataState({})
        setDoctorId('')
        seta(false)
        setDoctorKey('')
        setCodeAndNumberState(prevState => ({
            phone_country_code: '966'
        }))
        setTotalState(false)
        setTimeout(()=>{
            seta(true)
        }, 100)


    }
    // const collapseChange = (key) => {
    //     let key1 = [...key]
    //
    //
    //     // let endKey = key1.splice(key1?.length - 2, key1?.length - 1);
    //     let endKey = key1[key1.length - 1];
    //
    //     setDoctorKey(endKey.toString());
    //
    //
    // }




    const item = data?.doctors?.map((el, key) => {


        return {
            key: key,
            label: <Button disabled={[el?.id].includes(doctorId)}
                           className={dataState?.doctor_id === el?.id ? 'doctor_selected' : 'doctor_container'}
                           key={el?.id} onClick={() => onDoctor(el?.id, key)}>

                <Space>
                    <Avatar
                        size={40}
                        icon={el?.avatar ? <img src={el?.avatar?.url} alt={'image'}/> : el?.gender == 1 ? <img src={HCP_Male} alt={'HCP_Male'} /> : <img src={HCP_Female} alt={'HCP_Female'} />}
                        className={'doctor_avatar'}
                    />
                    <div className={'doctor_name'}
                         style={{color: dataState?.doctor_id === el?.id ? '#ffffff' : '#000000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 280}}>
                        {el?.first} {el?.last}
                    </div>
                </Space>
                <div>
                    {/*<div style={{display: 'flex', gap: 8}}>*/}
                    {/*    <div style={{height: 25, borderRight: '1px solid #a7a8a730'}}></div>*/}
                    {/*    <div style={{*/}
                    {/*        color: dataState?.doctor_id === el?.id ? '#ffffff' : '#000000',*/}
                    {/*        fontSize: 12,*/}
                    {/*        display: 'flex',*/}
                    {/*        gap: 8*/}
                    {/*    }}>*/}
                    {/*        <div><img alt={'gold_star'} src={gold_star}/></div>*/}

                    {/*        <div style={{marginTop: 2}}>0</div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                </div>
            </Button>,
            children: <div key={key}>

                {
                    dataState?.doctor_id === el?.id ?
                        <AllOfferCalendar setDataTimes={setDataTimes} setDataState={setDataState}
                                          dataState={dataState} data={data} date={date} setDate={setDate}  /> :
                        <div></div>
                }
            </div>,
        }
    });



    // 	[
    // 	{
    // 		key: doctorKey,
    // 		label: 'This is panel header 1',
    // 		children: <div>
    // 			{
    // 				dataState?.doctor_id ? <AllOfferCalendar show={show} setDataTimes={setDataTimes} setDataState={setDataState} dataState={dataState} data={data} date={date} setDate={setDate}/> : <div></div>
    // 			}
    // 		</div>,
    // 	},
    // ]



    return (
        <div>
            <div>
                {show === true ? (
                    ''
                ) : (
                    <>
                        <div
                            className={'tab_div_mobile_new_offer'}
                        >
                            <div>
                                <div className={'drawer_header_text'}>
                                    <p className={'appointment_title'}>{t('Select doctor and date')}</p>
                                </div>
                                {/*<div className={'collepse_offer_calendar'}>*/}
                                {/*    /!*<AppDoctor*!/*/}
                                {/*    /!*	data={data}*!/*/}
                                {/*    /!*	setDataState={setDataState}*!/*/}
                                {/*    /!*	dataState={dataState}*!/*/}
                                {/*    /!/*/}


                                {/*    /!*{data?.doctors?.map((el, key) => {*!/*/}

                                {/*    /!*	return (*!/*/}
                                {/*    /!*		<div className={'doctor_container'} key={el?.id} onClick={() => onDoctor(el?.id)}>*!/*/}

                                {/*    /!*				<Space>*!/*/}
                                {/*    /!*					<Avatar*!/*/}
                                {/*    /!*						size={40}*!/*/}
                                {/*    /!*						icon={el?.avatar ? <img src={el?.avatar?.url} alt={'image'} /> : <UserOutlined />}*!/*/}
                                {/*    /!*						className={'doctor_avatar'}*!/*/}
                                {/*    /!*					/>*!/*/}
                                {/*    /!*					<div className={'doctor_name'}>*!/*/}
                                {/*    /!*						{el?.first} {el?.last}*!/*/}
                                {/*    /!*					</div>*!/*/}
                                {/*    /!*				</Space>*!/*/}
                                {/*    /!*			*!/*/}
                                {/*    /!*		</div>*!/*/}
                                {/*    /!*	)*!/*/}
                                {/*    /!*})}*!/*/}

                                {/*    <Collapse destroyInactivePanel={true}*/}
                                {/*              items={item}*/}
                                {/*              onChange={collapseChange}*/}
                                {/*              expandIcon={() => ''}*/}
                                {/*              bordered={false}*/}
                                {/*              ghost={true}*/}
                                {/*    >*/}
                                {/*    </Collapse>*/}


                                {/*</div>*/}
                                {
                                    a ? <div className={'collepse_offer_calendar'}>
                                        <Collapse destroyInactivePanel={false}
                                                  items={item}
                                                  //onChange={collapseChange}
                                                  expandIcon={() => ''}
                                                  bordered={false}
                                                  ghost={true}
                                                  activeKey={doctorKey}

                                        >
                                        </Collapse>


                                    </div> : <Preloader/>
                                }





                            </div>
                        </div>

                        <div className={'calendar_div'}>
                            <div className={'calendar_date_div'}>
                                {/*<AppDate*/}
                                {/*	data={data}*/}
                                {/*	setDataState={setDataState}*/}
                                {/*	dataState={dataState}*/}
                                {/*	date={date}*/}
                                {/*	setDate={setDate}*/}
                                {/*	setDataTimes={setDataTimes}*/}
                                {/*/>*/}


                                {/*{*/}
                                {/*	dataState?.doctor_id ? <AllOfferCalendar show={show} setDataTimes={setDataTimes} setDataState={setDataState} dataState={dataState} data={data} date={date} setDate={setDate}/> : <div></div>*/}
                                {/*}*/}


                            </div>

                        </div>
                    </>
                )}
                {
                    dataState?.doctor_id ? <div></div> : <div>
                        <div style={{marginTop: 10}}>
                            <Button className={'all_offers_book_btns'}
                                    disabled={dataState?.doctor_id && dataState?.date && dataState?.time ? false : true}
                                    type={'primary'} style={{width: '100%'}}>{t('Continue')}</Button>
                        </div>
                        <div style={{marginTop: 10}} className={'all_offer_first_cancel_btn_div_big'}>
                            <Button onClick={()=>navigate(-1)} className={'all_offers_book_btns'} type={'secondary'} style={{
                                width: '100%',
                                border: 'none',
                                backgroundColor: '#F5F6FA',
                                color: '#000000'
                            }}>{t('Cancel')}</Button>
                        </div>
                        <div style={{marginTop: 10}} className={'all_offer_first_cancel_btn_div_small'}>
                            <Button onClick={()=>setOpen(false)} className={'all_offers_book_btns'} type={'secondary'} style={{
                                width: '100%',
                                border: 'none',
                                backgroundColor: '#F5F6FA',
                                color: '#000000'
                            }}>{t('Cancel')}</Button>
                        </div>
                    </div>
                }
                {
                    dataState?.doctor_id ? show ? <div></div> : <div>
                        <div style={{marginTop: 10}}>
                            <Button onClick={onShowCalendar} className={'all_offers_book_btns'}
                                    disabled={dataState?.doctor_id && dataState?.date && dataState?.time ? false : true}
                                    type={'primary'} style={{width: '100%'}}>{t('Continue')}</Button>
                        </div>
                        <div style={{marginTop: 10}}>
                            <Button onClick={onCancel0} className={'all_offers_book_btns'} type={'secondary'} style={{
                                width: '100%',
                                border: 'none',
                                backgroundColor: '#F5F6FA',
                                color: '#000000'
                            }}>{t('Cancel')}</Button>
                        </div>
                    </div> : <div></div>
                }

                {
                    <div>
                        <AppPersonalDetails
                            // onBooking={onBooking}
                            setNamesState={setNamesState}
                            namesState={namesState}
                            responseCodeState={responseCodeState}
                            setDataState={setDataState}
                            dataState={dataState}
                            setResponseCodeState={setResponseCodeState}
                            params={params}
                            date={date}
                            dataTimes={dataTimes}
                            showPayment={showPayment}
                            setShowPayment={setShowPayment}
                            show={show}
                            verifyState={verify}
                            personalForm={personalForm}
                            setVerifyState={setVerify}
                            codeAndNumberState={codeAndNumberState}
                            setCodeAndNumberState={setCodeAndNumberState}
                            setVerifyResponseNationality={setVerifyResponseNationality}
                            setEmailValidationState={setEmailValidationState}
                            setVerify={setVerify}
                        setShowButtons={setShowButtons}
                        setTotalState={setTotalState}
                        />
                    </div>
                }
                {
                    !showPayment && !show ? <div></div> : showButtons ? <div>
                        <div style={{marginTop: 10}}>
                            <Button onClick={handleShowPayment} className={'all_offers_book_btns'}
                                    form={'personal_form'}
                                    htmlType={'submit'}
                                    loading={emailLoadind}
                                    disabled={namesState?.first && namesState?.last && namesState?.email ? false : true}
                                    type={'primary'} style={{width: '100%'}}>{t('Continue')}</Button>
                        </div>
                        <div style={{marginTop: 10}}>
                            <Button onClick={onCancel} className={'all_offers_book_btns'} type={'secondary'} style={{
                                width: '100%',
                                border: 'none',
                                backgroundColor: '#F5F6FA',
                                color: '#000000'
                            }}>{t('Cancel')}</Button>
                        </div>
                    </div> : <div></div>
                }
                {showPayment == true ? (
                    <div>
                        <AppPaymentMethods
                            data={data}
                            setDataState={setDataState}
                            dataState={dataState}
                            responseCodeState={responseCodeState}
                            totalState={totalState}
                            verifyResponseNationality={verifyResponseNationality}
                        />
                    </div>
                ) : (
                    ''
                )}

                {/*<div>*/}
                {/*    <PaymentFailed />*/}
                {/*</div>*/}


                <div className={'tab_div_mobile_new_offer'}>

                    <div>
                        {
                            dataState?.payment_method_id ? <div>

                                <Button
                                    loading={loading}
                                    onClick={onBooking}
                                    type={'primary'}
                                    className={'all_offers_book_btns'}
                                    style={{marginTop: '20px'}}

                                    htmlType={'submit'}
                                >
                                    {t('Book_now')}
                                </Button>
                                <div style={{marginTop: 10}}>
                                    <Button onClick={onCancelAll}
                                            style={{border: 'none', backgroundColor: '#F5F6FA', color: '#000000'}}
                                            type={'secondary'} className={'all_offers_book_btns'}>{t('Cancel')}</Button>
                                </div>

                            </div> : <div></div>
                        }

                    </div>
                </div>
            </div>

            {/**    {showthank == true ? <ThankYouOffer /> : ''} */}
        </div>
    )
}

export default BookAnAppointment
