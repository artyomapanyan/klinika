import React, {useRef, useState} from "react";
import {t} from "i18next";
import ResourceTable from "../../../../Fragments/ResourceTable";
import {useParams} from "react-router";
import {Button, Form, InputNumber, Modal, Switch} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import FormInput from "../../../../Fragments/FormInput";
import ManageDoctorsWorkingHouerModal from "./ManageDoctorsWorkingHouerModal";
import Preloader from "../../../../Preloader";


function ClinicApprovedDoctors({loadingState}) {
    const params = useParams();
    const {loading, setLoading} = loadingState;
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



    return(
        <div>
            <h1 className={'h1'}>{t(`Manage Approved Doctors`)}</h1>
            {loading ? <Preloader/> : <ResourceTable

                    noHeader={true}
                    except={{
                        edit: true
                    }}
                    tableParams={{
                        clinic: params.id
                    }}
                    resource={'ClinicDoctor'}
                    tableColumns={[
                        {
                            dataIndex: 'id',
                            title: 'Doctor id',
                            key: 'plid',
                            render:(e, record)=> {
                                return <div>
                                    <div  style={{padding:2}}><FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}/></div>

                                </div>
                            }
                        },
                        {
                            dataIndex: ['doctor'],
                            title: 'Telehealth',
                            key: 'telehealth',
                            render:(e, record)=> {
                                return <div>
                                    <div  style={{padding:2}}><Button onClick={showModal} type={'primary'} size={'large'}>Hours</Button></div>
                                    <div  style={{padding:2}}><Form.Item
                                        name={["telehealth_diagnosis_price"]}
                                        initialValue={record?.telehealth_diagnosis_price}
                                    >
                                        <InputNumber size={'small'} />
                                    </Form.Item></div>
                                    <div  style={{padding:2}}><Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} /></div>
                                </div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: 'Home Visit',
                            key: 'home_visit',
                            render:(e, record)=> {
                                return <div>
                                    <div  style={{padding:2}}><Button onClick={showModal} type={'primary'} size={'large'}>Hours</Button></div>
                                    <div  style={{padding:2}}><Form.Item
                                        name={["home_visit_diagnosis_price"]}
                                        initialValue={record?.home_visit_diagnosis_price}
                                    >
                                        <InputNumber size={'small'} />
                                    </Form.Item></div>
                                    <div  style={{padding:2}}><Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} /></div>

                                </div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: 'Physical Therapy Home Visit',
                            key: 'physical_therapy_home_visit',
                            render:(e, record)=> {
                                return <div>
                                    <div  style={{padding:2}}><Button onClick={showModal} type={'primary'} size={'large'}>Hours</Button></div>
                                    <div  style={{padding:2}}><Form.Item
                                        name={["physical_therapy_home_visit_diagnosis_price"]}
                                        initialValue={record?.physical_therapy_home_visit_diagnosis_price}
                                    >
                                        <InputNumber size={'small'} />
                                    </Form.Item></div>
                                    <div  style={{padding:2}}><Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} /></div>

                                </div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: 'Physical Therapy Clinic Visit',
                            key: 'physical_therapy_clinic_visit',
                            render:(e, record)=> {
                                return <div>
                                    <div  style={{padding:2}}><Button onClick={showModal} type={'primary'} size={'large'}>Hours</Button></div>
                                    <div  style={{padding:2}}><Form.Item
                                        name={["physical_therapy_clinic_visit_diagnosis_price"]}
                                        initialValue={record?.physical_therapy_clinic_visit_diagnosis_price}
                                    >
                                        <InputNumber size={'small'} />
                                    </Form.Item></div>
                                    <div  style={{padding:2}}><Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} /></div>

                                </div>
                            }
                        },
                        {
                            dataIndex: ['specialties', 'title'],
                            title: 'Related Specialty',
                            key: 'specialty',
                            render:(e, record)=> {
                               return <div>{record?.specialties?.map((el) => {
                                   return<span> <span> {"  "} </span><span style={{backgroundColor: "orange"}}>{el?.title + ",   "}</span></span>
                                })}
                               </div>

                            }
                        }

                    ]}

                />}
            <Modal title="Worcing Houer" width={"65%"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ManageDoctorsWorkingHouerModal loadingState={loadingState}/>
            </Modal>
        </div>
    )
}
export default ClinicApprovedDoctors;