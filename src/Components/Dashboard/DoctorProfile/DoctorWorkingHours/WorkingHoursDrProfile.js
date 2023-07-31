import {useNavigate} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import Preloader from "../../../Preloader";
import {Col, Form, Row, Space, Switch} from "antd";
import {t} from "i18next";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import FormInput from "../../../Fragments/FormInput";
import Resources from "../../../../store/Resources";
import x_black from "../../../../dist/icons/x_black.png";
import plus_purple_icon from "../../../../dist/icons/plus_purple_icon.png";

function NewClinicDoctorWorkingHour({onFinish, data,clinicDoctor,service, loading, type, modalId, isDoctorHours, doctorData, handleCancel,customRef, priceAndStatus=false}) {
    const navigate = useNavigate();
    const formRef = useRef();
    const [workingData, setWorkingData] = useState({})
    const [switchChange, setSwitchChange] = useState(false)
    const [weekHours,setWeekHours] = useState({
        hours:0,
        minutes:0
    });
    useEffect(()=>{

        handleCalculateHours(data,true)
    },[])

    const customWorkingHouers = {
        monday: [{day: 'monday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        tuesday: [{day: 'tuesday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        wednesday: [{day: 'wednesday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        thursday: [{day: 'thursday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        friday: [{day: 'friday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        saturday: [{day: 'saturday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
        sunday: [{day: 'sunday', opens_at: '00:00', closes_at: '00:00', is_day_off: false, type: type}],
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

    const handleCalculateHours = (data,isInitial =false)=>{
        let minutes = 0;
        Object.values(Object.values(data)).flat().filter(e=>isInitial?!e.is_day_off:e.is_day_off).forEach((e)=>{
            let ft = dayjs(`2000-01-01 ${ e.opens_at}`);
            let tt = dayjs(`2000-01-01 ${e.closes_at}`);
            minutes=  minutes+ tt.diff(ft, "minutes", true);
        })
        setWeekHours({
            hours: Math.floor(minutes/60),
            minutes: minutes%60
        })

    }
    const handleValuesChange = (e, v) => {
        handleCalculateHours(v.working_hours)
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


    return <>
        <div className={'servise_text_and_hours'}>
            <div className={'servises_div_text'}>{clinicDoctor.activated_services[service]} </div>
            <div className={'servises_hours_div'}>{weekHours.hours} hours {weekHours.minutes} minutes</div>
        </div>

        <div className={'working_hours_line_div'}></div>
        {loading ? <Preloader/> : <Form
            onValuesChange={handleValuesChange}
            name="edit"
            onFinish={onFormFinish}
            layout="vertical"
            ref={customRef??formRef}
        >

            <div>
                {!isDoctorHours ? <div className={'home_visit_head'}>
                    <h1 className={'h1'}>{t(`Working Hours`)}</h1>
                    <Space>
                        <Form.Item name={'sync_with_main'} initialValue={false} className={'right-label'}
                                   label={'Sync with main working hours'}>
                            <Switch onChange={onChangeSwitch} checkedChildren={<CheckOutlined/>}
                                    unCheckedChildren={<CloseOutlined/>}/>
                        </Form.Item>

                    </Space></div> : priceAndStatus ? <div></div> : <Space>
                    <FormInput inputType='number' inputNumberStyle={{width: 200}} label={'Diagnosis price'}
                               name={'diagnosis_price'} initialValue={doctorData.price}/>
                    <Form.Item
                        label={t(`Status`)}
                        name="status"
                        className={'right-label'}
                        valuePropName="checked"
                        initialValue={doctorData.status}
                    >
                        <Switch checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}/>
                    </Form.Item>
                </Space>}
                <div>
                    {switchChange ? <div className={'add_edit_content'} align={"center"}>
                        <h1 className={"h1"}>Working Hours is synced with the main working hours</h1>
                    </div> : Object.keys(workingData).map((dataKey, iKey) => {
                        let workingDay = workingData[dataKey]

                        return workingDay && <div key={iKey}>


                            <div className={'new_working_hours_week_div'}>

                                <div className={'new_working_hours_sv_and_day'}>
                                    <div className={'working_houre_margin'}>
                                        <Form.Item
                                            label={t(``)}
                                            name={['working_hours', dataKey, 0, "is_day_off"]}
                                            valuePropName={'checked'}
                                            initialValue={workingDay[0]?.is_day_off}
                                        >
                                            <Switch/>
                                        </Form.Item>
                                    </div>

                                    <div style={{fontSize: 18, fontWeight: 600, marginTop: 12}} className={'working_houre_margin'}>{workingDay[0]?.day}</div>
                                </div>
                                <div>
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
                                            //className={!workingDay[0]?.is_day_off ? 'd-none' : ''}
                                        >
                                            <Col>
                                                <div className={'working_hours_select1_div'}>

                                                    <FormInput label={t('Opens')}   name={['working_hours', dataKey, key, "opens_at"]}
                                                               inputType={'resourceSelect'}
                                                               resourceSelectStyle={{width:150}}
                                                               initialValue={el?.opens_at}
                                                               handleMapItems={(item,name,data)=>{
                                                                   item.id = item.value;
                                                                   item.name = item.label
                                                                   return [item.label,item]
                                                               }}
                                                               disabled={!workingDay[0]?.is_day_off}
                                                               initialData={currentOptions}

                                                    />

                                                    {/*<Form.Item*/}
                                                    {/*    label={t(``)}*/}
                                                    {/*    name={['working_hours', dataKey, key, "opens_at"]}*/}
                                                    {/*    initialValue={el?.opens_at}*/}
                                                    {/*>*/}


                                                    {/*    <Select*/}
                                                    {/*        style={{width: 145}}*/}
                                                    {/*        options={currentOptions}*/}
                                                    {/*        className={'working_houre_margin'}*/}
                                                    {/*        disabled={!workingDay[0]?.is_day_off}*/}
                                                    {/*    />*/}
                                                    {/*</Form.Item>*/}
                                                </div>

                                            </Col>
                                            <Col>
                                                <div className={'working_hours_select1_div'}>
                                                    <FormInput label={t('Closes')}   name={['working_hours', dataKey, key, "closes_at"]}
                                                               inputType={'resourceSelect'}
                                                               resourceSelectStyle={{width:150}}
                                                               initialValue={el?.closes_at}
                                                               handleMapItems={(item,name,data)=>{
                                                                   item.id = item.value;
                                                                   item.name = item.label
                                                                   return [item.label,item]
                                                               }}
                                                               disabled={!workingDay[0]?.is_day_off}
                                                               initialData={currentOptions.slice(
                                                                   currentOptions.findIndex(
                                                                       e => e?.value === workingDay[0].opens_at
                                                                   ) + 1, currentOptions.length
                                                               )}

                                                    />
                                                </div>

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
                                            <Col>
                                                <div className={'working_houre_margin'}>
                                                    <div>
                                                        {key !== 0 && <div style={{cursor: 'pointer', marginTop: 9, marginLeft: 13}} align={'right'}
                                                                           onClick={() => handleRemoveHours(key, dataKey)}><img  src={x_black} alt={'x_black'}/></div>}
                                                        {currentOptions.length !== 0 && ((key === (workingDay.length - 1) && currentOptions.slice(currentOptions.findIndex(e => e?.value === workingDay[key]?.closes_at) + 1, currentOptions.length - 1).length > 0)) && workingDay[key]?.closes_at ?
                                                            <div style={{marginTop: 9, cursor: 'pointer'}} onClick={() => handleAddHours(workingDay, dataKey)}>
                                                                <img style={{marginLeft: 15}} src={plus_purple_icon} alt={'plus_purple_icon'}/>
                                                            </div> : <div style={{marginRight: key !== 0 ? 0 : 35}}></div>}
                                                    </div>

                                                </div>
                                            </Col>
                                        </Row>
                                    })}
                                </div>
                            </div>

                        </div>
                    })}

                </div>
            </div>

        </Form>}
    </>
}

export default NewClinicDoctorWorkingHour;