import React, {useEffect, useState} from 'react';
import {t} from "i18next";
import {Avatar, Button, Space, Table} from "antd";
import {AlibabaOutlined} from "@ant-design/icons";
import gold_star from "../../../../dist/icons/gold_star.png";
import arrow_prev from "../../../../dist/icons/arrow-prev.svg";
import arrow_next from "../../../../dist/icons/arrow-next.svg";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";


function SuperAdminProfitableTable() {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [date, setDate] = useState({
        year: dayjs().format('YYYY'),
        month: ownerClinics?.month_key,
        sort: 'asc'

    });

    useEffect(() => {
        postResource('SuperAdmin', 'ProfitableTable', token, '', date).then((response) => {

        })
    }, [])

    const dataSource = [
        {
            task_For: '1',
            offers: 184,
            orders: '1868',
            income: '18874$',
        },
        {
            task_For: '1',
            offers: 263,
            orders: '1868',
            income: '18874$',
        },
        {
            task_For: '1',
            offers: 85,
            orders: '11868',
            income: '18874$',
        },
        {
            task_For: '1',
            offers: 32,
            orders: '1868',
            income: '18874$',
        },

    ];



    const columns = [
        {
            title: t(''),
            dataIndex: 'task_For',
            key: 'task_for',
            render:()=><div>
                <div className={'profitable_table_clinic_div'}>
                    <Avatar size={64} icon={<AlibabaOutlined />} />
                    <div style={{display:"block", marginLeft: 24}}>
                        <div className={'profitable_table_bold_text'}>Chiropractic Care</div>
                        <div className={'clinic_fid_patient_name'}>2.7 <img alt={'gold_star'} src={gold_star}/> <span className={'profitable_table_small_text'}>Jeddah</span> </div>
                    </div>

                </div>
            </div>
        },
        {
            title: 'Offers',
            dataIndex: 'offers',
            key: 'offers',
        },
        {
            title: 'Orders',
            dataIndex: 'orders',
            key: 'orders',
        },
        {
            title: 'Income',
            dataIndex: 'income',
            key: 'income',

        },
    ];

    return (
        <div className={'profitable_table_big_div'}>
            <div className={'incomes_table_head'}>
                <h1 className={'h1'}>Profitable Clinics</h1>
                <Space>
                    <Button className={'chart_button'} style={{paddingTop: 1}} ><img src={arrow_prev} alt={'arrow_prev'}/></Button>
                    <Button className={'chart_button'} style={{paddingTop: 1}} ><img src={arrow_next} alt={'arrow_next'}/></Button>
                </Space>

            </div>
            <div className={'profitable_clinic_div'}>
                <Table size={'small'} dataSource={dataSource} columns={columns} pagination={false} />
            </div>

        </div>
    );
}
export default SuperAdminProfitableTable;