import React, {useEffect, useState} from "react";
import {Button, Divider} from "antd";
import AppDoctor from "./AppDoctor";
import AppDate from "./AppDate";
import AppTime from "./AppTime";
import AppPersonalDetails from "./AppPersonalDetails";
import AppPaymentMethods from "./AppPaymentMethods";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useParams} from "react-router";

function BookAnAppointment({data}) {
    let token = useSelector((state) => state.auth.token);
    let params = useParams();


    const [dataState, setDataState] = useState({});
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [responseCodeState, setResponseCodeState] = useState();

    const onBooking = () => {
        postResource('PublicAppointment', 'create', token, '', dataState)
    }

    return(
        <div className={'app_big_div'}>
            <div className={'app_title'}>
                <h1 style={{fontWeight: 700}}>
                    One Final Step
                </h1>
                <div style={{color: '#8d8c8c'}}>
                    In Order to Claim This Offer Choose a Doctor & The Best Time For You.
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
                    <AppTime data={data} setDataState={setDataState} dataState={dataState}/>
                </div>
                <div className={'app_doctor'}>
                    <AppPersonalDetails setDataState={setDataState} dataState={dataState} setResponseCodeState={setResponseCodeState} params={params}/>
                </div>
                <div className={'app_doctor'}>
                    <AppPaymentMethods setDataState={setDataState} dataState={dataState}  responseCodeState={responseCodeState}/>
                </div>
            </div>
            <Divider style={{background: '#e3e0e3'}}/>
            <div className={'app_btn_div'}>
                <Button onClick={onBooking} size={'large'} type={'primary'} disabled={dataState?.doctor_id && dataState?.date && dataState?.time && dataState?.payment_method_id  ? false : true}>Book Now</Button>
            </div>
        </div>
    )
}
export default BookAnAppointment;