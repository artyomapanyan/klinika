
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";


import {Button, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";

import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import Preloader from "../../../Preloader";
import FormInput from "../../../Fragments/FormInput";
import CancelComponent from "../../../Fragments/CancelComponent";

const resource = 'InvoiceItem';

function IncoiceItem() {
    let dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    let role = useSelector(state => state.auth.selected_role?.key)
    let rexuxClinic = useSelector(state => state.auth.clinics)
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})


    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))

        if(role === 'clinic-manager') {
            values.clinic_id = rexuxClinic[0].id
        }

        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(-1)
                }
            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setSaveLoading(false)
            })
        } else {
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
    }

    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)

        if(Object.keys(changed).length > 0) {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: true
            })
        }


    }



    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing invoice item`)} - {data?.name}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Invoice item`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div  className={'add_edit_content'}>
                    <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                    <FormInput inputType={'number'} label={t('Price')} name={'price'} initialValue={data?.price} rules={[{required: true}]} />
                    <FormInput inputType={'number'} max={100} label={t('Tax percentage')} name={'tax_percentage'} initialValue={data?.tax_percentage} rules={[{required: true}]} />
                    <div className={'invoice_item_clinics'}>
                        {
                            role === 'clinic-owner' ? <FormInput
                                label={t('Clinic')}
                                name={'clinic_id'}
                                inputType={'resourceSelect'}
                                rules={[{ required: true }]}
                                initialValue={data?.clinic?.id}
                                initialData={data?.clinic?[data.clinic]:[]}
                                resourceParams={{
                                    active: 1
                                }}
                                resource={'Clinic'}
                            /> : <div></div>
                        }
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
export default IncoiceItem;
