
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Col, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";

import {Row} from "antd/lib";

const resource = 'Doctor';

function Doctor() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)


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
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }
    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Doctor - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Doctor`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >

                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('First')} name={'first'} initialValue={data?.first} rules={[{required: true}]} />
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Last')} name={'last'} initialValue={data?.last} rules={[{required: true}]} />
                        </Col>
                    </Row>
                    <FormInput label={t('Bio')} name={'Bio'} inputType={'textArea'} initialValue={data?.bio}/>
                </div>

                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Email')} name={'email'} initialValue={data?.email} rules={[{required: true}]} />
                            <FormInput label={t('Date of Birth')} name={'dob'} initialValue={data?.dob} inputType={'date'} rules={[{required: true}]} />

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
                            <FormInput inputType={'password'}  label={'Password Confirmation'} name={'password_confirmation'} />
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Nationality number')} name={'nationality_number'} initialValue={data?.nationality_number} rules={[{required: true}]} />
                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.status}
                                       initialData={Resources.Status}
                            />
                            <FormInput label={t('Phone country code')} name={'phone_country_code'} initialValue={data?.phone_country_code} />
                            <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
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
                            <FormInput inputProps={{mode:'multiple'}} label={t('languages')} name={'languages'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.languages?.map(e=>e.id)}
                                       initialData={data?.languages??[]}
                                       resource={'Country'}
                            />
                        </Col>
                    </Row>
                </div>

                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default Doctor;
