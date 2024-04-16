import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, postResource, updateResource} from "../../../../../Functions/api_calls";
import {PlusOutlined} from "@ant-design/icons";
import Preloader from "../../../../../Preloader";
import ResourceTable from "../../../../../Fragments/ResourceTable";
import RadiologyModal from "./RadiologyModal";


function ClinicRadiologyTasks() {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)
    const radiologyData = useRef();
    const [testData, setTestData] = useState([]);
    const [radiologyState, setRadiologyState] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        if(isModalOpen){
            let ids = testData.map(e=>e.radiology_task?.id)
            setRadiologyState(radiologyData.current?.filter(e=>!ids.includes(e.id)))
        }

    },[isModalOpen])
    useEffect(()=>{
        postResource('RadiologyTask','list',token,null,).then(responses => {
            radiologyData.current = responses.items
        })

    },[])

    const showModal = (data) => {
        setIsModalOpen(data);
    };


    const onCreate = (data) => {

        setLoading(true)
        data.clinic_id=params.id

        if(isModalOpen?.id) {
            updateResource('ClinicRadiologyTask', isModalOpen?.id, data, token).then(response => {
                if(response?.id){
                    setIsModalOpen(false)
                }
                setLoading(false)
            })
        } else {
            createResource("ClinicRadiologyTask", data, token).then((response) => {
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
                <h1 className={'h1'}>{t(`Radiology Tasks`)}</h1>

                {loading ? <Preloader/> : <ResourceTable
                    //paginationResourceTable={false}
                    noHeader={true}
                    customTableButton={{
                        title:'Add New Radiology Task',
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
                    resource={'ClinicRadiologyTask'}
                    tableColumns={[
                        {
                            dataIndex: ['radiology_task', 'name'],
                            title: 'Radiology task',
                            key: 'radiology_task',
                            sorter: true,

                        },
                        {
                            dataIndex: "price",
                            title: t('price'),
                            key: 'price',
                        }
                    ]}
                />}
                <RadiologyModal isModalOpen={isModalOpen} onCreate={onCreate} clinicId={params?.id} handleClose={showModal} radiologyState={radiologyState} loading={loading} />
            </div>
        </div>
    )
}
export default ClinicRadiologyTasks;