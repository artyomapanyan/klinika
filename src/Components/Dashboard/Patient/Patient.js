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
import {LeftOutlined} from "@ant-design/icons";
import Preloader from "../../Preloader";


let resource = 'Appointment'
function Patient() {
    const params = useParams();
    const navigate = useNavigate()


    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading} = loadingState

    const [tab, setTab] = useState();
    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        setTab(searchParams.get('tab') ?? 'overview')
    }, [])

    const handleChange = (e) => {
        setTab(e)
        setSearchParams({tab: e})
    }

    const onBack = () => {
        navigate(-1)
    }





    return(
        <div style={{marginBottom: 100, marginTop: -120}} >
            <div>
                <Button onClick={onBack} style={{margin:"40px 24px", height:48, width:48, border: 'none', borderRadius: 12}}><LeftOutlined /></Button>
                <span style={{fontSize:24, fontWeight:700, fontFamily: "Inter"}}>Patient Card</span>
            </div>
            {
                loading ? <Preloader /> : <div>
                    <div style={{background:"#ffffff", margin:'0 24px', borderRadius: 12}}>
                        <PatientHeader data={data} />

                        <PatientCollapse data={data} />
                    </div>

                    <div style={{backgroundColor:'white', margin:'0 24px',  borderRadius: '20px'}}>
                        <TabBars onChange={handleChange} activeKey={data.telehealth ? 'video_call' : tab}>
                            <Tabs.TabPane key={'overview'} tab={'Patient overview'} >
                                <PatientOverviewTab/>
                            </Tabs.TabPane>
                            <Tabs.TabPane key={'appointment'} tab={'Appointment'} >
                                <PatientCardAppointment/>
                            </Tabs.TabPane>
                            <Tabs.TabPane key={'video_call'} tab={'Video call'} >
                                <VideoCall data={data}/>
                            </Tabs.TabPane>
                            {/*<Tabs.TabPane key={'pat-history'} tab={'Patient’s history'} >*/}
                            {/*    <PatientHistory />*/}
                            {/*</Tabs.TabPane>*/}
                            {/*<Tabs.TabPane key={'lab-tests'} tab={'Lab Tests'} >*/}
                            {/*    <PatientCardLabTests/>*/}
                            {/*</Tabs.TabPane>*/}
                            <Tabs.TabPane key={'medications'} tab={'Medications'} >
                                <PatientCardMedications tab={tab}/>
                            </Tabs.TabPane>
                            {/*<Tabs.TabPane key={'log'} tab={'log'} >*/}
                            {/*    <PatientCardLog />*/}
                            {/*</Tabs.TabPane>*/}
                        </TabBars>
                    </div>
                </div>
            }

        </div>
    )
}
export default Patient;