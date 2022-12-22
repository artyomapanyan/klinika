import {Button, Col, Row, Layout, Checkbox, Form} from "antd";
import React, {useRef} from 'react';
import { Input } from 'antd';
import AppointmentFollowUpHistory from "./Fragments/AppointmentFollowUpHistory";
import FileManager from "../../../../Fragments/FileManager";
import AppointmentCheckboxes from "./Fragments/AppointmentCheckboxes";
import addimage from "../../../../../dist/icons/addimage.svg";

const { TextArea } = Input;
function Appointment() {

    const formRef = useRef();



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
                        </Col>
                        <Col lg={8}>
                            <div style={{border:"1px solid #cfceca", borderRadius:12, height:'88%', display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} >
                                <div style={{ display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center", width:'60%'}}>
                                    <h1 className={'h1'}>Possible Diagnoses</h1>
                                    <p>Describe patient’s current condition. provide symptoms, signs, lab tests, risk factrors, etc...</p>
                                    <Button type={'secondary'}>How in works?</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col lg={16}>
                    <div >
                        <h1 className={'h1'}>Purpose</h1>
                        <TextArea placeholder="Add notes here" rows={8} />
                        <div style={{marginTop:30}}>
                            <h1 className={'h1'}>Prescription</h1>
                            <p style={{fontSize:16}}>The patient is already taking: <span style={{fontSize:16, fontWeight:700}}>Crestor 20 mg Tablet 28pcs, Lipanthyl 145 mg , Lorvast Everin 40 mg</span></p>
                            <p>Add the medications that the patient needs to take</p>
                            <Button size={'large'} type={'primary'}>Add medications</Button>
                        </div>
                    </div>
                    <div>
                        <AppointmentCheckboxes/>
                    </div>

                </Col>
                <Col lg={8}>

                    <div>
                        <h1 className={'h1'}>Files and Images</h1>
                        <Form>
                            <FileManager text1={'Drag here or Select'}
                                         text2={'files and images'}
                                         uploadIcon={<img alt={'icons'} src={addimage}/>}
                                         name={'cover'} initialFileList={[]} limit={1} formRef={formRef} type={'drag'}/>
                        </Form>

                    </div>
                    <div style={{marginTop:30}}>
                        <AppointmentFollowUpHistory/>
                    </div>

                </Col>
            </Row>
        </Layout.Content>
    )
}
export default Appointment;
