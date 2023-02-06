import React, {useRef, useState} from "react";
import {t} from "i18next";

import {useParams} from "react-router";
import {Button, InputNumber, Space,} from "antd";

import {useSelector} from "react-redux";
import {createResource} from "../../../../../Functions/api_calls";
import ResourceTable from "../../../../../Fragments/ResourceTable";
import LaboratorytestModal from "./LaboratorytestModal";
import FormInput from "../../../../../Fragments/FormInput";


function LaboratoryTestsTable() {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    let doctorsTable = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openTestModal = () => {
        setIsModalOpen(true);
    }

    const onCreate = (data) => {
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


    return(
        <div>
            <div  className={'add_edit_content'}>
                <h1 className={'h1'}>{t(`Manage Pending Doctors`)}</h1>
                <ResourceTable
                    ref={doctorsTable}
                    noHeader={true}
                    except={{edit: true}}
                    resource={'ClinicDoctor'}
                    tableColumns={[
                        {
                            dataIndex: ['doctor', 'plid'],
                            title: 'Doctor PLID',
                            key: 'plid',
                            render:(e,record)=> {
                                return<div><FormInput name={'doctor_id'} inputType={'resourceSelect'} /></div>
                            }
                        },
                        {
                            dataIndex: ['doctor', 'plid'],
                            title: 'Doctor PLID',
                            key: 'plid',
                            render:(e,record)=> {
                                return<div><InputNumber name={'doctor_id'}  /></div>
                            }
                        },
                    ]}
                    handleTableBelowData={(dataState,loadingState,total)=>{
                        return <Button type={'primary'} onClick={openTestModal}>+</Button>
                    }}
                />
            </div >
            <LaboratorytestModal isModalOpen={isModalOpen} onCreate={onCreate}/>

            <Space className={'create_apdate_btns'}>
                <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                <Button size={'large'} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
            </Space>

        </div>
    )
}
export default LaboratoryTestsTable;