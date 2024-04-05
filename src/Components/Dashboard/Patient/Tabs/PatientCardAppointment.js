import { Button, Col, Row, Layout, Form, Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'antd'
import AppointmentFollowUpHistory from './CardAppointmentItems/AppointmentFollowUpHistory'
import FileManager from '../../../Fragments/FileManager'
import AppointmentCheckboxes from './CardAppointmentItems/AppointmentCheckboxes'
import addimage from '../../../../dist/icons/addimage.svg'
import MedicationCards from './MedicationCards/MedicationCard'
import AddMedications from './CardAppointmentItems/AddMedications'
import {
	postResource,
	postResource1,
	updateResource
} from '../../../Functions/api_calls'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Preloader from '../../../Preloader'
import resourceLinks from '../../../ResourceLinks'
import { t } from 'i18next'
import FutureVisits from './CardAppointmentItems/FutureVisits'
import CurrentVisitServices from "./CardAppointmentItems/CurrentVisitServices";

const { TextArea } = Input


const resource = 'Appointment'
function PatientCardAppointment({
	tab,
	patientId,
	bigData,
	id,
	setBigData,
	setStatusLoading
}) {
	const formRef = useRef()
	const token = useSelector(state => state.auth.token)
	let params = useParams()

	const [allPrescriptions, setAllPrescriptions] = useState([])
	const [currentPrescriptions, setCurrentPrescriptions] = useState([])
	const [oldPrescriptions, setOldPrescriptions] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [loadingSubmit, setLoadingSubmit] = useState(false)
	const [loadingSubmit1, setLoadingSubmit1] = useState(false)
	const [addDeleteState, setAddDeleteState] = useState(1)
	const [editState, setEditState] = useState(false)
	const [editState2, setEditState2] = useState(false)
	const [fileChangeState, setFileChangeState] = useState({})
	const showModal = data => {
		setIsModalOpen(data ?? {})
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	useEffect(() => {
		setLoading(true)
		postResource('prescriptions', 'single', token, '', {
			patient: patientId,
			actual: 1
		}).then(response => {
			setAllPrescriptions(response?.items)
			setCurrentPrescriptions(
				response?.items.filter(item => item.appointment_id == params.id)
			)
			setOldPrescriptions(
				response?.items.filter(item => item.appointment_id != params.id)
			)
			setLoading(false)
		})
	}, [tab, addDeleteState, bigData])

	const onFinish = values => {
		setLoadingSubmit(true)
		postResource(
			'Appointment',
			'NotePurpose',
			token,
			`${id}/add-notes-and-purpose`,
			values
		).then(response => {
			setBigData(response)
			setLoadingSubmit(false)
		})
		setEditState(false)
		setEditState2(false)
	}

	const onFinish1 = values => {
		setLoadingSubmit1(true)
		postResource(
			'Appointment',
			'NotePurpose',
			token,
			`${id}/add-notes-and-purpose`,
			values
		).then(response => {
			setBigData(response)
			setLoadingSubmit1(false)
		})
		setEditState(false)
		setEditState2(false)
	}

	const onFileCreate = values => {
		postResource1(
			'Appointment',
			'NotePurpose',
			token,
			`${id}/upload-files`,
			values,
			null,
			true
		).then(response => {
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


	return (
		<Layout.Content>
			{loading ? (
				<Preloader />
			) : (
				<Row gutter={[40, 0]}>
					<Col lg={24}>
						<Row gutter={[40, 0]}>
							<Col lg={16}>
								<Form onFinish={onFinish}>
									<h1 className={'h1'}>{t('Doctor Notes')}</h1>
									{!bigData?.appointment_doctor_notes ? (
										<div className={'Purpose_textarea_div'}>
											<Form.Item
												initialValue={bigData?.appointment_doctor_notes}
												name={'appointment_doctor_notes'}
											>
												<TextArea
													placeholder={t('Patients condition')}
													rows={8}
												/>
											</Form.Item>
											<div align={'right'}>
												<Button
													loading={loadingSubmit}
													style={{ right: 20, top: -70 }}
													type={'secondary'}
													htmlType={'submit'}
												>
													{t('Submit')}
												</Button>
											</div>
										</div>
									) : !editState ? (
										<div>
											{loadingSubmit ? (
												<Preloader small={50} />
											) : (
												<div className={'dr_notes_text_div'}>
													{bigData?.appointment_doctor_notes}
												</div>
											)}

											<div align={'right'} style={{ padding: 16 }}>
												<button
													onClick={btnEdit}
													className={'doctor_notes_edit_btn'}
													style={{ fontWeight: 500 }}
													type={'secondary'}
												>
													{t('Edit')}
												</button>
											</div>
										</div>
									) : (
										<div className={'Purpose_textarea_div'}>
											<Form.Item
												initialValue={bigData?.appointment_doctor_notes}
												name={'appointment_doctor_notes'}
											>
												<TextArea
													placeholder={t('Patients condition')}
													rows={8}
												/>
											</Form.Item>
											<div align={'right'}>
												<Button
													loading={loadingSubmit}
													style={{ right: 20, top: -70 }}
													type={'secondary'}
													htmlType={'submit'}
												>
													{t('Submit')}
												</Button>
											</div>
										</div>
									)}
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
								<Form onFinish={onFinish1}>
									<h1 className={'h1'}>{t('Purpose')}</h1>

									{!bigData?.purpose ? (
										<div className={'Purpose_textarea_div'}>
											<Form.Item
												initialValue={bigData?.purpose}
												name={'purpose'}
											>
												<TextArea placeholder={t('Add notes here')} rows={8} />
											</Form.Item>
											<div align={'right'}>
												<Button
													loading={loadingSubmit1}
													style={{ right: 20, top: -70 }}
													type={'secondary'}
													htmlType={'submit'}
												>
													{t('Submit')}
												</Button>
											</div>
										</div>
									) : !editState2 ? (
										<div>
											{loadingSubmit1 ? (
												<Preloader small={50} />
											) : (
												<div className={'dr_notes_text_div'}>
													{bigData?.purpose}
												</div>
											)}

											<div align={'right'} style={{ padding: 16 }}>
												<button
													onClick={btnEdit2}
													className={'doctor_notes_edit_btn'}
													style={{ fontWeight: 500 }}
													type={'secondary'}
												>
													{t('Edit')}
												</button>
											</div>
										</div>
									) : (
										<div className={'Purpose_textarea_div'}>
											<Form.Item
												initialValue={bigData?.purpose}
												name={'purpose'}
											>
												<TextArea
													placeholder={t('Patients condition')}
													rows={8}
												/>
											</Form.Item>
											<div align={'right'}>
												<Button
													loading={loadingSubmit1}
													style={{ right: 20, top: -70 }}
													type={'secondary'}
													htmlType={'submit'}
												>
													{t('Submit')}
												</Button>
											</div>
										</div>
									)}

									{/*    <div className={'Purpose_textarea_div'}>*/}
									{/*        <Form.Item initialValue={bigData?.purpose} name={'purpose'}>*/}
									{/*            <TextArea placeholder={t("Add notes here")} rows={8} />*/}
									{/*        </Form.Item>*/}
									{/*    </div>*/}

									{/*<div align={'right'}>*/}
									{/*    <Button loading={loadingSubmit} style={{right:20, top:-70}} type={'secondary'} htmlType={'submit'}>{t('Submit')}</Button>*/}
									{/*</div>*/}
								</Form>

								<div style={{width: '100%', borderBottom: '1px solid #ceced6', marginTop: 40, boxShadow: '0.15px 0.15px'}}></div>
								<CurrentVisitServices id={id} bigData={bigData}/>
								{
									bigData?.status === 2 ? <div></div> : <div style={{width: '100%', borderBottom: '1px solid #ceced6', marginTop: 15, boxShadow: '0.15px 0.15px'}}></div>
								}


                                <FutureVisits appointment_id={id}
									disabled={
										bigData.status === 2 ||
										bigData.status === 3  ||
										bigData.status === 5 ||
										bigData.status === 7} 
									/>

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
									<Form
										ref={formRef}
										onFinish={onFileCreate}
										onValuesChange={e => setFileChangeState(e)}
									>
										<FileManager
											text1={'Drag here or Select'}
											text2={'files and images'}
											uploadIcon={<img alt={'icons'} src={addimage} />}
											limit={5}
											name={'files'}
											initialFileList={bigData?.files}
											formRef={formRef}
											type={'drag'}
										/>

										<Button htmlType={'submit'}>{t('Save')}</Button>
									</Form>
								</div>
								<div style={{ width: '100%' }}>
									<h1 className={'prescription_text'}>{t('Prescriptions')}</h1>
									<Row gutter={16} style={{ marginTop: -16 }}>
										{currentPrescriptions.map(el => {
											return (
												<MedicationCards
													key={el?.id}
													el={el}
													showModal={showModal}
													setPrescriptions={setCurrentPrescriptions}
													setLoading={setLoading}
													setAddDeleteState={setAddDeleteState}
													colWidth={24}
												/>
											)
										})}
									</Row>

									<div style={{ marginTop: 30 }}>
										{oldPrescriptions.length ? (
											<div>
												<p style={{ fontSize: 16 }}>
													The patient is already taking:
													{oldPrescriptions.map((el, key) => {
														return (
															<span
																key={key}
																style={{ fontSize: 16, fontWeight: 700 }}
															>
																{el.name}
																{el !=
																oldPrescriptions[oldPrescriptions.length - 1]
																	? ', '
																	: ''}
															</span>
														)
													})}
												</p>
											</div>
										) : (
											''
										)}
										<Button onClick={showModal} size={'large'} type={'primary'}>
											{t('Add medications')}
										</Button>
										<div>
											<Modal
												className={'medications_modal'}
												width={752}
												title='Add medication'
												footer={false}
												open={isModalOpen}
												onCancel={handleCancel}
											>
												<AddMedications
													key={Math.random()}
													handleCancel={handleCancel}
													setIsModalOpen={setIsModalOpen}
													data={isModalOpen}
													prescriptions={allPrescriptions}
													setAddDeleteState={setAddDeleteState}
												/>
											</Modal>
										</div>
									</div>
								</div>
								<div style={{ marginTop: 30 }}>
									<AppointmentFollowUpHistory
										appointment={bigData}
										setBigData={setBigData}
										setStatusLoading={setStatusLoading}
									/>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			)}
		</Layout.Content>
	)
}
export default PatientCardAppointment
