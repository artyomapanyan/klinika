import {Button, Col, Row, Layout, Form, Modal} from "antd";
import React, {useEffect, useRef, useState} from 'react';
import { Input } from 'antd';
import AppointmentFollowUpHistory from "./CardAppointmentItems/AppointmentFollowUpHistory";
import FileManager from "../../../Fragments/FileManager";
import AppointmentCheckboxes from "./CardAppointmentItems/AppointmentCheckboxes";
import addimage from "../../../../dist/icons/addimage.svg";
import MedicationCards from "./MedicationCards/MedicationCard";
import AddMedications from "./CardAppointmentItems/AddMedications";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import Preloader from "../../../Preloader";

const { TextArea } = Input;
function PatientCardAppointment({bigData, id}) {
    const formRef = useRef();
    const token = useSelector((state) => state.auth.token);
    let params = useParams()

    const [prescriptions, setPrescriptions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [addDeleteState, setAddDeleteState] = useState(1)
    const showModal = (data) => {
        setIsModalOpen(data??{});
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setLoading(true)
        postResource('prescriptions','single', token,  '', {
            appointment: params.id
            }
            ).then((response) => {
            setPrescriptions(response?.items)
            setLoading(false)

        })
    }, [addDeleteState])


    const onFinish = (values) => {
        setLoadingSubmit(true)
        postResource('Appointment', 'NotePurpose', token, `${id}/add-notes-and-purpose`, values).then(() => {
            setLoadingSubmit(false)

        })
    }


    return(
        <Layout.Content>
            {
                loading ? <Preloader /> : <Row gutter={[40,0]}>
                    <Col lg={24}>   <h1 className={'h1'}>Doctor Notes</h1></Col>
                    <Col lg={24}>
                        <Row gutter={[40,0]}>
                            <Col lg={16}>
                                <Form
                                    onFinish={onFinish}
                                >
                                    <Form.Item initialValue={bigData?.appointment_doctor_notes} name={'appointment_doctor_notes'}>
                                        <TextArea placeholder="Patients condition" rows={8}/>
                                    </Form.Item>
                                    <div align={'right'}>
                                        <Button loading={loadingSubmit} style={{right:20, top:-70}} type={'secondary'} htmlType={'submit'}>Submit</Button>
                                    </div>
                                    <h1 className={'h1'}>Purpose</h1>
                                    <Form.Item initialValue={bigData?.purpose} name={'purpose'}>
                                        <TextArea placeholder="Add notes here" rows={8} />
                                    </Form.Item>

                                </Form>


                                <div style={{width:'100%'}}>

                                    <h1 className={'prescription_text'}>Prescriptions</h1>
                                    <Row gutter={16} style={{marginTop:-16}}>
                                        {

                                            prescriptions.map((el) => {
                                                return<MedicationCards key={el?.id} el={el} showModal={showModal} setPrescriptions={setPrescriptions} setLoading={setLoading} setAddDeleteState={setAddDeleteState}/>

                                            })
                                        }
                                    </Row>

                                    <div style={{marginTop:30}}>

                                        {/*<div>*/}
                                        {/*    <p style={{fontSize:16}}>The patient is already taking: <span style={{fontSize:16, fontWeight:700}}>Crestor 20 mg Tablet 28pcs, Lipanthyl 145 mg , Lorvast Everin 40 mg</span></p>*/}

                                        {/*</div>*/}
                                        <Button onClick={showModal} size={'large'} type={'primary'}>Add medications</Button>
                                        <div>
                                            <Modal className={'medications_modal'} width={752} title="Add medication" footer={false} open={isModalOpen} onCancel={handleCancel}>
                                                <AddMedications key={Math.random()} handleCancel={handleCancel} setIsModalOpen={setIsModalOpen} data={isModalOpen} prescriptions={prescriptions} setAddDeleteState={setAddDeleteState}/>
                                            </Modal>
                                        </div>

                                    </div>
                                </div>
                                {/*<div >*/}
                                {/*    <AppointmentCheckboxes/>*/}
                                {/*</div>*/}
                            </Col>


                            <Col lg={8}>
                                {/*<div style={{border:"1px solid #cfceca", borderRadius:12, padding:15, display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}} >*/}
                                {/*    <div style={{ display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center", width:'60%'}}>*/}
                                {/*        <h1 className={'h1'}>Possible Diagnoses</h1>*/}
                                {/*        <p>Describe patient’s current condition. provide symptoms, signs, lab tests, risk factrors, etc...</p>*/}
                                {/*        <Button type={'secondary'}>How in works?</Button>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className={'patient_appoint_image_div'}>
                                    <h1 className={'h1'}>Files and Images</h1>
                                    <Form ref={formRef}>
                                        <FileManager text1={'Drag here or Select'}
                                                     text2={'files and images'}
                                                     uploadIcon={<img alt={'icons'} src={addimage}/>}
                                                     limit={5}
                                                     name={'cover'} initialFileList={[]} formRef={formRef} />
                                    </Form>

                                </div>
                                {/*<div style={{marginTop:30}}>*/}
                                {/*    <AppointmentFollowUpHistory/>*/}
                                {/*</div>*/}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }


        </Layout.Content>
    )
}
export default PatientCardAppointment;
