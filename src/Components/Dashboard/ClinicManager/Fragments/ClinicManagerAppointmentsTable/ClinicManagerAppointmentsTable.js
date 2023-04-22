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
            label: 'Select',
            key: 'Select',
        },
        {
            label: 'Not Started',
            key: 'Not Started',
        },
        {
            label: 'Done',
            key: 'Done',
        },

    ];


    return (
        <div className={'table_conteiner'}>
            <div>

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
                    render: () => <div style={{fontWeight: 700, fontSize: 17}}>Merrill Kervin</div>
                },
                    {
                        title: 'Phone',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: 'Doctor',
                        dataIndex: 'doctor',
                        key: 'doctor',
                    },
                    {
                        title: 'Specialty',
                        dataIndex: 'specialty',
                        key: 'specialty',
                    },
                    {
                        title: 'Date',
                        dataIndex: 'date',
                        key: 'date',
                    },
                    {
                        title: 'Time',
                        dataIndex: 'time',
                        key: 'time',
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
                    },
                    {
                        title: 'Actions',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: () => <img alt={'icons'} src={printIcon}/>
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: () => <ColorSelect items={items} initialValue={'Select'}/>
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