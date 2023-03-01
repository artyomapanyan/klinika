import {useNavigate, useParams} from "react-router";
import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {createResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import {Button, Form, Space, Row, Col} from "antd";
import {t} from "i18next";
import Preloader from "../../Preloader";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import {InboxOutlined} from "@ant-design/icons";
import FileManager from "../../Fragments/FileManager";


const resource = 'Appointment';



function Appointment() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)


    const onFinish = (values) => {
        values.dob = values.dob.format('YYYY-MM-DD')
        values.plid_expired_at = values.plid_expired_at.format('YYYY-MM-DD')
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))

            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        }


    const handleValuesChange = (e,v)=>{
        setData((prevState)=>({
            ...prevState,
            ...e
        }))
    }

    const handleMapItems = (item,name)=>{
        name = item.phone_code?`${item.phone_code} `:null
        item.id = +item.phone_code
        return [name,item]
    }


console.log(data, 'sp')
    return(
        <div >
            {data?.name ? <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Editing Doctor - ${data?.name}`)}</h3> : <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Add new Clinic`)}</h3>}
            {loading ? <Preloader/> : <Form
                onValuesChange={handleValuesChange}
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div>
                        <div className={'add_edit_content'}>
                            <div className="gutter-row">
                                <FormInput label={t('Select Patient (Search By phone number)')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                            </div>
                            <Row>
                                <Col lg={6} className="gutter-row">
                                    <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={null}
                                               handleMapItems={handleMapItems}
                                               resource={'Country'}/>
                                </Col>
                                <Col lg={18} className="gutter-row">
                                    <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} className="gutter-row">
                                    <FormInput label={t('First Name')} name={'first'} rules={[{required: true}]} />
                                    <FormInput label={t('Last Name')} name={'last'} rules={[{required: true}]} />
                                    <FormInput label={t('Email')} name={'email'} rules={[{required: true}]}/>
                                    <FormInput inputType={'password'}  label={'Password'} name={'password'} initialValue={''} rules={[{required: !data?.id}]} />
                                    <FormInput inputType={'password'}  label={'Password Confirmation'} name={'password_confirmation'} />
                                </Col>
                                <Col lg={12} className="gutter-row">

                                    <FormInput label={t('Date of Birth')} name={'dob'}  inputType={'date'} rules={[{required: true}]} />
                                    <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'} initialData={Resources?.Gender} rules={[{required: true}]}/>
                                    <FormInput  label={t('Nationality Number')} name={["nationality_number"]} rules={[{required: true}]}/>
                                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={data?.status}
                                               initialData={Resources.Status}
                                    />
                                    <FormInput label={t('Bio')} name={'bio'} inputType={'textArea'} initialValue={data?.description}/>
                                </Col>
                            </Row>
                        </div>
                        <div className={'add_edit_content'}>


                            <Row>
                                <Col lg={12} className="gutter-row">
                                    <FormInput label={t('Plid')} name={'plid'} rules={[
                                        {
                                            required: true,
                                            len:11
                                        },

                                    ]} />

                                </Col>
                                <Col lg={12} className="gutter-row">
                                    <FormInput label={t('Plid expired at')} name={'plid_expired_at'}  inputType={'date'} rules={[{required: true}]} />
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






                    <div className={'add_edit_content'}>


                        <Row>
                            <Col lg={24} className="gutter-row">
                                <FormInput label={t('Clinic')} name={'clinic_id'} inputType={'resourceSelect'}
                                           initialValue={null}
                                           initialData={[]}
                                           resource={'Clinic'}/>
                            </Col>
                            {
                                data?.clinic_id ? <Col lg={24} className="gutter-row">
                                    <FormInput label={t('Service Type')} name={'service_id'} inputType={'resourceSelect'}
                                               initialValue={null}
                                               initialData={[]}
                                               resource={'Service'}/>
                                </Col> : <div></div>
                            }
                        </Row>
                        {
                            data?.service_id ? <Row>
                                <Col lg={12} className="gutter-row">
                                    <FormInput label={t('Specialties')} name={'specialties'}
                                               inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={null}
                                               initialData={[]}
                                               resource={'Taxonomy'}
                                               resourceParams={{type:Resources.TaxonomyTypes.SPECIALTY,has_parent:0}}
                                    />
                                </Col>
                                <Col lg={12} className="gutter-row">
                                    <FormInput label={t('Doctor')} name={'doctor_id'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               disabled={!data.specialties && true}
                                               initialValue={null}
                                               initialData={[]}
                                               resource={'Doctor'}/>
                                </Col>

                            </Row> : <div></div>
                        }
                        <Row>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('Offer (Optional)')} name={'offer_id'} inputType={'resourceSelect'}
                                           initialValue={null}
                                           initialData={[]}
                                           resource={'Offer'}/>
                            </Col>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('File Number')} name={'file_number'} rules={[{required: true}]} />
                            </Col>

                        </Row>
                        <div className="gutter-row">
                            <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                        </div>
                        <div className="gutter-row">
                            <FileManager text1={'Select or drag files'}
                                         text2={'+'}
                                         name={'gallery'}
                                         uploadIcon={<InboxOutlined/>}
                                         initialFileList={[data?.gallery]} limit={5} formRef={formRef} type={'drag'}/>
                        </div>

                    </div>
                </div>


                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default Appointment;
