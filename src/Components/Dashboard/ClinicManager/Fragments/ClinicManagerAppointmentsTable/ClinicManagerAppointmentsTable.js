import React, {useState} from "react";
import {Button, Form, Modal, Table} from "antd";
import {RightOutlined} from "@ant-design/icons";
import ColorSelect from "../../../../Fragments/ColorSelect";
import ClinicManagerAppointmentsTableHead from "./Fregment/ClinicManagerAppointmentsTableHead";
import checkmarkGreen from "../../../../../dist/icons/checkmark-green.svg";
import printIcon from "../../../../../dist/icons/printIcon.svg";
import ClinicManagerCalendarHead from "../ClinicManagerCalendar/Fragments/ClinicManagerCalendarHead";
import dayjs from "dayjs";
import ResourceTable from "../../../../Fragments/ResourceTable";
import Active_icon from "../../../../../dist/icons/Active_icon.png";
import commentIcon from "../../../../../dist/icons/commentIcon.svg";
import phoneIcon from "../../../../../dist/icons/phoneIcon.svg";
import Resource from "../../../../../store/Resources";
import {CanceledContent} from "../../../Appointments/StatusModalForms/CanceledContent";
import {FinishedContent} from "../../../Appointments/StatusModalForms/FinishedContent";
import {RascheduledContent} from "../../../Appointments/StatusModalForms/RascheduledContent";
import {useSelector} from "react-redux";
import {postResource} from "../../../../Functions/api_calls";


function ClinicManagerAppointmentsTable() {
    let token = useSelector((state) => state.auth.token);

    const [dateWeek, setDateWeek] = useState([dayjs().startOf('week'), dayjs().endOf('week')])

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


    return (
        <div className={'table_conteiner'}>
            <div style={{paddingBottom: 60}}>




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


            </div>
            <ResourceTable
                customHeader={(props)=> <ClinicManagerCalendarHead getDates={(dates)=>props.setParams((prevState)=>({
                    ...prevState,
                    from:dates[0].format('YYYY-MM-DD'),
                    to:dates[1].format('YYYY-MM-DD'),
                }))}  hideData={true} date={dateWeek} setDate={setDateWeek} showMonth={true}/>}
                noHeader={true}
                hideActions={true}
                resource={'Appointment'}

                noPagination={true}
                tableColumns={[{
                    title: 'Patient',
                    dataIndex: 'patient',
                    key: 'patient',
                    render: (e, record) => <div style={{fontWeight: 700, fontSize: 14, fontFamily: 'Roboto'}}>{record?.patient?.first} {record?.patient?.last}</div>
                },
                    {
                        title: 'Phone',
                        dataIndex: 'phone',
                        key: 'phone',
                        render:(e, record) => {
                            return <div>{record?.patient?.phone_number}</div>
                        }
                    },
                    {
                        title: 'Doctor',
                        dataIndex: 'doctor',
                        key: 'doctor',
                        render:(e, record) => {
                            return <div className={'table_normal_text'}>{record?.doctor?.first} {record?.doctor?.last}</div>
                        }
                    },
                    {
                        title: 'Specialty',
                        dataIndex: 'specialty',
                        key: 'specialty',
                        render:(e, record) => {
                            return <div className={'table_normal_text'}>{record?.specialty?.title}</div>
                        }
                    },
                    {
                        title: 'Date',
                        dataIndex: 'date',
                        key: 'date',
                        render:(e, record) => {
                            return <div className={'table_bold_text'}>{dayjs(record?.booked_at?.iso_string).format('DD.MM.YY')}</div>
                        }
                    },
                    {
                        title: 'Time',
                        dataIndex: 'time',
                        key: 'time',
                        render:(e, record) => {
                            return <div className={'table_normal_text'}>{dayjs(record?.booked_at?.iso_string).format('HH:mm A')}</div>
                        }
                    },
                    {
                        title: 'Price',
                        dataIndex: 'price',
                        key: 'price',
                    },
                    {
                        title: 'Offer',
                        dataIndex: 'offer',
                        key: 'offer',
                        render:(e, record) => {
                            return record.offer ? <img alt={'Active_icon'} src={Active_icon}/> : <div></div>
                        }
                    },
                    {
                        title: 'Actions',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (e, record) => {
                            console.log(record?.patient?.phone_number)
                            return record.status == 2 ? <img alt={'icons'} src={printIcon}/> : record.status == 3 ? <div></div> : <div><a href={`tel:${record?.patient?.phone_number}`}><img alt={'phoneIcon'} src={phoneIcon}/></a> <a href={`sms:${record?.patient?.phone_number}`}><img style={{marginLeft: 15}} alt={'commentIcon'} src={commentIcon}/></a></div>
                        }
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (e, record) => <ColorSelect height={true} items={Resource.StatusWays[record.status]}  initialValue={e.toString()} record={record} resource={'Appointment'} onChange={onStatusChange} name={'status'}/>
                    },
                    {
                        title: '',
                        dataIndex: 'modal',
                        key: 'modal',
                        render: () => <Button size={'large'} style={{border: "none"}}><RightOutlined/></Button>
                    },]}
            />
        </div>
    )
}

export default ClinicManagerAppointmentsTable;