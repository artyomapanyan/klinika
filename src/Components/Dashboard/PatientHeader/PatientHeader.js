import React from 'react'
import {Avatar, Col, Row, Space, Tag} from "antd";
import "../../../dist/styles/Styles.sass"
import { UserOutlined } from '@ant-design/icons';
import phoneWithFrame from "../../../dist/icons/phoneWithFrame.svg";
import emailWithFrame from "../../../dist/icons/emailWithFrame.svg";
import noteBlack from "../../../dist/icons/noteBlack.svg";

function PatientHeader() {
    return (
        <div className={'patient_head_div'}>
            <Row gutter={[20,20]}>
                <Col lg={6} className={'col'}>
                    <div className={'avatar_div'}>
                        <Space>
                            <Avatar shape="square" size={100} icon={<UserOutlined />} />
                            <Space direction={'vertical'} className={'patient_head_text'}>
                                <div className={'patient_head_name'}>Alexa Jameson</div>
                                <div className={'text_norm'}>37 year, female</div>
                                <div><Tag color="magenta" className={'ant_tag'}>ID: 1561654</Tag></div>
                            </Space>
                        </Space>

                    </div>
                </Col>
                <Col lg={9} className={'col'}>
                    <div className={'avatar_div'}>
                        <Space>
                            <Space direction={'vertical'} className={'patient_head_text'}>
                                <div className={'addres_Insurance'}>Addres</div>
                                <div className={'text_norm'}>2118 Thornridge Cir. Syracuse, Connecticut 35624</div>
                                <div className={'addres_Insurance'}>Insurance</div>
                                <Space className={'text_norm'}>Access Medicare (NY)  <span style={{fontWeight:700}}>#233223</span>  <Tag className={'ant_tag'} color="green" >valid</Tag>  </Space>
                            </Space>
                        </Space>

                    </div>
                </Col>
                <Col lg={9} className={'col'}>
                    <Row>
                        <Col lg={17}>
                            <div style={{margin:24}}>
                                    <div className={'phone_mail'}>
                                        <img alt={'icons'} src={phoneWithFrame}/>

                                        <Space direction={'vertical'} className={'patient_head_text'}>
                                            <div className={'addres_Insurance'}>Phone</div>
                                            <div className={'text_norm'}>+7 996 <span style={{fontWeight:700}}>55855804</span></div>
                                        </Space>
                                    </div>
                                    <div>
                                        <div className={'phone_mail'}>
                                            <img alt={'icons'} src={emailWithFrame}/>
                                            <Space direction={'vertical'} className={'patient_head_text'}>
                                                <div className={'addres_Insurance'}>Mail</div>
                                                <div className={'text_norm'}>alex.sushkoff@gmail.com</div>
                                            </Space>
                                        </div>

                                    </div>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className={'private_note_div'}>
                                <div align={'center'}>
                                    <Space className={'private_note_number'}>
                                        3<img alt={'icons'} src={noteBlack}/>
                                    </Space>

                                </div>
                                <div className={'private_note_text'} align={'center'} >Private notes</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default PatientHeader;
