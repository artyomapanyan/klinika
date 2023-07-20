import React, {useState} from 'react'
import {Avatar, Col, Modal, Row, Space, Tag} from "antd";
import "../../../../../dist/styles/Styles.sass"
import { UserOutlined } from '@ant-design/icons';
import phoneWithFrame from "../../../../../dist/icons/phoneWithFrame.svg";
import emailWithFrame from "../../../../../dist/icons/emailWithFrame.svg";
import noteBlack from "../../../../../dist/icons/noteBlack.svg";
import PrivateNotesModal from "./PrivateNotesModal";
import dayjs from "dayjs";

function PatientHeader({data}) {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div className={'patient_head_div'}>
            <Row>
                <Col lg={7} className={'col'}>
                    <div className={'avatar_div'}>

                            <Avatar style={{borderRadius: 8}} shape="square" size={110} icon={<UserOutlined />} />
                            <div className={'patient_head_text'}>
                                <div className={'patient_head_name'}>{data?.patient?.first} {data?.patient?.last}</div>
                                <div className={'text_norm'}>{dayjs(data?.patient?.dob).fromNow(true)}, {data?.patient?.gender == 0 ? 'male' : 'female'} </div>
                                <div><Tag color="magenta" style={{backgroundColor:'#D477B030'}} className={'ant_tag'}>ID: {data?.patient?.id}</Tag></div>
                            </div>


                    </div>

                </Col>

                <Col lg={8} className={'col'}>
                    <div className={'avatar_div'}>

                            <div className={'patient_head_text'} style={{height: 110, justifyContent: "space-between"}}>
                                <div >
                                    <div className={'addres_Insurance'}>Addres</div>
                                    <div className={'text_norm'}>{data?.patient?.address?.country?.name} {data?.patient?.address?.region?.name} {data?.patient?.address?.city?.name} {data?.patient?.address?.address1}</div>
                                </div>
                                <div >
                                    <div className={'addres_Insurance'}>Insurance</div>
                                    <Space className={'text_norm'}>{data?.patient?.insurance_company?.name}  <span style={{fontWeight:700}}>#{data?.patient?.insurance_company?.id}
                                    </span>
                                        <Tag style={{backgroundColor: dayjs(data?.patient?.insurance_company?.expiration_date).format('DD-MM-YYYY') < dayjs().format('DD-MM-YYYY') ? '#6DAF5630' : '#f6d7d7',
                                            color: dayjs(data?.patient?.insurance_company?.expiration_date).format('DD-MM-YYYY') < dayjs().format('DD-MM-YYYY') ? '#6DAF56' : '#ee4e4e'}} className={'ant_tag'} color="green" >
                                            {
                                                dayjs(data?.patient?.insurance_company?.expiration_date).format('DD-MM-YYYY') < dayjs().format('DD-MM-YYYY') ? 'Valid' : 'No valid'
                                            }

                                        </Tag>
                                    </Space>
                                </div>
                            </div>


                    </div>
                </Col>
                <Col lg={9} className={'col'}>
                    <Row>
                        <Col lg={17}>
                            <div className={'patient_head_text'} style={{margin:24, justifyContent: 'space-between', height: 110}}>
                                    <div className={'phone_mail'}>
                                        <img alt={'icons'} src={phoneWithFrame}/>

                                        <div className={'patient_head_text'} >
                                            <div className={'addres_Insurance'}>Phone</div>
                                            <div className={'text_norm'}>+{data?.patient?.phone_country_code} <span style={{fontWeight:700}}>{data?.patient?.phone_number}</span></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={'phone_mail'}>
                                            <img alt={'icons'} src={emailWithFrame}/>
                                            <div className={'patient_head_text'}>
                                                <div className={'addres_Insurance'}>Mail</div>
                                                <div className={'text_norm'}>{data?.patient?.email}</div>
                                            </div>
                                        </div>

                                    </div>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className={'private_note_div'} onClick={showModal}>
                                <div align={'center'}>
                                    <div className={'private_note_number'}>
                                        {JSON.parse(data?.private_notes)?.length ?? 0}
                                        <img alt={'icons'} src={noteBlack} style={{marginLeft: 9}}/>
                                    </div>

                                </div>
                                <div className={'private_note_text'} align={'center'} >Private notes</div>
                            </div>
                            <Modal className={'medications_modal'} title="Private notes" footer={false} width={640} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <PrivateNotesModal data={data}/>

                            </Modal>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default PatientHeader;
