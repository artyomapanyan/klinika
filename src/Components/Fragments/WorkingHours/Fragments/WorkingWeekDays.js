import React,{useEffect,useState} from "react";
import {Button, Checkbox, Col, Form, Input, Row, Select, Space, Switch} from "antd";
import {t} from "i18next";
import Resources from "../../../../store/Resources";

function WorkingWeekDays({data,dataKey,handleUpdateParent,formRef}) {
    const [workingDay,setWorkingDay] = useState(data);
    const [isWD,setIsWD] = useState(workingDay[0]?.is_day_off);

    useEffect(()=>{
        setWorkingDay(data)
    },[data])
    const handleAddHours =()=>{
        handleUpdateParent([...data,{
            closes_at:null,
            day:dataKey,
            is_day_off:false,
            opens_at:null,
            type:data[0].type,
        }],dataKey)
    }

    const handleRemoveHours =(key)=>{
        const newData = {...data}
        delete newData[key]
        handleUpdateParent(Object.values(newData),dataKey)
    }
    const onSwitchChange = (e)=>{
        setIsWD(!e)
    }
    return(
        workingDay?.length &&<div>

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
                                    initialValue={!workingDay[0]?.is_day_off}
                                >
                                    <Switch checkedChildren="Open" unCheckedChildren="Closed" onChange={onSwitchChange}    />
                                </Form.Item>
                            </div>



                        </Col>
                   <Col lg={18}>
                   {workingDay?.map((el,key) => {
                       let currentOptions = [...Resources.dateOptions]
                       let hours = formRef.current?.getFieldValue(['working_hours',dataKey]);
                       if(key>0&& hours?.length){

                            currentOptions =currentOptions.slice(currentOptions.findIndex(e=>e?.value===hours[key-1].closes_at)+1, currentOptions.length-1);
                       }
                   return   <Row key={dataKey+key}
                                 className={isWD?'d-none':''}
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
                       {currentOptions.length!==0 ? <Col>
                                    <div className={'working_houre_margin'}>
                                        <Space>
                                            {key!==0&&<Button type={'secondary'} style={{border:'none'}} onClick={()=>handleRemoveHours(key)}>x</Button>}
                                            {((key===(data.length-1) && currentOptions.slice(currentOptions.findIndex(e=>e?.value===hours[key]?.closes_at)+1, currentOptions.length-1).length>0)) &&<Button type={'secondary'} style={{border:'none'}} onClick={handleAddHours}>Add Hours</Button>}
                                        </Space>

                                    </div>
                                </Col>:
                           <Col>
                               <div className={'working_houre_margin'}>
                               <Space>
                                   {key!==0&&<Button type={'secondary'} style={{border:'none'}} onClick={()=>handleRemoveHours(key)}>x</Button>}
                               </Space>

                           </div>
                       </Col>}
                            </Row>
                        })}
                   </Col>
                    </Row>


        </div>
    )
}
export default WorkingWeekDays;