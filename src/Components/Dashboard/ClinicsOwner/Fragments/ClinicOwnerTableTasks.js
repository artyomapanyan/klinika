import {Avatar, Button, DatePicker, Divider, Progress, Space, Switch, Table} from "antd";
import {t} from "i18next";
import {LeftOutlined, RightOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import ColorSelect from "../../../Fragments/ColorSelect";

function ClinicOwnerTableTasks() {

    const dataSource = [
        {
            task_For: '1',
            task: 'Add a Folder from a template',
            start: 32,
            deadline: '10 Downing Street',
            timeline: 32,
            status: '10 Downing Street',
        },
        {
            task_For: '1',
            task: 'Add a Folder from a template',
            start: 32,
            deadline: '10 Downing Street',
            timeline: 32,
            status: '10 Downing Street',
        },
        {
            task_For: '1',
            task: 'Add a Folder from a template',
            start: 32,
            deadline: '10 Downing Street',
            timeline: 32,
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
            title: t('Task for'),
            dataIndex: 'task_For',
            key: 'task_for',
            render:()=><div>
                <Space >
                    <Avatar size={50} icon={<UserOutlined />} />
                    <div style={{display:"block"}}>
                        <h3 className={'h1'}>Darrell Steward</h3>
                        <div>Clinic manager</div>
                    </div>

                </Space>
            </div>
        },
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
            render:()=><div>
                <h3 className={'h1'}>Save the List you made as a template</h3>
            </div>
        },
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
            render:()=><div>
                <Space >
                    <div style={{display:"block"}}>
                        <h3 className={'h1'}>10 Jul 2022</h3>
                        <div>10:00 AM</div>
                    </div>

                </Space>
            </div>
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            render:()=><div>
                <Space >
                    <div style={{display:"block"}}>
                        <h3 className={'h1'}>10 Jul 2022</h3>
                        <div>10:00 AM</div>
                    </div>

                </Space>
            </div>
        },
        {
            title: 'Timeline',
            dataIndex: 'timeline',
            key: 'timeline',
            render:()=><div className={'clinic_own_table_prog'}>
                <Progress percent={80}
                          format={()=>{
                              return ""
                          }
                          }/>
                <div>Waiting approval</div>

            </div>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render:()=><ColorSelect items={items} initialValue={'Select'}/>
        },
    ];

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };


    return(
        <div className={'chart_incomes_div'}>
            <div className={'incomes_table_head'}>
                <h1 className={'h1'}>Tasks</h1>
                <Space>
                    <Switch defaultChecked  />
                    {t("Previous year")}
                    <Button><LeftOutlined /></Button>
                    <DatePicker onChange={onChange} picker="month" />
                    <Button><RightOutlined /></Button>
                </Space>

            </div>
            <Divider/>
            <Table dataSource={dataSource} pagination={false} columns={columns} />
        </div>
    )
}
export default ClinicOwnerTableTasks;
