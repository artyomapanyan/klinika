import {Button, Tabs} from "antd";
import TabBars from "../../Fragments/TabBars/TabBars";
import PatientHeader from "./Fragments/PatientHeader/PatientHeader";
import PatientCollapse from "./Fragments/PatientCollapse";
import PatientCardAppointment from "./Tabs/PatientCardAppointment";
import PatientOverviewTab from "./Tabs/PatientOverviewTab";
import PatientCardLabTests from "./Tabs/PatientCardLabTests";
import PatientCardMedications from "./Tabs/PatientCardMedications";
import PatientCardLog from "./Tabs/PatientCardLog";
import PatientHistory from "./Tabs/PatientHistory";
import React, {useEffect, useState} from "react";
import VideoCall from "./Tabs/VideoCall/VideoCall";
import {useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import ResourceLins from "../../ResourceLinks";
import {t} from "i18next";
import dayjs from "dayjs";
import ProvidedServices from "./ManagerReceptionist/ProvidedServices";
import FutureApps from "./ManagerReceptionist/FutureApps";
import Payment from "./ManagerReceptionist/Payment";

let resource = 'Appointment'
let res = 'DoctorReworked'
function Patient() {
    const params = useParams();
    const navigate = useNavigate()
    let language = useSelector((state) => state.app.current_locale)
    let role = useSelector((state) => state.auth.selected_role.key)

    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading} = loadingState

    const [tab, setTab] = useState();
    const [searchParams, setSearchParams] = useSearchParams()
    const [statusLoading, setStatusLoading] = useState(false)
    const [selectedFutureVisits, setSelectedFutureVisits] = useState('');


    useEffect(() => {
        if(role === 'clinic-manager' || role === 'receptionist')
            setTab('appointment')
        else
            setTab(searchParams.get('tab') ?? 'overview')
        
    }, [])


    const handleChange = (e) => {
        setTab(e)
        setSearchParams({tab: e})
    }

    const onBack = () => {
        navigate(role === 'doctor' ? ResourceLins[res] : ResourceLins[resource])
    }


    return(
        <div style={{marginBottom: 100, marginTop: -120}} >
            <div>
                <Button onClick={onBack} style={{margin:"40px 24px", height:48, width:48, border: 'none', borderRadius: 12}}>{language === 'en' ? <LeftOutlined /> : <RightOutlined />}</Button>
                <span style={{fontSize:24, fontWeight:700, fontFamily: "Inter"}}>{t('Patient Card')}</span>
            </div>
            {
                loading ? <Preloader /> : <div>
                    <div style={{background:"#ffffff", margin:'0 24px', borderRadius: 12}}>
                        <PatientHeader data={data} setData={setData} />

                        <PatientCollapse data={data} setData={setData} statusLoading={statusLoading}/>
                    </div>
                    {
                        role === 'doctor' ? <div style={{backgroundColor:'white', margin:'0 24px',  borderRadius: '20px'}}>
                            <TabBars onChange={handleChange} activeKey={tab} >
                                {role !== 'clinic-manager' && role !== 'receptionist'?<Tabs.TabPane key={'overview'} tab={'Patient overview'} >
                                    <PatientOverviewTab tab={tab} id={params.id} patientId={data?.patient?.id} dataClinic={data}/>
                                </Tabs.TabPane> : null}
                                <Tabs.TabPane key={'appointment'} tab={'Appointment'} >
                                    <PatientCardAppointment  tab={tab} patientId={data?.patient?.id}  bigData={data} id={params.id} setBigData={setData} setStatusLoading={setStatusLoading}/>
                                </Tabs.TabPane>
                                {role !== 'clinic-manager' && role !== 'receptionist'?<Tabs.TabPane key={'video_call'} tab={'Video call'} >
                                    <VideoCall data={data}/>
                                </Tabs.TabPane>: null}
                                {/*<Tabs.TabPane key={'pat-history'} tab={'Patient’s history'} >*/}
                                {/*    <PatientHistory />*/}
                                {/*</Tabs.TabPane>*/}
                                {/*<Tabs.TabPane key={'lab-tests'} tab={'Lab Tests'} >*/}
                                {/*    <PatientCardLabTests/>*/}
                                {/*</Tabs.TabPane>*/}
                                {role !== 'clinic-manager' && role !== 'receptionist'?<Tabs.TabPane key={'medications'} tab={'Medications'} >
                                    <PatientCardMedications tab={tab} patientId={data?.patient?.id}/>
                                </Tabs.TabPane>: null}
                                {/*<Tabs.TabPane key={'log'} tab={'log'} >*/}
                                {/*    <PatientCardLog />*/}
                                {/*</Tabs.TabPane>*/}
                            </TabBars>
                        </div> : 
                        <div>
                            <ProvidedServices appointmentId={data?.id}/>
                            <FutureApps 
                                appointment_id={params.id} 
                                status={data.status} 
                                selectedFutureVisits={selectedFutureVisits} 
                                setSelectedFutureVisits={setSelectedFutureVisits}
                            />
                            <Payment 
                                appointment_id={params.id} 
                                selectedFutureVisits={selectedFutureVisits}
                            />
                        </div>
                    }

                </div>
            }

        </div>
    )
}
export default Patient;