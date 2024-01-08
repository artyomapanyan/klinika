import {useNavigate, useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    createResource,
    postResource,
    useGetResourceSingle
} from "../../Functions/api_calls";
import {Button, Form, Space, Row, Col, Spin} from "antd";
import {t} from "i18next";
import Preloader from "../../Preloader";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import dayjs from 'dayjs';
import CancelComponent from "../../Fragments/CancelComponent";


const resource = 'Appointment';


function Appointment({isPatient}) {
    let dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    const phoneNumberRef = useRef();
    let token = useSelector((state) => state.auth.token);
    let role = useSelector((state) => state.auth.selected_role?.key);
    let language = useSelector((state) => state.app.current_locale)





    const {loadingState, dataState} = useGetResourceSingle(!isPatient ? resource : 'Patient', params.id,{},isPatient ?(data)=>{
        setTimeout(()=>{
            handleValuesChange({patient_id:data.id})
        },500)
        return data
    }:null)
    const {data, setData} = dataState;
    const {loading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [load, setLoad] = useState(false)
    const [timesLoading,setTimesLoading] = useState(false)

    const [serviceTypeState, setServiceTypeState] = useState([])
    const [availableTimeState, setAvailableTimesState] = useState([])
    const [availableDateState, setAvailableDateState] = useState([])
    const [searchCeys, setSearchCeys] = useState('')


    const [lo, setLo] = useState(false)
    const [startDay, setStartDay] = useState(dayjs())




    const [changeValuesState, setChangeValuesState] = useState({})
    const [offerState, setOfferState] = useState([])
    const [offerLoading, setOfferLoading] = useState(false)

    const fetchedUsers = useRef([]);



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
        if (data?.doctor_id && data?.clinic_id) {
            setTimesLoading(true)
            postResource('ClinicDoctorWorkingHours', 'single', token, data?.doctor_id+'/'+data?.clinic_id, {service: data?.service_type}).then(responses => {
                const res = responses?.working_hours
                let day = [];
                // Object.values(res)?.map((el, i) => {
                //     return el.filter((el1) => el1.is_day_off === true)
                // }).map((el, i) => {
                //     if (el.length > 0) {
                //         day.push(i)
                //     }
                // })
                Object.keys(res)?.forEach((key) => {
                    if(res[key][0]?.is_day_off){
                        day.push(key)
                    }
                })

                setAvailableDateState(day)
                setTimesLoading(false)
            })
        }
    }, [ data?.doctor_id])


    useEffect(() => {

        if (data?.clinic_id && data?.service_type === 'nursing') {
            setTimesLoading(true)
            postResource('Clinic','WorkingHours',token, +data?.clinic_id,{service:'nursing'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setTimesLoading(false)
            })
        }
        if (data?.clinic_id && data?.service_type === "laboratory_clinic_visit") {
            setTimesLoading(true)
            postResource('Clinic','WorkingHours',token, +data?.clinic_id,{service:'laboratory_clinic_visit'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setTimesLoading(false)
            })
        }
        if (data?.clinic_id && data?.service_type === "laboratory_home_visit") {
            setTimesLoading(true)
            postResource('Clinic','WorkingHours',token, +data?.clinic_id,{service:'laboratory_home_visit'}).then(response => {
                let day = [];

                Object.keys(response)?.forEach((key) => {
                    if(response[key][0]?.is_day_off){
                        day.push(key)
                    }
                })
                setAvailableDateState(day)
                setTimesLoading(false)
            })
        }

    }, [data?.doctor_id, data?.service_type])




    useEffect(() => {

        if(data?.booked_at  && data?.doctor_id ){
            setTimesLoading(true)
            postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, data?.doctor_id + "/" + data?.clinic_id, {
                service: data?.service_type,
                date: data?.booked_at?.format('YYYY-MM-DD')
            }).then((responce) => {
                if(responce) {
                    setAvailableTimesState(responce?.map((el) => {
                        return {
                            label: el?.length > 0 ? 'Break Time' : '',
                            options: el?.map((el1) => {
                                return {
                                    lebel: el1,
                                    value: el1
                                }
                            })
                        }
                    }))
                }


                setTimesLoading(false)
            })
        }
        if(data?.booked_at) {
            if(['nursing','laboratory_clinic_visit','laboratory_home_visit'].includes(data?.service_type)) {
                postResource('Clinic', 'ClinicsAvailableTimes', token, data?.clinic_id, {
                    date: data?.booked_at?.format('YYYY-MM-DD'),
                    service: data?.service_type,
                }).then((res) => {

                    if(res) {
                        setAvailableTimesState(res?.map((el) => {
                            return {
                                label: el?.length > 0 ? 'Break Time' : '',
                                options: el?.map((el1) => {
                                    return {
                                        lebel: el1,
                                        value: el1
                                    }
                                })
                            }
                        }))
                    }


                })
            }
        }




    }, [data?.booked_at, data?.doctor_id])



    const onFinish = (values) => {
        if(values.patient_id){
            delete values.patient;
            delete values?.dob
        } else {
            values.dob = values.patient.dob.format('YYYY-MM-DD')
        }

        values.booked_at = values.booked_at.format('YYYY-MM-DD') + ' ' + values.appointment_time



        if(values?.patient?.phone_country_code) {
            if(values.patient.phone_country_code.length > 3) {
                values.patient.phone_country_code = values?.patient?.phone_country_code?.slice(values?.patient.phone_country_code.indexOf('(')+1, values?.patient.phone_country_code?.indexOf(')'))
            }
        }
        setSaveLoading(true)

        if(values?.lab_packages) {
            values.lab_packages = [values.lab_packages]

        }

        // if (params.id) {
        //     updateResource(resource, params.id, values, token).then(response => {
        //         if (response?.id) {
        //             navigate(-1)
        //         }
        //     }).finally(() => {
        //         dispatch({
        //             type: 'DASHBOARD_STATE',
        //             payload: false
        //         })
        //         setSaveLoading(false)
        //     })
        // } else {
        createResource(resource, values, token).then((response) => {
            if (response?.id) {
                navigate(-1)
            }

        }).finally(() => {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: false
            })
            setSaveLoading(false)
        })

    }


    const handleValuesChange = (e, v) => {

        setData((prevState) => ({
            ...prevState,
            ...e
        }))
        if (e.patient_id) {
            const foundUser = fetchedUsers.current?.find(i => i.id === e?.patient_id);
            formRef.current?.setFieldsValue({
                patient:{
                    first: foundUser?.first,
                    last: foundUser?.last,
                    phone_country_code: foundUser?.phone_country_code,
                    phone_number: foundUser?.phone_number,
                    email: foundUser?.email,
                    country_id: foundUser?.nationality?.id,
                    nationality: foundUser?.nationality,
                    dob: dayjs(foundUser?.dob?.iso_string),
                    gender: foundUser?.gender,
                    nationality_number: foundUser?.nationality_number,
                    status: foundUser?.status,
                    bio: foundUser?.bio
                }



            })
        }
        setChangeValuesState(e)
        if(Object.keys(e).length > 0) {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: true
            })
        }
        //setLo(true)
        //setTimeout(() => {setLo(false)},500)

    }



    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(${item.phone_code}) ${item.name}`:null
        item.id = item.phone_code
        return [name,item]
    }

    useEffect(() => {
        if(data?.doctor_id && data?.clinic_id && data?.service_type) {
            postResource('AvailableDayByDoctorAndClinic', 'single', token, data?.doctor_id + "/" + data?.clinic_id, {
                service: data?.service_type,
            }).then((response) => {
                setStartDay(response?.date)
            })
        }

    }, [data?.doctor_id])

    const disabledDate = (current) => {

        return current.add(1, 'day') <= dayjs().endOf('date') || current.add(-3, 'month') > dayjs().endOf('date') || current.add(1, 'day') < dayjs(startDay).day(1) || availableDateState.includes(dayjs(current).format('dddd').toLowerCase())
    };


    const searchByNumber = (item, name, patientData) => {
        fetchedUsers.current = patientData
        name = <>{item?.phone_number}{" "}{item?.email}</>
        let searchData = item?.phone_number+item?.email;
        return [name, item,searchData]


    }

    useEffect(() => {

        if(data?.booked_at) {
            setOfferLoading(true)
            postResource('Offer', 'list', token, null, {
                clinic: data?.clinic_id,
                status: 2,
                approved: 1,
                doctor: data?.doctor_id,
                for_date: data?.booked_at ? dayjs(data?.booked_at)?.format('YYYY-MM-DD') : dayjs()?.format('YYYY-MM-DD')

            }).then((response) => {

                setOfferState(response?.items?.map((el) => {
                    return {
                        id: el?.id,
                        title: el?.title
                    }
                }))
                setOfferLoading(false)
            })
        }

    }, [data?.booked_at])



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
                                    {/*<FormInput label={t('Select Patient (Search By phone number)')} name={'patient_id'}*/}
                                    {/*           inputType={'resourceSelect'}*/}
                                    {/*           //rules={[{required: true}]}*/}
                                    {/*           searchConfigs={{minLength: 1}}*/}
                                    {/*           initialValue={null}*/}



                                    {/*           initialData={[]}*/}
                                    {/*           //handleMapItems={(item, name, patientData) => searchByNumber(item, name, patientData)}*/}
                                    {/*           customSearchKey={'full_phone_number'}*/}
                                    {/*           resource={'User'}/>*/}
                                    <FormInput label={t('Select Patient (Search By phone number)')} name={'patient_id'}
                                               searchConfigs={{minLength: 5}}
                                               inputType={'resourceSelect'}

                                               resource={role === 'doctor' ? 'Patient' : 'User'}
                                               resourceParams={{
                                                   type: role === 'doctor' ? 'patients' : 'User',
                                               }}
                                               inputProps={{
                                                   onSearch:e=>{
                                                       setSearchCeys(e)
                                                       return phoneNumberRef.current = e
                                                   },
                                                   onChange:e=>{
                                                       setLo(true)
                                                       setTimeout(() => {setLo(false)},500)
                                                   },

                                                   notFoundContent:<div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                                       {
                                                           searchCeys?.length < 5 ? <div>{t('Not found')}</div> : <div>{t('Number didnt find in the system. Please enter correct phone number.')}</div>
                                                       }

                                                       <Button onClick={()=>{
                                                           formRef.current.resetFields(['patient_id','first'])
                                                           setData((prevState)=>({
                                                               ...prevState,
                                                               patient_id:0
                                                           }))


                                                       }}
                                                               type={'secondary'} style={{border:"none"}}>{t('Create new')}</Button> </div>


                                               }}
                                               handleMapItems={(item, name, patientData) => searchByNumber(item, name, patientData)}
                                               customSearchKey={'full_phone_number'}
                                               initialValue={dataState.data.id}
                                               initialData={isPatient?[dataState.data]:[]}
                                               //disabled={data?.patient_id}

                                    />
                                </div>

                            </div>
                            {
                                data?.patient_id || data?.patient_id === 0 || data?.id ? <div>
                                    {
                                        lo ? <Preloader/> : <div className={'add_edit_content'}>

                                            <div>
                                                <Row>
                                                    <Col lg={6} className="gutter-row">
                                                        <FormInput label={t('Country Code')} name={['patient','phone_country_code']}
                                                                   inputType={'resourceSelect'}
                                                                   rules={[{required: true}]}
                                                                   initialValue={formRef?.current?.getFieldValue(['patient','phone_country_code']) ? formRef?.current?.getFieldValue(['patient','phone_country_code']) : `(966) ${language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}`}
                                                                   handleMapItems={handleMapItems}
                                                                   disabled={data?.patient_id}
                                                                   customSearchKey={'phone_code'}
                                                                   resource={'Country'}/>
                                                    </Col>
                                                    <Col lg={18} className="gutter-row">
                                                        <FormInput label={t('Phone number')}
                                                                   inputDisabled={data?.patient_id}
                                                                   name={['patient','phone_number']}
                                                                   maxLength={10}
                                                                   initialValue={data?.patient_id ? formRef?.current?.getFieldValue(['patient','phone_number']) : phoneNumberRef?.current}

                                                                   rules={[{required: true}]}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={12} className="gutter-row">
                                                        <FormInput label={t('First Name')} inputDisabled={data?.patient_id}
                                                                   name={['patient','first']}

                                                                   rules={[{required: true}]}/>
                                                        <FormInput label={t('Last Name')} inputDisabled={data?.patient_id}
                                                                   name={['patient','last']}

                                                                   rules={[{required: true}]}/>
                                                        <FormInput label={t('Email')} inputDisabled={data?.patient_id}
                                                                   name={['patient','email']}

                                                                   rules={[{required: true}]}/>
                                                        <FormInput label={'Password'} inputDisabled={data?.patient_id}
                                                                   name={['patient','password']} initialValue={''}
                                                                   rules={[{required: !data?.patient_id}]}/>

                                                        <FormInput label={'Password Confirmation'}
                                                                   inputDisabled={data?.patient_id} initialValue={''}
                                                                   name={['patient','password_confirmation']}
                                                                   rules={[{required: !data?.patient_id}]}/>

                                                        <FormInput label={t('Nationality')} name={['patient','country_id']}
                                                                   inputType={'resourceSelect'}
                                                                   initialValue={formRef?.current?.getFieldValue(['patient','nationality', 'id'])}
                                                                   rules={[{required: !data?.patient_id}]}
                                                                   disabled={data?.patient_id}
                                                                   initialData={formRef?.current?.getFieldValue(['patient','nationality']) ? [formRef?.current?.getFieldValue(['patient','nationality'])] : []}
                                                                   resource={'Country'}/>



                                                    </Col>
                                                    <Col lg={12} className="gutter-row">

                                                        <FormInput label={t('Date of Birth')} name={['patient','dob']}
                                                                   inputDisabled={data?.patient_id}
                                                                   initialValue={formRef?.current?.getFieldValue(['patient','dob'])}
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
                                                        <FormInput label={t('Gender')} name={['patient','gender']}
                                                                   disabled={data?.patient_id}
                                                                   inputType={'resourceSelect'}
                                                                   initialValue={formRef?.current?.getFieldValue(['patient','gender'])}
                                                                   initialData={Resources?.Gender}
                                                                   rules={[{required: !data?.patient_id}]}/>

                                                        <FormInput label={t('Nationality Number')}
                                                                   inputDisabled={data?.patient_id}
                                                                   name={['patient',"nationality_number"]}
                                                        />

                                                        <FormInput label={t('Status')} disabled={data?.patient_id}
                                                                   name={['patient','status']} inputType={'resourceSelect'}
                                                                   rules={[{required: !data?.patient_id}]}
                                                                   initialValue={formRef?.current?.getFieldValue(['patient','status'])}
                                                                   initialData={Resources.Status}
                                                        />
                                                        <FormInput label={t('Bio')} inputDisabled={data?.patient_id}
                                                                   name={['patient','bio']} inputType={'textArea'}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>

                                        </div>
                                    }



                                    <div className={'add_edit_content'}>

                                        <Row>
                                            <Col lg={24} className="gutter-row">
                                                <FormInput label={t('Clinic')} name={'clinic_id'}
                                                           inputType={'resourceSelect'}
                                                           rules={[{required: true}]}
                                                           initialValue={null}
                                                           initialData={[data?.clinic].filter(e=>e)}
                                                           inputProps={{
                                                               onChange:(e,dat)=> {

                                                                   setData((prevState)=>({
                                                                       ...prevState,
                                                                       specialty_id:null,
                                                                       doctor_id: null,
                                                                       booked_at: null,
                                                                       appointment_time: null,
                                                                       service_type: null,
                                                                       offer_id: null

                                                                   }))

                                                                   formRef?.current?.setFieldsValue({
                                                                       specialty_id:null,
                                                                       doctor_id: null,
                                                                       booked_at: null,
                                                                       appointment_time: null,
                                                                       service_type: null,
                                                                       offer_id: null
                                                                   })

                                                               }
                                                           }}
                                                           resourceParams={{
                                                               active:1
                                                           }}
                                                           resource={'Clinic'}/>
                                            </Col>
                                            {
                                                data?.clinic_id ? <Col lg={24} className="gutter-row">
                                                    {
                                                        load ? <Preloader/> :
                                                            <FormInput label={t('Service Type')} name={'service_type'}
                                                                       inputType={'resourceSelect'}
                                                                       rules={[{required: true}]}
                                                                       inputProps={{
                                                                           onChange:(e,data)=> {
                                                                               formRef?.current?.setFieldsValue({
                                                                                   specialty_id:null,
                                                                                   doctor_id: null,
                                                                                   booked_at: null,
                                                                                   appointment_time: null,
                                                                                   lab_tests: undefined,
                                                                                   lab_packages: null,
                                                                                   offer_id: null,
                                                                                   nursing_tasks: undefined,
                                                                                   service_type: e

                                                                               })
                                                                               setData((prevState)=>({
                                                                                   ...prevState,
                                                                                   specialty_id:null,
                                                                                   doctor_id: null,
                                                                                   booked_at: null,
                                                                                   appointment_time: null,
                                                                                   lab_tests: null,
                                                                                   lab_packages: null,
                                                                                   offer_id: null,
                                                                                   nursing_tasks: null,
                                                                                   service_type: e

                                                                               }))

                                                                           }
                                                                       }}
                                                                       initialValue={null}
                                                                       initialData={serviceTypeState}/>
                                                    }


                                                </Col> : <div></div>
                                            }
                                        </Row>
                                        <Row>
                                            {
                                              data.service_type === 'home_visit' || data.service_type ==='physical_therapy_home_visit' ||
                                              data.service_type === 'laboratory_home_visit' || data.service_type ==='nursing'?
                                                <Col lg={12} className="gutter-row">
                                                    <FormInput label={t('Address')} name={'address1'} rules={[{required: true}]}/>
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
                                                                   inputProps={{
                                                                       onChange:(e,data)=> {
                                                                           formRef?.current?.setFieldsValue({
                                                                               doctor_id: null,
                                                                               booked_at: null,
                                                                               appointment_time: null,
                                                                               offer_id: null

                                                                           })
                                                                           setData((prevState)=>({
                                                                               ...prevState,
                                                                               doctor_id: null,
                                                                               booked_at: null,
                                                                               appointment_time: null,
                                                                               offer_id: null

                                                                           }))

                                                                       }
                                                                   }}
                                                                   resource={'Taxonomy'}
                                                                   customSearchKey={'title'}
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
                                                                               item.id = item?.doctor?.id
                                                                               return [name, item]
                                                                           }}
                                                                           inputProps={{
                                                                               onChange:(e,data)=> {
                                                                                   formRef?.current?.setFieldsValue({
                                                                                       booked_at: null,
                                                                                       appointment_time: null,
                                                                                       offer_id: null

                                                                                   })
                                                                                   setData((prevState)=>({
                                                                                       ...prevState,
                                                                                       booked_at: null,
                                                                                       appointment_time: null,
                                                                                       offer_id: null

                                                                                   }))

                                                                               }
                                                                           }}
                                                                           disabled={!data.specialty_id && true}
                                                                           resourceParams={{
                                                                               specialty: data?.specialty_id,
                                                                               clinic: data?.clinic_id,
                                                                               is_approved: 1,
                                                                               no_specialty: 1,
                                                                               service_type: data?.service_type === 'physical_therapy_home_visit' || data?.service_type === 'physical_therapy_clinic_visit' ? null : data?.service_type
                                                                           }}
                                                                           customSearchKey={'name'}
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
                                                                           //specialty: data.specialty_id,
                                                                           clinic: data.clinic_id,
                                                                           is_approved: 1,
                                                                           no_specialty: 2

                                                                       }}
                                                                       inputProps={{
                                                                           onChange:(e,data)=> {
                                                                               formRef?.current?.setFieldsValue({
                                                                                   booked_at: null,
                                                                                   appointment_time: null,
                                                                                   offer_id: null

                                                                               })
                                                                               setData((prevState)=>({
                                                                                   ...prevState,
                                                                                   booked_at: null,
                                                                                   appointment_time: null,
                                                                                   offer_id: null

                                                                               }))

                                                                           }
                                                                       }}
                                                                       initialValue={null}
                                                                       resource={'ClinicDoctor'}
                                                                       initialData={[]}/>
                                                        </Col>

                                                    </Row> : data?.service_type === 'laboratory_home_visit' || data?.service_type === 'laboratory_clinic_visit' ?
                                                        <Row>
                                                            <Col lg={12} className="gutter-row">
                                                                <FormInput label={t('Lab Tests')}
                                                                           inputProps={{
                                                                               mode: 'multiple',
                                                                               onChange:(e,data)=> {
                                                                                   formRef?.current?.setFieldsValue({
                                                                                       booked_at: null,
                                                                                       appointment_time: null,
                                                                                       offer_id: null

                                                                                   })
                                                                                   setData((prevState)=>({
                                                                                       ...prevState,
                                                                                       booked_at: null,
                                                                                       appointment_time: null,
                                                                                       offer_id: null

                                                                                   }))

                                                                               }
                                                                           }}
                                                                           name={'lab_tests'}
                                                                           rules={[
                                                                               {
                                                                                   required: !data?.lab_packages && !data?.lab_packages?.length,
                                                                                   message: 'Please enter Lab test or Lab package'
                                                                               },
                                                                           ]}
                                                                           inputType={'resourceSelect'}
                                                                           resourceParams={{
                                                                               clinic: data.clinic_id
                                                                           }}

                                                                           resource={'LabTest'}/>
                                                            </Col>
                                                            <Col lg={12} className="gutter-row">
                                                                <FormInput label={t('Lab Packages')}
                                                                           name={'lab_packages'}
                                                                           rules={[{
                                                                               required: !data?.lab_tests || !data?.lab_tests?.length,
                                                                               message: 'Please enter Lab test or Lab package'
                                                                           }]}
                                                                           inputType={'resourceSelect'}
                                                                           resourceParams={{
                                                                               clinic: data.clinic_id
                                                                           }}
                                                                           inputProps={{
                                                                               onChange:(e,data)=> {
                                                                                   formRef?.current?.setFieldsValue({
                                                                                       booked_at: null,
                                                                                       appointment_time: null,
                                                                                       offer_id: null

                                                                                   })
                                                                                   setData((prevState)=>({
                                                                                       ...prevState,
                                                                                       booked_at: null,
                                                                                       appointment_time: null,
                                                                                       offer_id: null

                                                                                   }))

                                                                               }
                                                                           }}
                                                                           resource={'LabPackage'}/>
                                                            </Col>
                                                        </Row> : data?.service_type === 'nursing' ? <Row>
                                                            <Col lg={24} className="gutter-row">
                                                                <FormInput label={t('Nursing tasks')}
                                                                           name={'nursing_tasks'}
                                                                           inputProps={{
                                                                               mode: 'multiple',
                                                                               onChange:(e,data)=> {
                                                                                   formRef?.current?.setFieldsValue({
                                                                                       booked_at: null,
                                                                                       appointment_time: null,
                                                                                   })
                                                                                   setData((prevState)=>({
                                                                                       ...prevState,
                                                                                       booked_at: null,
                                                                                       appointment_time: null,
                                                                                   }))

                                                                               }
                                                                }}
                                                                           rules={[{required: true}]}
                                                                           resourceParams={{
                                                                               clinic: data.clinic_id,
                                                                               status: 2
                                                                           }}
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
                                                           inputProps={{
                                                               onChange:(e,data)=> {
                                                                   formRef?.current?.setFieldsValue({
                                                                       appointment_time: null,
                                                                       offer_id: null

                                                                   })
                                                                   setData((prevState)=>({
                                                                       ...prevState,
                                                                       appointment_time: null,
                                                                       offer_id: null

                                                                   }))

                                                               }
                                                           }}
                                                           rules={[{required: true}]}
                                                />
                                            </Col>
                                            <Col lg={12} className="gutter-row">
                                                {
                                                    data?.booked_at ?<Spin spinning={timesLoading}> <FormInput label={t('Appointment time')}
                                                                                        name={'appointment_time'}
                                                                                        inputType={'resourceSelect'}
                                                                                        options={availableTimeState}
                                                                                        rules={[{required: true}]}
                                                                                        initialData={[]}
                                                    /></Spin> : <div></div>
                                                }
                                            </Col>
                                        </Row>
                                        {
                                            data?.service_type === "clinic_visit" || data?.service_type === "physical_therapy_clinic_visit" || data?.service_type === "laboratory_clinic_visit" ?

                                                <Row>
                                                    <Col lg={12} className="gutter-row">
                                                        {
                                                            offerLoading ? <Preloader small={10}/> : <FormInput label={t('Offer (Optional)')} name={'offer_id'}
                                                                                                                       disabled={data?.service_type === "laboratory_clinic_visit" ? !data?.clinic_id || !data?.booked_at : !data?.clinic_id || !data?.doctor_id || !data?.booked_at}
                                                                                                                       inputType={'resourceSelect'}
                                                                                                                       initialValue={null}
                                                                                                                       initialData={offerState}
                                                                // resourceParams={{
                                                                //     clinic: data?.clinic_id,
                                                                //     status: 2,
                                                                //     approved: 1,
                                                                //     doctor: data?.doctor_id,
                                                                //     for_date: data?.booked_at ? dayjs(data?.booked_at)?.format('YYYY-MM-DD') : dayjs()?.format('YYYY-MM-DD')
                                                                //
                                                                // }}
                                                                // resource={'Offer'}
                                                            />
                                                        }

                                                    </Col>
                                                </Row> : <div></div>
                                        }
                                        {/*data?.service_type === "clinic_visit" || data?.service_type === "physical_therapy_clinic_visit" || data?.service_type === "laboratory_clinic_visit"*/}
                                        <div className="gutter-row">
                                            <FormInput label={t('Description')} name={'description'}
                                                       inputType={'textArea'} initialValue={data?.description}/>
                                        </div>
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
