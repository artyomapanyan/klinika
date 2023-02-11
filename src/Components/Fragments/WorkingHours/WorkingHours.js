import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Form, Space, Switch} from "antd";
import {t} from "i18next";

import WorkingWeekDays from "./Fragments/WorkingWeekDays";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import Preloader from "../../Preloader";




function WorkingHours({onFinish, data, loading, type,syncable}) {

    const navigate = useNavigate();
    const formRef = useRef();

    const [workingData, setWorkingData] = useState({})
    const [switchChange, setSwitchChange] = useState(false)


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
        let prevValues = {...values}
        let working_hours = [];
        Object.keys(values.working_hours).forEach(key=>{
            working_hours = [...working_hours,...values.working_hours[key]]
        })
        values.working_hours = working_hours.map(e=>{
            e.is_day_off = !e.is_day_off
            return e
        })
        values.service=type;

        onFinish(values,prevValues)
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
        loading?<Preloader/>:<Form
            onValuesChange={handleValuesChange}
            name="edit"
            onFinish={onFormFinish}
            layout="vertical"
            ref={formRef}
        >
            <div className={'add_edit_content'}>
                <div className={'home_visit_head'}>
                    <h1 className={'h1'}>{t(`Manage Pending Doctors`)}</h1>
                    <Space >
                        <Form.Item name={'sync_with_main'} initialValue={false} className={'right-label'} label={'Sync with main working hours'}>
                            <Switch defaultChecked checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                        </Form.Item>

                    </Space>

                </div>


                <div>
                    {
                        switchChange ? <div className={'add_edit_content'} align={"center"}>
                            <h1 className={"h1"}>Working Hours is synced with the main working hours</h1>
                        </div> : Object.keys(workingData).map(key => {
                        return <WorkingWeekDays handleUpdateParent={handleUpdateWorkState} key={key} dataKey={key} data={workingData[key]} formRef={formRef}/>
                    })}

                </div>
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