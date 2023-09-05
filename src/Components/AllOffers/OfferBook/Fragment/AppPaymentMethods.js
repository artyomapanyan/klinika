import React, {useState} from "react";
import {CheckCircleOutlined} from "@ant-design/icons";
import {Button, Space} from "antd";
import Radio from "antd/lib/radio/radio";
import {t} from "i18next";


function AppPaymentMethods({setDataState, dataState, responseCodeState, data}) {
    const [paymentMethodState, setPaymentMethodState] = useState('')

   // console.log(data)



    const onChangeDetails = () => {
        setDataState((prevState)=>({
            ...prevState,
            payment_method_id: ''
        }))
        setPaymentMethodState('');
    }

    const onChange = (e) => {
        setPaymentMethodState(e.target.value);
        setDataState((prevState)=>({
            ...prevState,
            payment_method_id: e.target.value,
        }))
    };

    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:paymentMethodState ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>{t('Payment Method')}</h2>
            </Space>
            {
                dataState?.doctor_id && dataState?.date && dataState?.time && dataState?.payment && dataState?.verifyNumber ? <div>
                    <Space>
                        Selected Payment Method: <span className={'selected_text'}>{dataState?.payment_method_id}</span>
                        <Button type={'secondary'} onClick={onChangeDetails} style={{borderRadius:15}}>Change Payment Method</Button>
                    </Space>
                </div> : responseCodeState?.patient ? <div className={'date_carousel_div'}>
                    <div>
                        <Radio.Group onChange={onChange}>
                        {
                            data?.clinic?.payment_methods?.map((el) => {
                                return<div key={el?.id}>
                                        <Radio value={el?.id}>{el?.title}</Radio>

                                    </div>

                            })

                        }
                        </Radio.Group>

                    </div>

                </div> :<div></div>
            }



        </div>
    )
}
export default AppPaymentMethods;