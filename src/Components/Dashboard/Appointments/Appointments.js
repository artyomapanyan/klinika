import React, {useRef, useState} from "react";
import {Button, Form, Modal, Spin, Tooltip} from "antd";
import {t} from "i18next";
import ResourceTable from "../../Fragments/ResourceTable";
import {CheckCircleOutlined, MedicineBoxOutlined} from "@ant-design/icons";
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
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import search_icon_darkPurpole from "../../../dist/icons/search_icon_darkPurpole.png";
import DateFilterElement from "../../Fragments/TableFilterElements/DateFilterElement";
import calendar_dark_purpule_icon from "../../../dist/icons/calendar_dark_purpule_icon.png";
import SelectFilterElement from "../../Fragments/TableFilterElements/SelectFilterElement";
import PermCheck from "../../Fragments/PermCheck";
import {FollowUpContent} from "./StatusModalForms/FollowUpContent";

const resource = 'Appointment';
function Appointments() {
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    let selectedRole = useSelector((state) => state.auth.selected_role.key);
    const formRef = useRef();

    const [modal,setModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const [date,setDate] = useState(false)
    const [tableUpdate,setTableUpdate] = useState(0)
    const [aaa,setaaa] = useState(PermCheck(`${resource}:update`))




    const onStatusChange = (key,record)=>{

            setModal({
                ...record,
                key
            })

        // if(key == 2) {
        //     setLoading(true)
        //     postResource('Appointment','appointmentStatus', token, `${record.id}/switch-status`, {
        //         status:key,
        //
        //     }).then(() => {
        //
        //         setModal(null)
        //         setTableUpdate(tableUpdate+1)
        //         setLoading(false)
        //     }).finally(()=>{
        //         setLoading(true)
        //         setTimeout(()=> {setLoading(false)}, 3000)
        //     })
        // }


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
            setTableUpdate(tableUpdate+1)
            setLoading(false)
        }).finally(()=>{
            setLoading(true)
            setTimeout(()=> {setLoading(false)}, 3000)
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

    const onResourceShow = (record) => {


        navigate(ResourceLinks[resource] + record.id+'/doctor')

    }


    return(
        <div >
            <Spin spinning={loading}>
            <div className={'appointment_table'}>
                <Modal maskClosable={true} open={modal?.id} footer={null} onCancel={onCancel}  centered >
                    <Form onFinish={onFinish}
                          onValuesChange={handleValuesChange}
                          ref={formRef}
                    >
                        {
                            modal?.key === '3' ? <CanceledContent loading={loading} onCancel={onCancel} /> :
                                modal?.key === '2' ? <Confirmed loading={loading} onCancel={onCancel}/>:
                                modal?.key === '4' ? <RascheduledContent loading={loading} modal={modal} onCancel={onCancel} date={date} formRef={formRef} /> :
                                modal?.key === '1' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                modal?.key === '5' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                modal?.key === '6' ? <FollowUpContent loading={loading} modal={modal} onCancel={onCancel} date={date} formRef={formRef} />  :
                                modal?.key === '0' ? <Confirmed loading={loading} onCancel={onCancel}/>  :
                                modal?.key === '7' ? <Confirmed loading={loading} onCancel={onCancel}/>  : null
                        }

                    </Form>
                </Modal>

                <ResourceTable
                               resource={resource}
                               updateTable={tableUpdate}
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

                               except={{edit: true,delete: true}}
                               tableColumns={[
                    {
                        dataIndex:'id',
                        title:'ID',
                        key:'id',
                        sorter:true,
                        filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                        filterIcon: (filtered) => (<img alt={'search_icon_darkPurpole'} src={search_icon_darkPurpole}/>),
                    },
                    {
                        dataIndex:'patient',
                        title:t('Patient'),
                        key:'patient',
                        render:(e, record) => {
                            return <div>{record?.patient?.first} {record?.patient?.last}</div>
                        }
                    },
                    {
                        dataIndex:['patient', 'phone_number'],
                        title:t('Phone number'),
                        key:'phone_number',

                    },
                    {
                        dataIndex:'service_type',
                        title:t('Service'),
                        key:'service_type',
                        translatable:true,
                        filterIcon: (filtered) => (<img alt={'search_icon_darkPurpole'} src={search_icon_darkPurpole}/>),
                        filterDropdown: (props)=><SelectFilterElement filterProps={props}/>,
                        render:(e, record) => {
                            return record?.service_type[0]?.toUpperCase()+record?.service_type?.slice(1)?.replaceAll("_", " ")
                        }
                    },
                    {
                        dataIndex:["clinic", "name"],
                        title:t('Clinic'),
                        key:'clinic',
                        filterIcon: (filtered) => (<img alt={'search_icon_darkPurpole'} src={search_icon_darkPurpole}/>),
                        filterDropdown: (props)=><TableFilterElement filterProps={props}/>,

                    },
                    {
                        dataIndex:'offer',
                        title:t('Offer'),
                        key:'offer',
                        render:(e, record)=> {
                            return<Tooltip title={record?.offer?.title}>{record.offer ? <CheckCircleOutlined style={{color: 'green'}}/> : ""}</Tooltip>
                        }
                    },

                    {
                        dataIndex:['booked_at','iso_string'],
                        title:t('Appointment Date'),
                        key:'booked_at_date',
                        filterDropdown: (props)=><DateFilterElement filterProps={props}/>,
                        filterIcon: (filtered) => (<img alt={'calendar_dark_purpule_icon'} src={calendar_dark_purpule_icon}/>),
                        sorter:true,
                        defaultSortOrder:'descend',
                        render:(i, record )=> {
                            return record?.booked_at ? dayjs(record?.booked_at?.iso_string).format('YYYY-MM-DD h:mm A') : '-'
                        }

                    },
                    {
                       dataIndex:'status',
                       title:t('Status'),
                       key:'status',
                        render: (e, record) => {
                            return loading ? <Preloader small={15}/> : <Spin spinning={loading}>
                            <ColorSelect appointmentloading={loading} colorSelectDisabled={!aaa}  items={Resource.StatusWays[record.status]}  initialValue={e.toString()} record={record} resource={resource} onChange={onStatusChange} name={'status'}/>
                            </Spin>
                            }

                       },
                                   (selectedRole === 'doctor' ?
                                       {
                        dataIndex:'doctor',
                        title:t('Doctor'),
                        key:'doctor',
                        render:(i, record )=> <Button style={{border:'none'}} onClick={() => onResourceShow(record)} ><MedicineBoxOutlined style={{color: '#c98a1e'}} /></Button>

                    } : {} ),
                ]} title={t('Appointments')}/>
            </div>
            </Spin>
        </div>
    )
}
export default Appointments;



