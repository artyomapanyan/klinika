import React, {useState} from "react";
import {t} from "i18next";
import ResourceTable from "../../../../Fragments/ResourceTable";
import {useParams} from "react-router";
import {Button, Modal} from "antd";
import DoctorsHoursModal from "./DoctorsHoursModal";
import Preloader from "../../../../Preloader";


function ClinicApprovedDoctors({loadingState}) {
    const params = useParams();
    const {loading, setLoading} = loadingState;
    const [isModalOpen, setIsModalOpen] = useState({});

    const showModal = (id,type, price, status) => {

        setIsModalOpen({
            price,
            id,
            status,
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
                            render:(e, record)=>  <div  style={{padding:2}}>{record.doctor.first} {record.doctor.last}</div>
                        },
                        {
                            dataIndex: ['doctor'],
                            title: 'Telehealth',
                            key: 'telehealth',
                            render:(e, record)=> {
                                return <div  style={{padding:2}}><Button onClick={()=>showModal(record.id,'telehealth', record.telehealth_diagnosis_price, record.telehealth_activated_at)} type={'primary'} size={'large'}>Manage Doctors</Button></div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: 'Clinic Visit',
                            key: 'clinic_visit',
                            render:(e, record)=> {
                                return<div  style={{padding:2}}><Button onClick={()=>showModal(record.id,'clinic_visit', record.clinic_visit_diagnosis_price, record.clinic_visit_activated_at)} type={'primary'} size={'large'}>Manage Doctors</Button></div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: 'Home Visit',
                            key: 'home_visit',
                            render:(e, record)=> {
                                return<div  style={{padding:2}}><Button onClick={()=>showModal(record.id,'home_visit', record.home_visit_diagnosis_price, record.home_visit_activated_at)} type={'primary'} size={'large'}>Manage Doctors</Button></div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: 'Physical Therapy Home Visit',
                            key: 'physical_therapy_home_visit',
                            render:(e, record)=> {
                                return<div style={{padding:2}}><Button onClick={()=>showModal(record.id,'physical_therapy_home_visit', record.physical_therapy_home_visit_diagnosis_price, record.physical_therapy_home_visit_activated_at)} type={'primary'} size={'large'}>Manage Doctors</Button></div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'id'],
                            title: 'Physical Therapy Clinic Visit',
                            key: 'physical_therapy_clinic_visit',
                            render:(e, record)=> {
                                return<div  style={{padding:2}}><Button onClick={()=>showModal(record.id,'physical_therapy_clinic_visit', record.physical_therapy_clinic_visit_diagnosis_price, record.physical_therapy_clinic_visit_activated_at)} type={'primary'} size={'large'}>Manage Doctors</Button></div>
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

            <Modal title="Worcing Houer" width={"65%"} open={isModalOpen?.id} onOk={handleOk} onCancel={handleCancel} footer={false}>
                {isModalOpen?.id ? <DoctorsHoursModal loadingState={loadingState} id={isModalOpen?.id} type={isModalOpen?.type} price={isModalOpen.price} status={isModalOpen.status} />:null}
            </Modal>
        </div>
    )
}
export default ClinicApprovedDoctors;