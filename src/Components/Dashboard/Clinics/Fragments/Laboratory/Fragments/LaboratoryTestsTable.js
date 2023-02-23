import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";

import {useNavigate, useParams} from "react-router";
import {Button, Space,} from "antd";

import {useSelector} from "react-redux";
import {createResource, postResource, updateResource} from "../../../../../Functions/api_calls";
import {EditOutlined} from "@ant-design/icons";
import resourceLinks from "../../../../../ResourceLinks";

import LabTestsModal from "./LabTestsModal";
import Preloader from "../../../../../Preloader";
import ResourceTable from "../../../../../Fragments/ResourceTable";
import TableFilterElement from "../../../../../Fragments/TableFilterElements/TableFilterElement";

const resource = "Clinic";
function LaboratoryTestsTable() {
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)

    const [testData, setTestData] = useState([]);
    const [labTests, setLabTest] = useState([]);
    const [recordState, setRecordState] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        setLoading(true)
        postResource('LabTest','list',token,null,{per_page:5000}).then(responses => {
            setLoading(false)
            let selectedIds = testData.map(e=>e.lab_test?.id)
            setLabTest(responses.items.filter(i=>!selectedIds.includes(i.id)))

        })

    },[isModalOpen])

    const showModal = () => {
        setTimeout(()=>setIsModalOpen(true), 10);
    };


    const onCreate = (data) => {

        if (!data) {
            return setIsModalOpen(false);
        }
        setIsModalOpen(1)
        setLoading(true)
        data.clinic_id=params.id

        if(recordState?.id) {
            updateResource('ClinicLabTest', params.id, data, token).then(response => {
                if(response?.id){
                    setIsModalOpen(false)
                }else{
                    setIsModalOpen(true)
                }
                setLoading(false)
            })
        } else {
            createResource("ClinicLabTest", data, token).then((response) => {
                if(response?.id){
                    setIsModalOpen(false)
                }else{
                    setIsModalOpen(true)
                }
                setLoading(false)
            })
        }

    }

    const onEdit = (e, record) => {
        setRecordState(record)
        setIsModalOpen(true)
    }


    return(
        <div>
            <div  className={'add_edit_content'}>
                <h1 className={'h1'}>{t(`Tests`)}</h1>

                {loading ? <Preloader/> : <ResourceTable
                    noHeader={true}
                    except={{edit: true}}
                    getAll={(data)=>{
                        setTestData(data)
                    }}
                    tableParams={{clinic: params.id}}
                    resource={'ClinicLabTest'}
                    tableColumns={[
                        {
                            dataIndex: ['lab_test', 'name'],
                            title: 'test',
                            key: 'lab_test',
                            sorter: true,
                            filterDropdown: (props)=><TableFilterElement filterProps={props}/>,

                        },
                        {
                            dataIndex: "price",
                            title: 'price',
                            key: 'price',
                        },
                        {
                            dataIndex: "update",
                            title: 'Update',
                            key: 'update',
                            render:(e,record)=>{
                                return<Button onClick={() => onEdit(e, record)}><EditOutlined/></Button>
                            }

                        },
                    ]}
                />}
                    <Button type={'primary'} size={'large'} style={{margin:20}} onClick={showModal}>+ Add New Test</Button>
                    <LabTestsModal isModalOpen={isModalOpen} onCreate={onCreate} labTests={labTests} loading={loading} recordState={recordState}/>
                    <div>
                        <Space className={'lab_save'}>
                            <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                            <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))}  type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                        </Space>
                    </div>
            </div>
        </div>
    )
}
export default LaboratoryTestsTable;