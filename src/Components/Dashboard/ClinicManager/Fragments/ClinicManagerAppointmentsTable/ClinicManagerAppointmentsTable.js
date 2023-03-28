import React from "react";
import {Button, Table} from "antd";
import { RightOutlined} from "@ant-design/icons";
import ColorSelect from "../../../../Fragments/ColorSelect";
import ClinicManagerAppointmentsTableHead from "./Fregment/ClinicManagerAppointmentsTableHead";
import checkmarkGreen from "../../../../../dist/icons/checkmark-green.svg";
import printIcon from "../../../../../dist/icons/printIcon.svg";


function ClinicManagerAppointmentsTable() {


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
            modal:'',

        },{
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
            modal:'',
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
            modal:'',
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
            modal:'',
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
            modal:'',
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

    const columns = [
        {
            title: 'Patient',
            dataIndex: 'patient',
            key: 'patient',
            render:()=><div style={{fontWeight:700, fontSize:17}}>Merrill Kervin</div>
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
            render:()=><img alt={'icons'} src={printIcon}/>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render:()=><ColorSelect items={items} initialValue={'Select'}/>
        },
        {
            title: '',
            dataIndex: 'modal',
            key: 'modal',
            render:()=><Button size={'large'}  style={{border:"none"}} ><RightOutlined /></Button>
        },
    ];



    return(
        <div className={'table_conteiner'}>
            <div>

                <ClinicManagerAppointmentsTableHead />
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
    )
}
export default ClinicManagerAppointmentsTable;