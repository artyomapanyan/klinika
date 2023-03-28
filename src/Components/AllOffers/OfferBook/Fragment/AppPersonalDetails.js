import React, {useEffect, useState} from "react";
import {CheckCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Form, Input, InputNumber, Space} from "antd";
import {postResource, useGetResourceIndex} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import axios from "axios";
import api from "../../../../Api";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";


function AppPersonalDetails({setDataState, dataState}) {
    let token = useSelector((state) => state.auth.token);

    const [phoneLoading, setPhoneLoading] = useState(false);
    const [verifyState, setVerifyState] = useState(0);
    const [codeAndNumber, setCodeAndNumber] = useState()


    const onNumberChange = (e) => {
        setDataState((prevState) => ({
            ...prevState,
            number: e,
        }))
    }

    const onCodeChange = (e) => {
        setDataState((prevState) => ({
            ...prevState,
            code: e,
        }))
    }


    const onVerifyNumber = (values) => {
        setPhoneLoading(true)
        postResource('PublicOffer', 'PhoneVerify', token, '', values).then((response) => {
            console.log(response)
            setPhoneLoading(false)
            setVerifyState(1)
        })
        setCodeAndNumber(values)

    }
    const enterInput = (e) => {
        setDataState((prevState) => ({
            ...prevState,
            verifyNumber: e?.target?.value,
        }))
    }

    const onChack = (values) => {
        console.log(values, 'ddddd')
        values = {
            ...values,
            phone_country_code: codeAndNumber?.phone_country_code,
            phone_number: codeAndNumber?.phone_number,
        }
        setPhoneLoading(true)
        postResource('PublicOffer', 'PhoneVerify', token, '', values).then((response) => {
            console.log(response)
            setPhoneLoading(false)
            setVerifyState(2)
        })
    }

    const hoursMinSecs = {};
    const { minutes = 2, seconds = 0 } = hoursMinSecs;
    const [[mins, secs], setTime] = React.useState([minutes, seconds]);


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
        name = item.phone_code?`(${item.phone_code}) `:null
        item.id = item.phone_code
        return [name,item]
    }

    console.log(codeAndNumber, 'ghfjgfhjg')
    return (
        <div>
            <Space>
                <CheckCircleOutlined style={{color: dataState?.number ? '#2ce310' : 'gray', fontSize: 22}}/>
                <h2 style={{fontWeight: 600, marginTop: 8}}>Personal Details</h2>
            </Space>
            {dataState?.doctor_id && dataState?.date && dataState?.time ? <div className={'date_carousel_div'}>
                <div>

                    {verifyState === 0 && <Form onFinish={onVerifyNumber} name={'send'}>
                        <div style={{display:'flex'}}>
                            <div style={{width:'35%'}}>
                                <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           handleMapItems={handleMapItems}
                                           resource={'Country'}/>
                            </div>
                            <div style={{width:'100%', marginLeft:10}}>
                                <FormInput label={t('Phone number')} name={'phone_number'} />
                            </div>

                            <Button loading={phoneLoading} style={{marginTop:5, height:47}} size={'large'} type={'primary'} htmlType={'submit'}>Verify New</Button>

                        </div>
                    </Form>}


                    {verifyState === 1 && <div>
                        <Form name={'verify_code'} onFinish={onChack}>
                            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <div style={{width:'50%', marginLeft:10}}>
                                    <FormInput initialValue={'dddddddd'} label={t('Phone number')} />
                                </div>
                                <div style={{width: '20%'}} align={'center'}>
                                    <p>{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
                                </div>
                                <div className={'space_compact'}>
                                    <FormInput label={t('Verify code')} name={'code'} />
                                </div>
                                <Button loading={phoneLoading} style={{background: 'green', color: '#ffffff', marginTop:5, height:47}} htmlType={'submit'}>Check</Button>
                            </div>

                        </Form>



                    </div>}
                    {verifyState === 2 && <div>
                        <Space style={{width: '100%'}} direction={"vertical"}>
                            <Input size={'large'} placeholder='500-000-000' disabled={true}/>
                            <Input size={'large'} placeholder='500-000-000' disabled={true}/>
                            <Input size={'large'} placeholder='500-000-000' disabled={true}/>
                        </Space>

                    </div>}
                </div>

            </div> : <div></div>
            }


        </div>
    )
}

export default AppPersonalDetails;