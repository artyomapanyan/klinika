import React, {useState} from "react";
import {Button, Collapse, Form, DatePicker, Row, Col, Modal} from "antd";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import DateParser from "../../Fragments/DateParser";
import {CheckCircleOutlined} from "@ant-design/icons";
import CInput from "../../Fragments/Inputs/CInput";
import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";
import {useNavigate} from "react-router";
import ResourceLinks from "../../ResourceLinks";
import {CanceledContent} from "./StatusModalForms/CanceledContent";
import {FinishedContent} from "./StatusModalForms/FinishedContent";
import {RascheduledContent} from "./StatusModalForms/RascheduledContent";
import {postResource} from "../../Functions/api_calls";

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const resource = 'Appointment';
function Appointments() {
    const navigate = useNavigate();
    const [modal,setModal] = useState(false)


    const onStatusChange = (key,record)=>{
        setModal({
            id:record.id,
            key
        })

    }

    const onFinish = (values) => {
            console.log(values)
        postResource('','','',modal.id,{
            status:modal.key,
            ...values
        })
    }

    const onCancel = () => {
        setModal(null)
    }

    return(
        <div >
            <div>
                <Modal maskClosable={true} open={modal?.id} footer={null} onCancel={onCancel}  centered >
                    <Form onFinish={onFinish} >
                        {
                            modal?.key === '3' ? <CanceledContent onCancel={onCancel} /> : modal?.key === '2' ? <FinishedContent onCancel={onCancel} /> :
                                modal?.key === '4' || modal?.key === '6' ? <RascheduledContent onCancel={onCancel} /> : null
                        }

                    </Form>
                </Modal>

                <ResourceTable resource={resource}
                               customActions={{
                                   edit:(record)=>{
                                       navigate(`${ResourceLinks[resource] + record.id}`)
                                   }
                               }}
                               eyeShow={true}
                               except={{edit: true}}
                               tableColumns={[
                    {
                        dataIndex:'id',
                        title:'ID',
                        key:'id',
                        sorter:true,
                    },
                    {
                        dataIndex:'service_type',
                        title:t('Service'),
                        key:'service_type',
                        translatable:true,
                        render:(e, record) => {
                            return record?.service_type[0]?.toUpperCase()+record?.service_type?.slice(1)?.replaceAll("_", " ")
                        }
                    },
                    {
                        dataIndex:["clinic", "name"],
                        title:t('Clinic'),
                        key:'clinic',
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
                       dataIndex:'status',
                       title:t('Status'),
                       key:'status',
                        render: (e, record) => {
                            return <ColorSelect items={Resource.StatusWays[record.status]}  initialValue={e.toString()} record={record} resource={resource} onChange={onStatusChange} name={'status'}/>
                        }

                       },
                ]} title={t('Appointments')}/>
            </div>
        </div>
    )
}
export default Appointments;



