import React from "react";
import {CheckCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Space} from "antd";

function AppDoctor({setDataState, dataState, data}) {
    //const [doctorName, setDoctorName] = useState('')
    const onDoctor = (id) => {
        setDataState((prevState)=>({
            ...prevState,
            doctor_id: id,
        }))
    }
    const onChangeDoctor = () => {
        setDataState((prevState)=>({}))
    }

    const doctorName = data?.doctors?.find((el) => {
       if(el?.id === dataState?.doctor_id) {
           return el?.first
       }
    })

    return(
        <div>
            <Space>
                <CheckCircleOutlined style={{color:dataState?.doctor_id ?'#2ce310':'gray', fontSize:22}} />
                <h2 style={{fontWeight: 600, marginTop:8}}>Doctor</h2>
            </Space>
            {
                dataState?.doctor_id ? <div>
                    <Space>
                        Selected Doctor : <span className={'selected_text'}>{doctorName?.first}{doctorName?.last}</span>
                        <Button type={'secondary'} onClick={onChangeDoctor} style={{borderRadius:15}}>Change Selected Doctor</Button>
                    </Space>
                </div> : <div style={{maxWidth:800}}>
                    <div >
                        {
                            data?.doctors?.map((el) => {
                                return<div key={el?.id} className={'doctor_conteiner' } onClick={() => onDoctor(el?.id)}>
                                    <Space>
                                        <Avatar  size={50} icon={<UserOutlined />} />
                                        <Space style={{fontWeight: 600, marginTop:5, fontSize:20}}>{el?.first}{el?.last}</Space>
                                    </Space>
                                </div>

                            })
                        }

                    </div>
                </div>
            }



        </div>
    )
}
export default AppDoctor;