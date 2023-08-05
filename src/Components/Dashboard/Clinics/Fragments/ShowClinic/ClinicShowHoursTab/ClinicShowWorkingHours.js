import {useNavigate} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import Preloader from "../../../../../Preloader";
import {Col, Form, Row, Select, Switch} from "antd";
import {t} from "i18next";

import Resources from "../../../../../../store/Resources";


let res = "Clinic";

function ClinicShowWorkingHours({onFinish, data, loading, type, modalId, isDoctorHours, doctorData, handleCancel, workingHoursFooter=true}) {
    const navigate = useNavigate();
    const formRef = useRef();
    const [workingData, setWorkingData] = useState({})
    const [switchChange, setSwitchChange] = useState(false)

    const customWorkingHouers = {
        Monday: [{day: 'monday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        Tuesday: [{day: 'tuesday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        Wednesday: [{day: 'wednesday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        Thursday: [{day: 'thursday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        Friday: [{day: 'friday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        Saturday: [{day: 'saturday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        Sunday: [{day: 'sunday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
    }
    const handleFilterData = (data) => {
        let newData = {...data}
        Object.keys(newData).forEach(key => {
            newData[key] = newData[key].map(e => ({...e, is_day_off: !e.is_day_off}))
        })
        return newData
    }

    useEffect(() => {
        formRef?.current?.setFieldsValue({
            status: doctorData?.status, diagnosis_price: doctorData?.price, working_hours: workingData
        })
    }, [doctorData])

    useEffect(() => {
        if (data.length !== 0) {
            setWorkingData(handleFilterData(data))
        } else {
            setWorkingData(customWorkingHouers)
        }

    }, [data, switchChange]);



    const onFormFinish = (values) => {
        values?.status ? values.status = true : values.status = false
        let prevValues = {...values}
        let working_hours = [];
        Object.keys(values.working_hours).forEach(key => {
            working_hours = [...working_hours, ...values.working_hours[key]]
        })
        values.working_hours = working_hours.map(e => {
            if(e.is_day_off!==undefined){
                e.is_day_off = !e.is_day_off
            }else{
                e.is_day_off = false
            }

            return e
        })
        values.service = type;

        onFinish(values, prevValues)
    }

    const handleValuesChange = (e, v) => {
        setWorkingData((prevState) => ({
            ...(prevState?.working_hours ?? []), ...v.working_hours
        }))

    }
    const handleUpdateWorkState = (data, key) => {
        setWorkingData(prevState => {
            let newData = {...prevState};
            newData[key] = data;
            return newData
        })
    }
    const handleAddHours = (workingDay, dataKey) => {
        handleUpdateWorkState([...workingDay, {
            closes_at: null, day: dataKey, is_day_off: true, opens_at: null, type: workingDay.type,
        }], dataKey)
    }

    const handleRemoveHours = (key, dataKey) => {
        const newData = {...workingData[dataKey]}
        delete newData[key]
        handleUpdateWorkState(Object.values(newData), dataKey)
    }

    const onChangeSwitch = (val) => {
        setSwitchChange(val)
    }


    return (loading ? <Preloader/> : <Form
        onValuesChange={handleValuesChange}
        name="edit"
        onFinish={onFormFinish}
        layout="vertical"
        ref={formRef}
    >
        <div>

            <div>
                {switchChange ? <div className={'add_edit_content'} align={"center"}>
                    <h1 className={"h1"}>Working Hours is synced with the main working hours</h1>
                </div> : Object.keys(workingData).map((dataKey, iKey) => {
                    let workingDay = workingData[dataKey]

                    return workingDay && <div key={iKey}>

                        <Row>
                            <Col lg={6}>
                                <div style={{fontSize: 18, fontWeight: 600}}
                                     className={'working_houre_margin'}>{workingDay[0]?.day[0].toUpperCase() + workingDay[0]?.day.slice(1, workingDay[0]?.day.length)}</div>
                            </Col>
                            <Col lg={5}>
                                <div className={'working_houre_margin'}>
                                    <Form.Item
                                        label={t(``)}
                                        name={['working_hours', dataKey, 0, "is_day_off"]}
                                        valuePropName={'checked'}
                                        initialValue={workingDay[0]?.is_day_off}
                                    >
                                        <Switch checkedChildren="Open" unCheckedChildren="Closed" disabled={true}/>
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col lg={13}>
                                {workingDay?.map((el, key) => {
                                    let currentOptions = [...Resources.dateOptions]
                                    if (key > 0 && workingDay?.length) {
                                        currentOptions = currentOptions.slice(
                                            currentOptions.findIndex(
                                                e => e?.value === workingDay[key - 1].closes_at
                                            ) + 1, currentOptions.length
                                        );
                                    }
                                    return <Row key={dataKey + key + (new Date())}
                                                className={!workingDay[0]?.is_day_off ? 'd-none' : ''}
                                    >
                                        <Col lg={12}>
                                            <Form.Item
                                                label={t(``)}
                                                name={['working_hours', dataKey, key, "opens_at"]}
                                                initialValue={el?.opens_at}
                                            >
                                                <Select
                                                    style={{width: 120}}
                                                    options={currentOptions}
                                                    className={'working_houre_margin'}
                                                    disabled={true}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={12}>
                                            <Form.Item
                                                label={t(``)}
                                                name={['working_hours', dataKey, key, "closes_at"]}
                                                initialValue={el?.closes_at}
                                            >
                                                <Select
                                                    className={'working_houre_margin'}
                                                    disabled={true}
                                                    style={{width: 120,}}
                                                    options={
                                                        currentOptions.slice(
                                                            currentOptions.findIndex(
                                                                e => e?.value === workingDay[0].opens_at
                                                            ) + 1, currentOptions.length
                                                        )}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name={['working_hours', dataKey, key, "day"]}
                                                hidden={true}
                                                initialValue={el?.day}
                                            />
                                            <Form.Item
                                                name={['working_hours', dataKey, key, "is_day_off"]}
                                                hidden={true}
                                            />
                                        </Col>
                                    </Row>
                                })}
                            </Col>
                        </Row>

                    </div>
                })}

            </div>
        </div>


    </Form>)
}

export default ClinicShowWorkingHours;