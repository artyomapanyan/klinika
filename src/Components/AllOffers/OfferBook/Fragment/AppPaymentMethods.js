import React from "react";
import {CheckCircleOutlined} from "@ant-design/icons";
import {Button, Input, InputNumber, Space} from "antd";
import {t} from "i18next";
import Resources from "../../../../store/Resources";
import FormInput from "../../../Fragments/FormInput";


function AppPaymentMethods({setDataState, dataState}) {


    const onDetails = () => {
        setDataState((prevState)=>({
            ...prevState,
            payment: "payment",
        }))
    }
    const onChangeDetails = () => {
        setDataState((prevState)=>({
            ...prevState,
            payment: ''
        }))
    }

    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.payment ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>Payment Method</h2>
            </Space>
            {
                dataState?.doctor_id && dataState?.date && dataState?.time && dataState?.number && dataState?.payment && dataState?.verifyNumber ? <div>
                    <Space>
                        Selected Payment Method
                        <Button type={'secondary'} onClick={onChangeDetails} style={{borderRadius:15}}>Change Selected Doctor</Button>
                    </Space>
                </div> : dataState?.verifyNumber === '1111' ? <div className={'date_carousel_div'}>
                    <div>
                        <FormInput label={t('Payment method Type')} name={'key'} inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   initialValue={[]}
                                   initialData={Resources.PaymentMethodKeys}
                        />
                    </div>

                </div> :<div></div>
            }



        </div>
    )
}
export default AppPaymentMethods;