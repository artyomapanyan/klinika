import React, {useState} from "react";
import {CheckCircleOutlined} from "@ant-design/icons";
import {Button, Input, InputNumber, Space} from "antd";
import {t} from "i18next";
import Resources from "../../../../store/Resources";
import FormInput from "../../../Fragments/FormInput";
import Radio from "antd/lib/radio/radio";


function AppPaymentMethods({setDataState, dataState}) {
    const [paymentMethodState, setPaymentMethodState] = useState('')



    const onChangeDetails = () => {
        setDataState((prevState)=>({
            ...prevState,
            payment: ''
        }))
        setPaymentMethodState('');
    }

    const onChange = (e) => {
        setPaymentMethodState(e.target.value);
        setDataState((prevState)=>({
            ...prevState,
            payment: e.target.value,
        }))
    };

    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:paymentMethodState ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>Payment Method</h2>
            </Space>
            {
                dataState?.doctor_id && dataState?.date && dataState?.time && dataState?.payment && dataState?.verifyNumber ? <div>
                    <Space>
                        Selected Payment Method: <span className={'selected_text'}>{dataState?.payment}</span>
                        <Button type={'secondary'} onClick={onChangeDetails} style={{borderRadius:15}}>Change Payment Method</Button>
                    </Space>
                </div> : dataState?.verifyNumber === 'Verification code successfully sent to your phone number' ? <div className={'date_carousel_div'}>
                    <div>
                        <Radio.Group onChange={onChange}>
                            <Space direction="vertical">
                                <Radio value={'cash'}>Cash</Radio>
                                <Radio value={'tap-payments'}>Tap Payments</Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                </div> :<div></div>
            }



        </div>
    )
}
export default AppPaymentMethods;