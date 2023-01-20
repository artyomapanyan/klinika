import React from "react";
import {Avatar, Button, Divider, Space, Table} from "antd";
import {t} from "i18next";
import {LeftOutlined, RightOutlined, UserOutlined} from "@ant-design/icons";
import ColorSelect from "../../../../Fragments/ColorSelect";
import phoneLogoPuple from "../../../../../dist/icons/phoneLogoPuple.svg";

function ClinicManagerConfirmation() {

    const dataSource = [
        {
            task_For: '1',
            start: 32,
            deadline: '10 Downing Street',
            status: '10 Downing Street',
        },
        {
            task_For: '1',
            start: 32,
            deadline: '10 Downing Street',
            status: '10 Downing Street',
        },
        {
            task_For: '1',
            start: 32,
            deadline: '10 Downing Street',
            status: '10 Downing Street',
        },
        {
            task_For: '1',
            start: 32,
            deadline: '10 Downing Street',
            status: '10 Downing Street',
        },
        {
            task_For: '1',
            start: 32,
            deadline: '10 Downing Street',
            status: '10 Downing Street',
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
            title: t(''),
            dataIndex: 'task_For',
            key: 'task_for',
            render:()=><div>
                <Space >
                    <Avatar size={50} icon={<UserOutlined />} />
                    <div style={{display:"block"}}>
                        <div>Jerome Bell</div>
                        <h3 className={'h1'}>Tomorrow 10:00 AM</h3>
                    </div>

                </Space>
            </div>
        },
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
            render:()=><div>
                <Space >
                    <div style={{display:"block"}}>
                        <div align={'center'}>Abdulkerim Dur</div>
                        <h3 align={'center'} className={'h1'}>Terapist</h3>
                    </div>

                </Space>
            </div>
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            render:()=><div><img alt={'icons'} src={phoneLogoPuple}/></div>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render:()=><ColorSelect items={items} initialValue={'Select'}/>
        },
    ];

    return(
        <div className={'chart_incomes_div'}>
            <div className={'incomes_table_head'}>
                <h1 className={'h1'}>Confirmation of attendance</h1>
                <Space>
                    <Button><LeftOutlined /></Button>
                    <div>5/10</div>
                    <Button><RightOutlined /></Button>
                </Space>

            </div>
            <Divider/>
            <Table size={'small'} className={'table_header_none'} dataSource={dataSource} columns={columns} pagination={false} />
        </div>
    )
}
export default ClinicManagerConfirmation;
