import {Divider, Tabs} from "antd";
import TabBars from "../../Fragments/TabBars/TabBars";
import PatientHeader from "./Fragments/PatientHeader/PatientHeader";
import PatientCollapse from "./Fragments/PatientCollapse";
import PatientCardAppointment from "./Tabs/PatientCardAppointment";
import PatientOverviewTab from "./Tabs/PatientOverviewTab";
import PatientCardLabTests from "./Tabs/PatientCardLabTests";
import PatientCardMedications from "./Tabs/PatientCardMedications";
import PatientCardLog from "./Tabs/PatientCardLog";
import PatientHistory from "./Tabs/PatientHistory";
import React from "react";

function Patient() {
    return(
        <div>
            <div style={{background:"#ffffff", margin:'0 24px', borderRadius: 12}}>
                <PatientHeader />
                <Divider />
                <PatientCollapse />
            </div>

            <div style={{backgroundColor:'white', margin:'0 24px'}}>
            <TabBars>
                <Tabs.TabPane key={'overview'} tab={'Patient overview'} >
                    <PatientOverviewTab/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'appointment'} tab={'PatientCardAppointment'} >
                    <PatientCardAppointment/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'pat-history'} tab={'Patient’s history'} >
                    <PatientHistory />
                </Tabs.TabPane>
                <Tabs.TabPane key={'lab-tests'} tab={'Lab Tests'} >
                    <PatientCardLabTests/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'medications'} tab={'Medications'} >
                    <PatientCardMedications/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'log'} tab={'log'} >
                    <PatientCardLog />
                </Tabs.TabPane>
            </TabBars>
            </div>
        </div>
    )
}
export default Patient;