
import React from "react";
import {Avatar, Button, Space, Table} from "antd";
import {CopyOutlined, FilePdfOutlined, LeftOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";

import {useNavigate, useParams} from "react-router";
import {useGetResourceSingle} from "../../Functions/api_calls";
import user_avatar from "../../../dist/icons/user-avatar.png";
import dayjs from "dayjs";
import Preloader from "../../Preloader";

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

    console.log(data, 'data')

    let a = 'aaa@mail.ru'
    let b = '123456789'

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
        },

    ];

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Insurance Company',
            dataIndex: 'insurance_company',
            key: 'insurance_company',
        },
    ];

    return (
        <div style={{marginTop: -120}}>
            <div>
                <Button style={{margin:"40px 24px", height:45, width:45}} onClick={onBack}><LeftOutlined /></Button>
            </div>
            {
                loading ? <Preloader/> : <div>
                    <div className={'add_edit_content'} id={'show_header'} style={{borderRadius: '22px 22px 0 0'}}>
                        <Space >
                            <Avatar size={120} src={<img src={user_avatar} alt={'user_avatar'}/>} style={{background:'gray'}}/>
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