import {Button, Card, Col, Divider, Row} from "antd";
import closeLightGray from "../../../../../dist/icons/close-lightGray.svg";

function MedicationCards({cardHeadHub, cardHeadDate, Frequency, Dose, Duration}) {
    return(
            <Col lg={8} >
                <Card
                    title={<div>
                        <div>{cardHeadHub}</div>
                        <div  style={{fontSize:14, fontWeight:400}}>{cardHeadDate}</div>
                    </div>}
                    extra={<Button style={{border:'none'}}><img alt={'icons'} src={closeLightGray}/></Button>}
                    style={{border:"1px solid #cfceca"}}
                >
                    <Row>
                        <Col lg={7} align={'center'}>
                            <div className={"medication_card_text1"}>Frequency</div>
                            <div className={"medication_card_text2"}>{Frequency}</div>
                        </Col>
                        <Col lg={1} align={'center'}>
                            <Divider type={'vertical'} style={{border:'1px solid #cfceca', height:45}} />
                        </Col>
                        <Col lg={7} align={'center'}>
                            <div className={"medication_card_text1"}>Dose</div>
                            <div className={"medication_card_text2"}>{Dose}</div>
                        </Col>
                        <Col lg={1} align={'center'}>
                            <Divider type={'vertical'} style={{border:'1px solid #cfceca', height:45}} />
                        </Col>

                        <Col lg={7} align={'center'}>
                            <div className={"medication_card_text1"}>Duration</div>
                            <div className={"medication_card_text2"}>{Duration}</div>
                        </Col>
                    </Row>
                </Card>
            </Col>
    )
}
export default MedicationCards;