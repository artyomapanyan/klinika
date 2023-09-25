import React from "react";
import {CheckCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Space} from "antd";
import {t} from "i18next";

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
        window.location.reload()
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
                <h2 style={{fontWeight: 600, marginTop:8}}>{t('Doctor')}</h2>
            </Space>
            {
                dataState?.doctor_id ? <div>
                    <div className={'all_offers_app_div'}>
                        {t('Selected Doctor')} : <span className={'selected_text'}>{doctorName?.first}{doctorName?.last}</span>
                        <Button type={'secondary'} onClick={onChangeDoctor} style={{borderRadius:15}}>{t('Change Selected Doctor')}</Button>
                    </div>
                </div> : <div style={{maxWidth:800}}>
                    <div >
                        {
                            data?.doctors?.map((el) => {
                                return<div key={el?.id} className={'doctor_conteiner' } onClick={() => onDoctor(el?.id)}>
                                    <Space>
                                        <Avatar  size={50} icon={<UserOutlined />} />
                                        <div style={{fontWeight: 600, marginTop:5, fontSize:20}}>{el?.first} {el?.last}</div>
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