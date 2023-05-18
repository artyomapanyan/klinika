import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {useRef, useState} from "react";
import {createResource, updateResource} from "../../../Functions/api_calls";
import {Button, Col, Form, Row, Space, Switch} from "antd";
import Resources from "../../../../store/Resources";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import FileManager from "../../../Fragments/FileManager";
import {CheckOutlined, CloseOutlined, InboxOutlined} from "@ant-design/icons";
import Preloader from "../../../Preloader";
import React from "react";
import MyMapComponent from "./MapComponent";
import CancelComponent from "../../../Fragments/CancelComponent";

const resource = 'Clinic';



function ClinicTabEssentials({loadingState, dataState}) {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let reduxInfo = useSelector((state) => state);

    let token = useSelector((state) => state.auth.token);
    const {data, setData} = dataState;
    const {loading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})

    const onFinish = (values) => {

        setSaveLoading(true)
        values.license_number_expired_at = values?.license_number_expired_at?.format('YYYY-MM-DD')
        values.has_telehealth_service = values.has_telehealth_service === true
        values.has_home_visit_service = values.has_home_visit_service === true
        values.has_clinic_visit_service = values.has_clinic_visit_service === true
        values.has_laboratory_home_visit_service = values.has_laboratory_home_visit_service === true
        values.has_laboratory_clinic_visit_service = values.has_laboratory_clinic_visit_service === true
        values.has_nursing_service = values.has_nursing_service === true
        values.has_physical_therapy_home_visit_service = values.has_physical_therapy_home_visit_service === true
        values.has_physical_therapy_clinic_visit_service = values.has_physical_therapy_clinic_visit_service === true

        if(values.has_clinic_visit_service) {
            values.service_settings.clinic_visit.duration  = values.service_settings.clinic_visit.duration ?? 0
            values.service_settings.clinic_visit.has_insurance_company = values.service_settings.clinic_visit.has_insurance_company === true
            values.service_settings.clinic_visit.enable_vat_calculation = values.service_settings.clinic_visit.enable_vat_calculation === true
        }
        if(values.has_home_visit_service){
            values.service_settings.home_visit.has_insurance_company = values.service_settings.home_visit.has_insurance_company === true
            values.service_settings.home_visit.enable_vat_calculation = values.service_settings.home_visit.enable_vat_calculation === true
        }

        if(values.has_laboratory_clinic_visit_service) {
            values.service_settings.laboratory_clinic_visit.has_insurance_company = values.service_settings.laboratory_clinic_visit.has_insurance_company === true
            values.service_settings.laboratory_clinic_visit.enable_vat_calculation = values.service_settings.laboratory_clinic_visit.enable_vat_calculation === true
        }
        if(values.has_laboratory_home_visit_service) {
            values.service_settings.laboratory_home_visit.has_insurance_company = values.service_settings.laboratory_home_visit.has_insurance_company === true
            values.service_settings.laboratory_home_visit.enable_vat_calculation = values.service_settings.laboratory_home_visit.enable_vat_calculation === true
        }
        if(values.has_nursing_service) {
            values.service_settings.nursing.has_insurance_company = values.service_settings.nursing.has_insurance_company === true
            values.service_settings.nursing.enable_vat_calculation = values.service_settings.nursing.enable_vat_calculation === true
        }
        if(values.has_physical_therapy_clinic_visit_service) {
            values.service_settings.physical_therapy_clinic_visit.has_insurance_company = values.service_settings.physical_therapy_clinic_visit.has_insurance_company === true
            values.service_settings.physical_therapy_clinic_visit.enable_vat_calculation = values.service_settings.physical_therapy_clinic_visit.enable_vat_calculation === true
        }
        if(values.has_physical_therapy_home_visit_service) {
            values.service_settings.physical_therapy_home_visit.has_insurance_company = values.service_settings.physical_therapy_home_visit.has_insurance_company === true
            values.service_settings.physical_therapy_home_visit.enable_vat_calculation = values.service_settings.physical_therapy_home_visit.enable_vat_calculation === true
        }
        if(values.has_telehealth_service) {
            values.service_settings.telehealth.has_insurance_company = values.service_settings.telehealth.has_insurance_company === true
            values.service_settings.telehealth.enable_vat_calculation = values.service_settings.telehealth.enable_vat_calculation === true
        }


        setData((prevState)=>({
            ...prevState,
            ...values
        }))


        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    navigate(-1)
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(-1)
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }

    const handleValuesChange = (e)=>{
        setData((prevState)=>({
            ...prevState,
            ...e
        }))
        setChangeValuesState(e)
    }
    // useEffect(()=>{
    //
    //         postResource('Country','list',token,null,{per_page:5000}).then(responses => {
    //             setCountryCode(responses)
    //         })
    //
    // },[])
    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(${item.phone_code}) `:null
        item.id = item.phone_code
        return [name,item]
    }
console.log(reduxInfo)

    return(
        <div >
            {data?.name ? <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Editing clinic - ${data?.name}`)}</h3> : <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Add new Clinic`)}</h3>}
            {loading ? <Preloader/> : <Form
                onValuesChange={handleValuesChange}
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('Clinic Name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                </div>
                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Email')} name={'email'} initialValue={data?.email} rules={[{required: true}]} />
                            <div style={{display:"flex"}}>
                                <div style={{width:'35%'}}>
                                    <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={data?.phone_country_code}
                                               handleMapItems={handleMapItems}
                                               resource={'Country'}/>
                                </div>
                                <div style={{width:'100%', marginLeft:10}}>
                                    <FormInput maxLength={9} label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
                                </div>
                            </div>
                            <FormInput label={t('License Number')} name={'license_number'} initialValue={data?.license_number} rules={[{required: true}]} />
                            <FormInput label={t('License number expired at')} name={'license_number_expired_at'} initialValue={data?.license_number_expired_at} inputType={'date'} rules={[{required: true}]} />
                            <FormInput label={t('Website')} name={'website'} initialValue={data?.website}  rules={[{required: true}]} />

                        </Col>
                        <Col lg={12} className="gutter-row">

                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.status}
                                       initialData={Resources.Status}
                            />
                            <FormInput label={t('Owner')} name={'owner_id'} inputType={'resourceSelect'}
                                       disabled={reduxInfo?.auth?.selected_role?.key === 'clinic-owner'}
                                       rules={[{required: true}]}
                                       initialValue={reduxInfo?.auth?.selected_role?.key === 'clinic-owner' ? reduxInfo?.auth?.user?.id : data?.owner?.id}
                                       initialData={reduxInfo?.auth?.selected_role?.key === 'clinic-owner' ? reduxInfo?.auth?.user ? [reduxInfo?.auth?.user]:[] : data?.owner ? [data?.owner] : []}
                                       customSearchKey={'name_or_phone'}
                                       resource={'User'}/>
                            <FormInput inputProps={{mode:'multiple'}} label={t('Manager')} name={'managers'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.managers?.map(e=>e.id)}
                                       initialData={data?.managers ??[]}
                                       customSearchKey={'name_or_phone'}
                                       resource={'User'}
                            />
                            <FormInput inputProps={{mode:'multiple'}} label={t('languages')} name={'languages'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.languages?.map(e=>e.id)}
                                       initialData={data?.languages??[]}
                                       resource={'Country'}
                            />
                            <FormInput inputProps={{mode:'multiple'}} label={t('Insurance companies')} name={'insurance_companies'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.insurance_companies?.map(e=>e.id)}
                                       initialData={data?.insurance_companies??[]}
                                       resource={'InsuranceCompany'}
                                       resourceParams={{type:Resources.TaxonomyTypes.INSURANCE_TYPE}}
                            />

                        </Col>
                    </Row>
                </div>
                <div className={'add_edit_content'}>


                    <MyMapComponent formRef={formRef} data={data}/>


                </div>

                <div className={'add_edit_content'}>
                    <Row gutter={[16, 16]}>
                        <Col lg={12} className="gutter-row">
                            <Form.Item
                                label={t(`Clinic Visit`)}
                                name="has_clinic_visit_service"
                                className={'right-label'}
                                style={{fontSize:20, fontWeight:600}}
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
                                    <div style={{width:200}}>
                                        <FormInput  label={t('Duration')} name={["service_settings","clinic_visit","duration"]} inputType={'number'} initialValue={data?.service_settings?.clinic_visit?.duration}/>
                                    </div>
                                </div> : <div></div>
                            }

                            <Form.Item
                                label={t(`Telehealth`)}
                                name="has_telehealth_service"
                                className={'right-label'}
                                style={{fontSize:20, fontWeight:600}}
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
                                    <div style={{width:200}}>
                                        <FormInput  label={t('Service Fee')} name={["service_settings","telehealth","fixed_diagnoses_price"]} inputType={'number'} initialValue={data?.service_settings?.telehealth?.fixed_diagnoses_price}/>
                                        <FormInput  label={t('Duration')} name={["service_settings","telehealth","duration"]} inputType={'number'} initialValue={data?.service_settings?.telehealth?.duration}/>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Home Visit`)}
                                name="has_home_visit_service"
                                className={'right-label'}
                                style={{fontSize:20, fontWeight:600}}
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
                                    <div style={{width:200}}>
                                        <FormInput  label={t('Service Fee')} name={["service_settings","home_visit","fixed_diagnoses_price"]} inputType={'number'} initialValue={data?.service_settings?.home_visit?.fixed_diagnoses_price}/>
                                        <FormInput  label={t('Duration')} name={["service_settings","home_visit","duration"]} inputType={'number'} initialValue={data?.service_settings?.home_visit?.duration}/>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Laboratory Home Visit`)}
                                name="has_laboratory_home_visit_service"
                                className={'right-label'}
                                style={{fontSize:20, fontWeight:600}}
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
                                    <div style={{width:200}}>
                                        <FormInput  label={t('Service Fee')} name={["service_settings","laboratory_home_visit","fixed_diagnoses_price"]} inputType={'number'} initialValue={data?.service_settings?.home_visit?.fixed_diagnoses_price}/>
                                    </div>
                                </div> : <div></div>
                            }
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <Form.Item
                                label={t(`Laboratory Clinic Visit`)}
                                name="has_laboratory_clinic_visit_service"
                                className={'right-label'}
                                style={{fontSize:20, fontWeight:600}}
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

                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Nursing`)}
                                name="has_nursing_service"
                                className={'right-label'}
                                style={{fontSize:20, fontWeight:600}}
                                valuePropName="checked"
                                initialValue={data?.has_nursing_service}
                            >
                                <Switch checkedChildren={<CheckOutlined />}  unCheckedChildren={<CloseOutlined />} />
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
                                    <div style={{width:200}}>
                                        <FormInput  label={t('Service Fee')} name={["service_settings","nursing","fixed_diagnoses_price"]} inputType={'number'} initialValue={data?.service_settings?.nursing?.fixed_diagnoses_price}/>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Physical Therapy Home Visit`)}
                                name="has_physical_therapy_home_visit_service"
                                className={'right-label'}
                                style={{fontSize:20, fontWeight:600}}
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
                                    <div style={{width:200}}>
                                        <FormInput  label={t('Service Fee')} name={["service_settings","physical_therapy_home_visit","fixed_diagnoses_price"]} inputType={'number'} initialValue={data?.service_settings?.physical_therapy_home_visit?.fixed_diagnoses_price}/>
                                        <FormInput  label={t('Duration')} name={["service_settings","physical_therapy_home_visit","duration"]} inputType={'number'} initialValue={data?.service_settings?.physical_therapy_home_visit?.duration}/>
                                    </div>
                                </div> : <div></div>
                            }
                            <Form.Item
                                label={t(`Physical Therapy Clinic Visit`)}
                                name="has_physical_therapy_clinic_visit_service"
                                className={'right-label'}
                                style={{fontSize:20, fontWeight:600}}
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
                                    <div style={{width:200}}>
                                        <FormInput  label={t('Duration')} name={["service_settings","physical_therapy_clinic_visit","duration"]} inputType={'number'} initialValue={data?.service_settings?.physical_therapy_clinic_visit?.duration}/>
                                    </div>
                                </div> : <div></div>
                            }
                        </Col>
                    </Row>
                </div>
                <div className={'add_edit_content'}>
                    <Row gutter={[16, 16]}>
                        <Col lg={12} className="gutter-row">
                            <FileManager text1={'Logo'}
                                         text2={'Download the file'}
                                         name={'logo'}
                                         uploadIcon={<InboxOutlined/>}
                                         initialFileList={[data?.logo]} limit={1} formRef={formRef} type={'drag'}/>
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FileManager text1={'Cover Pic'}
                                         text2={'Download the file'}
                                         name={'cover'}
                                         uploadIcon={<InboxOutlined/>}
                                         initialFileList={[data?.cover]} limit={1} formRef={formRef} type={'drag'}/>
                        </Col>
                    </Row>


                    <FileManager text1={'Gallery'}
                                 text2={'Download files'}
                                 name={'gallery'}
                                 uploadIcon={<InboxOutlined/>}
                                 initialFileList={[data?.gallery]} limit={5} formRef={formRef} type={'drag'}/>


                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <CancelComponent changeValuesState={changeValuesState} />
                </Space>
            </Form>}
        </div>
    )
}
export default ClinicTabEssentials;

