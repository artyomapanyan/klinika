import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Col, Form, Row, Select, Space, Switch} from "antd";
import {t} from "i18next";

import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import Preloader from "../../Preloader";
import FormInput from "../FormInput";
import resourceLinks from "../../ResourceLinks";

let res = "Clinic";

let options1 = [
    {
        values: "Closes",
        label: "Closes"
    },
    {
        value: "24 hours",
        label: "24 hours"
    },

    {
        value: "00:15",
        label: '00:15',
    },
    {
        value: "00:30",
        label: '00:30',
    },
    {
        value: "00:45",
        label: '00:45',
    },
    {
        value: "01:00",
        label: '01:00',
    },
    {
        value: "01:15",
        label: '01:15',
    },
    {
        value: "01:30",
        label: '01:30',
    },
    {
        value: "01:45",
        label: '01:45',
    },
    {
        value: "02:00",
        label: '02:00',
    },{
        value: "02:15",
        label: '02:15',
    },
    {
        value: "02:30",
        label: '02:30',
    },
    {
        value: "02:45",
        label: '02:45',
    },
    {
        value: "03:00",
        label: '03:00',
    },{
        value: "03:15",
        label: '03:15',
    },
    {
        value: "03:30",
        label: '03:30',
    },
    {
        value: "03:45",
        label: '03:45',
    },
    {
        value: "04:00",
        label: '04:00',
    },
    {
        value: "04:15",
        label: '04:15',
    },
    {
        value: "04:30",
        label: '04:30',
    },
    {
        value: "04:45",
        label: '04:45',
    },
    {
        value: "05:00",
        label: '05:00',
    },{
        value: "05:15",
        label: '05:15',
    },
    {
        value: "05:30",
        label: '05:30',
    },
    {
        value: "05:45",
        label: '05:45',
    },
    {
        value: "06:00",
        label: '06:00',
    },{
        value: "06:15",
        label: '06:15',
    },
    {
        value: "06:30",
        label: '06:30',
    },
    {
        value: "06:45",
        label: '06:45',
    },
    {
        value: "07:00",
        label: '07:00',
    },{
        value: "07:15",
        label: '07:15',
    },
    {
        value: "07:30",
        label: '07:30',
    },
    {
        value: "07:45",
        label: '07:45',
    },
    {
        value: "08:00",
        label: '08:00',
    },{
        value: "08:15",
        label: '08:15',
    },
    {
        value: "08:30",
        label: '08:30',
    },
    {
        value: "08:45",
        label: '08:45',
    },
    {
        value: "09:00",
        label: '09:00',
    },{
        value: "09:15",
        label: '09:15',
    },
    {
        value: "09:30",
        label: '09:30',
    },
    {
        value: "09:45",
        label: '09:45',
    },
    {
        value: "10:00",
        label: '10:00',
    },{
        value: "10:15",
        label: '10:15',
    },
    {
        value: "10:30",
        label: '10:30',
    },
    {
        value: "10:45",
        label: '10:45',
    },
    {
        value: "11:00",
        label: '11:00',
    },
    {
        value: "11:15",
        label: '11:15',
    },
    {
        value: "11:30",
        label: '11:30',
    },
    {
        value: "11:45",
        label: '11:45',
    },
    {
        value: "12:00",
        label: '12:00',
    },
    {
        value: "12:15",
        label: '12:15',
    },
    {
        value: "12:30",
        label: '12:30',
    },
    {
        value: "12:45",
        label: '12:45',
    },
    {
        value: "13:00",
        label: '13:00',
    },
    {
        value: "13:15",
        label: '13:15',
    },
    {
        value: "13:30",
        label: '13:30',
    },
    {
        value: "13:45",
        label: '13:45',
    },
    {
        value: "14:00",
        label: '14:00',
    },{
        value: "14:15",
        label: '14:15',
    },
    {
        value: "14:30",
        label: '14:30',
    },
    {
        value: "14:45",
        label: '14:45',
    },
    {
        value: "15:00",
        label: '15:00',
    },{
        value: "15:15",
        label: '15:15',
    },
    {
        value: "15:30",
        label: '15:30',
    },
    {
        value: "15:45",
        label: '15:45',
    },
    {
        value: "16:00",
        label: '16:00',
    },
    {
        value: "16:15",
        label: '16:15',
    },
    {
        value: "16:30",
        label: '16:30',
    },
    {
        value: "16:45",
        label: '16:45',
    },
    {
        value: "17:00",
        label: '17:00',
    },
    {
        value: "17:15",
        label: '17:15',
    },
    {
        value: "17:30",
        label: '17:30',
    },
    {
        value: "17:45",
        label: '17:45',
    },
    {
        value: "18:00",
        label: '18:00',
    },{
        value: "18:15",
        label: '18:15',
    },
    {
        value: "18:30",
        label: '18:30',
    },
    {
        value: "18:45",
        label: '18:45',
    },
    {
        value: "19:00",
        label: '19:00',
    },{
        value: "19:15",
        label: '19:15',
    },
    {
        value: "19:30",
        label: '19:30',
    },
    {
        value: "19:45",
        label: '19:45',
    },
    {
        value: "20:00",
        label: '20:00',
    },{
        value: "20:15",
        label: '20:15',
    },
    {
        value: "20:30",
        label: '20:30',
    },
    {
        value: "20:45",
        label: '20:45',
    },
    {
        value: "21:00",
        label: '21:00',
    },{
        value: "21:15",
        label: '21:15',
    },
    {
        value: "21:30",
        label: '21:30',
    },
    {
        value: "21:45",
        label: '21:45',
    },
    {
        value: "22:00",
        label: '22:00',
    },
    {
        value: "22:15",
        label: '22:15',
    },
    {
        value: "22:30",
        label: '22:30',
    },
    {
        value: "22:45",
        label: '22:45',
    },
    {
        value: "23:00",
        label: '23:00',
    },
    {
        value: "23:15",
        label: '23:15',
    },
    {
        value: "23:30",
        label: '23:30',
    },
    {
        value: "23:45",
        label: '23:45',
    },
    {
        value: "00:00",
        label: '00:00',
    },
];


