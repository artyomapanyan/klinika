import React, {useEffect, useState} from "react";
import {Button, Divider} from "antd";
import AppDoctor from "./AppDoctor";
import AppDate from "./AppDate";
import AppTime from "./AppTime";
import AppPersonalDetails from "./AppPersonalDetails";
import AppPaymentMethods from "./AppPaymentMethods";
import {postResource} from "../../../Functions/api_calls";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {t} from "i18next";

function BookAnAppointment({data}) {
    let token = useSelector((state) => state.auth.token);
    let params = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch()


    const [dataState, setDataState] = useState({});
    const [date, setDate] = useState();
    const [dataTimes, setDataTimes] = useState();
    const [responseCodeState, setResponseCodeState] = useState();

    const onBooking = () => {
        postResource('PublicAppointment', 'create', token, '', dataState).then((resource) => {

        })
        navigate('/thank-you');
    }


    useEffect(() => {
        if(data?.clinic?.id) {
            dispatch({
                type:'PUBLIC_CLINIC',
                payload:data?.clinic
            })
        }
    }, [data?.clinic?.id])

    useEffect(() => {
        if(dataState?.date) {
            dispatch({
                type:'PUBLIC_CLINIC',
                payload:{
                    date: dataState?.date
                }
            })
        }
        if(dataState?.time) {
            dispatch({
                type:'PUBLIC_CLINIC',
                payload:{
                    time: dataState?.time
                }
            })
        }
    }, [dataState?.date, dataState?.time])


    return(
        <div className={'app_big_div'}>
            <div className={'app_title'}>
                <h1 style={{fontWeight: 700}}>
                    {t('One Final Step')}
                </h1>
                <div style={{color: '#8d8c8c'}}>
                    {t('In Order to Claim This Offer Choose a Doctor & The Best Time For You.')}
                </div>
                <Divider style={{background: '#e3e0e3'}}/>
            </div>
            <div className={'app_content'}>
                <div className={'app_doctor'}>
                    <AppDoctor data={data} setDataState={setDataState} dataState={dataState} />
                </div>
                <div className={'app_doctor'}>
                    <AppDate data={data} setDataState={setDataState} dataState={dataState} date={date} setDate={setDate}/>
                </div>
                <div className={'app_doctor'}>
                    <AppTime data={data} setDataState={setDataState} dataState={dataState} setDataTimes={setDataTimes}/>
                </div>
                <div className={'app_doctor'}>
                    <AppPersonalDetails responseCodeState={responseCodeState} setDataState={setDataState} dataState={dataState} setResponseCodeState={setResponseCodeState} params={params} date={date} dataTimes={dataTimes}/>
                </div>
                <div className={'app_doctor'}>
                    <AppPaymentMethods data={data} setDataState={setDataState} dataState={dataState}  responseCodeState={responseCodeState}/>
                </div>
            </div>
            <Divider style={{background: '#e3e0e3'}}/>
            <div className={'app_btn_div'}>
                <Button onClick={onBooking} size={'large'} type={'primary'} disabled={dataState?.doctor_id && dataState?.date && dataState?.time && dataState?.payment_method_id  ? false : true}>{t('Book now')}</Button>
            </div>
        </div>
    )
}
export default BookAnAppointment;