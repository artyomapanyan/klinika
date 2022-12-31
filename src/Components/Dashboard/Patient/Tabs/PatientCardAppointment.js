import {Button, Col, Row, Layout, Form} from "antd";
import React, {useRef, useState} from 'react';
import { Input } from 'antd';
import AppointmentFollowUpHistory from "./CardAppointmentItems/AppointmentFollowUpHistory";
import FileManager from "../../../Fragments/FileManager";
import AppointmentCheckboxes from "./CardAppointmentItems/AppointmentCheckboxes";
import addimage from "../../../../dist/icons/addimage.svg";
import MedicationCards from "./MedicationCards/MedicationCard";

const { TextArea } = Input;
function PatientCardAppointment() {
    const [showState,setShowState] = useState(false)

    const formRef = useRef();

    const showCard = () => {
        setShowState(!showState)
    }

    return(
        <Layout.Content>

            <Row gutter={[40,0]}>
                <Col lg={24}>   <h1 className={'h1'}>Doctor Notes</h1></Col>
                <Col lg={24}>
                    <Row gutter={[40,0]}>
                        <Col lg={16}>
                            <TextArea placeholder="Patients condition" rows={8} />
                            <div align={'right'}>
                                <Button style={{right:20, top:-50}} type={'secondary'}>Submit</Button>
                            </div>
                            <div style={{width:'100%'}}>
                                <h1 className={'h1'}>Purpose</h1>
                                <TextArea placeholder="Add notes here" rows={8} />
                                {
                                    !showState ? null : <Row style={{marginTop:20}}>
                                        <MedicationCards
                                            cardHeadHub={'Name of medication'}
                                            cardHeadDate={'1st month'}
                                            Frequency={'5 dfgf'}
                                            Dose={'10 day'}
                                            Duration={'6 cdfdfvb'}
                                        />
                                    </Row>
                                }

                                <div style={{marginTop:30}}>
                                    <h1 className={'h1'}>Prescription</h1>
                                    <div>
                                        <p style={{fontSize:16}}>The patient is already taking: <span style={{fontSize:16, fontWeight:700}}>Crestor 20 mg Tablet 28pcs, Lipanthyl 145 mg , Lorvast Everin 40 mg</span></p>
                                        <p>Add the medications that the patient needs to take</p>
                                    </div>
                                    <Button onClick={showCard} size={'large'} type={'primary'}>Add medications</Button>
                                </div>
                            </div>
                            <div >
                                <AppointmentCheckboxes/>
                            </div>
                        </Col>


                        <Col lg={8}>
                            <div style={{border:"1px solid #cfceca", borderRadius:12, padding:15, display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} >
                                <div style={{ display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center", width:'60%'}}>
                                    <h1 className={'h1'}>Possible Diagnoses</h1>
                                    <p>Describe patient’s current condition. provide symptoms, signs, lab tests, risk factrors, etc...</p>
                                    <Button type={'secondary'}>How in works?</Button>
                                </div>
                            </div>
                            <div>
                                <h1 className={'h1'}>Files and Images</h1>
                                <Form ref={formRef}>
                                    <FileManager text1={'Drag here or Select'}
                                                 text2={'files and images'}
                                                 uploadIcon={<img alt={'icons'} src={addimage}/>}
                                                 name={'cover'} initialFileList={[]} formRef={formRef} type={'drag'}/>
                                </Form>

                            </div>
                            <div style={{marginTop:30}}>
                                <AppointmentFollowUpHistory/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout.Content>
    )
}
export default PatientCardAppointment;
