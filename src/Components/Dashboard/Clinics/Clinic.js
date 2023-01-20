
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Checkbox, Col, Form, Space} from "antd";
import React, {useRef} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import dayjs from 'dayjs';
import {InboxOutlined} from "@ant-design/icons";
import FileManager from "../../Fragments/FileManager";
import {Row} from "antd/lib";

const resource = 'Clinic';

function Clinic() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState


    const onFinish = (values) => {
        setLoading(true)
        values.license_number_expired_at = values?.license_number_expired_at?.format('YYYY-MM-DD')
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }
console.log(data)

    return(
        <div >
            {data?.name ? <h3>{t(`Editing Doctor - ${data?.name}`)}</h3> : <h3>{t(`Add new Clinic`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('First')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                </div>
                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Email')} name={'email'} initialValue={data?.email} rules={[{required: true}]} />
                            <div style={{display:"flex"}}>
                                <div style={{width:'20%'}}>
                                    <FormInput label={t('country code')} name={'phone_country_code'} initialValue={data?.phone_country_code} rules={[{required: true}]} />
                                </div>
                                <div style={{width:'100%', marginLeft:10}}>
                                    <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
                                </div>
                            </div>
                            <FormInput label={t('License Number')} name={'license_number'} initialValue={data?.license_number} rules={[{required: true}]} />
                            <FormInput label={t('License number expired at')} name={'license_number_expired_at'} initialValue={data?.license_number_expired_at} inputType={'date'} rules={[{required: true}]} />
                            <FormInput label={t('Website')} name={'website'} initialValue={data?.website} />
                            <FormInput inputProps={{mode:'multiple'}} label={t('Insurance companies')} name={'insurance_companies'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.insurance_companies?.map(e=>e.id)}
                                       initialData={data?.insurance_companies??[]}
                                       resource={'InsuranceCompany'}
                                       resourceParams={{type:Resources.TaxonomyTypes.INSURANCE_TYPE}}
                            />
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Latitude')} name={'latitude'} initialValue={data?.latitude} />
                            <FormInput label={t('Longitude')} name={'longitude'} initialValue={data?.longitude} />
                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.status}
                                       initialData={Resources.Status}
                            />
                            <FormInput label={t('Owner')} name={'owner_id'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.owner?.id}
                                       initialData={data?.owner?[data.owner]:[]}
                                       resource={'User'}/>
                            <FormInput label={t('Service settings')} name={'service_settings'} initialValue={''} />
                            <FormInput inputProps={{mode:'multiple'}} label={t('languages')} name={'languages'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.languages?.map(e=>e.id)}
                                       initialData={data?.languages??[]}
                                       resource={'Country'}
                            />

                        </Col>
                    </Row>
                </div>
                <div className={'add_edit_content'}>
                    <Row gutter={[16, 16]}>
                        <Col lg={12} className="gutter-row">
                            <Form.Item
                                label={t(`Has clinic visit service`)}
                                name="has_clinic_visit_service"
                                valuePropName="checked"
                                initialValue={data?.has_clinic_visit_service}

                            >
                                <Checkbox defaultChecked={true}/>
                            </Form.Item>
                            <Form.Item
                                label={t(`Has telehealth service`)}
                                name="has_telehealth_service"
                                valuePropName="checked"
                                initialValue={data?.has_telehealth_service}
                            >
                                <Checkbox />
                            </Form.Item>
                            <Form.Item
                                label={t(`Has home visit service`)}
                                name="has_home_visit_service"
                                valuePropName="checked"
                                initialValue={data?.has_home_visit_service}

                            >
                                <Checkbox />
                            </Form.Item>
                            <Form.Item
                                label={t(`Has laboratory home visit service`)}
                                name="has_laboratory_home_visit_service"
                                valuePropName="checked"
                                initialValue={data?.has_laboratory_home_visit_service}
                            >
                                <Checkbox />
                            </Form.Item>
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <Form.Item
                                label={t(`Has laboratory clinic visit service`)}
                                name="has_laboratory_clinic_visit_service"
                                valuePropName="checked"
                                initialValue={data?.has_laboratory_clinic_visit_service}
                            >
                                <Checkbox />
                            </Form.Item>
                            <Form.Item
                                label={t(`Has nursing service`)}
                                name="has_nursing_service"
                                valuePropName="checked"
                                initialValue={data?.has_nursing_service}
                            >
                                <Checkbox />
                            </Form.Item>
                            <Form.Item
                                label={t(`Has physical therapy home visit service`)}
                                name="has_physical_therapy_home_visit_service"
                                valuePropName="checked"
                                initialValue={data?.has_physical_therapy_home_visit_service}
                            >
                                <Checkbox />
                            </Form.Item>
                            <Form.Item
                                label={t(`Has physical therapy clinic visit service`)}
                                name="has_physical_therapy_clinic_visit_service"
                                valuePropName="checked"
                                initialValue={data?.has_physical_therapy_clinic_visit_service}
                            >
                                <Checkbox />
                            </Form.Item>
                        </Col>
                    </Row>


                </div>
                <div className={'add_edit_content'}>
                    <Row gutter={[16, 16]}>
                        <Col lg={12} className="gutter-row">
                            <FileManager text1={'Click or drag file to this area to upload'}
                                         text2={'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files'}
                                         name={'logo'}
                                         uploadIcon={<InboxOutlined/>}
                                         initialFileList={[data?.logo]} limit={1} formRef={formRef} type={'drag'}/>
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FileManager text1={'Click or drag file to this area to upload'}
                                         text2={'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files'}
                                         name={'cover'}
                                         uploadIcon={<InboxOutlined/>}
                                         initialFileList={[data?.cover]} limit={1} formRef={formRef} type={'drag'}/>
                        </Col>
                    </Row>


                    <FileManager text1={'Click or drag file to this area to upload'}
                                 text2={'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files'}
                                 name={'gallery'}
                                 uploadIcon={<InboxOutlined/>}
                                 initialFileList={[data?.gallery]} limit={5} formRef={formRef} type={'drag'}/>
                </div>
                <Space>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default Clinic;
