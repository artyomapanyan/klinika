import {Button, Card, Col, Row} from "antd";
import MedicationCards from "./MedicationCards/MedicationCard";

function PatientCardMedications() {
    return(
        <div style={{padding:40}}>
            <Row gutter={[40,40]}>
                <Col lg={24}>   <h1 className={'h1'}>Active Medication</h1></Col>
            </Row>
            <Row gutter={[30]}>
                <MedicationCards/>
                <MedicationCards/>
                <MedicationCards/>
            </Row>

            <Row gutter={[40,40]}>
                <Col lg={24}>   <h1 className={'h1'}>Finished</h1></Col>
            </Row>

            <Row gutter={[30]}>
                <Col lg={6} >

                </Col>
                <Col lg={6}>

                </Col>
                <Col lg={6}>

                </Col>
                <Col lg={6}>

                </Col>
            </Row>
        </div>
    )
}
export default PatientCardMedications;