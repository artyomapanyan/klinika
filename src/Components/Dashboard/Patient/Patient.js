import { Divider, Tabs} from "antd";
import TabBars from "../../Fragments/TabBars/TabBars";
import PatientHeader from "./Fragments/PatientHeader/PatientHeader";
import PatientCollapse from "./Fragments/PatientCollapse";
import PatientCardAppointment from "./Tabs/PatientCardAppointment";
import PatientOverviewTab from "./Tabs/PatientOverviewTab";
import PatientCardLabTests from "./Tabs/PatientCardLabTests";
import PatientCardMedications from "./Tabs/PatientCardMedications";
import PatientCardLog from "./Tabs/PatientCardLog";

function Patient() {
    return(
        <div>
            <PatientHeader />
            <Divider />
            <PatientCollapse />
            <div style={{backgroundColor:'white', margin:24}}>
            <TabBars>
                <Tabs.TabPane key={'overview'} tab={'Patient overview'} >
                    <PatientOverviewTab/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'appointment'} tab={'PatientCardAppointment.js'} >
                    <PatientCardAppointment/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'pat-history'} tab={'Patient’s history'} >

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