import React, {useState} from "react";
import {t} from "i18next";
import ResourceTable from "../../../../Fragments/ResourceTable";
import {useParams} from "react-router";
import {Button, Form, Modal} from "antd";
import DoctorsHoursModal from "./DoctorsHoursModal";


function ClinicApprovedDoctors({dataService}) {
    const params = useParams();

    const [isModalOpen, setIsModalOpen] = useState({});

    const showModal = (id,type,keys ) => {

        setIsModalOpen({
            id,
            keys,
            type
        });
    };

    const handleOk = () => {
        setIsModalOpen({});
    };
    const handleCancel = () => {

        setIsModalOpen({});
    };



    return(
        <div>
            <h1 className={'h1'}>{t(`Manage Approved Doctors`)}</h1>
           <ResourceTable
               customHeader={({setParams})=><Form onValuesChange={(e,v)=>setParams(v)}>



               </Form>}

                    noHeader={true}
                    except={{
                        edit: true
                    }}
                    tableParams={{
                        clinic: params.id,
                        is_approved: 1
                    }}
                    resource={'ClinicDoctor'}
                    tableColumns={[
                        {
                            dataIndex: 'id',
                            title: 'Doctor id',
                            key: 'plid',
                            render:(e, record)=> {

                                return <div  style={{padding:2}}>{record?.doctor?.first} {record?.doctor?.last}</div>
                            }
                        },
                        {
                            dataIndex: ['doctor'],
                            title: dataService?.has_telehealth_service ? t('Telehealth') : ' ',
                            key: 'telehealth',
                            render:(e, record)=> {
                                return <div  style={{padding:2}}>{dataService?.has_telehealth_service ? <Button
                                    onClick={() => showModal(record.id, 'telehealth', ['telehealth_activated_at', 'telehealth_diagnosis_price'])}
                                    type={'primary'} size={'large'}>{t('Manage Working hours')}</Button> : null}</div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: dataService?.has_clinic_visit_service ? t('Clinic Visit') : ' ',
                            key: 'clinic_visit',
                            render:(e, record)=> {
                                return<div  style={{padding:2}}>{dataService?.has_clinic_visit_service ? <Button
                                    onClick={() => showModal(record.id, 'clinic_visit', ['clinic_visit_activated_at', 'clinic_visit_diagnosis_price'])}
                                    type={'primary'} size={'large'}>Manage Working hours</Button> : <div></div>}</div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: dataService?.has_home_visit_service ? t('Home Visit') : ' ',
                            key: 'home_visit',
                            render:(e, record)=> {
                                return<div  style={{padding:2}}>{dataService?.has_home_visit_service ? <Button
                                    onClick={() => showModal(record.id, 'home_visit', ['home_visit_activated_at', 'home_visit_diagnosis_price'])}
                                    type={'primary'} size={'large'}>Manage Working hours</Button> : <div></div>}</div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: dataService?.has_physical_therapy_home_visit_service ? t('Physical Therapy Home Visit') : ' ',
                            key: 'physical_therapy_home_visit',
                            render:(e, record)=> {
                                return<div style={{padding:2}}>{dataService?.has_physical_therapy_home_visit_service ? <Button
                                    onClick={() => showModal(record.id, 'physical_therapy_home_visit', ['physical_therapy_home_visit_activated_at', 'physical_therapy_home_visit_diagnosis_price'])}
                                    type={'primary'} size={'large'}>Manage Working hours</Button> : <div></div>}</div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: dataService?.has_physical_therapy_clinic_visit_service ? t('Physical Therapy Clinic Visit') : ' ',
                            key: 'physical_therapy_clinic_visit',
                            render:(e, record)=> {
                                return<div  style={{padding:2}}>{dataService?.has_physical_therapy_clinic_visit_service ? <Button
                                    onClick={() => showModal(record.id, 'physical_therapy_clinic_visit', ['physical_therapy_clinic_visit_activated_at', 'physical_therapy_clinic_visit_diagnosis_price'])}
                                    type={'primary'} size={'large'}>Manage Working hours</Button> : <div></div>}</div>
                            }
                        },
                        {
                            dataIndex: ['specialties', 'title'],
                            title: 'Related Specialty',
                            key: 'specialty',
                            render:(e, record)=> {
                               return <div>{record?.specialties?.map((el, key) => {
                                   return<span key={key}> <span> {"  "} </span><span style={{backgroundColor: "orange"}}>{el?.title + ",   "}</span></span>
                                })}
                               </div>

                            }
                        }

                    ]}


                />
            <Modal title={t("Working Hours")} width={"750px"} open={isModalOpen?.id} onOk={handleOk} onCancel={handleCancel} footer={false} >
                {isModalOpen?.id ? <DoctorsHoursModal key={Math.random()}  id={isModalOpen?.id} type={isModalOpen?.type} handleCancel={handleCancel} keys={isModalOpen.keys} setIsModalOpen={setIsModalOpen} />:null}
            </Modal>
        </div>
    )
}
export default ClinicApprovedDoctors;