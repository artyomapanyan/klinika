import React, {useEffect, useState} from 'react';
import {t} from "i18next";
import {Avatar, Button, Space, Spin, Table} from "antd";
import {AlibabaOutlined} from "@ant-design/icons";
import gold_star from "../../../../dist/icons/gold_star.png";
import arrow_prev from "../../../../dist/icons/arrow-prev.svg";
import arrow_next from "../../../../dist/icons/arrow-next.svg";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Preloader from "../../../Preloader";



function SuperAdminProfitableTable() {
    let language = useSelector((state) => state.app.current_locale)
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [date, setDate] = useState({
        year: dayjs().format('YYYY'),
        month: ownerClinics?.month_key,
        sort: 'asc'

    });

    useEffect(() => {
        setLoading(true)
        postResource('SuperAdmin', 'ProfitableTable', token, '', date).then((response) => {
            setData(Object.values(response))
            setLoading(false)

        })
    }, [])





    const columns = [
        {
            title: t(''),
            dataIndex: 'task_For',
            key: 'task_For',
            render:(e, record)=>{
                return <div >
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
            title: t('Offers'),
            dataIndex: 'offers_count',
            key: 'offers_count',
        },
        {
            title: t('Orders'),
            dataIndex: 'orders_count',
            key: 'orders_count',
        },
        {
            title: t('Income'),
            dataIndex: 'income',
            key: 'income',
            render:(e, record) => {

                return <div  style={{fontSize: 16, fontFamily: 'Roboto', fontWeight: 700}}>{record?.orders_count}$</div>
            }

        },
    ];

    return (
        <div className={'profitable_table_big_div'}>
            <Spin spinning={loading}>
                    <div className={'incomes_table_head'}>
                        <h1 className={'h1'}>{t('Profitable Clinics')}</h1>
                        <Space>
                            <Button className={'chart_button'} style={{paddingTop: 1}} >
                                {language === 'en' ? <img src={arrow_prev} alt={'arrow_prev'}/> : <img src={arrow_next} alt={'arrow_next'}/>}
                            </Button>
                            <Button className={'chart_button'} style={{paddingTop: 1}} >
                                {language === 'en' ? <img src={arrow_next} alt={'arrow_next'}/> : <img src={arrow_prev} alt={'arrow_prev'}/>}
                            </Button>
                        </Space>

                    </div>
                    <div className={'profitable_clinic_div'}>
                        <Table size={'small'} rowKey={record => record?.clinic?.id} dataSource={data} columns={columns} pagination={false}  />
                    </div>
                </Spin>



        </div>
    );
}
export default SuperAdminProfitableTable;