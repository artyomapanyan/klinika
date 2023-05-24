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

    const [data, setData] = useState([]);

    const [date, setDate] = useState({
        year: dayjs().format('YYYY'),
        month: ownerClinics?.month_key,
        sort: 'asc'

    });

    useEffect(() => {
        postResource('SuperAdmin', 'ProfitableTable', token, '', date).then((response) => {

            setData(Object.values(response))

        })
    }, [])





    const columns = [
        {
            title: t(''),
            dataIndex: 'task_For',
            key: 'task_for',
            render:(e, record)=>{
                console.log(record, 'record')
                return <div>
                    <div className={'profitable_table_clinic_div'}>
                        <Avatar size={64} icon={<AlibabaOutlined />} src={record?.clinic?.cover?.url} />
                        <div style={{display:"block", marginLeft: 24}}>
                            <div className={'profitable_table_bold_text'}>{record?.clinic?.name}</div>
                            <div className={'clinic_fid_patient_name'}>2.7 <img alt={'gold_star'} src={gold_star}/> <span className={'profitable_table_small_text'}>{record?.clinic?.location?.address1}</span> </div>
                        </div>

                    </div>
                </div>
            }
        },
        {
            title: 'Offers',
            dataIndex: 'offers_count',
            key: 'offers_count',
        },
        {
            title: 'Orders',
            dataIndex: 'orders_count',
            key: 'orders_count',
        },
        {
            title: 'Income',
            dataIndex: 'income',
            key: 'income',
            render:(e, record) => {
                return <div style={{fontSize: 16, fontFamily: 'Roboto', fontWeight: 700}}>{record?.orders_count}$</div>
            }

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
                <Table size={'small'} dataSource={data} columns={columns} pagination={false} />
            </div>

        </div>
    );
}
export default SuperAdminProfitableTable;