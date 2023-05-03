import React, {useRef, useState} from "react";
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
import {useNavigate, useParams} from "react-router";
import ResourceLinks from "../../ResourceLinks";
import {CanceledContent} from "./StatusModalForms/CanceledContent";
import {FinishedContent} from "./StatusModalForms/FinishedContent";
import {RascheduledContent} from "./StatusModalForms/RascheduledContent";
import {postResource, useGetResourceSingle} from "../../Functions/api_calls";
import {useSelector} from "react-redux";

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const resource = 'Appointment';
function Appointments() {
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);

    const [modal,setModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const [date,setDate] = useState(false)


    const onStatusChange = (key,record)=>{
        setModal({
           ...record,
            key
        })

    }

    const onFinish = (values) => {
        setLoading(true)
        if (values?.booked_at) {
            values.booked_at = values.booked_at.format('YYYY-MM-DD') + values.appointment_time
        }


        setLoading(true)
        postResource('Appointment','single', token, modal.id, {
            status:modal.key,
            ...values
        }).then((response) => {

            setModal(null)
            setLoading(false)
        })
    }

    const onCancel = () => {
        setModal(null)
    }

    const handleValuesChange = (changed,all)=>{
        if(changed.booked_at) {
            setDate((prevDate)=>({
                ...prevDate,
                ...changed
            }))
        }

    }

    return(
        <div >
            <div>
                <Modal maskClosable={true} open={modal?.id} footer={null} onCancel={onCancel}  centered >
                    <Form onFinish={onFinish}
                          onValuesChange={handleValuesChange}
                    >
                        {
                            modal?.key === '3' ? <CanceledContent onCancel={onCancel} /> : modal?.key === '2' ? <FinishedContent onCancel={onCancel} /> :
                                modal?.key === '4' || modal?.key === '6' ? <RascheduledContent modal={modal} onCancel={onCancel} date={date} /> : null
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



