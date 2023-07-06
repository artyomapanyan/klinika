import React, {useState} from "react";
import {Button, Form, Modal, Spin} from "antd";
import ColorSelect from "../../../../Fragments/ColorSelect";
import arrow_next from "../../../../../dist/icons/arrow-next.svg";
import printIcon from "../../../../../dist/icons/printIcon.svg";

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
import {Confirmed} from "../../../Appointments/StatusModalForms/Confirmed";
import Preloader from "../../../../Preloader";
import ClinicManagerTableHead from "./Fregment/ClinicManagerTableHead";
import axios from "axios";
import api from "../../../../../Api";

let resource = 'Appointment';
function ClinicManagerAppointmentsTable() {
    let token = useSelector((state) => state.auth.token);

    const [dateWeek, setDateWeek] = useState([dayjs().startOf('week'), dayjs().endOf('week')])
    const [modal,setModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const [date,setDate] = useState(false)
    const [pdfState,setPdfState] = useState(false)


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

    const handleExportPDF =(record)=>{
        setPdfState(true)
        axios.request({
            url: `${api[resource].exportPdf.url}/${record.id}/export-pdf`,
            method: api[resource].exportPdf.method,
            headers: {
                'Authorization': token,
            },
            responseType: 'blob',

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', resource+'.pdf');
            document.body.appendChild(link);
            link.click();
            setPdfState(false)
        });
    }



    return (
        <div className={'table_conteiner'}>
            {loading ? <Preloader/> :  <Spin spinning={loading}>
                <div style={{paddingBottom: 60}}>




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


                </div>
                <div className={'clinic_manager_res_table'}>
                    <ResourceTable
                        noData={()=><div className={'not_found_text'}>There aren't any information yet</div>}
                        customHeader={(props)=> <ClinicManagerTableHead getDates={(dates)=>props.setParams((prevState)=>(
                            {
                                ...prevState,
                                from:dates[0].format('YYYY-MM-DD'),
                                to:dates[1].format('YYYY-MM-DD'),
                            }))}  hideData={true} date={dateWeek} setDate={setDateWeek} showMonth={true}/>}
                        initialParams={{
                            from:dateWeek[0].format('YYYY-MM-DD'),
                            to:dateWeek[1].format('YYYY-MM-DD'),

                        }}

                        resourceTablemarginTop={true}
                        tableParams={{
                            order_by: 'booked_at',
                            order: 'desc'
                        }}
                        noHeader={true}
                        hideActions={true}
                        resource={'Appointment'}

                       // noPagination={true}
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
                                dataIndex: 'booked_at',
                                key: 'booked_at',
                                sorter:true,
                                defaultSortOrder:'descend',
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
                                    return record.status == 2 ? <Button disabled={pdfState} style={{border: 'none', backgroundColor: '#f6f5f5'}} onClick={()=>handleExportPDF(record)}><img alt={'icons'} src={printIcon}/></Button> : record.status == 3 ? <div></div> : <div><a href={`tel:${record?.patient?.phone_number}`}><img alt={'phoneIcon'} src={phoneIcon}/></a> <a href={`sms:${record?.patient?.phone_number}`}><img style={{marginLeft: 15}} alt={'commentIcon'} src={commentIcon}/></a></div>
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
                                render: () => <img alt={'arrow_next'} src={arrow_next} />
                            },]}
                    />
                </div>

            </Spin>
            }
        </div>
    )
}

export default ClinicManagerAppointmentsTable;