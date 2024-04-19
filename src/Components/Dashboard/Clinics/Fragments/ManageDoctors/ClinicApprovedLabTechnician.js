import {useParams} from "react-router";
import React, {useState} from "react";
import {t} from "i18next";
import ResourceTable from "../../../../Fragments/ResourceTable";
import {Button, Form, Modal} from "antd";
import DoctorsHoursModal from "./DoctorsHoursModal";
import LabTechnicianHoursModal from "./LabTechnicianHoursModal";

function ClinicApprovedLabTechnician({dataService}) {
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
        <div className={'manage_doctors_table_div'} style={{overflow: 'auto'}}
        >
            <h1 className={'h1'} style={{marginBottom: -120}}>{t(`Manage Approved Doctors`)}</h1>
            <ResourceTable
                tableSmall={true}
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
                resource={'ClinicMedicalStaff'}
                tableColumns={[
                    {
                        dataIndex: 'id',
                        title: 'Lab technician id',
                        key: 'plid',
                        render:(e, record)=> {

                            return <div  style={{padding:2}}>{record?.medical_staff?.first} {record?.medical_staff?.last}</div>
                        }
                    },
                    {
                        dataIndex: ['doctor'],
                        title: dataService?.has_laboratory_home_visit_service && dataService?.enable_laboratory_home_visit_service ? t('Laboratory home visit') : ' ',
                        key: 'laboratory_home_visit',
                        render:(e, record)=> {
                            return <div  style={{padding:2}}>{dataService?.has_laboratory_home_visit_service && dataService?.enable_laboratory_home_visit_service ? <Button
                                onClick={() => showModal(record.id, 'laboratory_home_visit', ['laboratory_home_visit_activated_at', 'laboratory_home_visit_diagnosis_price'])}
                                type={'primary'} size={'middle'}>{t('Manage Working hours')}</Button> : null}</div>
                        }
                    },
                    {
                        dataIndex: ['doctor'],
                        title: dataService?.has_laboratory_clinic_visit_service && dataService?.enable_laboratory_clinic_visit_service ? t('Laboratory clinic visit') : ' ',
                        key: 'laboratory_clinic_visit',
                        render:(e, record)=> {
                            return <div  style={{padding:2}}>{dataService?.has_laboratory_clinic_visit_service && dataService?.enable_laboratory_clinic_visit_service ? <Button
                                onClick={() => showModal(record.id, 'laboratory_clinic_visit', ['laboratory_clinic_visit_activated_at', 'laboratory_clinic_visit_diagnosis_price'])}
                                type={'primary'} size={'middle'}>{t('Manage Working hours')}</Button> : null}</div>
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
                {isModalOpen?.id ? <LabTechnicianHoursModal key={Math.random()}  id={isModalOpen?.id} type={isModalOpen?.type} handleCancel={handleCancel} keys={isModalOpen.keys} setIsModalOpen={setIsModalOpen} />:null}
            </Modal>
        </div>
    )
}
export default ClinicApprovedLabTechnician;