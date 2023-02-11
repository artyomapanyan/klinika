
import {Tabs} from "antd";
import React, {useEffect, useState} from "react";
import ClinicTabEssentials from "./Fragments/ClinicTabEssentials";
import ClinicTabManageDoctors from "./Fragments/ManageDoctors/ClinicTabManageDoctors";
import ClinicWorkingHours from "./Fragments/ClinicWorkingHours/ClinicWorkingHours";
import {useGetResourceSingle} from "../../Functions/api_calls";
import { useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import HomeVisit from "./Fragments/HomeVisit/HomeVisit";
import Laboratory from "./Fragments/Laboratory/Laboratory";
import ClinicVisit from "./Fragments/ClinicVisit/ClinicVisit";
import Nursing from "./Fragments/Nursing/Nursing";


const resource = "Clinic"

function Clinic() {
    const params = useParams();
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const [tab, setTab] = useState();
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(()=>{
        setTab(searchParams.get('tab')??'essentials')
    },[])

const handleChange = (e)=>{
    setTab(e)
    setSearchParams({tab:e})

}


    return(
        <div >

                <Tabs onChange={handleChange} activeKey={tab}>
                    <Tabs.TabPane key={'essentials'} tab={'Essentials'} >
                        <ClinicTabEssentials loadingState={loadingState} dataState={dataState}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'manage'} tab={'Manage Doctors'} disabled={!params.id}>
                        <ClinicTabManageDoctors  loadingState={loadingState}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'working'} tab={'Working Hours'} disabled={!params.id}>
                        <ClinicWorkingHours loadingState={loadingState} dataState={dataState}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'clinic_visit'} tab={'Clinic Visit'} disabled={!params.id}>
                        <ClinicVisit />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'home_visit'} tab={'Home Visit'} disabled={!params.id}>
                        <HomeVisit />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'laboratory'} tab={'Laboratory'} disabled={!params.id}>
                        <Laboratory />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'nursing'} tab={'Nursing'} disabled={!params.id}>
                        <Nursing />
                    </Tabs.TabPane>
                </Tabs>
          </div>
    )
}
export default Clinic;
