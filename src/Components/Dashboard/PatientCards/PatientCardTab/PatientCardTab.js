import {Col, Divider, Row, Tabs} from "antd";
import PatientCardMedications from "../PatientCardMedications";
import PatientCardRiskFactors from "../PatientCardRiskFactors";
import PatientCardAllergy from "../PatientCardAllergy";
import PatientCardChronicDiseases from "../PatientCardChronicDiseases";
import PatientCardRight from "../PatientCardRight";
import TabBars from "../../../Fragments/TabBars/TabBars";
import PatientHeader from "../../PatientHeader/PatientHeader";
import PatientCollapse from "../../PatientCollapse/PatientCollapse";

function PatientCardTab() {
    return(
        <div>
            <PatientHeader />
            <Divider />
            <PatientCollapse />
            <TabBars>
                <Tabs.TabPane key={'overview'} tab={'Patient overview'} >
                    <Row gutter={[16,16]}>
                        <Col lg={16}>
                            <div style={{display:"flex", gap: 24, padding: 24}}>
                                <PatientCardMedications/>
                                <PatientCardRiskFactors/>
                            </div>
                            <div style={{display:"flex", gap: 24, padding: 24}}>
                                <PatientCardAllergy/>
                                <PatientCardChronicDiseases/>
                            </div>

                        </Col>
                        <Col lg={8}>
                            <PatientCardRight/>
                        </Col>

                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane key={'appointment'} tab={'Appointment'} >

                </Tabs.TabPane>
                <Tabs.TabPane key={'pat-history'} tab={'Patient’s history'} >

                </Tabs.TabPane>
                <Tabs.TabPane key={'lab-tests'} tab={'Lab Tests'} >

                </Tabs.TabPane>
                <Tabs.TabPane key={'medications'} tab={'Medications'} >

                </Tabs.TabPane>
                <Tabs.TabPane key={'log'} tab={'log'} >

                </Tabs.TabPane>
            </TabBars>
        </div>
    )
}
export default PatientCardTab;