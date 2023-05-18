import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import Resources from "../../../../../../store/Resources";
import {Button, Form} from "antd";
import {useSelector} from "react-redux";
import {getServiceTypes} from "../../../../../../functions";
import DateTimeSelect from "./DateTimeSelect";
import {createResource} from "../../../../../Functions/api_calls";

function DoctorReworkedCalendarDrawer({setOpen,setDate}) {
    const authRedux = useSelector((state) => state?.auth);
    let token = useSelector((state) => state.auth.token);
    const formRef = useRef();

    const [bookedAtState, setBookedAtState] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [serviceTypeState, setServiceTypeState] = useState({});
    const onNewAppointment = (values) => {
        setLoading(true)
        values.doctor_id = authRedux?.user?.id
        values.booked_at = bookedAtState+' '+values.booked_time;

        createResource('Appointment', values, token).then((response) => {
            if (response?.id) {
                setOpen(false)
                setLoading(false)
                setDate(prevState=>({
                    ...prevState
                }))
            }

        }).finally(() => {

        })
    }




    return(
        <div>
            <Form
                onFinish={onNewAppointment}
                ref={formRef}
                onValuesChange={(e)=>{

                  if(e.clinic_id){
                      setFormData(e)
                } if(e.service_type){
                      setServiceTypeState(e)
                    }
                }}

            >
                <FormInput label={t('Select Patient')} name={'patient_id'}
                           inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={null}
                           initialData={[]}
                           customSearchKey={'name_or_phone'}
                           resource={'User'}/>


                <FormInput label={t('Clinic')} name={'clinic_id'}
                           inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={null}
                           initialData={authRedux?.clinics}
                />
                {formData.clinic_id?<FormInput label={t('Service Type')} name={'service_type'}
                           inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={null}
                    initialData={getServiceTypes(authRedux?.clinics.find(e=>e.id===formData.clinic_id)?.services)}
                />:null}
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

                <DateTimeSelect setBookedAtState={setBookedAtState} bookedAtState={bookedAtState} formData={formData} serviceTypeState={serviceTypeState}/>

                <div style={{paddingTop:20}}>
                    <Button loading={loading} className={'btn_add_entry'} htmlType={'submit'} type={'primary'}>Add Entry</Button>
                </div>
                <div style={{paddingTop:10}}>
                    <Button className={'btn_cancel_drawer'} htmlType={'submit'}  type={'secondary'}>Cancel</Button>
                </div>
            </Form>

        </div>
    )
}
export default DoctorReworkedCalendarDrawer;