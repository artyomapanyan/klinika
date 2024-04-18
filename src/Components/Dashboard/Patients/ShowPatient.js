
import React from "react";
import {Avatar, Button, Space, Table} from "antd";
import {
    CopyOutlined,
    FilePdfOutlined,
    LeftOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined
} from "@ant-design/icons";

import {useNavigate, useParams} from "react-router";
import {useGetResourceSingle} from "../../Functions/api_calls";
import user_avatar from "../../../dist/icons/user-avatar.png";
import dayjs from "dayjs";
import Preloader from "../../Preloader";
import {t} from "i18next";

let resource = 'Patient';
function ShowPatient() {
    const navigate = useNavigate();
    const params = useParams();

    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const onBack = () => {
        navigate(-1)
    }



    const dataSource = [
        {
            key: data?.id,
            id: data?.id,
            phone: <a href={`tel:${data?.phone_number}`}>{data?.phone_number}</a>,
            email: <a href={`mailto:${data?.email}`}>{data?.email}</a>,
            birthday: dayjs(data?.dob?.iso_string).format('DD-MM-YYYY'),
            gender: data?.gender === 1 ? 'male' : 'female',
            insurance_company: data?.insurance_company,
            address: data?.address,
            nationality: data?.nationality
        },

    ];

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('Phone'),
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: t('Email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('Birthday'),
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: t('Gender'),
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: t('Address'),
            dataIndex: ['address', 'address1'],
            key: 'address',
        },
        {
            title: t('Insurance Company'),
            dataIndex: ['insurance_company', 'name'],
            key: 'insurance_company',
        },
        {
            title: t('Nationality'),
            dataIndex: ['nationality', 'name'],
            key: 'nationality',
        },
    ];

    console.log(data)

    return (
        <div style={{marginTop: -120}}>
            <div>
                <Button style={{margin:"40px 24px", height:45, width:45}} onClick={onBack}><LeftOutlined /></Button>
            </div>
            {
                loading ? <Preloader/> : <div>
                    <div className={'add_edit_content'} id={'show_header'} style={{borderRadius: '22px 22px 0 0'}}>
                        <Space >
                            <Avatar style={{borderRadius: 8}} shape="square" size={120} src={data?.avatar?.url} style={{background:'gray'}} icon={<UserOutlined />}/>
                            <div style={{display:"block", marginLeft:20}}>
                                <h2 style={{fontWeight: 600}}>{data?.first} {data?.last}</h2>
                                <div>
                                    {/*<Space>*/}
                                    {/*    <div className={'show_mail_btn'}><a href={`mailto:${data?.patient?.email}`}><MailOutlined style={{fontSize: 20, color:'black'}}/></a></div>*/}
                                    {/*    <div className={'show_phone_btn'}><a href={`tel:${data?.patient?.phone}`}><PhoneOutlined style={{color: "#ffffff", fontSize: 20}}/></a></div>*/}

                                    {/*</Space>*/}
                                </div>
                            </div>

                        </Space>
                    </div>

                    <div style={{margin: '-20px 20px'}}>
                        <Table dataSource={dataSource} columns={columns} pagination={false} />
                    </div>
                </div>
            }


        </div>
    )
}

export default ShowPatient;