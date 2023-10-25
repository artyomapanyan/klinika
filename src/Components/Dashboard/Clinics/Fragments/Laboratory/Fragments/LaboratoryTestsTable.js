import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, postResource, updateResource} from "../../../../../Functions/api_calls";
import {PlusOutlined} from "@ant-design/icons";
import LabTestsModal from "./LabTestsModal";
import Preloader from "../../../../../Preloader";
import ResourceTable from "../../../../../Fragments/ResourceTable";

function LaboratoryTestsTable() {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)
    const labTestData = useRef();
    const [testData, setTestData] = useState([]);
    const [labTestState, setLabTestState] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const [searchValue, setSearchValue] = useState('')

    useEffect(()=>{
        if(isModalOpen){
            let ids = testData.map(e=>e.lab_test?.id)
            setLabTestState(labTestData.current?.filter(e=>!ids.includes(e.id)))
        }

    },[isModalOpen])
    useEffect(()=>{
        postResource('LabTest','list',token,null,).then(responses => {
            labTestData.current = responses.items
        })

    },[])

    const showModal = (data) => {
        setIsModalOpen(data);
    };


    const onCreate = (data) => {

        setLoading(true)
        data.clinic_id=params.id

        if(isModalOpen?.id) {
            updateResource('ClinicLabTest', isModalOpen?.id, data, token).then(response => {
                if(response?.id){
                    setIsModalOpen(false)
                }
                setLoading(false)
            })
        } else {
            createResource("ClinicLabTest", data, token).then((response) => {
                if(response?.id){
                    setIsModalOpen(false)
                }
                setLoading(false)
            })
        }

    }



    return(
        <div>
            <div  className={'add_edit_content'}>
                <h1 className={'h1'}>{t(`Tests`)}</h1>

                {loading ? <Preloader/> : <ResourceTable
                    //paginationResourceTable={false}
                    noHeader={true}
                    customTableButton={{
                        title:'Add New Test',
                        onClick:()=>showModal({}),
                        icon:<PlusOutlined/>
                    }}
                    customActions={{
                        edit:(record)=>{
                            showModal(record)
                        }
                    }}

                    getAll={(data)=>{
                        setTestData(data)
                    }}
                    tableParams={{clinic: params.id}}
                    resource={'ClinicLabTest'}
                    tableColumns={[
                        {
                            dataIndex: ['lab_test', 'name'],
                            title: t('Tests'),
                            key: 'lab_test',
                            sorter: true,

                        },
                        {
                            dataIndex: "price",
                            title: t('price'),
                            key: 'price',
                        }
                    ]}
                />}
                <LabTestsModal isModalOpen={isModalOpen} onCreate={onCreate} clinicId={params.id}  handleClose={showModal} labTestState={labTestState} loading={loading}  />
            </div>
        </div>
    )
}
export default LaboratoryTestsTable;