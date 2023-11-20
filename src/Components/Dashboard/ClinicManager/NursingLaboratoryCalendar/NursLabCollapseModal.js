import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {postResource} from "../../../Functions/api_calls";
import dayjs from "dayjs";
import Preloader from "../../../Preloader";
import {Avatar, Button, Drawer, Form, Input, Radio, Space} from "antd";
import Resources from "../../../../store/Resources";
import {t} from "i18next";
import {UserOutlined} from "@ant-design/icons";
import FormInput from "../../../Fragments/FormInput";
import {getServiceTypes} from "../../../../functions";
import clinic_man_user_icon from "../../../../dist/icons/clinic_man_user_icon.png";
import ClinicManagerCalendarDrawerSmall
    from "../Fragments/ClinicManagerCalendar/Fragments/ClinicManagerCalendarDrawerSmall";
import ClinicManagerCalendarDrawerLarge
    from "../Fragments/ClinicManagerCalendar/Fragments/ClinicManagerCalendarDrawerLarge";
import NursLabDrawerSmall from "./NursLabDrawerSmall";
import NursLabDrawerLarge from "./NursLabDrawerLarge";

function NursLabCollapseModal({setDate,item, specialty, selectedDate, clinicID, speciality_id, clinic,setSelectedDate, setUpdate}) {
    let language = useSelector((state) => state?.app?.current_locale);
    let statusCode = useSelector((state) => state?.statusCode);
    //const {doctor} = docItem;
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [finishLoading, setFinishLoading] = useState(false);
    const [size, setSize] = useState();
    const [times, setTimes] = useState([]);
    const [noTimes, setNoTimes] = useState(false);
    const [data, setData] = useState({});
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    let inputRef_1 = useRef();
    let inputRef_2 = useRef();
    let inputRef_3 = useRef();
    let inputRef_4 = useRef();
    const [inputValues, setInputValues] = useState(['', '', '', '']);
    const [codeAndPhone, setCodeAndPhone] = useState({
        phone_country_code: null,
        phone_number: null
    });
    const [sendCodeState, setSendCodeState] = useState(false);
    const [overAllState, setOverAllState] = useState('');
    const [verifyPatient, setVerifyPatient] = useState({});
    const [servisTypeAndTime, setServisTypeAndTime] = useState({});
    const [loading403, setLoading403] = useState(false);





    useEffect(() => {

        if(item.service){

                setLoading(true)
                postResource('Clinic', 'ClinicsAvailableTimes', token, clinicID, {
                    date: selectedDate,
                    service: item?.service,
                }).then(response => {
                    setLoading(false)
                    setTimes(response.flat())
                    setNoTimes(response)


                })

            // else {
            //     setLoading(true)
            //     postResource('ClinicDoctorAvailableTimeForDayByDoctorAndClinic', 'single', token, item?.doctor.id + "/" + clinicID, {
            //         service: data.service_type,
            //         date: selectedDate
            //     }).then(response => {
            //         setLoading(false)
            //         setTimes(response.flat())
            //         setNoTimes(response)
            //     })
            // }

        }

    }, [selectedDate,data.service_type])



    const openDrawer = () => {
        formRef?.current?.validateFields(['time', 'service_type', 'lab_test_id', 'lab_package_id', 'nursing_tasks']).then(e => {
            setOpen(true);
            setSize('default');
        }).catch((c) => {

        })

    }

    const openLargeDrawer = () => {
        setOpen(true);
        setSize('large');
    }

    const searchByNumber = (item, name) => {

        if(item?.name === null) {
            name = <div  style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px'}}>
                <div>Registered | App</div>
                <div>{codeAndPhone?.phone_country_code} {codeAndPhone?.phone_number}</div>
            </div>
            let searchData = item.phone_number + item.email;
            return [name, item, searchData]
        } else {

            name = <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px'}}>
                <div>{item.first} {item.last}</div>
                <div>+{item.phone_country_code}{item.phone_number}</div>
            </div>
            let searchData = item.phone_number + item.email;
            return [name, item, searchData]
        }


    }






    const handleCreateAppointment = (values, additional) => {
        setFinishLoading(true)

        postResource('Appointment', 'create', token, '', {
            ...values,
            ...(additional ?? {}),
            ...data,
            speciality_id,
            service_type: item?.service,
            clinic_id: clinicID,
            //doctor_id: doctor.id,
            booked_at: dayjs(selectedDate + ' ' + values.time).format('YYYY-MM-DD HH:mm')

        }).then(e => {
            if(e.id){
                setOpen(false)
                setSize(false)
                setFinishLoading(false)
                setSelectedDate(false)
                setDate((prevState)=>prevState)
                setUpdate((prevState) =>prevState+1)
            }

        }).finally(()=>{
            setFinishLoading(false)
        })

    }



    const handleCreateNewApp = (values) => {
        setLoading403(true)

        postResource('Appointment', 'create', token, '', {
            ...data,
            patient_id: verifyPatient?.patient?.id,
            service_type: item?.service,
            specialty_id: speciality_id,
            clinic_id: clinicID,
            //doctor_id: doctor.id,
            booked_at: dayjs(selectedDate + ' ' + servisTypeAndTime?.time).format('YYYY-MM-DD HH:mm')

        }).then(e => {
            if(e.id){
                setOpen(false)
                setSize(false)
                setLoading403(false)
                setSelectedDate(false)
                setDate((prevState)=>prevState)
                setUpdate((prevState) =>prevState+1)
            }

        }).finally(()=>{
            setLoading403(false)
        })

    }

    const handleMapItems = (item, name) => {
        name = item.phone_code ? `(${item.phone_code}) ${item.name}` : null
        item.id = item.phone_code
        return [name, item]
    }

    const numInput = (e, i) => {
        let myVal = e.target.value;
        let myRefs = [inputRef_1,inputRef_2,inputRef_3,inputRef_4];
        inputValues[i-1] = myVal;
        if(i < 4 && myVal !== ''){
            inputValues[i] = '';
        }
        setInputValues([...inputValues]);

        if(i < 4 && myVal !== '') {
            myRefs[i].current.focus();
        }
        let overAll = inputValues.every((val)=>{
            return val !== '';
        });
        if(overAll){

        }

        setOverAllState(overAll)



    }



    const onSendCode = () => {
        formRef?.current?.validateFields(['time', 'service_type', 'lab_test_id', 'lab_package_id', 'nursing_tasks']).then(e => {
            setLoading(true)
            postResource('PatientsVerificationCode', 'PatientsPhoneVerify', token, '', codeAndPhone).then((response) => {

                setLoading(false)
                setSendCodeState(true)
            })
        }).catch((c) => {

        })

    }

    const onVerify = () => {
        setLoading(true)
        let verifyString = ''+inputValues[0]+inputValues[1]+inputValues[2]+inputValues[3]


        postResource('PatientsVerificationCode', 'PatientCodeVerify', token, '', {
            phone_country_code: codeAndPhone?.phone_country_code,
            phone_number: codeAndPhone?.phone_number,
            clinic_id: clinicID,
            code: verifyString
        }).then((response) => {
            setVerifyPatient(response)
            setLoading(false)
            setSendCodeState(true)

        })

    }
    const onRadioChange = (e) => {

        setServisTypeAndTime(prevState => ({
            ...prevState,
            time: e?.target?.value
        }))
    }



    return (
        <div className={language === 'ar' ? 'clinic_manager_modal_big_div' : 'clinic_manager_modal_big_div_en'}>
            {
                !selectedDate ? <Preloader/> : <Form ref={formRef} onValuesChange={(e, v) => setData(v)} onFinish={handleCreateAppointment}>
                    <Space >
                        <h1 className={'cl_manager_calendar_modal_head'}>{dayjs(selectedDate).format('DD MMMM')}</h1>
                        <h1 style={{fontSize: 24, fontWeight: 300}}>{Resources.Days[dayjs(selectedDate).day()]}</h1>
                    </Space>
                    <div>
                        {loading ? <Preloader/> : times.length?<Form.Item name={'time'} rules={[
                            {
                                required: true,
                            }
                        ]
                        }>
                            <Radio.Group
                                onChange={onRadioChange}
                                className={'hours_select_cl_manager_modal'}
                                options={times.map(e => ({
                                    label: dayjs('2023-10-10' + e).format('h:mmA'),
                                    value: e
                                }))}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Form.Item>: <div></div>}
                        {
                            noTimes[0]?.length < 1 || noTimes?.length < 1 ? <div align={'center'} style={{width:'100%', fontSize: 20, marginTop:20, marginBottom: 20, fontWeight: 500, color: '#F3A632'}}>{t('There are no available times')}</div> :
                                <div></div>
                        }
                    </div>
                    {/*<div >*/}
                    {/*    <Space>*/}
                    {/*        <Avatar size={56} src={doctor?.avatar?.url} icon={<UserOutlined/>}/>*/}
                    {/*        <div style={{display: "block"}}>*/}
                    {/*            <div className={'cl_manager_modal_dr_name'}>{doctor.first} {doctor.last}</div>*/}
                    {/*            <div className={'cl_manager_modal_stecialty_name'}>{specialty}</div>*/}
                    {/*        </div>*/}
                    {/*    </Space>*/}
                    {/*</div>*/}


                            {/*<FormInput label={t('Service Type')} name={'service_type'}*/}
                            {/*           inputType={'resourceSelect'}*/}
                            {/*           rules={[{required: true}]}*/}
                            {/*           initialValue={null}*/}
                            {/*           inputProps={{*/}
                            {/*               onChange:(e)=> setServisTypeAndTime(prevState => ({*/}
                            {/*                   ...prevState,*/}
                            {/*                   service_type: e*/}
                            {/*               }))*/}
                            {/*           }}*/}
                            {/*           initialData={getServiceTypes(clinic.services).filter((el) => {*/}
                            {/*               return el.id !== 'laboratory_clinic_visit' && el.id !== 'nursing' && el.id !== 'laboratory_home_visit'*/}
                            {/*           })}/>*/}

                            <Form.Item name={'specialty_id'} hidden={true} initialValue={speciality_id}/>

                                {
                                    item?.service === 'nursing' ? <FormInput label={t('Nursing tasks')}
                                                                             disableClear={true}
                                                                             name={'nursing_tasks'}
                                                                             inputProps={{mode: 'multiple'}}
                                                                             rules={[{required: true}]}
                                                                             resourceParams={{
                                                                                 clinic: clinicID
                                                                             }}

                                                                             inputType={'resourceSelect'}
                                                                             resource={'NursingTask'}
                                    /> : <div>
                                        <FormInput label={t('Lab Tests')}
                                                   disableClear={true}
                                                   name={'lab_test_id'}
                                                   rules={[{required: true}]}
                                                   inputType={'resourceSelect'}
                                                   resourceParams={{
                                                       clinic: clinicID
                                                   }}


                                                   resource={'LabTest'}/>

                                        <FormInput label={t('Lab Packages')}
                                                   disableClear={true}
                                                   name={'lab_package_id'}
                                                   rules={[{required: true}]}
                                                   inputType={'resourceSelect'}
                                                   resourceParams={{
                                                       clinic: clinicID
                                                   }}

                                                   resource={'LabPackage'}/>
                                    </div>
                                }

                    {
                        !sendCodeState ? <div  style={{marginTop: 20}}>
                            <FormInput label={t('Country Code')} name={'phone_country_code'}
                                       inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.appointment?.patient?.phone_country_code}
                                       handleMapItems={handleMapItems}
                                       customSearchKey={'phone_code'}
                                       inputProps={{
                                           onChange:(e)=> setCodeAndPhone(prevState => ({
                                               ...prevState,
                                               phone_country_code: e
                                           }))
                                       }}
                                       resource={'Country'}/>

                            <FormInput label={t('Select Patient (Search By phone number)')} name={'patient_id'}
                                       suffixIcon={<img src={clinic_man_user_icon} alt={'clinic_man_user_icon'} />}
                                       inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       searchConfigs={{minLength: 4}}
                                       initialValue={null}
                                       disabled={!data?.phone_country_code}


                                       inputProps={{
                                           // onChange:(e, data)=> setCodeAndPhone(prevState => ({
                                           //     ...prevState,
                                           //     phone_number: data[0]?.phone_number
                                           // })),
                                           onSearch: (e)=> setCodeAndPhone(prevState => ({
                                               ...prevState,
                                               phone_number: e
                                           })),

                                           notFoundContent:  <div
                                               style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                               <div>{t('Not found')}</div>
                                               <Button type={'secondary'} style={{border: "none"}}  onClick={openDrawer}>{t('Create new')}</Button></div>
                                       }}
                                       resourceParams={{
                                           phone_country_code: data?.phone_country_code,
                                           clinic_id: clinicID
                                       }}
                                       initialData={[]}
                                       handleMapItems={(item, name, status) => searchByNumber(item, name, status)}
                                       handleStatus={true}
                                       customSearchKey={'phone_number'}

                                       resource={'PatientSearch'}/>

                        </div> : <div></div>
                    }




                    {statusCode !== 403 ? data?.patient_id && data?.time && <Button type={'primary'} htmlType={'submit'}
                                                                                    loading={finishLoading}
                                                                                    style={{width: '100%', height: '44px'}}>{t("Book")}</Button> : <div></div>}


                    {
                        statusCode === 403 ? !sendCodeState ? data?.patient_id && data?.time && <Button type={'primary'}
                                                                                                        onClick={onSendCode}
                                                                                                        loading={loading}
                                                                                                        style={{width: '100%', height: '44px', fontSize: 16, fontWeight: 700}}>{t("Send request")}</Button> : <div></div> : <div></div>
                    }




                </Form>

            }

            <div>

                {
                    sendCodeState ? verifyPatient?.patient ? <div style={{marginTop: 24}}>
                        <Space>
                            <Avatar size={56} src={''} icon={<UserOutlined/>}/>
                            <div style={{display: "block"}}>
                                <div className={'cl_manager_modal_dr_name'}>{verifyPatient?.patient?.first} {verifyPatient?.patient?.last}</div>
                                <div className={'cl_manager_modal_stecialty_name'}>{verifyPatient?.patient?.email}</div>
                                <div className={'cl_manager_modal_stecialty_name'}>{verifyPatient?.patient?.phone_country_code} {verifyPatient?.patient?.phone_number}</div>
                            </div>
                        </Space>
                        <Button onClick={handleCreateNewApp} loading={loading403} type={'primary'} htmlType={'submit'} style={{width: '100%', height: '44px', marginTop:24}}>{t("Book")}</Button>
                    </div> : <Form className={"verify_form"}>

                        <div style={{backgroundColor: '#774D9B', marginTop:36, borderRadius: 4, padding: 12, color: '#ffffff', fontWeight: 400, fontSize: 14}}>
                            {t('This user already registered in KLINIKA system. App sent request for permissions to personal \n' +
                                '                            information. Please enter code from user or wait when user accept your request in app')}

                        </div>
                        <div style={{display: 'flex', justifyContent: "center", gap: 16, width: '100%', marginTop: 24}}>
                            <Input value={inputValues[0]} ref={inputRef_1} className={'clinic_manager_verify_inputs'} onInput={(e)=>numInput(e, 1)} maxLength={1} name='code'   required/>
                            <Input value={inputValues[1]} ref={inputRef_2} className={'clinic_manager_verify_inputs'} maxLength={1} onInput={(e)=>numInput(e, 2)} name='code' required/>
                            <Input value={inputValues[2]} ref={inputRef_3} className={'clinic_manager_verify_inputs'} maxLength={1} onInput={(e)=>numInput(e, 3)} name='code'  required/>
                            <Input value={inputValues[3]} ref={inputRef_4} className={'clinic_manager_verify_inputs'}  name='code' maxLength={1} onInput={(e)=>numInput(e, 4)}  required/>

                        </div>
                        <div style={{ marginTop: 24}}>
                            {t("Client didn't get a message")}? <span onClick={onSendCode} style={{color: '#BF539E', fontWeight: 700, cursor: 'pointer'}}>{t('Resend')}</span>
                        </div>
                        {
                            overAllState ? <Button style={{width: '100%', marginTop:24}} type={'primary'} onClick={onVerify}>{t('Verify')}</Button> : <div></div>
                        }

                        <Button style={{width: '100%', marginTop:5}} type={'secondary'} onClick={() => setSelectedDate(false)}>{t('Cancel')}</Button>

                    </Form> : <div></div>
                }




            </div>


            <Drawer size={size} title={t("Add User")} placement="right" onClose={() => setOpen(false)} open={open}>
                {
                    size === "default" ?
                        <NursLabDrawerSmall setData={setData} data={data}  specialty={specialty}
                                                          handleCreateAppointment={handleCreateAppointment}
                                                          openLargeDrawer={openLargeDrawer} setOpen={setOpen}/> :
                        <NursLabDrawerLarge setData={setData} data={data}  specialty={specialty}
                                                          handleCreateAppointment={handleCreateAppointment}
                                                          setOpen={setOpen} openDrawer={openDrawer}/>
                }


            </Drawer>

        </div>
    )
}

export default NursLabCollapseModal;