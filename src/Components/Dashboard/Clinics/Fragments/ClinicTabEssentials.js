
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {useRef} from "react";
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import resourceLinks from "../../../ResourceLinks";
import {Button, Col, Form, InputNumber, Row, Space, Spin, Switch} from "antd";
import Resources from "../../../../store/Resources";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import FileManager from "../../../Fragments/FileManager";
import {CheckOutlined, CloseOutlined, InboxOutlined} from "@ant-design/icons";
import Preloader from "../../../Preloader";
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import React from "react";
import MyMapComponent from "./MapComponent";





const resource = 'Clinic';



function ClinicTabEssentials({loadingState, dataState}) {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState

    const onFinish = (values) => {
        setLoading(true)
        values.license_number_expired_at = values?.license_number_expired_at?.format('YYYY-MM-DD')
        values.has_telehealth_service = values.has_telehealth_service === true
        values.has_home_visit_service === true ? values.has_home_visit_service = true : values.has_home_visit_service = false;
        values.has_clinic_visit_service === true ? values.has_clinic_visit_service = true : values.has_clinic_visit_service = false;
        values.has_laboratory_home_visit_service === true ? values.has_laboratory_home_visit_service = true : values.has_laboratory_home_visit_service = false;
        values.has_laboratory_clinic_visit_service === true ? values.has_laboratory_clinic_visit_service = true : values.has_laboratory_clinic_visit_service = false;
        values.has_nursing_service === true ? values.has_nursing_service = true : values.has_nursing_service = false;
        values.has_physical_therapy_home_visit_service === true ? values.has_physical_therapy_home_visit_service = true : values.has_physical_therapy_home_visit_service = false;
        values.has_physical_therapy_clinic_visit_service === true ? values.has_physical_therapy_clinic_visit_service = true : values.has_physical_therapy_clinic_visit_service = false;

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

    const handleValuesChange = (e)=>{
        setData((prevState)=>({
            ...prevState,
            ...e
        }))
    }


    return(
        <div >
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Doctor - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Clinic`)}</h3>}
            {loading ? <Preloader/> : <Form
                onValuesChange={handleValuesChange}
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

                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.status}
                                       initialData={Resources.Status}
                            />
                            <FormInput label={t('Owner')} name={'owner_id'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.owner?.id}
                                       initialData={data?.owner ? [data.owner]:[]}
                                       resource={'User'}/>
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
                        <Col lg={16} className="gutter-row">
                            <FormInput label={t('Latitude')} name={'latitude'} initialValue={data?.latitude} />
                            <FormInput label={t('Longitude')} name={'longitude'} initialValue={data?.longitude} />
                        </Col>
                        <Col lg={8} className="gutter-row">
                            <Wrapper apiKey="AIzaSyD9MbMz7FESa79v-nntPfcxJHYTw8Am1S4" >
                                <MyMapComponent />
                            </Wrapper>
                        </Col>
                    </Row>
                </div>

                <div className={'add_edit_content'}>
                    <Row gutter={[16, 16]}>
                        <Col lg={12} className="gutter-row">
                            <Form.Item
                                label={t(`Clinic visit`)}
                                name="has_clinic_visit_service"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={data?.has_clinic_visit_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>
                            {
                                data?.has_clinic_visit_service ? <div style={{marginLeft:60}}>
                                    <div>
                                        <Form.Item
                                            label={t(`Allows insurance companies`)}
                                            name={["service_settings","clinic_visit","has_insurance_company"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.clinic_visit?.has_insurance_company}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>

                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Enable vat calculation`)}
                                            name={["service_settings","clinic_visit","enable_vat_calculation"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.clinic_visit?.enable_vat_calculation}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Service Fee`)}
                                            name={["service_settings","clinic_visit","duration"]}
                                            initialValue={data?.service_settings?.clinic_visit?.duration}
                                        >
                                            <InputNumber size={'small'} />
                                        </Form.Item>
                                    </div>
                                </div> : <div></div>
                            }

                            <Form.Item
                                label={t(`Has telehealth service`)}
                                name="has_telehealth_service"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={data?.has_telehealth_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} title={'dsad'} />
                            </Form.Item>
                            {
                                data?.has_telehealth_service ? <div style={{marginLeft:60}}>
                                    <div>
                                        <Form.Item
                                            label={t(`Allows insurance companies`)}
                                            name={["service_settings","telehealth","has_insurance_company"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.telehealth?.has_insurance_company}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>

                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Enable vat calculation`)}
                                            name={["service_settings","telehealth","enable_vat_calculation"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.telehealth?.enable_vat_calculation}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Service Fee`)}
                                            name={["service_settings","telehealth","duration"]}
                                            initialValue={data?.service_settings?.telehealth?.duration}
                                        >
                                            <InputNumber size={'small'} />
                                        </Form.Item>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Has home visit service`)}
                                name="has_home_visit_service"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={data?.has_home_visit_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>
                            {
                                data?.has_home_visit_service ? <div style={{marginLeft:60}}>
                                    <div>
                                        <Form.Item
                                            label={t(`Allows insurance companies`)}
                                            name={["service_settings","home_visit","has_insurance_company"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.home_visit?.has_insurance_company}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>

                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Enable vat calculation`)}
                                            name={["service_settings","home_visit","enable_vat_calculation"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.home_visit?.enable_vat_calculation}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Service Fee`)}
                                            name={["service_settings","home_visit","duration"]}
                                            initialValue={data?.service_settings?.home_visit?.duration}
                                        >
                                            <InputNumber size={'small'} />
                                        </Form.Item>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Has laboratory home visit service`)}
                                name="has_laboratory_home_visit_service"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={data?.has_laboratory_home_visit_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>
                            {
                                data?.has_laboratory_home_visit_service ? <div style={{marginLeft:60}}>
                                    <div>
                                        <Form.Item
                                            label={t(`Allows insurance companies`)}
                                            name={["service_settings","laboratory_home_visit","has_insurance_company"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.laboratory_home_visit?.has_insurance_company}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>

                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Enable vat calculation`)}
                                            name={["service_settings","laboratory_home_visit","enable_vat_calculation"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.laboratory_home_visit?.enable_vat_calculation}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Service Fee`)}
                                            name={["service_settings","laboratory_home_visit","duration"]}
                                            initialValue={data?.laboratory_home_visit?.home_visit?.duration}
                                        >
                                            <InputNumber size={'small'} />
                                        </Form.Item>
                                    </div>
                                </div> : <div></div>
                            }
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <Form.Item
                                label={t(`Has laboratory clinic visit service`)}
                                name="has_laboratory_clinic_visit_service"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={data?.has_laboratory_clinic_visit_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>
                            {
                                data?.has_laboratory_clinic_visit_service ? <div style={{marginLeft:60}}>
                                    <div>
                                        <Form.Item
                                            label={t(`Allows insurance companies`)}
                                            name={["service_settings","laboratory_clinic_visit","has_insurance_company"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.laboratory_clinic_visit?.has_insurance_company}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>

                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Enable vat calculation`)}
                                            name={["service_settings","laboratory_clinic_visit","enable_vat_calculation"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.laboratory_clinic_visit?.enable_vat_calculation}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Service Fee`)}
                                            name={["service_settings","laboratory_clinic_visit","duration"]}
                                            initialValue={data?.laboratory_home_visit?.laboratory_clinic_visit?.duration}
                                        >
                                            <InputNumber size={'small'} />
                                        </Form.Item>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Has nursing service`)}
                                name="has_nursing_service"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={data?.has_nursing_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>
                            {
                                data?.has_nursing_service ? <div style={{marginLeft:60}}>
                                    <div>
                                        <Form.Item
                                            label={t(`Allows insurance companies`)}
                                            name={["service_settings","nursing","has_insurance_company"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.nursing?.has_insurance_company}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>

                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Enable vat calculation`)}
                                            name={["service_settings","nursing","enable_vat_calculation"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.nursing?.enable_vat_calculation}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Service Fee`)}
                                            name={["service_settings","nursing","duration"]}
                                            initialValue={data?.laboratory_home_visit?.nursing?.duration}
                                        >
                                            <InputNumber size={'small'} />
                                        </Form.Item>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Has physical therapy home visit service`)}
                                name="has_physical_therapy_home_visit_service"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={data?.has_physical_therapy_home_visit_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>
                            {
                                data?.has_physical_therapy_home_visit_service ? <div style={{marginLeft:60}}>
                                    <div>
                                        <Form.Item
                                            label={t(`Allows insurance companies`)}
                                            name={["service_settings","physical_therapy_home_visit","has_insurance_company"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.physical_therapy_home_visit?.has_insurance_company}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>

                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Enable vat calculation`)}
                                            name={["service_settings","physical_therapy_home_visit","enable_vat_calculation"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.physical_therapy_home_visit?.enable_vat_calculation}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Service Fee`)}
                                            name={["service_settings","physical_therapy_home_visit","duration"]}
                                            initialValue={data?.laboratory_home_visit?.physical_therapy_home_visit?.duration}
                                        >
                                            <InputNumber size={'small'} />
                                        </Form.Item>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Has physical therapy clinic visit service`)}
                                name="has_physical_therapy_clinic_visit_service"
                                className={'right-label'}
                                valuePropName="checked"
                                initialValue={data?.has_physical_therapy_clinic_visit_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                            </Form.Item>
                            {
                                data?.has_physical_therapy_clinic_visit_service ? <div style={{marginLeft:60}}>
                                    <div>
                                        <Form.Item
                                            label={t(`Allows insurance companies`)}
                                            name={["service_settings","physical_therapy_clinic_visit","has_insurance_company"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.physical_therapy_clinic_visit?.has_insurance_company}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>

                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Enable vat calculation`)}
                                            name={["service_settings","physical_therapy_clinic_visit","enable_vat_calculation"]}
                                            className={'right-label'}
                                            valuePropName="checked"
                                            initialValue={data?.service_settings?.physical_therapy_clinic_visit?.enable_vat_calculation}
                                        >
                                            <Switch size={'small'} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <Form.Item
                                            label={t(`Service Fee`)}
                                            name={["service_settings","physical_therapy_clinic_visit","duration"]}
                                            initialValue={data?.laboratory_home_visit?.physical_therapy_clinic_visit?.duration}
                                        >
                                            <InputNumber size={'small'} />
                                        </Form.Item>
                                    </div>
                                </div> : <div></div>
                            }
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
                <Space className={'create_apdate_btns'}>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default ClinicTabEssentials;
