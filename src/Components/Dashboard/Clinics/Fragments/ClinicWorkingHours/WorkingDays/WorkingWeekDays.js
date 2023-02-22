import React from "react";
import {Button, Col, Form, Row, Select, Space, Switch} from "antd";
import {t} from "i18next";
import Resources from "../../../../../../store/Resources";


function WorkingWeekDays({data,dataKey,handleUpdateParent}) {


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

  const handleChangeSwitch = (e)=>{
      const newData = {...data}
      newData[0].is_day_off = !e
      handleUpdateParent(Object.values(newData),dataKey)
  }
    return(
        data?.length&&<div>

               <Row>
                        <Col lg={3}>
                            <div style={{margin:15, fontSize:18, fontWeight:600}}>{data[0]?.day}</div>
                        </Col>
                        <Col lg={3}>
                            <div style={{margin:20}}>
                                <Switch checkedChildren="Open" unCheckedChildren="Closed"  onChange={handleChangeSwitch} checked={!data[0]?.is_day_off} />
                            </div>

                            <Form.Item
                                label={t(``)}
                                name={[dataKey,0, "is_day_off"]}
                                valuePropName="checked"
                                initialValue={data[0]?.is_day_off}
                                style={{margin:15}}
                                hidden={true}

                            />


                            {data[0]?.is_day_off?<Form.Item

                                name={[dataKey,0, "day"]}
                                hidden={true}
                                initialValue={data[0]?.day}
                            />:null}
                        </Col>
                   <Col lg={18}>
                   {data?.map((el,key) => {
                       let currentOptions = [...Resources.dateOptions]
                       if(key>0){

                            currentOptions =currentOptions.slice(currentOptions.findIndex(e=>e?.value===data[key-1].closes_at)+1, currentOptions.length-1);
                       }
                   return !data[0]?.is_day_off ? <Row key={dataKey+key}>
                                <Col>
                                    <Form.Item
                                        label={t(``)}
                                        name={[dataKey,key, "opens_at"]}
                                        initialValue={el?.opens_at}
                                    >
                                        <Select
                                            style={{width: 120, margin:15}}
                                            options={currentOptions}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        label={t(``)}
                                        name={[dataKey, key,"closes_at"]}
                                        initialValue={el?.closes_at}
                                    >
                                        <Select

                                            style={{width: 120, margin:15}}
                                            options={currentOptions}
                                        />
                                    </Form.Item>
                                    <Form.Item

                                        name={[dataKey,key, "day"]}
                                        hidden={true}
                                        initialValue={el?.day}
                                    />
                                </Col>
                       {currentOptions.length!==0 ? <Col>
                                    <div style={{margin:15}}>
                                        <Space>
                                            {key!==0&&<Button type={'secondary'} style={{border:'none'}} onClick={()=>handleRemoveHours(key)}>x</Button>}
                                            {key===(data.length-1) && currentOptions.slice(currentOptions.findIndex(e=>e?.value===data[key].closes_at)+1, currentOptions.length-1).length>0&&<Button type={'secondary'} style={{border:'none'}} onClick={handleAddHours}>Add Hours</Button>}
                                        </Space>

                                    </div>
                                </Col>:
                           <Col>
                               <div style={{margin:15}}>
                               <Space>
                                   {key!==0&&<Button type={'secondary'} style={{border:'none'}} onClick={()=>handleRemoveHours(key)}>x</Button>}
                               </Space>

                           </div>
                       </Col>}
                            </Row> : <div style={{height:86}}></div>
                        })}
                   </Col>
                    </Row>


        </div>
    )
}
export default WorkingWeekDays;