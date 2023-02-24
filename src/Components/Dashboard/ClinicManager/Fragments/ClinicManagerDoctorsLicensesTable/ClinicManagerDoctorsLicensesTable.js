import React, {useState} from "react";
import {Avatar, Button, Divider, Modal, Space, Table} from "antd";
import {t} from "i18next";
import {LeftOutlined, RightOutlined, UserOutlined} from "@ant-design/icons";
import licenseIcon from "../../../../../dist/icons/licenseIcon.svg";
import DoctorsLicenseModal from "./Fragment/DoctorsLicenseModal";

function ClinicManagerDoctorsLicensesTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dataSource = [
        {
            name: '1',
            date: 32,
            status: '10 Downing Street',
        },
        {
            name: '1',
            date: 32,
            status: '10 Downing Street',
        },
        {
            name: '1',
            date: 32,
            status: '10 Downing Street',
        },
        {
            name: '1',
            date: 32,
            status: '10 Downing Street',
        },
        {
            name: '1',
            date: 32,
            status: '10 Downing Street',
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
                        <h3 className={'h1'}>Dermatologist</h3>
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
                        <h3 align={'center'} className={'h1'} style={{color: "green"}} >Terapist</h3>
                    </div>

                </Space>
            </div>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render:()=><Button size={'large'} type="primary" onClick={()=>setIsModalOpen(true)} style={{fontWeight:700}} >
                <Space>
                    <img alt={'icons'} src={licenseIcon}/>
                    Renew license
                </Space>
            </Button>
        },
    ];



    return(
        <div className={'cl_man_tables'}>
            <div className={'incomes_table_head'}>
                <h1 className={'h1'}>Doctors'  licenses expiration</h1>
                <Space>
                    <Button><LeftOutlined /></Button>
                    <div>5/10</div>
                    <Button><RightOutlined /></Button>
                </Space>
            </div>
            <Divider/>
            <Modal open={isModalOpen}  onCancel={()=>setIsModalOpen(false)} width={'380px'} footer={null}>
                <DoctorsLicenseModal />
            </Modal>
            <Table size={'small'} className={'table_header_none'} dataSource={dataSource} columns={columns} pagination={false} />
        </div>
    )
}
export default ClinicManagerDoctorsLicensesTable;
