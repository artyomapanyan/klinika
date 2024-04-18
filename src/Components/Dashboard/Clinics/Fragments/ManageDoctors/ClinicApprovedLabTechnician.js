import {useParams} from "react-router";
import React, {useState} from "react";
import {t} from "i18next";
import ResourceTable from "../../../../Fragments/ResourceTable";
import {Button, Form, Modal} from "antd";
import DoctorsHoursModal from "./DoctorsHoursModal";

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
                        title: dataService?.has_telehealth_service && dataService?.enable_telehealth_service ? t('Laboratory clinic visit') : ' ',
                        key: 'telehealth',
                        render:(e, record)=> {
                            return <div  style={{padding:2}}>{dataService?.has_telehealth_service && dataService?.enable_telehealth_service ? <Button
                                onClick={() => showModal(record.id, 'telehealth', ['telehealth_activated_at', 'telehealth_diagnosis_price'])}
                                type={'primary'} size={'middle'}>{t('Manage Working hours')}</Button> : null}</div>
                        }
                    },
                    {
                        dataIndex: ['doctor'],
                        title: dataService?.has_telehealth_service && dataService?.enable_telehealth_service ? t('Laboratory home visit') : ' ',
                        key: 'telehealth',
                        render:(e, record)=> {
                            return <div  style={{padding:2}}>{dataService?.has_telehealth_service && dataService?.enable_telehealth_service ? <Button
                                onClick={() => showModal(record.id, 'telehealth', ['telehealth_activated_at', 'telehealth_diagnosis_price'])}
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
                {isModalOpen?.id ? <DoctorsHoursModal key={Math.random()}  id={isModalOpen?.id} type={isModalOpen?.type} handleCancel={handleCancel} keys={isModalOpen.keys} setIsModalOpen={setIsModalOpen} />:null}
            </Modal>
        </div>
    )
}
export default ClinicApprovedLabTechnician;