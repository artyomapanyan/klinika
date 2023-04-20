import {useNavigate, useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {
    createResource,
    postResource,
    updateResource,
    useGetResourceIndex,
    useGetResourceSingle
} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import {Button, Form, Space, Row, Col, Popconfirm} from "antd";
import {t} from "i18next";
import Preloader from "../../Preloader";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import {InboxOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import FileManager from "../../Fragments/FileManager";
import dayjs from 'dayjs';
import CancelComponent from "../../Fragments/CancelComponent";


const resource = 'Appointment';


function Appointment() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [load, setLoad] = useState(false)

    const [serviceTypeState, setServiceTypeState] = useState([])
    const [availableTimeState, setAvailableTimesState] = useState([])
    const [availableDateState, setAvailableDateState] = useState([])
    const [changeValuesState, setChangeValuesState] = useState({})

    const fetchedUsers = useRef([]);
    const phoneNumber = useRef();


    useEffect(() => {
        setLoad(true)
        if (data?.clinic_id) {

            postResource('Clinic', 'single', token, data?.clinic_id).then(responses => {

                setServiceTypeState([
                    {
                        service: responses?.has_telehealth_service,
                        id: 'telehealth',
                        name: "Telehealth",
                    },
                    {
                        service: responses?.has_clinic_visit_service,
                        id: 'clinic_visit',
                        name: 'Clinic Visit',
                    },
                    {
                        service: responses?.has_home_visit_service,
                        id: 'home_visit',
                        name: 'Home Visit',
                    },
                    {
                        service: responses?.has_physical_therapy_home_visit_service,
                        id: 'physical_therapy_home_visit',
                        name: 'Physical Therapy Home Visit',
                    },
                    {
                        service: responses?.has_physical_therapy_clinic_visit_service,
                        id: 'physical_therapy_clinic_visit',
                        name: 'Physical Therapy Clinic Visit',
                    },
                    {
                        service: responses?.has_laboratory_home_visit_service,
                        id: 'laboratory_home_visit',
                        name: 'Laboratory Home Visit'
                    },
                    {
                        service: responses?.has_nursing_service,
                        id: 'nursing',
                        name: 'Nursing'
                    },
                    {
                        service: responses?.has_laboratory_clinic_visit_service,
                        id: 'laboratory_clinic_visit',
                        name: 'Laboratory Clinic Visit'
                    }
                ].filter(el => el.service === true))

                setLoad(false)
            })
        }
    }, [data?.clinic_id])


    useEffect(() => {
        if (data?.doctor_id) {
            postResource('ClinicDoctorWorkingHours', 'single', token, data?.doctor_id, {service: data?.service_type}).then(responses => {
                const res = responses?.working_hours
                let day = [];
                Object.values(res)?.map((el, i) => {
                    return el.filter((el1) => el1.is_day_off === true)
                }).map((el, i) => {
                    if (el.length > 0) {
                        day.push(i + 1)
                    }
                })
                setAvailableDateState(day)

            })
        }
    }, [data?.doctor_id])


    useEffect(() => {
        if (data?.appointment_date) {
            postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, data?.doctor_id + "/" + data?.clinic_id, {
                service: data?.service_type,
                date: data?.appointment_date.format('YYYY-MM-DD')
            }).then((responce) => {

                setAvailableTimesState(responce.map((el) => {
                    return {
                        label: 'Break Time',
                        options: el.map((el1) => {
                            return {
                                lebel: el1,
                                value: el1
                            }
                        })
                    }
                }))
            })
        }

    }, [data?.booked_at, data?.doctor_id])


    const onFinish = (values) => {
        values.dob = values.dob.format('YYYY-MM-DD')
        values.booked_at = values.booked_at.format('YYYY-MM-DD')
        setSaveLoading(true)
        setData((prevState) => ({
            ...prevState,
            ...values
        }))

        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }

            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }


    const handleValuesChange = (e, v) => {
        setData((prevState) => ({
            ...prevState,
            ...e
        }))
        if (e.patient_id) {
            const foundUser = fetchedUsers.current?.find(i => i.id === e?.patient_id);
            formRef.current?.setFieldsValue({
                first: foundUser?.first,
                last: foundUser?.last,
                phone_country_code: foundUser?.phone_country_code,
                phone_number: foundUser?.phone_number,
                email: foundUser?.email,
                country_id: foundUser?.country_id,
                dob: dayjs(foundUser.dob),
                gender: foundUser?.gender,
                nationality_number: foundUser?.nationality_number,
                status: foundUser?.status,
                bio: foundUser?.bio


            })
        }
        setChangeValuesState(e)

    }

    const handleMapItems = (item, name) => {
        name = item.phone_code ? `${item.phone_code} ` : null
        item.id = +item.phone_code
        return [name, item]
    }
    const disabledDate = (current) => {
        return current.add(1, 'day') < dayjs().endOf('date') || current.add(-3, 'month') > dayjs().endOf('date') || current.add(1, 'day') < dayjs().day(1) || availableDateState.includes(current.day())
    };


    const searchByNumber = (item, name, patientData) => {

        fetchedUsers.current = patientData
        name = <>{item.phone_number}{" "}{item.email}</>
        let searchData = item.phone_number+item.email;
        return [name, item,searchData]


    }


    return (
        <div>
            <h3 className={'create_apdate_btns'}>{t(`Add new Appointment`)}</h3>
            {loading ? <Preloader/> : <Form
                onValuesChange={handleValuesChange}
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div>
                    <div>


                        <div>
                            <div className={'add_edit_content'}>
                                <div className="gutter-row">
                                    <FormInput label={t('Select Patient (Search By phone number)')} name={'patient_id'}
                                               inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               resourceParams={{test: 1}}
                                               searchConfigs={{minLength: 4}}
                                               initialValue={null}
                                               inputProps={{

                                                   notFoundContent:<div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}><div>Not found</div><Button type={'secondary'} style={{border:"none"}}>Create new</Button> </div>
                                               }}
                                               extra={<div style={{marginTop:10}}>Or <Button size={'large'} onClick={()=>{

                                                   formRef.current.resetFields(['patient_id','first'])
                                                   setData((prevState)=>({
                                                       ...prevState,
                                                       patient_id:0
                                                   }))
                                               }} type={'primary'}>Create new one</Button></div>}
                                               initialData={[]}
                                               handleMapItems={(item, name, patientData) => searchByNumber(item, name, patientData)}
                                               customSearchKey={'phone_number'}
                                               resource={'User'}/>
                                </div>

                            </div>
                            {
                                data?.patient_id || data?.patient_id === 0 ? <div>
                                    <div className={'add_edit_content'}>

                                        <div>
                                            <Row>
                                                <Col lg={6} className="gutter-row">
                                                    <FormInput label={t('Country Code')} name={'phone_country_code'}
                                                               inputType={'resourceSelect'}
                                                               rules={[{required: true}]}
                                                               initialValue={formRef.current.getFieldValue('phone_country_code')}
                                                               handleMapItems={handleMapItems}
                                                               disabled={data?.patient_id}
                                                               resource={'Country'}/>
                                                </Col>
                                                <Col lg={18} className="gutter-row">
                                                    <FormInput label={t('Phone number')}
                                                               inputDisabled={data?.patient_id} name={'phone_number'}

                                                               rules={[{required: true}]}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12} className="gutter-row">
                                                    <FormInput label={t('First Name')} inputDisabled={data?.patient_id}
                                                               name={'first'}

                                                               rules={[{required: true}]}/>
                                                    <FormInput label={t('Last Name')} inputDisabled={data?.patient_id}
                                                               name={'last'}

                                                               rules={[{required: true}]}/>
                                                    <FormInput label={t('Email')} inputDisabled={data?.patient_id}
                                                               name={'email'}

                                                               rules={[{required: true}]}/>
                                                    <FormInput label={'Password'} inputDisabled={data?.patient_id}
                                                               name={'password'} initialValue={''}
                                                               rules={[{required: !data?.patient_id}]}/>

                                                    <FormInput label={'Password Confirmation'}
                                                               inputDisabled={data?.patient_id} initialValue={''}
                                                               name={'password_confirmation'}
                                                               rules={[{required: !data?.patient_id}]}/>

                                                    <FormInput label={t('Country')} name={'country_id'}
                                                               inputType={'resourceSelect'}
                                                               initialValue={formRef.current.getFieldValue('country_id')}
                                                               rules={[{required: !data?.patient_id}]}
                                                               disabled={data?.patient_id}
                                                               resource={'Country'}/>
                                                </Col>
                                                <Col lg={12} className="gutter-row">

                                                    <FormInput label={t('Date of Birth')} name={'dob'}
                                                               inputDisabled={data?.patient_id}
                                                               initialValue={formRef.current.getFieldValue('dob')}
                                                               inputType={'date'} rules={[
                                                        {required: !data?.patient_id},
                                                        // {
                                                        //     validator:(rule,value)=>{
                                                        //         if(dayjs().diff(value,'year')<18){
                                                        //             return Promise.reject('min age 18')
                                                        //         }
                                                        //         return Promise.resolve();
                                                        //     }
                                                        // }
                                                    ]}/>
                                                    <FormInput label={t('Gender')} name={'gender'}
                                                               disabled={data?.patient_id}
                                                               inputType={'resourceSelect'}
                                                               initialValue={formRef.current.getFieldValue('gender')}
                                                               initialData={Resources?.Gender}
                                                               rules={[{required: !data?.patient_id}]}/>

                                                    <FormInput label={t('Nationality Number')}
                                                               inputDisabled={data?.patient_id}
                                                               name={["nationality_number"]}
                                                               rules={[{required: !data?.patient_id}]}/>

                                                    <FormInput label={t('Status')} disabled={data?.patient_id}
                                                               name={'status'} inputType={'resourceSelect'}
                                                               rules={[{required: !data?.patient_id}]}
                                                               initialValue={formRef.current.getFieldValue('status')}
                                                               initialData={Resources.Status}
                                                    />
                                                    <FormInput label={t('Bio')} inputDisabled={data?.patient_id}
                                                               name={'bio'} inputType={'textArea'}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>

                                    </div>


                                    <div className={'add_edit_content'}>

                                        <Row>
                                            <Col lg={24} className="gutter-row">
                                                <FormInput label={t('Clinic')} name={'clinic_id'}
                                                           inputType={'resourceSelect'}
                                                           rules={[{required: true}]}
                                                           resourceParams={{test: 1}}
                                                           initialValue={null}
                                                           initialData={[]}
                                                           resource={'Clinic'}/>
                                            </Col>
                                            {
                                                data?.clinic_id ? <Col lg={24} className="gutter-row">
                                                    {
                                                        load ? <Preloader/> :
                                                            <FormInput label={t('Service Type')} name={'service_type'}
                                                                       inputType={'resourceSelect'}
                                                                       rules={[{required: true}]}
                                                                       initialValue={null}
                                                                       initialData={serviceTypeState}/>
                                                    }


                                                </Col> : <div></div>
                                            }
                                        </Row>
                                        {
                                            data?.service_type === 'telehealth' || data?.service_type === 'clinic_visit' || data?.service_type === 'home_visit' ?
                                                <Row>
                                                    <Col lg={12} className="gutter-row">
                                                        <FormInput label={t('Specialties')} name={'specialty_id'}
                                                                   inputType={'resourceSelect'}
                                                                   rules={[{required: true}]}
                                                                   initialValue={null}
                                                                   initialData={[]}
                                                                   resource={'Taxonomy'}
                                                                   resourceParams={{
                                                                       type: Resources.TaxonomyTypes.SPECIALTY,
                                                                       has_parent: 0
                                                                   }}
                                                        />
                                                    </Col>
                                                    <Col lg={12} className="gutter-row">
                                                        {
                                                            load ? <Preloader/> :
                                                                <FormInput label={t('Doctor')} name={'doctor_id'}
                                                                           inputType={'resourceSelect'}
                                                                           rules={[{required: true}]}
                                                                           handleMapItems={(item, name) => {
                                                                               item.id = item.doctor?.id
                                                                               return [name, item]
                                                                           }}
                                                                           disabled={!data.specialty_id && true}
                                                                           resourceParams={{
                                                                               specialty: data.specialty_id,
                                                                               clinic: data.clinic_id
                                                                           }}
                                                                           initialValue={null}
                                                                           resource={'ClinicDoctor'}
                                                                           initialData={[]}/>
                                                        }

                                                    </Col>

                                                </Row> : data?.service_type === 'physical_therapy_home_visit' || data?.service_type === 'physical_therapy_clinic_visit' ?
                                                    <Row>
                                                        <Col lg={12} className="gutter-row">
                                                            <div></div>
                                                        </Col>
                                                        <Col lg={12} className="gutter-row">
                                                            <FormInput label={t('Doctor')} name={'doctor_id'}
                                                                       inputType={'resourceSelect'}
                                                                       rules={[{required: true}]}
                                                                       handleMapItems={(item, name) => {
                                                                           item.id = item.doctor?.id
                                                                           return [name, item]
                                                                       }}
                                                                       resourceParams={{
                                                                           specialty: data.specialty_id,
                                                                           clinic: data.clinic_id
                                                                       }}
                                                                       initialValue={null}
                                                                       resource={'ClinicDoctor'}
                                                                       initialData={[]}/>
                                                        </Col>

                                                    </Row> : data?.service_type === 'laboratory_home_visit' || data?.service_type === 'laboratory_clinic_visit' ?
                                                        <Row>
                                                            <Col lg={12} className="gutter-row">
                                                                <FormInput label={t('Lab Tests')}
                                                                           name={'lab_test_id'}
                                                                           rules={[{required: true}]}
                                                                           inputType={'resourceSelect'}
                                                                           resource={'LabTest'}/>
                                                            </Col>
                                                            <Col lg={12} className="gutter-row">
                                                                <FormInput label={t('Lab Packages')}
                                                                           name={'lab_package_id'}
                                                                           rules={[{required: true}]}
                                                                           inputType={'resourceSelect'}
                                                                           resource={'LabPackage'}/>
                                                            </Col>
                                                        </Row> : data?.service_type === 'nursing' ? <Row>
                                                            <Col lg={24} className="gutter-row">
                                                                <FormInput label={t('Nursing tasks')}
                                                                           name={'nursing_tasks'}
                                                                           inputProps={{mode: 'multiple'}}
                                                                           rules={[{required: true}]}
                                                                           inputType={'resourceSelect'}
                                                                           resource={'NursingTask'}/>
                                                            </Col>
                                                        </Row> : <div></div>
                                        }


                                        <Row>
                                            <Col lg={12} className="gutter-row">
                                                <FormInput label={t('Appointment date')}
                                                           disabledDate={disabledDate}
                                                           name={'booked_at'}
                                                           inputType={'date'}
                                                           rules={[{required: true}]}
                                                />
                                            </Col>
                                            <Col lg={12} className="gutter-row">
                                                {
                                                    data?.booked_at ? <FormInput label={t('Appointment time')}
                                                                                        name={'appointment_time'}
                                                                                        inputType={'resourceSelect'}
                                                                                        options={availableTimeState}
                                                                                        initialData={[]}
                                                    /> : <div></div>
                                                }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} className="gutter-row">
                                                <FormInput label={t('Offer (Optional)')} name={'offer_id'}
                                                           inputType={'resourceSelect'}
                                                           initialValue={null}
                                                           initialData={[]}
                                                           resource={'Offer'}/>
                                            </Col>
                                            <Col lg={12} className="gutter-row">
                                                <FormInput label={t('File Number')} name={'file_number'}
                                                           rules={[{required: false}]}/>
                                            </Col>

                                        </Row>
                                        <div className="gutter-row">
                                            <FormInput label={t('Description')} name={'description'}
                                                       inputType={'textArea'} initialValue={data?.description}/>
                                        </div>
                                        <div className="gutter-row">
                                            <FileManager text1={'Select or drag files'}
                                                         text2={'+'}
                                                         name={'gallery'}
                                                         uploadIcon={<InboxOutlined/>}
                                                         initialFileList={[data?.gallery]} limit={5} formRef={formRef}
                                                         type={'drag'}/>
                                        </div>
                                        <FormInput label={t('Folder id')} name={'folder_id'}
                                                   rules={[{required: false}]}/>

                                    </div>
                                </div> : <div></div>
                            }


                        </div>

                    </div>

                </div>


                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}

export default Appointment;
