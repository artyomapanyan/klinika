import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import Resources from "../../../../../../store/Resources";
import {Button, Form, Space, Tag} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import arrow_right_white from "../../../../../../dist/icons/arrow_right_white.png";
import {useSelector} from "react-redux";
import {getServiceTypes, GMBK} from "../../../../../../functions";
import DateTimeSelect from "./DateTimeSelect";
import {createResource} from "../../../../../Functions/api_calls";
import resourceLinks from "../../../../../ResourceLinks";

function DoctorReworkedCalendarDrawer() {
    const authRedux = useSelector((state) => state?.auth);
    let token = useSelector((state) => state.auth.token);
    const formRef = useRef();

    const [bookedAtState, setBookedAtState] = useState('');

    let drFormRef = formRef?.current?.getFieldValue()

    const onNewAppointment = (values) => {
        values.doctor_id = authRedux?.user?.id
        values.booked_at = bookedAtState+' '+values.booked_time;
        console.log(values, 'val')
        createResource('Appointment', values, token).then((response) => {
            if (response?.id) {

            }

        }).finally(() => {

        })
    }




    return(
        <div>
            <Form
                onFinish={onNewAppointment}
                ref={formRef}

            >
                <FormInput label={t('Select Patient')} name={'patient_id'}
                           inputType={'resourceSelect'}
                          // rules={[{required: true}]}
                           initialValue={null}
                           // inputProps={{
                           //     notFoundContent: <div
                           //         style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                           //         <div>Not found</div>
                           //         <Button type={'secondary'} style={{border: "none"}} onClick={openDrawer}>Create
                           //             new</Button></div>
                           // }}
                           initialData={[]}
                          // handleMapItems={(item, name, patientData) => searchByNumber(item, name)}
                          // customSearchKey={'name_or_phone'}
                           resource={'User'}/>

                <FormInput label={t('Service Type')} name={'service_type'}
                           inputType={'resourceSelect'}
                          // rules={[{required: true}]}
                           initialValue={null}
                           //initialData={getServiceTypes(clinic.services)}
                    />
                <FormInput label={t('Clinic')} name={'clinic_id'}
                           inputType={'resourceSelect'}
                    // rules={[{required: true}]}
                           initialValue={null}
                           initialData={authRedux?.clinics}
                />

                <DateTimeSelect setBookedAtState={setBookedAtState} bookedAtState={bookedAtState} drFormRef={drFormRef}/>

                <div style={{paddingTop:20}}>
                    <Button className={'btn_add_entry'} htmlType={'submit'} type={'primary'}>Add Entry</Button>
                </div>
                <div style={{paddingTop:10}}>
                    <Button className={'btn_cancel_drawer'} htmlType={'submit'}  type={'secondary'}>Cancel</Button>
                </div>
            </Form>

        </div>
    )
}
export default DoctorReworkedCalendarDrawer;