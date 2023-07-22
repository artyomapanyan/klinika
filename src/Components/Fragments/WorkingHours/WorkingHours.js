import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Col, Form, Popconfirm, Row, Select, Space, Switch} from "antd";
import {t} from "i18next";

import {CheckOutlined, CloseOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import Preloader from "../../Preloader";
import FormInput from "../FormInput";
import resourceLinks from "../../ResourceLinks";
import Resources from "../../../store/Resources";

let res = "Clinic";

function WorkingHours({onFinish, data, loading, type, modalId, isDoctorHours, doctorData, handleCancel}) {
  const navigate = useNavigate();
  const formRef = useRef();
  const [workingData, setWorkingData] = useState({})
  const [switchChange, setSwitchChange] = useState(false)

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
      {!isDoctorHours ? <div className={'home_visit_head'} >
        <h1 className={'h1'}>{t(`Working Hours`)}</h1>
        <Space>
          <Form.Item name={'sync_with_main'} initialValue={false} className={'right-label'}
                     label={'Sync with main working hours'}>
            <Switch onChange={onChangeSwitch} checkedChildren={<CheckOutlined/>}
                    unCheckedChildren={<CloseOutlined/>}/>
          </Form.Item>

        </Space></div> : <Space>
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

            <Row>
              <Col lg={5}>
                <div style={{fontSize: 18, fontWeight: 600}}
                     className={'working_houre_margin'}>{workingDay[0]?.day[0].toUpperCase() + workingDay[0]?.day.slice(1, workingDay[0]?.day.length)}</div>
              </Col>
              <Col lg={4}>
                <div className={'working_houre_margin'}>
                  <Form.Item
                    label={t(``)}
                    name={['working_hours', dataKey, 0, "is_day_off"]}
                    valuePropName={'checked'}
                    initialValue={workingDay[0]?.is_day_off}
                  >
                    <Switch checkedChildren="Open" unCheckedChildren="Closed"/>
                  </Form.Item>
                </div>
              </Col>
              <Col lg={15}>
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
                    <Col>
                      <Form.Item
                        label={t(``)}
                        name={['working_hours', dataKey, key, "opens_at"]}
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
                        name={['working_hours', dataKey, key, "closes_at"]}
                        initialValue={el?.closes_at}
                      >
                        <Select
                          className={'working_houre_margin'}
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
                    <Col>
                      <div className={'working_houre_margin'}>
                        <Space>
                          {key !== 0 && <Button type={'secondary'} style={{border: 'none'}}
                                                onClick={() => handleRemoveHours(key, dataKey)}>x</Button>}
                          {currentOptions.length !== 0 && ((key === (workingDay.length - 1) && currentOptions.slice(currentOptions.findIndex(e => e?.value === workingDay[key]?.closes_at) + 1, currentOptions.length - 1).length > 0)) && workingDay[key]?.closes_at &&
                            <Button type={'secondary'} style={{border: 'none'}}
                                    onClick={() => handleAddHours(workingDay, dataKey)}>Add
                              Hours</Button>}
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

        <Button size={'large'} type={'secondary'} onClick={modalId ? handleCancel : () => navigate(resourceLinks[res])} >{t('Cancel')}</Button>

    </Space>
  </Form>)
}

export default WorkingHours;