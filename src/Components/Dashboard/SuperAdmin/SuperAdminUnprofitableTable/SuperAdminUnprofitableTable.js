import React from 'react';
import {t} from "i18next";
import {Avatar, Button, Divider, Radio, Space, Table} from "antd";
import {LeftOutlined, RightOutlined, AlibabaOutlined} from "@ant-design/icons";
import phoneLogoPuple from "../../../../dist/icons/phoneLogoPuple.svg";
import ColorSelect from "../../../Fragments/ColorSelect";
import starRed from "../../../../dist/icons/star-red.svg";


function SuperAdminUnprofitableTable() {

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
                <Space >
                    <Avatar size={50} icon={<AlibabaOutlined />} />
                    <div style={{display:"block"}}>
                        <h3 className={'h1'}>Chiropractic Care</h3>
                        <div className={'clinic_fid_patient_name'}>2.7 <img alt={'icons'} src={starRed}/> <span style={{fontWeight:300, marginLeft:10}}>Jeddah</span> </div>
                    </div>

                </Space>
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
        <div className={'chart_incomes_div'}>
            <div className={'incomes_table_head'}>
                <h1 className={'h1'}>Confirmation of attendance</h1>
                <Space>
                    <Radio.Group defaultValue="year" size="large">
                        <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                        <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                        <Radio.Button value="month">{t(" Month ")}</Radio.Button>
                    </Radio.Group>
                    <Button><LeftOutlined /></Button>
                    <Button><RightOutlined /></Button>
                </Space>

            </div>
            <Divider/>
            <Table size={'small'} dataSource={dataSource} columns={columns} pagination={false} />
        </div>
    );
}
export default SuperAdminUnprofitableTable;