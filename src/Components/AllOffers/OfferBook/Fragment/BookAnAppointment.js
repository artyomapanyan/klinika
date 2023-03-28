import React, {useState} from "react";
import {Button, Divider} from "antd";
import AppDoctor from "./AppDoctor";
import AppDate from "./AppDate";
import AppTime from "./AppTime";
import AppPersonalDetails from "./AppPersonalDetails";
import AppPaymentMethods from "./AppPaymentMethods";

function BookAnAppointment() {
    const [dataState, setDataState] = useState({});

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
                    <AppDoctor setDataState={setDataState} dataState={dataState}/>
                </div>
                <div className={'app_doctor'}>
                    <AppDate setDataState={setDataState} dataState={dataState}/>
                </div>
                <div className={'app_doctor'}>
                    <AppTime setDataState={setDataState} dataState={dataState}/>
                </div>
                <div className={'app_doctor'}>
                    <AppPersonalDetails setDataState={setDataState} dataState={dataState}/>
                </div>
                <div className={'app_doctor'}>
                    <AppPaymentMethods setDataState={setDataState} dataState={dataState}/>
                </div>
            </div>
            <Divider style={{background: '#e3e0e3'}}/>
            <div className={'app_btn_div'}>
                <Button size={'large'} type={'primary'}>Book Now</Button>
            </div>
        </div>
    )
}
export default BookAnAppointment;