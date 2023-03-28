import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, postResource, updateResource} from "../../../../../Functions/api_calls";
import {PlusOutlined} from "@ant-design/icons";
import Preloader from "../../../../../Preloader";
import ResourceTable from "../../../../../Fragments/ResourceTable";
import TableFilterElement from "../../../../../Fragments/TableFilterElements/TableFilterElement";
import LabPackageModal from "./LabPackageModal";


function LabPackagesTable() {
    const params = useParams();
    let token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)
    const labPackageData = useRef();
    const [testData, setTestData] = useState([]);
    const [labPackagesState, setLabPackagesState] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
       if(isModalOpen){
           let ids = testData?.map(e=>e.lab_package?.id)
           setLabPackagesState(labPackageData.current?.filter(e=>!ids.includes(e.id)))
       }

    },[isModalOpen])
    useEffect(()=>{
        postResource('LabPackage','list',token,null,{per_page:5000}).then(responses => {
            labPackageData.current = responses.items
        })

    },[])

    const showModal = (data) => {
        setIsModalOpen(data);
    };


    const onCreate = (data) => {

        setLoading(true)
        data.clinic_id=params.id

        if(isModalOpen?.id) {
            updateResource('ClinicLabPackage', isModalOpen?.id, data, token).then(response => {
                if(response?.id){
                    setIsModalOpen(false)
                }
                setLoading(false)
            })
        } else {
            createResource("ClinicLabPackage", data, token).then((response) => {
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
                <h1 className={'h1'}>{t(`Packages`)}</h1>

                {loading ? <Preloader/> : <ResourceTable
                    noHeader={true}
                    customTableButton={{
                        title:'Add New Package',
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
                    resource={'ClinicLabPackage'}
                    tableColumns={[
                        {
                            dataIndex: ['lab_package', 'name'],
                            title: 'Packages',
                            key: 'lab_package',
                            sorter: true,

                        },
                        {
                            dataIndex: "price",
                            title: 'price',
                            key: 'price',
                        }
                    ]}
                />}
                <LabPackageModal isModalOpen={isModalOpen} onCreate={onCreate}  handleClose={showModal} labPackagesState={labPackagesState} loading={loading} />
            </div>
        </div>
    )
}
export default LabPackagesTable;