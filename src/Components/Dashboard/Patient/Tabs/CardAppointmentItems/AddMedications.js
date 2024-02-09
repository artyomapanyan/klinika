import React, {useRef, useState} from 'react';
import {Button, Form, Input, Switch} from "antd";
import FormInput from "../../../../Fragments/FormInput";
import {t} from "i18next";
import {createResource, updateResource} from "../../../../Functions/api_calls";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import Preloader from "../../../../Preloader";
import '../../Patient.sass'


let resource = 'prescriptions';
function AddMedications({handleCancel, setIsModalOpen, prescriptions,data, setAddDeleteState}) {
    const formRef = useRef();
    const params = useParams();

    let token = useSelector((state) => state.auth.token);

    const [saveLoading, setSaveLoading] = useState(false)

    if (data?.id) {
        prescriptions = prescriptions.filter(e=> e.id !== data.id);
    }

    const onFinish = (values) => {
        console.log(values)
        setSaveLoading(true)
        values.appointment_id = params.id
        if (data.id) {
            updateResource(resource, data.id, values, token).then(response => {
                if(response?.id){

                }
                setAddDeleteState((prevState) => prevState+1)
            }).finally(() => {

                setSaveLoading(false)
                setIsModalOpen(false)
            })
        } else {
            values.appointment_id = params.id
            createResource(resource, values, token).then((response) => {
                if (response?.id) {

                }

                setAddDeleteState((prevState) => prevState+1)


            }).finally(() => {
                setSaveLoading(false)
                setIsModalOpen(false)
            })
        }

    }

    const units = [
        {
            id: 1,
            name: t('PCS')
        },
        {
            id: 2,
            name: t('MG')
        },

    ]
    const queue = [
        {
            id: 1,
            name: t('After')
        },
        {
            id: 2,
            name: t('Before')
        },
        {
            id: 3,
            name: t('Same day')
        },

    ]
    const handleMapItems = (item,name)=>{
        return item.id !==data.id?[name,item]:[null,item]
    }

    return(
        <div className={'add_medications_big_div'}>
            {data?<Form
                onFinish={onFinish}
                ref={formRef}
            >
                {/*<input type="number" onChange={(e)=>{*/}
                {/*    console.log(e)*/}
                {/*    if (e?.target?.value?.length > 3) {*/}
                {/*        return e.target.value = e?.target?.value.slice(0, 3)*/}
                {/*    }}} />*/}
                <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]}/>
                <div style={{display: 'flex', gap: 8, marginTop:-16}}>
                    <div style={{width: '50%'}} className={'patient_card_medication_errors'}>
                        <FormInput label={t('Times/Day')} name={'frequency'} initialValue={data?.frequency} rules={[
                            {required: true},
                            {
                                validator:(rule,value)=>{
                                    if(typeof value === 'string') {
                                        if(+(value?.slice(0, 3)) > 120){
                                            return Promise.reject('The gap may not be greater than 120.')
                                        }
                                    } else {
                                        if(value > 120){
                                            return Promise.reject('The gap may not be greater than 120.')
                                        }
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]} inputType={'number'} onChange={(e)=>{

                            if (e?.target?.value?.length > 3) {
                                formRef?.current?.setFieldValue('frequency', e?.target?.value.slice(0, 3))
                            }}}/>
                    </div>
                    <div style={{width: '50%'}} className={'patient_card_medication_errors'}>
                        <FormInput label={t('Duration, days')} name={'duration'} initialValue={data?.duration} rules={[
                            {required: true},
                            // {
                            //     validator:(rule,value)=>{
                            //         if(+value > 999){
                            //             return Promise.reject('The Duration may not be greater than 999.')
                            //         }
                            //         return Promise.resolve();
                            //     }
                            // }
                        ]} inputType={'number'} onChange={(e)=>{

                            if (e?.target?.value?.length > 3) {
                                formRef?.current?.setFieldValue('duration', e?.target?.value.slice(0, 3))
                            }}}/>
                    </div>

                    <div style={{width: '50%'}} className={'patient_card_medication_errors'}>
                        <FormInput label={t('Dose')} name={'dose'} initialValue={data?.dose} rules={[
                            {required: true},
                            // {
                            //     validator:(rule,value)=>{
                            //         if(+value > 999999){
                            //             return Promise.reject('The dose may not be greater than 999999.')
                            //         }
                            //         return Promise.resolve();
                            //     }
                            // }
                        ]} inputType={'number'} onChange={(e)=>{

                            if (e?.target?.value?.length > 6) {
                                formRef?.current?.setFieldValue('dose', e?.target?.value.slice(0, 6))
                            }}}/>
                    </div>

                    <div style={{width: '50%'}}>
                        <FormInput label={t('Units')} name={'unit_type'} inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   initialValue={data.unit_type}
                                   initialData={units}
                        />
                    </div>
                </div>

                <div style={{display: 'flex', gap: 8, marginTop:-16}}>
                    <div style={{width: '25%'}}>
                        <FormInput  label={t('When')} name={'queue_type'} inputType={'resourceSelect'}
                                   //rules={[{required: true}]}
                                   initialData={queue}
                                   disabled={prescriptions?.length < 1}
                                    initialValue={data?.queue_type}
                        />
                    </div>
                    <div style={{width: '50%'}}>
                        <FormInput label={t('Medication name')} name={'queue_prescription_id'} inputType={'resourceSelect'}
                            //rules={[{required: true}]}
                            handleMapItems={handleMapItems}
                            initialValue={data?.queuePrescription?.id}
                            initialData={data?.queuePrescription ? [data.queuePrescription] : []}
                            disabled={prescriptions?.length < 1}
                            resourceData={prescriptions}

                        />
                    </div>

                    <div style={{width: '25%'}} className={'patient_card_medication_errors'}>
                        <FormInput label={t('Gap, days')} name={'gap'} inputDisabled={prescriptions?.length < 1} initialValue={data?.gap ? data?.gap : '0'} inputType={'number'} rules={[
                            {required: false},
                            {
                                validator:(rule,value)=>{
                                    if(typeof value === 'string') {
                                        if(+(value?.slice(0, 3)) > 120){
                                            return Promise.reject('The gap may not be greater than 120.')
                                        }
                                    } else {
                                        if(value > 120){
                                            return Promise.reject('The gap may not be greater than 120.')
                                        }
                                    }

                                    return Promise.resolve();
                                }
                            }
                        ]} onChange={(e)=>{

                            if (e?.target?.value?.length > 3) {
                                formRef?.current?.setFieldValue('gap', e?.target?.value.slice(0, 3))
                            }}}/>
                    </div>
                </div>
                <div style={{ marginTop:-16}}>
                    <FormInput label={t('Note')} name={'note'} initialValue={data?.note} />
                </div>

                <div style={{borderBottom: '1px dashed #e6e8eb', marginLeft: 6, marginRight: 6, marginTop: -10}}></div>

                <div className={'reminders'}>Reminders</div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className={'times_big_div'}>
                        <div className={'morning_div'}>{t('Morning')}</div>
                        <div className={'morning_div'}>{t('Afternoon')}</div>
                        <div className={'morning_div'}>{t('Evening')}</div>
                        <div className={'morning_div'}>{t('Before sleep')}</div>
                    </div>
                    <div className={'times_big_div'}>
                        <div className={'time_switch'}>
                            10:00 AM
                            <Switch />
                        </div>
                        <div className={'time_switch'}>
                            01:00 PM
                            <Switch />
                        </div>
                        <div className={'time_switch'}>
                            07:00 PM
                            <Switch />
                        </div>
                        <div className={'time_switch'}>
                            09:30 AM
                            <Switch />
                        </div>
                    </div>
                </div>

                <div style={{display: 'flex', gap: 16, marginTop: 16}}>
                    <Button loading={saveLoading} className={'add_medications_save_btn'} style={{width: '85%'}} type={"primary"} htmlType={'submit'}>{t('Save entry')}</Button>
                    <Button onClick={handleCancel} className={'add_medications_save_btn'} style={{width: '15%'}} type={'secondary'}>{t('Cancel')}</Button>
                </div>
            </Form>:<Preloader/>}
        </div>
    )
}

export default AddMedications;