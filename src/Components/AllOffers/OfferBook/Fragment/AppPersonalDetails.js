import React, {useState} from "react";
import {CheckCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Input, InputNumber, Space} from "antd";


function AppPersonalDetails({setDataState, dataState}) {


    const onDetails = () => {
        setDataState((prevState)=>({
            ...prevState,
            number: "123456789",
        }))
    }
    const onChangeDetails = () => {
        setDataState((prevState)=>({
            ...prevState,
            number: ''
        }))
    }



    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.number ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>Personal Details</h2>
            </Space>
            {
                dataState?.doctor && dataState?.date && dataState?.time && dataState?.number ? <div>
                    <Space>
                        number : 123456789
                        <Button type={'secondary'} onClick={onChangeDetails} style={{borderRadius:15}}>Change Selected Doctor</Button>
                    </Space>
                </div> : (dataState?.doctor && dataState?.date && dataState?.time) || dataState?.number ? <div className={'date_carousel_div'}>
                    <div>
                        <Space.Compact
                            size={"large"}
                            style={{width:'100%'}}
                        >
                            <InputNumber />
                            <Input defaultValue="Combine input and button" />
                            <Button type="primary">Verify Now</Button>
                        </Space.Compact>
                    </div>

                </div> :<div></div>
            }



        </div>
    )
}
export default AppPersonalDetails;