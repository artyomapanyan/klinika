import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, postResource, updateResource} from "../../../../Functions/api_calls";
import Preloader from "../../../../Preloader";
import {Button, Col, Form, Row, Select, Space, Switch} from "antd";
import {t} from "i18next";

import resourceLinks from "../../../../ResourceLinks";
import Monday from "./WorkingDays/Monday";



const resource = "Clinic";
function ClinicWorkingHours({loadingState, dataState}) {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState;

    const [workingData, setWorkingData] = useState({})

    //const [switchValuesState, setSwitchValuesState] = useState({})


    useEffect(()=>{
        postResource(resource,'WorkingHours',token,params.id,{service:'telehealth'}).then(responses => {
            setWorkingData(responses)
        })
    }, []);


    const onFinish = (values) => {
        console.log(values, 'lll')

        return;
        setLoading(true)

        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const handleValuesChange = (e)=>{
        setData((prevState)=>({
            ...prevState,
            ...e
        }))
    }
    console.log(data, 'ffffd')




    return(
        <div>
            {loading ? <Preloader/> : <Form
                onValuesChange={handleValuesChange}
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div className={'add_edit_content'}>
                    {Object.keys(workingData).map(key=>{
                    return  <Monday key={key} dataKey={key} workingData={workingData} data={workingData[key]}/>
                    })}

                </div>
                <Space className={'create_apdate_btns'}>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks["SubSpecialty"]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default ClinicWorkingHours;