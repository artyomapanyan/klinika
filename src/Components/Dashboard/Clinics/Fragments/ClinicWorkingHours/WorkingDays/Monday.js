import React from "react";
import {Button, Col, Form, Row, Select, Space, Switch} from "antd";
import {t} from "i18next";
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

function Monday({data,dataKey,handleUpdateParent}) {


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
      console.log(e,newData)
      newData[0].is_day_off = !e
      handleUpdateParent(Object.values(newData),dataKey)
  }
    return(
        data?.length&&<div>

               <Row>
                        <Col lg={2}>
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
                   <Col lg={19}>
                   {data?.map((el,key) => {
                       let currentOptions = [...options1]
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
export default Monday;