import React, {useState} from "react";
import {CheckCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Space} from "antd";

function AppDoctor({setDataState, dataState}) {


    const onDoctor = () => {
        setDataState((prevState)=>({
            ...prevState,
            doctor: "doctor_id",
        }))
    }
    const onChangeDoctor = () => {
        setDataState((prevState)=>({}))
    }

    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.doctor ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>Doctor</h2>
            </Space>
            {
                dataState?.doctor ? <div>
                    <Space>
                        Selected Doctor : Salem Ali
                        <Button type={'secondary'} onClick={onChangeDoctor} style={{borderRadius:15}}>Change Selected Doctor</Button>
                    </Space>
                </div> : <div className={'doctor_conteiner' } onClick={onDoctor}>
                    <Space >
                        <Avatar  size={50} icon={<UserOutlined />} />
                        <h2 style={{fontWeight: 600, marginTop:5}}>Dr. Salem Ali</h2>
                    </Space>
                </div>
            }



        </div>
    )
}
export default AppDoctor;