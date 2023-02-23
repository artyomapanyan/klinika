import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, postResource, updateResource} from "../../../../../Functions/api_calls";
import {PlusOutlined} from "@ant-design/icons";
import Preloader from "../../../../../Preloader";
import ResourceTable from "../../../../../Fragments/ResourceTable";
import TableFilterElement from "../../../../../Fragments/TableFilterElements/TableFilterElement";
import NursingModal from "./NursingModal";



function LabPackagesTable() {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)
    const nursingData = useRef();
    const [testData, setTestData] = useState([]);
    const [nursingState, setNursingState] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        if(isModalOpen){
            let ids = testData.map(e=>e.nursing_task?.id)
            setNursingState(nursingData.current?.filter(e=>!ids.includes(e.id)))
        }

    },[isModalOpen])
    useEffect(()=>{
        postResource('NursingTask','list',token,null,{per_page:5000}).then(responses => {
            nursingData.current = responses.items
        })

    },[])

    const showModal = (data) => {
        setIsModalOpen(data);
    };


    const onCreate = (data) => {

        setLoading(true)
        data.clinic_id=params.id

        if(isModalOpen?.id) {
            updateResource('ClinicNursingTask', isModalOpen?.id, data, token).then(response => {
                if(response?.id){
                    setIsModalOpen(false)
                }
                setLoading(false)
            })
        } else {
            createResource("ClinicNursingTask", data, token).then((response) => {
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
                <h1 className={'h1'}>{t(`Nursing Tasks`)}</h1>

                {loading ? <Preloader/> : <ResourceTable
                    noHeader={true}
                    customTableButton={{
                        title:'Add New Nursing Task',
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
                    resource={'ClinicNursingTask'}
                    tableColumns={[
                        {
                            dataIndex: ['nursing_task', 'name'],
                            title: 'Nursing task',
                            key: 'nursing_task',
                            sorter: true,
                            filterDropdown: (props)=><TableFilterElement filterProps={props}/>,

                        },
                        {
                            dataIndex: "price",
                            title: 'price',
                            key: 'price',
                        }
                    ]}
                />}
                <NursingModal isModalOpen={isModalOpen} onCreate={onCreate}  handleClose={showModal} nursingState={nursingState} loading={loading} />
            </div>
        </div>
    )
}
export default LabPackagesTable;