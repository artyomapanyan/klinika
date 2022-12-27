import {Col, Row} from "antd";
import MedicationCards from "./MedicationCards/MedicationCard";

function PatientCardMedications() {
    return(
        <div style={{padding:40}}>
            <Row gutter={[40,40]}>
                <Col lg={24}>   <h1 className={'h1'}>Active Medication</h1></Col>
            </Row>
            <Row gutter={[30]}>
                <MedicationCards
                    cardHeadHub={'Name of medication'}
                    cardHeadDate={'1st month'}
                    Frequency={'5 dddd'}
                    Dose={'10 day'}
                    Duration={'6 ggggg'}
                />
                <MedicationCards
                    cardHeadHub={'Name of medication'}
                    cardHeadDate={'1st month'}
                    Frequency={'5 dddd'}
                    Dose={'10 day'}
                    Duration={'6 ggggg'}
                />
                <MedicationCards
                    cardHeadHub={'Name of medication'}
                    cardHeadDate={'1st month'}
                    Frequency={'5 dddd'}
                    Dose={'10 day'}
                    Duration={'6 ggggg'}
                />
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
