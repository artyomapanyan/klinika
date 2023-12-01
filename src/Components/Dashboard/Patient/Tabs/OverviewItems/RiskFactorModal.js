

import React, {useState} from 'react';
import {Button, Form} from "antd";
import FormInput from "../../../../Fragments/FormInput";
import {t} from "i18next";
import {createResource} from "../../../../Functions/api_calls";

import {useSelector} from "react-redux";

import '../../Patient.sass'


let resource = 'RiskFactors';
function RiskFactorModal({dataClinic, setIsModalOpen, setAddDeleteState}) {
    let token = useSelector((state) => state.auth.token);
    const [saveLoading, setSaveLoading] = useState(false)

    const onFinish = (values) => {
        setSaveLoading(true)
        values.patient_id = dataClinic?.patient?.id;
        values.doctor_id = dataClinic?.doctor?.id;



           // values.appointment_id = params.id
            createResource(resource, values, token).then((response) => {
                if (response?.id) {

                }

                setAddDeleteState((prevState) => prevState+1)


            }).finally(() => {
                setSaveLoading(false)
                setIsModalOpen(false)
            })
    }

    const onCancel = () => {
        setIsModalOpen(false)
    }


    return(
        <div className={''}>
            <Form
                onFinish={onFinish}
            >
                <div style={{marginTop: 25}}>
                    <FormInput label={t('Risk factor')} name={'name'}  />
                    <FormInput label={t('Description')} name={'description'}  />
                </div>



                <div style={{display: 'flex', gap: 16, marginTop: 16}}>
                    <Button loading={saveLoading} className={'add_medications_save_btn'} style={{width: '165px'}} type={"primary"} htmlType={'submit'}>{t('Save')}</Button>
                    <Button onClick={onCancel} className={'add_medications_save_btn'} style={{width: '82px'}} type={'secondary'}>{t('Cancel')}</Button>
                </div>
            </Form>
        </div>
    )
}

export default RiskFactorModal;