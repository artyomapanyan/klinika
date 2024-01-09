import {Button, Col, Row, Layout, Form, Modal} from "antd";
import React, {useEffect, useRef, useState} from 'react';
import { Input } from 'antd';
import AppointmentFollowUpHistory from "./CardAppointmentItems/AppointmentFollowUpHistory";
import FileManager from "../../../Fragments/FileManager";
import AppointmentCheckboxes from "./CardAppointmentItems/AppointmentCheckboxes";
import addimage from "../../../../dist/icons/addimage.svg";
import MedicationCards from "./MedicationCards/MedicationCard";
import AddMedications from "./CardAppointmentItems/AddMedications";
import {postResource, postResource1, updateResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import Preloader from "../../../Preloader";
import resourceLinks from "../../../ResourceLinks";
import {t} from "i18next";

const { TextArea } = Input;

const resource = 'Appointment'
function PatientCardAppointment({patientId, bigData, id, setBigData}) {
    const formRef = useRef();
    const token = useSelector((state) => state.auth.token);
    let params = useParams()

    const [prescriptions, setPrescriptions] = useState([])
    const [oldPrescriptions, setOldPrescriptions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [loadingSubmit1, setLoadingSubmit1] = useState(false)
    const [addDeleteState, setAddDeleteState] = useState(1)
    const [editState, setEditState] = useState(false)
    const [editState2, setEditState2] = useState(false)
    const [fileChangeState, setFileChangeState] = useState({})
    const showModal = (data) => {
        setIsModalOpen(data??{});
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setLoading(true)
        postResource('prescriptions','single', token,  '', {
            patient: patientId,
                clinic: bigData?.clinic?.id,
        }
            ).then((response) => {
            //setPrescriptions(response?.items.filter(item => item.appointment_id == params.id))
            setOldPrescriptions(response?.items.filter(item => item.appointment_id != params.id));
            setLoading(false)
        })
    }, [addDeleteState, bigData])

    useEffect(() => {
        setLoading(true)
        postResource('prescriptions','single', token,  '', {
                appointment: params.id,

            }
        ).then((response) => {
            setPrescriptions(response?.items)


        }).finally(() => {
            setLoading(false)
        })
    }, [addDeleteState, bigData])


    const onFinish = (values) => {
        setLoadingSubmit(true)
        postResource('Appointment', 'NotePurpose', token, `${id}/add-notes-and-purpose`, values).then((response) => {
            setBigData(response)
            setLoadingSubmit(false)

        })
        setEditState(false)
        setEditState2(false)
    }

    const onFinish1 = (values) => {
        setLoadingSubmit1(true)
        postResource('Appointment', 'NotePurpose', token, `${id}/add-notes-and-purpose`, values).then((response) => {
            setBigData(response)
            setLoadingSubmit1(false)

        })
        setEditState(false)
        setEditState2(false)
    }


    const onFileCreate = (values) => {
        postResource1('Appointment', 'NotePurpose', token, `${id}/upload-files`, values, null, true).then((response) => {
            setBigData(response)
            setLoadingSubmit(false)

        })

    }

    // useEffect(() => {
    //     if(fileChangeState) {
    //         onFileCreate(fileChangeState)
    //     }
    // }, [fileChangeState])

    const btnEdit = () => {
        setEditState(true)
    }

    const btnEdit2 = () => {
        setEditState2(true)
    }
    console.log(bigData, 'fff')

    return(
        <Layout.Content>
            {
                loading ? <Preloader /> : <Row gutter={[40,0]}>
                    <Col lg={24}>
                        <Row gutter={[40,0]}>
                            <Col lg={16}>

                                    <Form
                                            onFinish={onFinish}
                                        >
                                        <h1 className={'h1'}>{t('Doctor Notes')}</h1>
                                        {
                                            !bigData?.appointment_doctor_notes ? <div className={'Purpose_textarea_div'}>
                                                <Form.Item initialValue={bigData?.appointment_doctor_notes} name={'appointment_doctor_notes'}>
                                                    <TextArea placeholder={t("Patients condition")} rows={8}/>
                                                </Form.Item>
                                                <div align={'right'}>
                                                    <Button loading={loadingSubmit} style={{right:20, top:-70}} type={'secondary'} htmlType={'submit'}>{t('Submit')}</Button>
                                                </div>

                                            </div> : !editState ? <div>
                                                {
                                                    loadingSubmit ? <Preloader small={50}/> : <div className={'dr_notes_text_div'}>
                                                        {bigData?.appointment_doctor_notes}
                                                    </div>
                                                }

                                                <div align={'right'} style={{padding: 16}}>
                                                    <button onClick={btnEdit} className={'doctor_notes_edit_btn'}  style={{fontWeight: 500}}  type={'secondary'}>{t('Edit')}</button>
                                                </div>
                                            </div> : <div className={'Purpose_textarea_div'}>
                                                <Form.Item initialValue={bigData?.appointment_doctor_notes} name={'appointment_doctor_notes'}>
                                                    <TextArea placeholder={t("Patients condition")} rows={8}/>
                                                </Form.Item>
                                                <div align={'right'}>
                                                    <Button loading={loadingSubmit} style={{right:20, top:-70}} type={'secondary'} htmlType={'submit'}>{t('Submit')}</Button>
                                                </div>

                                            </div>
                                        }
                                    </Form>


                                        {/*{*/}
                                        {/*    !bigData?.appointment_doctor_notes || !editState ? <div>*/}
                                        {/*        {*/}
                                        {/*            loadingSubmit ? <Preloader small={50}/> : <div className={'dr_notes_text_div'}>*/}
                                        {/*                {bigData?.appointment_doctor_notes}*/}
                                        {/*            </div>*/}
                                        {/*        }*/}

                                        {/*        <div align={'right'} style={{padding: 16}}>*/}
                                        {/*            <Button onClick={()=>setEditState(true)} loading={loadingSubmit} style={{fontWeight: 700}}  type={'secondary'}>{t('Edit')}</Button>*/}
                                        {/*        </div>*/}
                                        {/*    </div> : <div className={'Purpose_textarea_div'}>*/}
                                        {/*        <Form.Item initialValue={bigData?.appointment_doctor_notes} name={'appointment_doctor_notes'}>*/}
                                        {/*            <TextArea placeholder={t("Patients condition")} rows={8}/>*/}
                                        {/*        </Form.Item>*/}
                                        {/*        <div align={'right'}>*/}
                                        {/*            <Button loading={loadingSubmit} style={{right:20, top:-70}} type={'secondary'} htmlType={'submit'}>{t('Submit')}</Button>*/}
                                        {/*        </div>*/}

                                        {/*    </div>*/}
                                        {/*}*/}
                                <Form
                                    onFinish={onFinish1}
                                >
                                        <h1 className={'h1'}>{t('Purpose')}</h1>

                                        {
                                            !bigData?.purpose ? <div className={'Purpose_textarea_div'}>
                                                <Form.Item initialValue={bigData?.purpose} name={'purpose'}>
                                                    <TextArea placeholder={t("Add notes here")} rows={8}/>
                                                </Form.Item>
                                                <div align={'right'}>
                                                    <Button loading={loadingSubmit1} style={{right:20, top:-70}} type={'secondary'} htmlType={'submit'}>{t('Submit')}</Button>
                                                </div>

                                            </div> : !editState2 ? <div>
                                                {
                                                    loadingSubmit1 ? <Preloader small={50}/> : <div className={'dr_notes_text_div'}>
                                                        {bigData?.purpose}
                                                    </div>
                                                }

                                                <div align={'right'} style={{padding: 16}}>
                                                    <button onClick={btnEdit2} className={'doctor_notes_edit_btn'}  style={{fontWeight: 500}}  type={'secondary'}>{t('Edit')}</button>
                                                </div>
                                            </div> : <div className={'Purpose_textarea_div'}>
                                                <Form.Item initialValue={bigData?.purpose} name={'purpose'}>
                                                    <TextArea placeholder={t("Patients condition")} rows={8}/>
                                                </Form.Item>
                                                <div align={'right'}>
                                                    <Button loading={loadingSubmit1} style={{right:20, top:-70}} type={'secondary'} htmlType={'submit'}>{t('Submit')}</Button>
                                                </div>

                                            </div>
                                        }



                                        {/*    <div className={'Purpose_textarea_div'}>*/}
                                        {/*        <Form.Item initialValue={bigData?.purpose} name={'purpose'}>*/}
                                        {/*            <TextArea placeholder={t("Add notes here")} rows={8} />*/}
                                        {/*        </Form.Item>*/}
                                        {/*    </div>*/}

                                        {/*<div align={'right'}>*/}
                                        {/*    <Button loading={loadingSubmit} style={{right:20, top:-70}} type={'secondary'} htmlType={'submit'}>{t('Submit')}</Button>*/}
                                        {/*</div>*/}

                                        </Form>




                                <div style={{width:'100%'}}>

                                    <h1 className={'prescription_text'}>{t('Prescriptions')}</h1>
                                    <Row gutter={16} style={{marginTop:-16}}>
                                        {

                                            prescriptions.map((el) => {
                                                return<MedicationCards key={el?.id} el={el} showModal={showModal} setPrescriptions={setPrescriptions} setLoading={setLoading} setAddDeleteState={setAddDeleteState}/>

                                            })
                                        }
                                    </Row>

                                    <div style={{marginTop:30}}>

                                        {oldPrescriptions.length? 
                                            <div>
                                                <p style={{fontSize:16}}>The patient is already taking: 
                                                    {oldPrescriptions.map((el, key) => {
                                                        return<span key={key} style={{fontSize:16, fontWeight:700}}>
                                                            {el.name}
                                                            {el != oldPrescriptions[oldPrescriptions.length - 1]? ', ' : '' } 
                                                        </span>
                                                        })
                                                    }
                                                </p>
                                            </div>: ''
                                        }
                                        <Button onClick={showModal} size={'large'} type={'primary'}>{t('Add medications')}</Button>
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
                                    <h1 className={'h1'}>{t('Files and Images')}</h1>
                                    <Form ref={formRef}
                                        onFinish={onFileCreate}
                                          onValuesChange={(e) => setFileChangeState(e)}

                                    >
                                        <FileManager text1={'Drag here or Select'}
                                                     text2={'files and images'}
                                                     uploadIcon={<img alt={'icons'} src={addimage}/>}
                                                     limit={5}
                                                     name={'files'} initialFileList={bigData?.files} formRef={formRef} type={'drag'} />

                                        <Button  htmlType={'submit'}>{t('Save')}</Button>
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
