
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import Preloader from "../../Preloader";
import {Button, Col, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";

import {Row} from "antd/lib";
import CancelComponent from "../../Fragments/CancelComponent";
import dayjs from "dayjs";

const resource = 'Doctor';

function Doctor() {
    let dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})


    const onFinish = (values) => {
        setSaveLoading(true)
        values.dob = values.dob.format('YYYY-MM-DD')
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
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

    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(${item.phone_code}) `:null
        item.id = item.phone_code
        return [name,item]
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
            {data?.first ? <h3 className={'create_apdate_btns'}>{t(`Editing Doctor - ${data?.first} ${data?.last}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Doctor`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >

                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('First name')} name={'first'} initialValue={data?.first} rules={[{required: true}]} />
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Last name')} name={'last'} initialValue={data?.last} rules={[{required: true}]} />
                        </Col>
                    </Row>
                    <div className="gutter-row">
                        <FormInput label={t('Bio')} name={'Bio'} inputType={'textArea'} initialValue={data?.bio}/>
                    </div>

                </div>

                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Email')} name={'email'} initialValue={data?.email} rules={[{required: true}]} />

                            <FormInput label={t('Date of Birth')} name={'dob'} initialValue={data?.dob} inputType={'date'} rules={[
                                {required: true},
                                {
                                    validator:(rule,value)=>{
                                        if(dayjs().diff(value,'year')<18){
                                            return Promise.reject('min age 18')
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]} />

                            <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'}
                                       initialValue={data?.gender}
                                       initialData={Resources?.Gender}
                            />
                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.status}
                                       initialData={Resources.Status}
                            />
                            <FormInput inputType={'password'}  label={'Password'} name={'password'} rules={[{required: !data?.id}]} />
                            <FormInput inputType={'password'}  label={'Password Confirmation'} name={'password_confirmation'} rules={[{required: true}]} />
                            <FormInput inputProps={{mode:'multiple'}} label={t('languages')} name={'languages'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.languages?.map(e=>e.id)}
                                       initialData={data?.languages??[]}
                                       resource={'Country'}
                            />
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Nationality number')} name={'nationality_number'} initialValue={data?.nationality_number} rules={[{required: true}]} />
                            
                            <div style={{display: 'flex', "column-gap": 10}}>
                                <div style={{width: '20%'}}>
                                    <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                               initialValue={data?.phone_country_code}
                                               handleMapItems={handleMapItems}
                                               customSearchKey={'phone_code'}
                                               resource={'Country'}/>
                                </div>
                                <div style={{width: '80%'}}>
                                    <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} inputType={'number'} />
                                </div>
                            </div>
                            <FormInput label={t('Plid')} name={'plid'} initialValue={data?.plid} />
                            <FormInput label={t('Plid expired at')} name={'plid_expired_at'} initialValue={data?.plid_expired_at} inputType={'date'} rules={[{required: true}]} />
                            <FormInput inputProps={{mode:'multiple'}} label={t('Specialties')} name={'specialties'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.specialties?.map(e=>e.id)}
                                       initialData={data?.specialties??[]}
                                       resource={'Taxonomy'}
                                       resourceParams={{type:Resources.TaxonomyTypes.SPECIALTY,has_parent:0}}
                            />
                            <FormInput inputProps={{mode:'multiple'}} label={t('Sub Specialties')} name={'sub_specialties'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.sub_specialties?.map(e=>e.id)}
                                       initialData={data?.sub_specialties??[]}
                                       resource={'Taxonomy'}
                                       resourceParams={{type:Resources.TaxonomyTypes.SPECIALTY,has_parent:1}}
                            />

                        </Col>
                    </Row>
                </div>

                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}
export default Doctor;
