import React, {useState} from "react";
import {t} from "i18next";
import {Button} from "antd";
import ResourceTable from "../../../../Fragments/ResourceTable";
import {useParams} from "react-router";
import {createResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import ClinicApprovedDoctors from "./ClinicApprovedDoctors";
import ManageDoctorsModal from "./Fragments/ManageDoctorsModal";
import Preloader from "../../../../Preloader";
import ManageUsersModal from "./ManageUsersModal";
import DoctorGeneralInfo from "../../../DoctorProfile/DoctorGeneralInfo/DoctorGeneralInfo";
import ClinicTabBars from "../ClinicTabBars";
import ClinicApprovedLabTechnician from "./ClinicApprovedLabTechnician";


function ClinicTabManageDoctors({dataService}) {

    const [tab, setTab] = useState('general_information');



    const params = useParams();
    let token = useSelector((state) => state.auth.token);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenUser, setIsModalOpenUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModalUser = () => {
        setIsModalOpenUser(true);
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

    const onCreateUser = (data) => {
        if (!data) {
            return setIsModalOpenUser(false);
        }
        setIsModalOpenUser(1)
        setLoading(true)
        data.clinic_id=params.id
        createResource("ClinicMedicalStaff", data, token).then((response) => {
            if(response.id){
                setIsModalOpenUser(false)
            }else{
                setIsModalOpenUser(true)
            }
            setLoading(false)
        })
    }



    const handleChange = (e) => {
        setTab(e)

    }

    return (
        <div>
            <ClinicTabBars onChange={handleChange}>
                <items key={'manage_doctors'} tab={t('Manage doctors')}  >
                    <div  className={'add_edit_content'}>

                        <h1 className={'h1'} style={{marginBottom: -80}}>{t(`Manage Pending Doctors`)}</h1>
                        {loading ? <Preloader/> : <ResourceTable
                            noHeader={true}
                            except={{edit: true}}
                            tableParams={{
                                clinic: params?.id,
                                is_approved: 0
                            }}
                            resource={'ClinicDoctor'}
                            tableColumns={[
                                {
                                    dataIndex: ['doctor', 'name'],
                                    title: 'Doctor Name',
                                    key: 'name',
                                    render:(e, record)=> {
                                        return <div  style={{padding:2}}>{record?.doctor?.first} {record?.doctor?.last}</div>
                                    }
                                },
                            ]}
                        />}
                        <Button type={'primary'} onClick={showModal}>+ {t('Add new Doctor')}</Button>

                        <ManageDoctorsModal isModalOpen={isModalOpen} onCreate={onCreate}/>
                    </div>

                    <div className={'add_edit_content'}>
                        <ClinicApprovedDoctors dataService={dataService} />
                    </div>
                </items>





                <items key={'manage_users'} tab={'Manage lab technician'} >
                    <div  className={'add_edit_content'}>
                        <h1 className={'h1'} style={{marginBottom: -80}}>{t(`Manage Pending User`)}</h1>
                        {loading ? <Preloader/> : <ResourceTable
                            noHeader={true}
                            except={{edit: true}}
                            tableParams={{
                                clinic: params?.id,
                                is_approved: 0
                            }}
                            resource={'ClinicMedicalStaff'}
                            tableColumns={[
                                {
                                    dataIndex: ['doctor', 'name'],
                                    title: 'Doctor Name',
                                    key: 'name',
                                    render:(e, record)=> {
                                        return <div  style={{padding:2}}>name</div>
                                    }
                                },
                                {
                                    dataIndex: 'id',
                                    title: 'id',
                                    key: 'id',

                                },
                            ]}
                        />}
                        <Button type={'primary'} onClick={showModalUser}>+ {t('Add new User')}</Button>

                        <ManageUsersModal isModalOpenUser={isModalOpenUser} onCreateUser={onCreateUser}/>
                    </div>

                    <div className={'add_edit_content'}>
                        <ClinicApprovedLabTechnician dataService={dataService} />
                    </div>
                </items>

            </ClinicTabBars>








            
        </div>
    )
}

export default ClinicTabManageDoctors;