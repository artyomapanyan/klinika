import React, {useEffect, useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import Resources from "../../../../../../store/Resources";
import {Button, Form} from "antd";
import {useSelector} from "react-redux";
import {getServiceTypes} from "../../../../../../functions";
import DateTimeSelect from "./DateTimeSelect";
import {createResource} from "../../../../../Functions/api_calls";

function DoctorReworkedCalendarDrawer({setOpen, patient=true, patientId, dataClinic}) {
    const authRedux = useSelector((state) => state?.auth);
    const lng = useSelector((state) => state?.app?.current_locale);
    let token = useSelector((state) => state.auth.token);
    let role = useSelector((state) => state.auth.selected_role.key);
    const formRef = useRef();

    const [bookedAtState, setBookedAtState] = useState('');
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({});
    const [date, setDate1] = useState(null)



    const onNewAppointment = (values) => {
        setLoading(true)
        //values.doctor_id = role === 'doctor' ? authRedux?.user?.id : dataClinic.doctor.id
        values.booked_at = bookedAtState+' '+values.booked_time;
        if(values?.patient_id){
            values.patient_id = values?.patient_id
        } else {
            values.patient_id = patientId
        }
        if(role === 'doctor') {
            values.doctor_id = authRedux?.user?.id
        } else {
            values.doctor_id = dataClinic.doctor.id
        }


        createResource('Appointment', values, token).then((response) => {
            if (response?.id) {
                setOpen(false)
                setLoading(false)

            }

        }).finally(() => {

        })
    }

    const onCancel = () => {
        setOpen(false)
    }

    const searchByNumber = (item, name) => {
        name = <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px'}}>
            <div>{item.first} {item.last}</div>
            <div>+{item.phone_country_code}{item.phone_number}</div>
        </div>
        let searchData = item.phone_number + item.email;
        return [name, item, searchData]
    }

    useEffect(() => {

    }, [])


    return(
        <div className={lng === 'ar' ? 'dr_reworked_calendar_drawer_form' : ''}>
            <Form
                onFinish={onNewAppointment}
                ref={formRef}
                onValuesChange={(e)=>{
                      setFormState((prevState)=>({
                          ...prevState,
                          ...e
                      }))
                }}

            >
                {
                    patient ? <FormInput label={t('Select Patient (Search By phone number)')} name={'patient_id'}
                                         inputType={'resourceSelect'}
                                         rules={[{required: true}]}
                                         initialValue={null}
                                         searchConfigs={{minLength: 3}}
                        // inputProps={{
                        //     notFoundContent: <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        //         <div>Not found</div>
                        //     </div>
                        // }}
                                         resourceParams={{
                                             type: 'patient',

                                         }}
                                         initialData={[]}
                                         handleMapItems={(item, name, patientData) => searchByNumber(item, name, patientData)}
                                         customSearchKey={'full_phone_number'}
                                         resource={'Patient'}/> : <div></div>
                }



                <FormInput label={t('Clinic')} name={'clinic_id'}
                           inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={null}
                           initialData={role === 'doctor' ? authRedux?.clinics : [dataClinic?.clinic]}

                />
                {formState?.clinic_id?<FormInput label={t('Service Type')} name={'service_type'}
                           inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={null}
                    initialData={role === 'doctor' ? getServiceTypes(authRedux?.clinics?.find(e=>e.id===formState?.clinic_id)?.services) : getServiceTypes([dataClinic?.clinic]?.find(e=>e.id===formState?.clinic_id)?.services)}
                />:null}
                {
                    formState?.service_type === 'nursing' ? <FormInput label={t('Nursing tasks')}
                name={'nursing_tasks'}
                inputProps={{mode: 'multiple'}}
                rules={[{required: true}]}
                resourceParams={{
                    clinic: formState.clinic_id
                }}
                inputType={'resourceSelect'}
                resource={'NursingTask'}/> : formState?.service_type === 'laboratory_home_visit' || formState?.service_type === 'laboratory_clinic_visit' ? <div>

                            <FormInput label={t('Lab Tests')}
                                       name={'lab_test_id'}
                                       rules={[{required: true}]}
                                       inputType={'resourceSelect'}
                                       resourceParams={{
                                           clinic: formState.clinic_id
                                       }}
                                       resource={'LabTest'}/>

                            <FormInput label={t('Lab Packages')}
                                       name={'lab_package_id'}
                                       rules={[{required: true}]}
                                       inputType={'resourceSelect'}
                                       resourceParams={{
                                           clinic: formState.clinic_id
                                       }}
                                       resource={'LabPackage'}/>

                        </div> : <FormInput label={t('Specialties')} name={'specialty_id'}
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
                }


                <DateTimeSelect formState={formState} setBookedAtState={setBookedAtState} bookedAtState={bookedAtState} date={date} setDate1={setDate1} dataClinic={dataClinic}/>

                <div style={{paddingTop:20}}>
                    <Button disabled={!formState.booked_time || !date} loading={loading} className={'btn_add_entry'} htmlType={'submit'} type={'primary'}>{t('Add Entry')}</Button>
                </div>
                <div style={{paddingTop:10}}>
                    <Button className={'btn_cancel_drawer'} onClick={onCancel} type={'secondary'}>{t('Cancel')}</Button>
                </div>
            </Form>

        </div>
    )
}
export default DoctorReworkedCalendarDrawer;