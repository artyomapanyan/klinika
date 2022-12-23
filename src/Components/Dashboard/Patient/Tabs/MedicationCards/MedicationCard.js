import {Button, Card, Col, Divider, Row} from "antd";

function MedicationCards() {
    return(
            <Col lg={8} >
                <Card
                    title={<div>
                        <div>Lipanthyl 145 mg </div>
                        <div  style={{fontSize:14, fontWeight:400}}>23 July 2022 by Dr. Jerry Tompson</div>
                    </div>}
                    extra={<Button style={{border:'none'}}>x</Button>}
                    style={{border:"1px solid #cfceca"}}
                >
                    <Row>
                        <Col lg={7} align={'center'}>
                            <div className={"medication_card_text1"}>Frequency</div>
                            <div className={"medication_card_text2"}>3 times/day</div>
                        </Col>
                        <Col lg={1} align={'center'}>
                            <Divider type={'vertical'} style={{border:'1px solid #cfceca'}} />
                        </Col>
                        <Col lg={7} align={'center'}>
                            <div className={"medication_card_text1"}>Dose</div>
                            <div className={"medication_card_text2"}>2 pcs</div>
                        </Col>
                        <Col lg={1} align={'center'}>
                            <Divider type={'vertical'} style={{border:'1px solid #cfceca'}} />
                        </Col>

                        <Col lg={7} align={'center'}>
                            <div className={"medication_card_text1"}>Duration</div>
                            <div className={"medication_card_text2"}>30 days</div>
                        </Col>
                    </Row>
                </Card>
            </Col>
    )
}
export default MedicationCards;