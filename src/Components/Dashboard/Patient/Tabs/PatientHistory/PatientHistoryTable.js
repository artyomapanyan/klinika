import React from "react";
import {Avatar, Checkbox, Col, Row, Space, Table, Tag} from "antd";
import {t} from "i18next";
import {UserOutlined} from "@ant-design/icons";

function PatientHistoryTable() {
    const dataSource = [
        {
            key: '1',
            name: 'Antineutrophil Cytoplasmic Antibodies (ANCA) Test',
            Clinic: "Class Clinic Saudi",
            Date: 'Wed, Mar 16, 2022',
        },
        {
            key: '2',
            name: 'Antineutrophil Cytoplasmic Antibodies (ANCA) Test',
            Clinic: 42,
            Date: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: t('Doctor'),
            dataIndex: 'name',
            key: 'name',
            render:(e,record)=>{
                return <div className={'avatar_div'}>
                        <Space >
                            <Avatar shape="square" size={65} icon={<UserOutlined />} />
                                <div style={{display:"block"}}>
                                    <h3>Alexa Jameson</h3>
                                    <Tag color="magenta" className={'ant_tag'}>Cardiology</Tag>
                                </div>

                        </Space>

                    </div>
            }
        },
        {
            title: t('Clinic'),
            dataIndex: 'Clinic',
            key: 'Clinic',
            render:(e, record)=>{
                return<div style={{fontWeight:700, fontSize:16, color:"#BF539E"}}>Class Clinic Saudi</div>
            }
        },
        {
            title: t('Date'),
            dataIndex: 'Date',
            key: 'Date',
            render:(e, record)=>{
                return<div style={{fontWeight:700}}>Wed, Mar 16, 2022</div>
            }
        },
        {
            title: t('Status'),
            dataIndex: 'Status',
            key: 'Status',
            render:(e, record)=>{
                return<Tag className={'ant_tag'} color="green" >Completed</Tag>
            }
        },
    ];

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    return(
        <Row gutter={[50,0]} style={{minHeight:800}}>
            <Col lg={16}>
                <Table
                    dataSource={dataSource}
                    columns={columns}

                />
            </Col>
            <Col lg={8} className={'spaced-checkboxes'}>
                <h1 style={{padding:15, fontWeight:700}}>Sections</h1>
                <Checkbox.Group
                    style={{width: '100%'}}
                    onChange={onChange}

                >
                    <Space direction={'vertical'}>
                        <Checkbox value="All"><div>All</div><div>12</div></Checkbox>
                        <Checkbox value="Eyes"><div>Eyes</div><div>6</div></Checkbox>
                        <Checkbox value="ENT"><div>ENT</div><div>0</div></Checkbox>
                        <Checkbox value="Cardiovascular"><div>Cardiovascular</div><div>0</div></Checkbox>
                        <Checkbox value="Respiratory"><div>Respiratory</div><div>0</div></Checkbox>
                        <Checkbox value="Gastrointestinal"><div>Gastrointestinal</div><div>0</div></Checkbox>
                        <Checkbox value="Genitals"><div>Genitals</div><div>0</div></Checkbox>
                        <Checkbox value="Kidney"><div>Kidney</div><div>0</div></Checkbox>
                        <Checkbox value="Musculoskeletal"><div>Musculoskeletal</div><div>0</div></Checkbox>
                        <Checkbox value="Skin"><div>Skin</div><div>0</div></Checkbox>
                        <Checkbox value="Neurological"><div>Neurological</div><div>0</div></Checkbox>
                        <Checkbox value="Endocrine"><div>Endocrine</div><div>0</div></Checkbox>
                        <Checkbox value="Oral_cavity"><div>Oral Cavity</div><div>0</div></Checkbox>
                    </Space>
                </Checkbox.Group>
            </Col>
        </Row>
    )
}
export default PatientHistoryTable;