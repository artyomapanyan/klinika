import {Button, Card, Col, Row, Layout, Upload, Checkbox} from "antd";
import React from 'react';
import { Input } from 'antd';
import {InboxOutlined} from "@ant-design/icons";
import AppointmentUpload from "./Fragments/AppointmentUpload";
import AppointmentFollowUpHistory from "./Fragments/AppointmentFollowUpHistory";
const { TextArea } = Input;
function Appointment() {

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    return(
        <Layout.Content>

            <Row gutter={[40,0]}>
                <Col lg={24}>   <h1>Doctor Notes</h1></Col>
                <Col lg={16}>
                    <div >

                        <TextArea placeholder="Patients condition" rows={9} />
                        <div align={'right'}>
                            <Button style={{right:20, top:-50}} type={'secondary'}>Submit</Button>
                        </div>

                        <h1>Purpose</h1>
                        <TextArea placeholder="Add notes here" rows={9} />
                        <div style={{marginTop:30}}>
                            <h1>Prescription</h1>
                            <p style={{fontSize:16}}>The patient is already taking: <span style={{fontSize:16, fontWeight:700}}>Crestor 20 mg Tablet 28pcs, Lipanthyl 145 mg , Lorvast Everin 40 mg</span></p>
                            <p>Add the medications that the patient needs to take</p>
                            <Button size={'large'} type={'primary'}>Add medications</Button>
                        </div>
                    </div>
                    <div>
                        <Checkbox.Group
                            style={{
                                width: '100%',
                            }}
                            onChange={onChange}
                        >
                            <div>

                                    <Checkbox value="A">Eyes</Checkbox>

                                    <Checkbox value="B">ENT</Checkbox>

                                    <Checkbox value="C">Cardiovascular</Checkbox>

                                    <Checkbox value="A">Respiratory</Checkbox>

                                    <Checkbox value="B">Gastrointestinal</Checkbox>

                                    <Checkbox value="C">Genitals</Checkbox>

                                    <Checkbox value="A">A</Checkbox>

                                    <Checkbox value="B">B</Checkbox>

                                    <Checkbox value="C">C</Checkbox>

                                    <Checkbox value="A">A</Checkbox>

                                    <Checkbox value="B">B</Checkbox>

                                    <Checkbox value="C">C</Checkbox>

                            </div>
                        </Checkbox.Group>
                    </div>

                </Col>
                <Col lg={8}>
                    <div style={{border:"1px solid #cfceca", borderRadius:12, height:210, display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} >
                        <div style={{ display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center", width:'60%'}}>
                            <h1>Possible Diagnoses</h1>
                            <p>Describe patient’s current condition. provide symptoms, signs, lab tests, risk factrors, etc...</p>
                            <Button type={'secondary'}>How in works?</Button>
                        </div>
                    </div>
                    <div>
                        <h1 style={{marginTop:30}}>Files and Images</h1>
                        <AppointmentUpload/>
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