function WorkingHours({onFinish, data, loading, type, syncable,isDoctorHours, doctorData}) {

    const navigate = useNavigate();
    const formRef = useRef();

    const [workingData, setWorkingData] = useState({})
    const [switchChange, setSwitchChange] = useState(false)


    let customWorkingHouers = {
        monday: [{day: 'monday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        tuesday: [{day: 'tuesday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        wednesday: [{day: 'wednesday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        thursday: [{day: 'thursday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        friday: [{day: 'friday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        saturday: [{day: 'saturday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        sunday: [{day: 'sunday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],

    }
    const handleFilterData =(data)=>{
        let newData = {...data}
       Object.keys(newData).forEach(key=>{
           newData[key] = newData[key].map(e=>({...e,is_day_off:!e.is_day_off}))
       })
        return newData
    }


    useEffect(()=>{
        formRef?.current?.setFieldsValue({
            status:doctorData?.status,
            diagnosis_price: doctorData?.price,
            working_hours: workingData
        })
    },[doctorData])


    useEffect(() => {
        if (data.length !== 0)  {

            setWorkingData(  handleFilterData(data))
        } else {
            setWorkingData(customWorkingHouers)
        }

    }, [data, switchChange]);



    const onFormFinish = (values) => {
        values.status ? values.status = true : values.status = false
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
            ...(prevState?.working_hours??[]),
            ...v.working_hours
        }))

    }
    const handleUpdateWorkState = (data, key) => {
        setWorkingData(prevState => {
            let newData = {...prevState};
            newData[key] = data;
            return newData
        })
    }
    const handleAddHours =(workingDay,dataKey)=>{
        handleUpdateWorkState([...workingDay,{
            closes_at:null,
            day:dataKey,
            is_day_off:false,
            opens_at:null,
            type:workingDay.type,
        }],dataKey)
    }

    const handleRemoveHours =(key,dataKey)=>{
        const newData = {...workingData[dataKey]}
        delete newData[key]
        handleUpdateWorkState(Object.values(newData),dataKey)
    }

    const onChangeSwitch = (val) => {
        setSwitchChange(val)
    }


    return (
        loading?<Preloader/>:<Form
            onValuesChange={handleValuesChange}
            name="edit"
            onFinish={onFormFinish}
            layout="vertical"
            ref={formRef}
        >
            <div>
                {!isDoctorHours ? <div className={'home_visit_head'}>
                            <h1 className={'h1'}>{t(`Working Hours`)}</h1>
                            <Space >
                            <Form.Item name={'sync_with_main'} initialValue={false} className={'right-label'} label={'Sync with main working hours'}>
                                <Switch onChange={onChangeSwitch} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>

                        </Space> </div> : <Space >
                    <FormInput inputType='number' inputNumberStyle={{width:200}} label={'Diagnosis price'} name={'diagnosis_price'} initialValue={doctorData.price} />
                            <Form.Item
                                label={t(`Status`)}
                                name="status"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={doctorData.status}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>
                        </Space>}
                <div>
                    {
                        switchChange ? <div className={'add_edit_content'} align={"center"}>
                            <h1 className={"h1"}>Working Hours is synced with the main working hours</h1>
                        </div> : Object.keys(workingData).map((dataKey,iKey) => {
                            let workingDay  = workingData[dataKey]

                        return workingDay &&<div key={iKey}>

                            <Row>
                                <Col lg={3}>
                                    <div style={{fontSize:18, fontWeight:600}} className={'working_houre_margin'} >{workingDay[0]?.day}</div>
                                </Col>
                                <Col lg={3}>
                                    <div className={'working_houre_margin'}>
                                        <Form.Item
                                            label={t(``)}
                                            name={['working_hours',dataKey,0, "is_day_off"]}
                                            valuePropName={'checked'}
                                            initialValue={workingDay[0]?.is_day_off}
                                        >
                                            <Switch checkedChildren="Open" unCheckedChildren="Closed"    />
                                        </Form.Item>
                                    </div>
                                </Col>
                                <Col lg={18}>
                                    {workingDay?.map((el,key) => {
                                        let currentOptions = [...options1]
                                        if(key>0&& workingDay?.length){

                                            currentOptions =currentOptions.slice(currentOptions.findIndex(e=>e?.value===workingDay[key-1].closes_at)+1, currentOptions.length-1);
                                        }
                                        return   <Row key={dataKey+key+(new Date())}
                                                     className={!workingDay[0]?.is_day_off?'d-none':''}
                                        >
                                            <Col>
                                                <Form.Item
                                                    label={t(``)}
                                                    name={['working_hours',dataKey,key, "opens_at"]}
                                                    initialValue={el?.opens_at}
                                                >
                                                    <Select
                                                        style={{width: 120}}
                                                        options={currentOptions}
                                                        className={'working_houre_margin'}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Form.Item
                                                    label={t(``)}
                                                    name={['working_hours',dataKey, key,"closes_at"]}
                                                    initialValue={el?.closes_at}
                                                >
                                                    <Select
                                                        className={'working_houre_margin'}
                                                        style={{width: 120,}}
                                                        options={currentOptions}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={['working_hours',dataKey,key, "day"]}
                                                    hidden={true}
                                                    initialValue={el?.day}
                                                />
                                                <Form.Item
                                                    name={['working_hours',dataKey,key, "is_day_off"]}
                                                    hidden={true}
                                                />
                                            </Col>
                                            <Col>
                                                    <div className={'working_houre_margin'}>
                                                        <Space>
                                                            {key!==0&&<Button type={'secondary'} style={{border:'none'}} onClick={()=>handleRemoveHours(key,dataKey)}>x</Button>}
                                                            {currentOptions.length!==0 &&
                                                                (
                                                                    (key===(workingDay.length-1) &&
                                                                    currentOptions.slice(currentOptions.findIndex(e=>e?.value===workingDay[key]?.closes_at)+1, currentOptions.length-1).length>0)
                                                                ) && workingDay[key]?.closes_at
                                                                &&<Button type={'secondary'} style={{border:'none'}} onClick={()=>handleAddHours(workingDay,dataKey)}>Add Hours</Button>}
                                                        </Space>

                                                    </div>
                                                </Col>
                                        </Row>
                                    })}
                                </Col>
                            </Row>

                        </div>
                    })}

                </div>
            </div>

            <Space>
                <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                <Button size={'large'} onClick={()=>(navigate(resourceLinks[res]))} type={'secondary'}
                        htmlType="submit">{t('Cancel')}</Button>
            </Space>
        </Form>
    )
}

export default WorkingHours;