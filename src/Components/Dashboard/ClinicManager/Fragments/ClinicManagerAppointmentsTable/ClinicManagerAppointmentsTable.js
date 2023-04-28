import React, {useState} from "react";
import {Button, Table} from "antd";
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


function ClinicManagerAppointmentsTable() {
    const [date, setDate] = useState([dayjs().startOf('week'), dayjs().endOf('week')])


    const dataSource = [
        {
            patient: 'Merrill Kervin',
            phone: '+966568499214',
            doctor: 'Doctor Name',
            specialty: 'Specialty',
            date: '10.07.22',
            time: '10:00 AM',
            price: '1357.5 SAR',
            offer: <img alt={'icons'} src={checkmarkGreen}/>,
            actions: <img alt={'icons'} src={printIcon}/>,
            status: '',
            modal: '',

        }, {
            patient: 'Merrill Kervin',
            phone: '+966568499214',
            doctor: 'Doctor Name',
            specialty: 'Specialty',
            date: '10.07.22',
            time: '10:00 AM',
            price: '1357.5 SAR',
            offer: <img alt={'icons'} src={checkmarkGreen}/>,
            actions: <img alt={'icons'} src={printIcon}/>,
            status: '',
            modal: '',
        },
        {
            patient: 'Merrill Kervin',
            phone: '+966568499214',
            doctor: 'Doctor Name',
            specialty: 'Specialty',
            date: '10.07.22',
            time: '10:00 AM',
            price: '1357.5 SAR',
            offer: <img alt={'icons'} src={checkmarkGreen}/>,
            actions: <img alt={'icons'} src={printIcon}/>,
            status: '',
            modal: '',
        },
        {
            patient: 'Merrill Kervin',
            phone: '+966568499214',
            doctor: 'Doctor Name',
            specialty: 'Specialty',
            date: '10.07.22',
            time: '10:00 AM',
            price: '1357.5 SAR',
            offer: <img alt={'icons'} src={checkmarkGreen}/>,
            actions: <img alt={'icons'} src={printIcon}/>,
            status: '',
            modal: '',
        },
        {
            patient: 'Merrill Kervin',
            phone: '+966568499214',
            doctor: 'Doctor Name',
            specialty: 'Specialty',
            date: '10.07.22',
            time: '10:00 AM',
            price: '1357.5 SAR',
            offer: <img alt={'icons'} src={checkmarkGreen}/>,
            actions: <img alt={'icons'} src={printIcon}/>,
            status: '',
            modal: '',
        },


    ];

    const items = [
        {
            label: 'New',
            key: '1',
        },
        {
            label: 'Rescheduled',
            key: '2',
        },
        {
            label: 'Finished',
            key: '3',
        },

    ];


    return (
        <div className={'table_conteiner'}>
            <div style={{paddingBottom: 30}}>

                <ClinicManagerCalendarHead hideData={true} date={date} setDate={setDate}/>
            </div>
            <ResourceTable
                noHeader={true}
                hideActions={true}
                resource={'Appointment'}

                noPagination={true}
                tableColumns={[{
                    title: 'Patient',
                    dataIndex: 'patient',
                    key: 'patient',
                    render: (e, record) => <div style={{fontWeight: 700, fontSize: 17}}>{record?.name}</div>
                },
                    {
                        title: 'Phone',
                        dataIndex: 'phone',
                        key: 'phone',
                        render:(e, record) => {
                            console.log(record)
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
                            return record.status == 3 ? <img alt={'icons'} src={printIcon}/> : <div><img alt={'phoneIcon'} src={phoneIcon}/><img style={{marginLeft: 15}} alt={'commentIcon'} src={commentIcon}/></div>
                        }
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (e, record) => <ColorSelect items={items} initialValue={record?.status.toString()} record={record} resource={'Appointment'} name={'status'}/>
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