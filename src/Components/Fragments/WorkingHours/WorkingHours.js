import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Form, Space} from "antd";
import {t} from "i18next";

import WorkingWeekDays from "./Fragments/WorkingWeekDays";




function WorkingHours({onFinish, data, loading, type}) {

    const navigate = useNavigate();
    const formRef = useRef();



    const [workingData, setWorkingData] = useState({})


    let customWorkingHouers = {
        friday: [{day: 'friday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        monday: [{day: 'monday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        saturday: [{day: 'saturday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        sunday: [{day: 'sunday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        thursday: [{day: 'thursday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        tuesday: [{day: 'tuesday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        wednesday: [{day: 'wednesday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],

    }


    useEffect(() => {
        if (data.length !== 0)  {
            setWorkingData(data)
        } else {
            setWorkingData(customWorkingHouers)
        }
    }, [data]);



    const onFormFinish = (values) => {
        onFinish(values)
    }

    const handleValuesChange = (e, v) => {

        setWorkingData((prevState) => ({
            ...prevState,
            ...v
        }))

    }
    const handleUpdateWorkState = (data, key) => {
        setWorkingData(prevState => {
            let newData = {...prevState};
            newData[key] = data;
            return newData
        })
    }


    return (
        <Form
            onValuesChange={handleValuesChange}
            name="edit"
            onFinish={onFormFinish}
            layout="vertical"
            ref={formRef}
        >
            <div className={'add_edit_content'}>
                {Object.keys(workingData).map(key => {
                    return <WorkingWeekDays handleUpdateParent={handleUpdateWorkState} key={key} dataKey={key}
                                            workingData={workingData} data={workingData[key]}/>
                })}

            </div>
            <Space className={'create_apdate_btns'}>
                <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                <Button size={'large'} onClick={() => (navigate("clinics"))} type={'secondary'}
                        htmlType="submit">{t('Cancel')}</Button>
            </Space>
        </Form>
    )
}

export default WorkingHours;