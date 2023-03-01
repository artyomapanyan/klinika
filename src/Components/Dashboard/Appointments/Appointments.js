import React from "react";
import {Button, Collapse, Form, DatePicker, Row, Col} from "antd";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import {CheckCircleOutlined} from "@ant-design/icons";
import CInput from "../../Fragments/Inputs/CInput";

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

function Appointments() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onChange = (key) => {
        console.log(key);
    };


    return(
        <div >
            <div className={'add_edit_content'}>
                <Collapse defaultActiveKey={[]} onChange={onChange}>
                    <Panel header="Filter" key="1">
                        <Form
                            onFinish={onFinish}
                            name={"filter"}
                        >
                            <Row>

                                <Form.Item >
                                    <CInput label={'valodik'}/>
                                </Form.Item>
                                <Col lg={8} className="gutter-row">
                                    <Form.Item name={'date'}>
                                        <RangePicker size={'large'} />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} className="gutter-row">
                                    <FormInput label={t('Doctor')} name={'doctor_id'} inputType={'resourceSelect'}
                                               initialValue={null}
                                               initialData={[]}
                                               resource={'Doctor'}/>
                                </Col>
                                <Col lg={8} className="gutter-row">
                                    <FormInput label={t('Clinic')} name={'clinic_id'} inputType={'resourceSelect'}
                                               initialValue={null}
                                               initialData={[]}
                                               resource={'Clinic'}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} className="gutter-row">
                                    <FormInput label={t('Service')} name={'service_id'} inputType={'resourceSelect'}
                                               initialValue={null}
                                               initialData={[]}
                                               resource={'Service'}/>
                                </Col>
                                <Col lg={12} className="gutter-row">
                                    <FormInput label={t('Specialty')} name={'specialty_id'} inputType={'resourceSelect'}
                                               initialValue={null}
                                               initialData={[]}
                                               resource={'Taxonomy'}/>
                                </Col>
                            </Row>

                            <div>
                                <Button type={'primary'} htmlType="submit">Filter</Button>
                            </div>
                        </Form>

                    </Panel>

                </Collapse>
            </div>



            <div>
                <ResourceTable resource={'Appointment'}
                               except={{edit: true}}
                               tableColumns={[
                    {
                        dataIndex:'id',
                        title:'ID',
                        key:'id',
                        sorter:true,
                    },
                    {
                        dataIndex:'service',
                        title:t('Service'),
                        key:'service',
                        translatable:true,
                    },
                    {
                        dataIndex:["clinic", "name"],
                        title:t('Clinic'),
                        key:'clinic',
                        translatable:true,
                        sorter:true,

                    },
                    {
                        dataIndex:'offer',
                        title:t('Offer'),
                        key:'offer',
                        render:(e, record)=> {
                            return<div>{record.offer ? <CheckCircleOutlined style={{color: 'green'}}/> : ""}</div>
                        }
                    },

                    {
                        dataIndex:['created_at','iso_string'],
                        title:t('Appointment Date'),
                        key:'date',
                        render:i=><DateParser date={i}/>
                    },
                    {
                       dataIndex:'name',
                       title:t('Status'),
                       key:'name',
                       sorter:true,
                       translatable:true,
                       filterDropdown: (props)=><TableFilterElement filterProps={props}/>,

                       },
                ]} title={t('Appointments')}/>
            </div>
        </div>
    )
}
export default Appointments;



