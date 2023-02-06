import React, {useState,useRef} from "react";
import {t} from "i18next";
import {Button, Space} from "antd";
import ResourceTable from "../../../../Fragments/ResourceTable";
import ManageDoctorsModal from "./ManageDoctorsModal";
import {useParams} from "react-router";
import {createResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";

function ClinicTabManageDoctors() {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    let doctorsTable = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const onDoctorCreate = (data) => {
        if (!data) {
            return setIsModalOpen(false);
        }
        setIsModalOpen(1)

        data.clinic_id=params.id
        createResource("ClinicDoctor", data, token).then((response) => {
            if(response.id){
                setIsModalOpen(false)
            }else{
                setIsModalOpen(true)
            }
        })
    }

    return (
        <div>
            <ResourceTable
                ref={doctorsTable}
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
                        dataIndex: ['doctor', 'plid'],
                        title: 'Doctor PLID',
                        key: 'plid',
                        sorter: true,
                    },
                ]}
                handleTableBelowData={(dataState,loadingState,total)=>{
                    return <Button type={'primary'} onClick={showModal}>+</Button>
                }}
            />

            <ManageDoctorsModal isModalOpen={isModalOpen} onDoctorCreate={onDoctorCreate}/>

            <Space className={'create_apdate_btns'}>
                <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                <Button size={'large'} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
            </Space>

        </div>
    )
}

export default ClinicTabManageDoctors;