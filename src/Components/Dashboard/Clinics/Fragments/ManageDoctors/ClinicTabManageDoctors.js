import React, {useState, useRef} from "react";
import {t} from "i18next";
import {Button, Space} from "antd";
import ResourceTable from "../../../../Fragments/ResourceTable";
import {useNavigate, useParams} from "react-router";
import {createResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import ClinicApprovedDoctors from "./ClinicApprovedDoctors";
import resourceLinks from "../../../../ResourceLinks";
import ManageDoctorsModal from "./Fragments/ManageDoctorsModal";
import Preloader from "../../../../Preloader";

const resource = 'Clinic'

function ClinicTabManageDoctors() {
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const onCreate = (data) => {
        if (!data) {
            return setIsModalOpen(false);
        }
        setIsModalOpen(1)
        setLoading(true)
        data.clinic_id=params.id
        createResource("ClinicDoctor", data, token).then((response) => {
            if(response.id){
                setIsModalOpen(false)
            }else{
                setIsModalOpen(true)
            }
            setLoading(false)
        })
    }

    return (
        <div>
            <div  className={'add_edit_content'}>
                <h1 className={'h1'}>{t(`Manage Pending Doctors`)}</h1>
                {loading ? <Preloader/> : <ResourceTable
                    noHeader={true}
                    except={{edit: true}}
                    tableParams={{clinic: params.id}}
                    resource={'ClinicDoctor'}
                    tableColumns={[
                        {
                            dataIndex: ['doctor', 'plid'],
                            title: 'Doctor PLID',
                            key: 'plid',
                            sorter: true,
                        },
                    ]}
                />}
                <Button type={'primary'} onClick={showModal}>+ Add new Doctor</Button>

                <ManageDoctorsModal isModalOpen={isModalOpen} onCreate={onCreate}/>
            </div >
            <div className={'add_edit_content'}>
                <ClinicApprovedDoctors />
            </div>
            
        </div>
    )
}

export default ClinicTabManageDoctors;