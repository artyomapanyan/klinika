import React, {useState} from "react";
import {CheckCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Input, InputNumber, Space} from "antd";


function AppPersonalDetails({setDataState, dataState}) {
    const [numberState, setNumberState] = useState(false);
    const [verifyState, setVerifyState] = useState();


    const onNumberChange = (e) => {
        setDataState((prevState)=>({
            ...prevState,
            number: e,
        }))
    }

    const onVerifyNumber = () => {
        if(dataState?.number === 123456789) {
            setNumberState(true)
        }
    }
    const enterInput = (e) => {
        setDataState((prevState)=>({
            ...prevState,
            verifyNumber: e?.target?.value,
        }))
    }

    const onChack = () => {
        setNumberState(false)
    }


    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.number ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>Personal Details</h2>
            </Space>
            {
                dataState?.doctor && dataState?.date && dataState?.time ? <div className={'date_carousel_div'}>
                    <div>
                        {
                            numberState  ? <div style={{display: 'flex', width:'100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <div style={{width:'40%'}}>
                                                <InputNumber size={'large'} style={{width: '100%'}} placeholder='500-000-000' onChange={onNumberChange} />
                                            </div>
                                            <div style={{width:'20%'}} align={'center'}>
                                                Timer
                                            </div>
                                            <div className={'space_compact'}>
                                                <Space.Compact size={'large'}>
                                                    <Input onChange={enterInput} style={{width: '100%'}}/>
                                                    <Button style={{background:'green', color:'#ffffff'}} onClick={onChack}>Check</Button>
                                                </Space.Compact>
                                            </div>

                                            </div> : dataState?.verifyNumber === '1111' ? <div>
                                <Space style={{width:'100%'}} direction={"vertical"}>
                                    <Input size={'large'} placeholder='500-000-000' disabled={true} />
                                    <Input size={'large'} placeholder='500-000-000' disabled={true} />
                                    <Input size={'large'} placeholder='500-000-000' disabled={true} />
                                </Space>
                            </div> : <Space.Compact
                                size={"large"}
                                style={{width:'100%'}}
                            >
                                <InputNumber />
                                <InputNumber rules={[{required: true}]} style={{width: '100%'}} placeholder='500-000-000' onChange={onNumberChange} />
                                <Button type={'primary'} onClick={onVerifyNumber}>Verify New</Button>
                                </Space.Compact>
                        }
                    </div>

                </div> :<div></div>
            }



        </div>
    )
}
export default AppPersonalDetails;