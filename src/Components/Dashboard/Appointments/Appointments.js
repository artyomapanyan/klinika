import React, {useState} from "react";
import {Form, Modal} from "antd";
import {t} from "i18next";
import ResourceTable from "../../Fragments/ResourceTable";
import {CheckCircleOutlined} from "@ant-design/icons";
import ColorSelect from "../../Fragments/ColorSelect";
import Resource from "../../../store/Resources";
import {useNavigate} from "react-router";
import ResourceLinks from "../../ResourceLinks";
import {CanceledContent} from "./StatusModalForms/CanceledContent";
import {FinishedContent} from "./StatusModalForms/FinishedContent";
import {RascheduledContent} from "./StatusModalForms/RascheduledContent";
import {postResource} from "../../Functions/api_calls";
import {useSelector} from "react-redux";
import Preloader from "../../Preloader";
import dayjs from "dayjs";
import {Confirmed} from "./StatusModalForms/Confirmed";

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
            values.booked_at = values.booked_at.format('YYYY-MM-DD') + ' ' + values.appointment_time
        }
        postResource('Appointment','appointmentStatus', token, `${modal.id}/switch-status`, {
            status:modal.key,
            ...values
        }).then(() => {

            setModal(null)
            setLoading(false)
        })
    }

    const onCancel = () => {
        setModal(null)
    }

    const handleValuesChange = (changed)=>{
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
                            modal?.key === '3' ? <CanceledContent loading={loading} onCancel={onCancel} /> :
                                modal?.key === '2' ? <FinishedContent loading={loading}  onCancel={onCancel} /> :
                                modal?.key === '4' || modal?.key === '6' ? <RascheduledContent loading={loading} modal={modal} onCancel={onCancel} date={date} /> :
                                modal?.key === '1' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                modal?.key === '5' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                modal?.key === '6' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                modal?.key === '7' ? <Confirmed loading={loading} onCancel={onCancel}/>  : null
                        }

                    </Form>
                </Modal>

                {loading?<Preloader/>:<ResourceTable resource={resource}
                               eyeShow={true}
                               tableParams={{
                                   order_by: 'booked_at',
                                   order: 'desc'
                }}
                               customActions={{
                                   edit:(record)=>{
                                       navigate(`${ResourceLinks[resource] + record.id}`)
                                   }
                               }}

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
                        key:'clinic_id',
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
                        dataIndex:['booked_at','iso_string'],
                        title:t('Appointment Date'),
                        key:'booked_at',
                        sorter:true,
                        defaultSortOrder:'descend',
                        render:(i )=> dayjs(i).utc().format('DD-MM-YYYY HH:mm')

                    },
                    {
                       dataIndex:'status',
                       title:t('Status'),
                       key:'status',
                        render: (e, record) => {
                            return <ColorSelect appointmentloading={loading} items={Resource.StatusWays[record.status]}  initialValue={e.toString()} record={record} resource={resource} onChange={onStatusChange} name={'status'}/>
                        }

                       },
                ]} title={t('Appointments')}/>}
            </div>
        </div>
    )
}
export default Appointments;



