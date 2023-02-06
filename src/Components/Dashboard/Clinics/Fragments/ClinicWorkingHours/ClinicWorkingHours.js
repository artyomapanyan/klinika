import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, postResource, updateResource} from "../../../../Functions/api_calls";
import Preloader from "../../../../Preloader";
import {Button, Form, Space} from "antd";
import {t} from "i18next";

import resourceLinks from "../../../../ResourceLinks";
import Monday from "./WorkingDays/Monday";


const resource = "Clinic";
function ClinicWorkingHours({loadingState, dataState}) {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loading, setLoading} = loadingState;

    const [workingData, setWorkingData] = useState({})



    //const [switchValuesState, setSwitchValuesState] = useState({})
    let a = {
        friday: [{day: 'friday', opens_at: '00:00', closes_at: '23:59', is_day_off: false, type: 'telehealth'}],
        monday:[{day: 'monday', opens_at: '00:00', closes_at: '12:45', is_day_off: false, type: 'telehealth'}],
        saturday:[{day: 'saturday', opens_at: '00:00', closes_at: '23:59', is_day_off: false, type: 'telehealth'}],
        sunday:[{day: 'sunday', opens_at: '00:00', closes_at: '23:59', is_day_off: false, type: 'telehealth'}],
        thursday:[{day: 'thursday', opens_at: '00:00', closes_at: '23:59', is_day_off: false, type: 'telehealth'}],
        tuesday:[{day: 'tuesday', opens_at: '00:00', closes_at: '23:59', is_day_off: false, type: 'telehealth'}],
        wednesday:[{day: 'wednesday', opens_at: '00:00', closes_at: '23:59', is_day_off: false, type: 'telehealth'}],

    }


    useEffect(()=>{
        if(params.id){
            postResource(resource,'WorkingHours',token,params.id,{service:'telehealth'}).then(responses => {
                console.log(responses)
                setWorkingData(responses)
            })
        }else{
            setWorkingData(a)
        }

    }, []);


    const onFinish = (values) => {
        console.log(values, 'lll')

        return;
        setLoading(true)

        setWorkingData((prevState)=>({
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

    const handleValuesChange = (e,v)=>{

        setWorkingData((prevState)=>({
            ...prevState,
            ...v
        }))

    }
    const handleUpdateWorkState = (data,key)=>{
        setWorkingData(prevState => {
            let newData = {...prevState};
            newData[key] = data;
            return newData
        })
    }


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
                    return  <Monday handleUpdateParent={handleUpdateWorkState} key={key} dataKey={key} workingData={workingData} data={workingData[key]} />
                    })}

                </div>
                <Space className={'create_apdate_btns'}>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Button size={'large'} onClick={()=>(navigate("clinics"))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}

        </div>
    )
}
export default ClinicWorkingHours;