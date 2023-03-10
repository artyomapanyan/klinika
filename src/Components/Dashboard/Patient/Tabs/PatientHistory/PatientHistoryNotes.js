import {Button, Card, Checkbox, Col, Divider, Form, Layout, Row, Space} from "antd";
import FileManager from "../../../../Fragments/FileManager";
import addimage from "../../../../../dist/icons/addimage.svg";
import React, {useRef} from "react";
import arrowLeftPurple from "../../../../../dist/icons/arrow-left-purple.svg";
import MedicationCards from "../MedicationCards/MedicationCard";
function PatientHistoryNotes() {
    const formRef = useRef();

    return(
        <Layout.Content>

            <Row gutter={[40,0]}>
                <Col lg={24}>
                    <Space>
                        <Space>
                            <Button><img alt={'icons'} src={arrowLeftPurple}/></Button>
                        </Space>
                        <div>
                            <div className={"medication_card_text2"}>Merrill Kervin</div>
                            <div className={"medication_card_text1"}>Telehealth at 23 July 2022</div>
                        </div>
                    </Space>

                </Col>
                <Col lg={24}>
                    <Row gutter={[40,0]}>
                        <Col lg={16}>
                            <div>
                                <div style={{border:"1px solid #cfceca", padding:20, borderRadius:10}}>
                                    <div><h1 className={'h1'}>Doctor Notes</h1></div>
                                    <Divider style={{color:'red'}}/>
                                    <div style={{width:'80%'}}>The patient was discharged 24 hours earlier after he underwent elective coronary angiography and stent placement
                                        due to left circumflex artery stenosis. He has been taking his prescribed medications and reports no chest pain, shortness of breath,
                                        or flank pain. His other medical problems include type 2 diabetes, hypertension,</div>

                                </div>
                            </div>

                        </Col>
                        <MedicationCards
                            cardHeadHub={'Name of medication'}
                            cardHeadDate={'1st month'}
                            Frequency={'5 dfgf'}
                            Dose={'10 day'}
                            Duration={'6 cdfdfvb'}
                        />
                    </Row>
                </Col>

                <Col lg={16} style={{marginTop:20}}>
                    <div >
                        <Card
                            title={<h1 className={'h1'}>Purpose</h1>}
                            style={{border:"1px solid #cfceca"}}
                        >
                            <div style={{width:'80%'}}>
                                hhhhhhhhhhhhhhhhhhhhhhhhhh
                            </div>


                        </Card>

                    </div>
                    <div>
                        <h1 className={'h1'}>Problem area</h1>
                        <Checkbox.Group>
                            <Checkbox value="A">A</Checkbox>
                            <Checkbox value="B">B</Checkbox>
                        </Checkbox.Group>
                    </div>

                </Col>
                <Col lg={8}>

                    <div>
                        <h1 className={'h1'}>Files and Images</h1>
                        <Form ref={formRef}>
                            <FileManager text1={'Drag here or Select'}
                                         text2={'files and images'}
                                         uploadIcon={<img alt={'icons'} src={addimage}/>}
                                         name={'cover'} initialFileList={[]} formRef={formRef} type={'drag'}/>
                        </Form>

                    </div>
                </Col>
            </Row>
        </Layout.Content>
    )
}
export default PatientHistoryNotes