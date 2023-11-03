import React, {useEffect, useRef, useState, useMemo} from "react";
import {CheckCircleOutlined} from "@ant-design/icons";
import {Button, Form, Input, Space, notification } from "antd";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import {isNullOrUndef} from "chart.js/helpers";



function AppPersonalDetails({setDataState, dataState, setResponseCodeState, responseCodeState, params, dataTimes, date, setNamesState}) {
    let token = useSelector((state) => state.auth.token);
    let formRef= useRef();
    let refObj = formRef?.current?.getFieldValue()
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [verifyState, setVerifyState] = useState(0);
    const [codeAndNumber, setCodeAndNumber] = useState()
    const [verifyResponse, setVerifyResponse] = useState()
    const [codeAndNumberState, setCodeAndNumberState] = useState({})
    const [codeStatus, setCodeStatus] = useState(null)



    useEffect(() => {
        if(dataState?.payment_method_id){
            if(verifyResponse?.patient?.id) {
                setDataState((prevState) => ({
                    ...prevState,
                    booked_at:date?.date + " " + dataTimes?.time,
                    code: codeAndNumber?.code,
                    patient_id: verifyResponse?.patient?.id,
                    offer_id:params.id
                }))
            } else {
                setDataState((prevState) => ({
                    ...prevState,
                    offer_id:params.id,
                    code: codeAndNumber?.code,
                    booked_at:date?.date + " " + dataTimes?.time,
                    patient: {
                        ...refObj,
                        phone_number: codeAndNumber?.phone_number,
                        phone_country_code:codeAndNumber?.phone_country_code,
                    },
                }))
            }

        }
    }, [dataState?.payment_method_id, refObj])

    const onVerifyNumber = (values) => {
        setPhoneLoading(true)
        postResource('PublicOffer', 'PhoneVerify', token, '', values).then((response) => {


            setCodeStatus(response)
            setPhoneLoading(false)
            if(response?.errors === null) {
                setVerifyState(1)
            } else {
                setVerifyState(0)
            }


        })
        setCodeAndNumber(values)

    }

    const [api, contextHolder] = notification.useNotification();

    // const enterInput = (e) => {
    //     setDataState((prevState) => ({
    //         ...prevState,
    //         verifyNumber: e?.target?.value,
    //     }))
    // }

    const openNotification = (placement) => {
        api.error({
            message: `Notification`,
            description: t('You entered an incorrect code'),
            placement,
        });
    };


    const onVerifyCode = (values) => {
        values = {
            ...values,
            phone_country_code: codeAndNumber?.phone_country_code,
            phone_number: codeAndNumber?.phone_number,
        }
        setCodeAndNumber(values)

        setPhoneLoading(true)
        postResource('PublicOffer', 'CodeVerify', token, '', values).then((response) => {

            setResponseCodeState(response)
            setVerifyResponse(response)
            setPhoneLoading(false)
            setNamesState({
                first: response?.patient?.first,
                last: response?.patient?.last,
                email: response?.patient?.email,
            })

            if(response?.message === 'Verification code successfully sent to your phone number'){
                setDataState((prevState) => ({
                    ...prevState,
                    verifyNumber: 'Verification code successfully sent to your phone number',
                }))
            }

            if(response === 'You entered an incorrect code' || response === 'لقد قمت بإدخال رمز غير صحيح'){
                openNotification('bottomRight')
            }

        })


    }



    const hoursMinSecs = {};
    const { minutes = 2, seconds = 0 } = hoursMinSecs;
    const [[mins, secs], setTime] = React.useState([minutes, seconds]);
    const onSendSMSAgain = () => {
        setVerifyState(0)
        setCodeAndNumber(null)
        setTime([1, 59])
    }

    const tick = () => {

        if (mins === 0 && secs === 0)
            clearInterval()
        else if (secs === 0) {
            setTime([mins - 1, 59]);
        } else {
            setTime([mins, secs - 1]);
        }
    };

    React.useEffect(() => {
        if(codeAndNumber){
            const timerId = setInterval(() => tick(), 1000);
            return () => clearInterval(timerId);
        }

    });

    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(${item.phone_code}) ${item.name} `:null
        item.id = item.phone_code
        return [name,item]
    }


    const handleValuesChange = (changed) => {

        setCodeAndNumberState((prevState)=>({
            ...prevState,
            ...changed
        }))
    }

    const handleNamesChange = (changed) => {
        setNamesState((prevState)=>({
            ...prevState,
            ...changed
        }))
    }


    return (
        <div>

            {contextHolder}

            <Space>
                <CheckCircleOutlined style={{color:verifyResponse ? '#2ce310' : 'gray', fontSize: 22}}/>
                <h2 style={{fontWeight: 600, marginTop: 8}}>{t('Personal Details')}</h2>
            </Space>
            {dataState?.doctor_id && dataState?.date && dataState?.time ? <div className={'date_carousel_div'}>
                <div>

                    {verifyState === 0 && <Form
                        onFinish={onVerifyNumber}
                        onValuesChange={handleValuesChange}
                        name={'send'}>
                        <div className={'personal_details_code_numbet_div'}>
                            <div className={'personal_details_code_div'}>
                                <FormInput label={t('Country Code')} name={'phone_country_code'} inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           handleMapItems={handleMapItems}
                                           resource={'PublicCountry'}/>
                            </div>
                            <div className={'personal_details_number_div'}>
                                <FormInput label={t('Phone number')} name={'phone_number'} maxLength={10} rules={[{required: true}]}/>
                            </div>

                            <Button disabled={!codeAndNumberState?.phone_country_code || !codeAndNumberState?.phone_number} loading={phoneLoading} style={{marginTop:5, height:47}} size={'large'} type={'primary'} htmlType={'submit'}>{t('Send code')}</Button>

                        </div>
                    </Form>}


                    {!responseCodeState || typeof responseCodeState == 'string' ? verifyState === 1 && <div>
                        <Form name={'verify_code'} onFinish={onVerifyCode}>
                            <div className={'verify_code_form_big_div'}>
                                <div  className={'verify_code_form_number_div'} >
                                    <Input value={`+${codeAndNumber?.phone_country_code}${codeAndNumber?.phone_number}`} style={{marginTop:7, height:46, borderRadius:12}}/>
                                    <div className={'change_number'} onClick={onSendSMSAgain}>{t('Change Number')}</div>
                                </div>
                                <div style={{width: '20%'}} align={'center'}>
                                    {
                                        mins === 0 && secs === 0 ? <div className={'send_again_text'} onClick={onSendSMSAgain}>{t('Send Again')}</div> :
                                            <p>{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
                                    }
                                </div>
                                <div className={'space_compact'}>
                                    <FormInput label={t('Verify code')} name={'code'} />
                                </div>
                                <Button loading={phoneLoading} style={{background: 'green', color: '#ffffff', marginTop:5, height:47}} htmlType={'submit'}>{t('Verify')}</Button>
                            </div>

                        </Form>
                    </div> :<div></div> }
                    {responseCodeState && typeof responseCodeState !== 'string' ? <div>
                        <Space style={{width: '100%'}} direction={"vertical"}>
                            <Form ref={formRef}
                                  onValuesChange={handleNamesChange}
                            >
                                <FormInput inputDisabled={verifyResponse?.patient?.first} label={t('First Name')} name={'first'} initialValue={verifyResponse?.patient?.first} rules={[{required: true}]} />
                                <FormInput inputDisabled={verifyResponse?.patient?.last} label={t('Last Name')} name={'last'} initialValue={verifyResponse?.patient?.last} rules={[{required: true}]} />
                                <FormInput inputDisabled={verifyResponse?.patient?.email} label={t('Email')} name={'email'} initialValue={verifyResponse?.patient?.email} rules={[{required: true}]} />
                            </Form>

                        </Space>

                    </div> : <div></div>}
                </div>

            </div> : <div></div>
            }


        </div>
    )
}

export default AppPersonalDetails;