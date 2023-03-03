import {useNavigate, useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {createResource, postResource, useGetResourceIndex, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import {Button, Form, Space, Row, Col, Popconfirm} from "antd";
import {t} from "i18next";
import Preloader from "../../Preloader";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import {InboxOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import FileManager from "../../Fragments/FileManager";
import dayjs from 'dayjs';


const resource = 'Appointment';

const dateOptions = [

    {
        id: "00:00",
        name: '00:00',
    },
    {
        id: "00:30",
        name: '00:30',
    },
    {
        id: "01:00",
        name: '01:00',
    },
    {
        id: "01:30",
        name: '01:30',
    },
    {
        id: "02:00",
        name: '02:00',
    },
    {
        id: "02:30",
        name: '02:30',
    },
    {
        id: "03:00",
        name: '03:00',
    },
    {
        id: "03:30",
        name: '03:30',
    },
    {
        id: "04:00",
        name: '04:00',
    },
    {
        id: "04:30",
        name: '04:30',
    },
    {
        id: "05:00",
        name: '05:00',
    },
    {
        id: "05:30",
        name: '05:30',
    },
    {
        id: "06:00",
        name: '06:00',
    },
    {
        id: "06:30",
        name: '06:30',
    },
    {
        id: "07:00",
        name: '07:00',
    },
    {
        id: "07:30",
        name: '07:30',
    },
    {
        id: "08:00",
        name: '08:00',
    },
    {
        id: "08:30",
        name: '08:30',
    },
    {
        id: "09:00",
        name: '09:00',
    },
    {
        id: "09:30",
        name: '09:30',
    },
    {
        id: "10:00",
        name: '10:00',
    },
    {
        id: "10:30",
        name: '10:30',
    },
    {
        id: "11:00",
        name: '11:00',
    },
    {
        id: "11:30",
        name: '11:30',
    },
    {
        id: "12:00",
        name: '12:00',
    },
    {
        id: "12:30",
        name: '12:30',
    },
    {
        id: "13:00",
        name: '13:00',
    },
    {
        id: "13:30",
        name: '13:30',
    },
    {
        id: "14:00",
        name: '14:00',
    },
    {
        id: "14:30",
        name: '14:30',
    },
    {
        id: "15:00",
        name: '15:00',
    },
    {
        id: "15:30",
        name: '15:30',
    },
    {
        id: "16:00",
        name: '16:00',
    },
    {
        id: "16:30",
        name: '16:30',
    },
    {
        id: "17:00",
        name: '17:00',
    },
    {
        id: "17:30",
        name: '17:30',
    },
    {
        id: "18:00",
        name: '18:00',
    },
    {
        id: "18:30",
        name: '18:30',
    },
    {
        id: "19:00",
        name: '19:00',
    },
    {
        id: "19:30",
        name: '19:30',
    },
    {
        id: "20:00",
        name: '20:00',
    },
    {
        id: "20:30",
        name: '20:30',
    },
    {
        id: "21:00",
        name: '21:00',
    },
    {
        id: "21:30",
        name: '21:30',
    },
    {
        id: "22:00",
        name: '22:00',
    },
    {
        id: "22:30",
        name: '22:30',
    },
    {
        id: "23:00",
        name: '23:00',
    },
    {
        id: "23:30",
        name: '23:30',
    },

    {
        id: "23:59",
        name: '23:59',
    },
]

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



    useEffect(()=>{
        setLoad(true)
        if( data?.clinic_id){

            postResource('Clinic','single', token, data?.clinic_id).then(responses => {

                setServiceTypeState([
                    {
                        service: responses?.has_telehealth_service,
                        id: 'has_telehealth_service',
                        name: "Telehealth",
                    },
                    {
                        service: responses?.has_clinic_visit_service,
                        id: 'has_clinic_visit_service',
                        name: 'Clinic Visit',
                    },
                    {
                        service: responses?.has_home_visit_service,
                        id: 'has_home_visit_service',
                        name: 'Home Visit',
                    },
                    {
                        service: responses?.has_physical_therapy_home_visit_service,
                        id: 'has_physical_therapy_home_visit_service',
                        name: 'Physical Therapy Home Visit',
                    },
                    {
                        service: responses?.has_physical_therapy_clinic_visit_service,
                        id: 'has_physical_therapy_clinic_visit_service',
                        name: 'Physical Therapy Clinic Visit',
                    },
                    {
                        service: responses?.has_laboratory_home_visit_service,
                        id: 'has_laboratory_home_visit_service',
                        name: 'Laboratory Home Visit'
                    },
                    {
                        service: responses?.has_nursing_service,
                        id: 'has_nursing_service',
                        name: 'Nursing'
                    },
                    {
                        service: responses?.has_laboratory_clinic_visit_service,
                        id: 'has_laboratory_clinic_visit_service',
                        name: 'Laboratory Clinic Visit'
                    }
                ].filter(el => el.service === true))

                setLoad(false)
            })
        }
    },[data?.clinic_id])


/*
    useEffect(() => {
        setLoad(true)
        postResource('ClinicDoctor','list', token, null, {per_page:5000} ).then(responses => {

            setClinicDoctorsState(
                responses?.items?.filter((el) => {
                return el?.clinic?.id === data?.clinic_id && el?.specialty_ids?.includes(data?.specialty_id)
            }))
            setDoctorState(clinicDoctorsState.map((el) => {
                return{
                    name: el?.doctor?.first,
                    id: el?.id
                }
            }))

            setLoad(false)

        })
    }, [data?.specialty_id])
*/




    const onFinish = (values) => {
        values.dob = values.dob.format('YYYY-MM-DD')
        values.plid_expired_at = values.plid_expired_at.format('YYYY-MM-DD')
        values.appointment_date = values.appointment_date.format('YYYY-MM-DD')
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))

            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        }


    const handleValuesChange = (e,v)=>{
        setData((prevState)=>({
            ...prevState,
            ...e
        }))
    }

    const handleMapItems = (item,name)=>{
        name = item.phone_code?`${item.phone_code} `:null
        item.id = +item.phone_code
        return [name,item]
    }
    const disabledDate = (current) => {
        console.log(dayjs().weekday(0))

        return current.add(1,'day') < dayjs().endOf('date') && current.add(-3,'month') > dayjs().endOf('date');
    };





    return(
        <div >
            {data?.name ? <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Editing Doctor - ${data?.name}`)}</h3> : <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Add new Clinic`)}</h3>}
            {loading ? <Preloader/> : <Form
                onValuesChange={handleValuesChange}
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div>
                        <div className={'add_edit_content'}>

                            <div className="gutter-row">
                                <FormInput  label={t('Select Patient (Search By phone number)')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                            </div>
                            <div>
                                    <Row>
                                        <Col lg={6} className="gutter-row">
                                            <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                                       rules={[{required: true}]}
                                                       initialValue={null}
                                                       handleMapItems={handleMapItems}
                                                       resource={'Country'}/>
                                        </Col>
                                        <Col lg={18} className="gutter-row">
                                            <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12} className="gutter-row">
                                            <FormInput label={t('First Name')} name={'first'} rules={[{required: true}]} />
                                            <FormInput label={t('Last Name')} name={'last'} rules={[{required: true}]} />
                                            <FormInput label={t('Email')} name={'email'} rules={[{required: true}]}/>
                                            <FormInput label={'Password'} name={'password'} initialValue={''} rules={[{required: !data?.id}]} />
                                            <FormInput label={'Password Confirmation'} name={'password_confirmation'} />
                                        </Col>
                                        <Col lg={12} className="gutter-row">

                                            <FormInput label={t('Date of Birth')} name={'dob'}  inputType={'date'} rules={[{required: true}]} />
                                            <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'} initialData={Resources?.Gender} rules={[{required: true}]}/>
                                            <FormInput  label={t('Nationality Number')} name={["nationality_number"]} rules={[{required: true}]}/>
                                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                                       rules={[{required: true}]}
                                                       initialValue={data?.status}
                                                       initialData={Resources.Status}
                                            />
                                            <FormInput label={t('Bio')} name={'bio'} inputType={'textArea'} initialValue={data?.description}/>
                                        </Col>
                                    </Row>
                                    <div className={'add_edit_content'}>


                                        <Row>
                                            <Col lg={12} className="gutter-row">
                                                <FormInput label={t('Plid')} name={'plid'} rules={[
                                                    {
                                                        required: true,
                                                        len:11
                                                    },

                                                ]} />

                                            </Col>
                                            <Col lg={12} className="gutter-row">
                                                <FormInput label={t('Plid expired at')} name={'plid_expired_at'}  inputType={'date'} rules={[{required: true}]} />
                                                <FormInput inputProps={{mode:'multiple'}} label={t('Sub Specialties')} name={'sub_specialties'} inputType={'resourceSelect'}
                                                           rules={[{required: true}]}
                                                           initialValue={data?.sub_specialties?.map(e=>e.id)}
                                                           initialData={data?.sub_specialties??[]}
                                                           resource={'Taxonomy'}
                                                           resourceParams={{type:Resources.TaxonomyTypes.SPECIALTY,has_parent:1}}
                                                />
                                                <FormInput inputProps={{mode:'multiple'}} label={t('languages')} name={'languages'} inputType={'resourceSelect'}
                                                           rules={[{required: true}]}
                                                           initialValue={data?.languages?.map(e=>e.id)}
                                                           initialData={data?.languages??[]}
                                                           resource={'Country'}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={'add_edit_content'}>







                                        <Row>
                                            <Col lg={24} className="gutter-row">
                                                <FormInput label={t('Clinic')} name={'clinic_id'} inputType={'resourceSelect'}
                                                           rules={[{required: true}]}
                                                           resourceParams={{test:1}}
                                                           initialValue={null}
                                                           initialData={[]}
                                                           resource={'Clinic'}/>
                                            </Col>
                                            {
                                                data?.clinic_id ? <Col lg={24} className="gutter-row">
                                                        {
                                                            load ? <Preloader /> : <FormInput label={t('Service Type')} name={'service_type'} inputType={'resourceSelect'}
                                                                                              rules={[{required: true}]}
                                                                                              initialValue={null}
                                                                                              initialData={serviceTypeState}/>
                                                        }


                                                </Col> : <div></div>
                                            }
                                        </Row>
                                        {
                                            data?.service_type === 'has_telehealth_service' || data?.service_type === 'has_clinic_visit_service' || data?.service_type === 'has_home_visit_service' ? <Row>
                                                <Col lg={12} className="gutter-row">
                                                    <FormInput label={t('Specialties')} name={'specialty_id'}
                                                               inputType={'resourceSelect'}
                                                               rules={[{required: true}]}
                                                               initialValue={null}
                                                               initialData={[]}
                                                               resource={'Taxonomy'}
                                                               resourceParams={{type:Resources.TaxonomyTypes.SPECIALTY,has_parent:0}}
                                                    />
                                                </Col>
                                                <Col lg={12} className="gutter-row">
                                                    {
                                                        load ? <Preloader /> : <FormInput label={t('Doctor')} name={'doctor_id'} inputType={'resourceSelect'}
                                                                                          rules={[{required: true}]}
                                                                                          handleMapItems={(item,name)=>{
                                                                                              item.id = item.doctor?.id
                                                                                              return [name,item]
                                                                                          }}
                                                                                          disabled={!data.specialty_id && true}
                                                                                          resourceParams={{specialty:data.specialty_id,clinic:data.clinic_id}}
                                                                                          initialValue={null}
                                                                                          resource={'ClinicDoctor'}
                                                                                          initialData={[]}/>
                                                    }

                                                </Col>

                                            </Row> : data?.service_type === 'has_physical_therapy_home_visit_service' || data?.service_type === 'has_physical_therapy_clinic_visit_service' ? <Row>
                                                <Col lg={12} className="gutter-row">
                                                    <div></div>
                                                </Col>
                                                <Col lg={12} className="gutter-row">
                                                    <FormInput label={t('Doctor')} name={'doctor_id'} inputType={'resourceSelect'}
                                                               rules={[{required: true}]}
                                                               handleMapItems={(item,name)=>{
                                                                   item.id = item.doctor?.id
                                                                   return [name,item]
                                                               }}
                                                               resourceParams={{specialty:data.specialty_id,clinic:data.clinic_id}}
                                                               initialValue={null}
                                                               resource={'ClinicDoctor'}
                                                               initialData={[]}/>
                                                </Col>

                                            </Row> : data?.service_type === 'has_laboratory_home_visit_service' || data?.service_type === 'has_laboratory_clinic_visit_service' ? <Row>
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
                                            </Row> : data?.service_type === 'has_nursing_service' ? <Row>
                                                <Col lg={24} className="gutter-row">
                                                    <FormInput label={t('Nursing tasks')}
                                                               name={'nursing_task_id'}
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
                                                           name={'appointment_date'}
                                                           inputType={'date'}
                                                           rules={[{required: true}]}
                                                />
                                            </Col>
                                            <Col lg={12} className="gutter-row">
                                                {
                                                    data?.appointment_date ? <FormInput label={t('Appointment time')}
                                                                                        name={'appointment_time'}
                                                                                        rules={[{required: true}]}
                                                                                        inputType={'resourceSelect'}
                                                                                        initialData={dateOptions}
                                                                                        /> : <div></div>
                                                }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} className="gutter-row">
                                                <FormInput label={t('Offer (Optional)')} name={'offer_id'} inputType={'resourceSelect'}
                                                           initialValue={null}
                                                           initialData={[]}
                                                           resource={'Offer'}/>
                                            </Col>
                                            <Col lg={12} className="gutter-row">
                                                <FormInput label={t('File Number')} name={'file_number'} rules={[{required: true}]} />
                                            </Col>

                                        </Row>
                                        <div className="gutter-row">
                                            <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                                        </div>
                                        <div className="gutter-row">
                                            <FileManager text1={'Select or drag files'}
                                                         text2={'+'}
                                                         name={'gallery'}
                                                         uploadIcon={<InboxOutlined/>}
                                                         initialFileList={[data?.gallery]} limit={5} formRef={formRef} type={'drag'}/>
                                        </div>

                                    </div>
                                </div>

                        </div>

                </div>


                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Popconfirm
                        title={t("Your hours will not be protected")}
                        onConfirm={() => navigate(resourceLinks[resource]) }
                        okText={t("Yes")}
                        cancelText={t("No")}
                        icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                        <Button size={'large'} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                    </Popconfirm>
                </Space>
            </Form>}
        </div>
    )
}
export default Appointment;
