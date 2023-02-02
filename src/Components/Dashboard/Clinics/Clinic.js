
import {Tabs} from "antd";
import React, {useEffect, useState} from "react";
import ClinicTabBars from "./Fragments/ClinicTabBars";
import ClinicTabEssentials from "./Fragments/ClinicTabEssentials";
import ClinicTabManageDoctors from "./Fragments/ClinicTabManageDoctors";
import ClinicWorkingHours from "./Fragments/ClinicWorkingHours/ClinicWorkingHours";
import {useGetResourceSingle} from "../../Functions/api_calls";
import { useParams} from "react-router";
import {useSearchParams} from "react-router-dom";

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

                <ClinicTabBars onChange={handleChange} activeKey={tab}>
                    <Tabs.TabPane key={'essentials'} tab={'Essentials'} >
                        <ClinicTabEssentials loadingState={loadingState}
                                             dataState={dataState}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'manage'} tab={'Manage Doctors'} >
                        <ClinicTabManageDoctors />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'working'} tab={'Working Hours'} >
                        <ClinicWorkingHours loadingState={loadingState}
                                            dataState={dataState}
                                            />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'overview4'} tab={'Patient 4'} >
                        dfgdf
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'overview5'} tab={'Patient 5'} >
                        dfgdf
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'overview6'} tab={'Patient 6'} >
                        dfgdf
                    </Tabs.TabPane>
                </ClinicTabBars>
          </div>
    )
}
export default Clinic;
