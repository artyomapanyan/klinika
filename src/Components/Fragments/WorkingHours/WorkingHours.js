import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {Button, Col, Form, Popconfirm, Row, Select, Space, Switch} from "antd";
import {t} from "i18next";

import {CheckOutlined, CloseOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import Preloader from "../../Preloader";
import FormInput from "../FormInput";
import resourceLinks from "../../ResourceLinks";
import Resources from "../../../store/Resources";
import dayjs from "dayjs";
import {log10} from "chart.js/helpers";

let res = "Clinic";

function WorkingHours({onFinish,
                        data,
                        loading,
                        type,
                        modalId,
                        isDoctorHours,
                        doctorData,
                        handleCancel,
                        sincWitMain=true,
                        clinichoursData,
                        timeLimits,
                        switchStatus = false,
                        clinicHoursesDataNew,
                        doctorHoursModal = true
}) {
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

    Object.keys(newData)?.forEach(key => {
      newData[key] = newData[key]?.map(e => ({...e, is_day_off: !e?.is_day_off}))
    })
    return newData
  }



  useEffect(() => {
    formRef?.current?.setFieldsValue({
      status: doctorData?.status, diagnosis_price: doctorData?.price, working_hours: workingData
    })
  }, [doctorData])



  useEffect(() => {
    if(doctorHoursModal) {

      if (data.length !== 0 ) {
        setWorkingData(handleFilterData(data))
      } else {
        setWorkingData(customWorkingHouers)
      }
    } else {



      if (data.length !== 0) {

        setWorkingData(handleFilterData(data))
      } else if(!Array.isArray(clinicHoursesDataNew)) {

        setWorkingData(handleFilterData(clinicHoursesDataNew))
      } else {

        setWorkingData(customWorkingHouers)
      }
    }


  }, [data, switchChange, clinicHoursesDataNew]);



  const onFormFinish = (values) => {
    if(values?.sync_with_main) {
      onFinish(values)
    } else {
      values?.status ? values.status = true : values.status = false
      let prevValues = {...values}
      let working_hours = [];
      Object.keys(values.working_hours)?.forEach(key => {
        working_hours = [...working_hours, ...values.working_hours[key]]
      })
      values.working_hours = working_hours?.map(e => {
        if(e.is_day_off!==undefined){
          e.is_day_off = !e.is_day_off
        }else{
          e.is_day_off = false
        }

        if(e.closes_at === '11:59 PM') {
          e.closes_at = '23:59'
        }

        return e
      })

      if(switchStatus) {
        if(values?.status === false) {
          values.working_hours = working_hours?.map(e => {
            if(e.is_day_off === false){
              e.is_day_off = true
            }


            return e
          })
        }
      }


      values.service = type;


      onFinish(values, prevValues)
    }

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

  function getIsDayOff(day) {
    return day in clinicHoursesDataNew ? clinicHoursesDataNew[day][0].is_day_off : undefined
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
                                     label={sincWitMain ? 'Sync with main working hours' : ''}>
              <Switch hidden={!sincWitMain} onChange={onChangeSwitch} checkedChildren={<CheckOutlined/>}
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
          <h1 className={"h1"}>{t('Working Hours is synced with the main working hours')}</h1>
        </div> : Object.keys(workingData)?.map((dataKey, iKey) => {
          let currentLabel = Resources.dateOptions?.map((el) => {
            return {
              ...el,
              label: dayjs('2023-10-10' + el.label).format('hh:mm A'),

            }

          })
          
          let workingDay = workingData[dataKey]
          let currentTimes = [];

          if(timeLimits){
            timeLimits[dataKey]?.forEach(data=>{
              currentTimes.push( currentLabel?.slice(data.start,data.end+1))
            })
          }else{
            currentTimes = [...currentLabel]
          }





          return workingDay && <div key={iKey}>

            <Row>
              <Col lg={5}>
                <div style={{fontSize: 18, fontWeight: 600}}
                     className={'working_houre_margin'}>{workingDay[0]?.day[0]?.toUpperCase() + workingDay[0]?.day?.slice(1, workingDay[0]?.day?.length)}</div>
              </Col>
              <Col lg={4}>
                <div className={'working_houre_margin'}>
                  <Form.Item
                    label={t(``)}
                    name={['working_hours', dataKey, 0, "is_day_off"]}
                    valuePropName={'checked'}
                    initialValue={workingDay[0]?.is_day_off}
                  >
                    <Switch checkedChildren="Open" unCheckedChildren="Closed" disabled={Array.isArray(clinicHoursesDataNew) ? true : switchStatus ? getIsDayOff(workingDay[0]?.day) : false} />
                  </Form.Item>
                </div>
              </Col>
              <Col lg={15}>
                {workingDay?.map((el, key) => {
                  // if(el?.opens_at === '00:00') {
                  //   el.opens_at = '12:00 AM'
                  // }


                  let currentOptions =[...currentTimes]?.flat()
                  if (key > 0 && workingDay?.length) {
                    currentOptions = currentOptions?.slice(
                      currentOptions?.findIndex(
                        e => e?.value === workingDay[key - 1]?.closes_at
                      ) + 1, currentOptions?.length
                    );
                  }

                  let openKey = currentOptions?.findIndex(e => e?.value === el.opens_at)
                  let closeKey = currentOptions?.findIndex(e => e?.value === el.closes_at)

                  let indexSecondsPeriudOpensAt = currentTimes?.findIndex((e) => {
                    return e?.value === workingDay[key]?.opens_at
                  })

                  let afterPeriud = currentTimes?.findIndex((e) => {
                    return e?.value === workingDay[key+1]?.opens_at
                  })

                  let key1 = key



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
                          options={currentOptions?.slice(0, closeKey)}
                          className={'working_houre_margin'}
                          onChange={(change) => {
                            if(!doctorHoursModal) {
                              if(currentTimes.length > 1) {

                                let currentTimesValue = currentTimes[0]?.map((el) => {return el.value})
                                let currentTimesValue1 = currentTimes[1]?.map((el) => {return el.value})

                                if(currentTimesValue.includes(change) && currentTimesValue1.includes(el.closes_at)) {
                                  formRef?.current?.setFieldValue(['working_hours', dataKey, [key1], 'closes_at' ], null)
                                }
                              }

                            }

                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        label={t(``)}
                        name={['working_hours', dataKey, key, "closes_at"]}
                        initialValue={el?.closes_at === '00:00' ? currentLabel[currentLabel?.length -1].label : el?.closes_at}
                      >
                        <Select
                          className={'working_houre_margin'}
                          style={{width: 120,}}
                          disabled={!workingDay[key]?.opens_at}
                          rules={[{required: true}]}
                          onChange={(change) => {
                            if(!doctorHoursModal) {
                              if(workingDay[key+1]?.opens_at) {

                                let currentTimesValue = currentTimes.flat()?.map((el) => {return el.value})
                                let indexOpensAt = currentTimesValue?.findIndex((e)=>e === change)
                                let indexClosesAt = currentTimesValue?.findIndex((e)=>e === workingDay[key+1]?.opens_at)

                                if(indexClosesAt <= indexOpensAt) {
                                  formRef?.current?.setFieldValue(['working_hours', dataKey, [key1+1], 'opens_at' ], null)
                                }
                              }

                            }
                          }}
                          options={

                            workingDay[key]?.opens_at && timeLimits ? currentTimes?.find(e=>e?.find(u=>u?.value=== workingDay[key]?.opens_at))?.slice(
                                currentTimes?.find(e=>e?.find(u=>u.value=== workingDay[key]?.opens_at))?.findIndex(e => e?.value === workingDay[key]?.opens_at) + 1, currentTimes?.find(e=>e?.find(u=>u?.value=== workingDay[key]?.opens_at))?.length
                            ): key > 0 && workingDay?.length ? currentTimes?.slice(indexSecondsPeriudOpensAt + 1, workingDay[key+1]?.opens_at ? afterPeriud : currentTimes?.length) : currentOptions?.slice(
                                indexSecondsPeriudOpensAt + 1, workingDay[key+1]?.opens_at ? afterPeriud : currentTimes?.length
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

                          {currentOptions.length !== 0 && ((key === (workingDay.length - 1) && currentOptions?.slice(currentOptions?.findIndex(e => e?.value === workingDay[key]?.closes_at) + 1, currentOptions.length - 1).length > 0)) && workingDay[key]?.closes_at &&
                              workingDay[key]?.closes_at !== '11:59 PM' ? <Button type={'secondary'} style={{border: 'none'}}
                                    onClick={() => handleAddHours(workingDay, dataKey)}>Add Hours</Button> : null}
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