
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {createResource, postResource, updateResource} from "../../../Functions/api_calls";
import resourceLinks from "../../../ResourceLinks";
import {AutoComplete, Button, Checkbox, Col, Form, Input, Popconfirm, Radio, Row, Space, Switch} from "antd";
import Resources from "../../../../store/Resources";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import FileManager from "../../../Fragments/FileManager";
import {CheckOutlined, CloseOutlined, InboxOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import Preloader from "../../../Preloader";
import React from "react";
import MyMapComponent from "./MapComponent";
import {Autocomplete} from "@react-google-maps/api";
import CancelComponent from "../../../Fragments/CancelComponent";
const CheckboxGroup = Checkbox.Group;





const resource = 'Clinic';



function ClinicTabEssentials({loadingState, dataState}) {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();

    let token = useSelector((state) => state.auth.token);
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})
    const [insuranceCompany, setInsuranceCompany] = useState([])




    useEffect(()=>{

        Promise.all([
            postResource('InsuranceCompany','list',token,'',{
                per_page: 5000
            })
        ]).then(responses=>{
            setLoading(true)
            setInsuranceCompany(responses[0].items.map((el)=> ({ label:el.name,value:el.id})))

            setLoading(false)
        })
    }, [])

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

        // if(values.has_clinic_visit_service) {
        //     values.service_settings.clinic_visit.duration  = values.service_settings.clinic_visit.duration ?? 0
        //     values.service_settings.clinic_visit.has_insurance_company = values.service_settings.clinic_visit.has_insurance_company === true
        //     values.service_settings.clinic_visit.enable_vat_calculation = values.service_settings.clinic_visit.enable_vat_calculation === true
        // }
        // if(values.has_home_visit_service){
        //     values.service_settings.home_visit.has_insurance_company = values.service_settings.home_visit.has_insurance_company === true
        //     values.service_settings.home_visit.enable_vat_calculation = values.service_settings.home_visit.enable_vat_calculation === true
        // }
        //
        // if(values.has_laboratory_clinic_visit_service) {
        //     values.service_settings.laboratory_clinic_visit.has_insurance_company = values.service_settings.laboratory_clinic_visit.has_insurance_company === true
        //     values.service_settings.laboratory_clinic_visit.enable_vat_calculation = values.service_settings.laboratory_clinic_visit.enable_vat_calculation === true
        // }
        // if(values.has_laboratory_home_visit_service) {
        //     values.service_settings.laboratory_home_visit.has_insurance_company = values.service_settings.laboratory_home_visit.has_insurance_company === true
        //     values.service_settings.laboratory_home_visit.enable_vat_calculation = values.service_settings.laboratory_home_visit.enable_vat_calculation === true
        // }
        // if(values.has_nursing_service) {
        //     values.service_settings.nursing.has_insurance_company = values.service_settings.nursing.has_insurance_company === true
        //     values.service_settings.nursing.enable_vat_calculation = values.service_settings.nursing.enable_vat_calculation === true
        // }
        // if(values.has_physical_therapy_clinic_visit_service) {
        //     values.service_settings.physical_therapy_clinic_visit.has_insurance_company = values.service_settings.physical_therapy_clinic_visit.has_insurance_company === true
        //     values.service_settings.physical_therapy_clinic_visit.enable_vat_calculation = values.service_settings.physical_therapy_clinic_visit.enable_vat_calculation === true
        // }
        // if(values.has_physical_therapy_home_visit_service) {
        //     values.service_settings.physical_therapy_home_visit.has_insurance_company = values.service_settings.physical_therapy_home_visit.has_insurance_company === true
        //     values.service_settings.physical_therapy_home_visit.enable_vat_calculation = values.service_settings.physical_therapy_home_visit.enable_vat_calculation === true
        // }
        // if(values.has_telehealth_service) {
        //     values.service_settings.telehealth.has_insurance_company = values.service_settings.telehealth.has_insurance_company === true
        //     values.service_settings.telehealth.enable_vat_calculation = values.service_settings.telehealth.enable_vat_calculation === true
        // }


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
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
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



    const defaultCheckedList = [];
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < insuranceCompany.length);
        setCheckAll(list.length === insuranceCompany.length);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? insuranceCompany : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return(
        <div >
            {/*{data?.name ? <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Editing clinic - ${data?.name}`)}</h3> : <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Add new Clinic`)}</h3>}*/}
            {loading ? <Preloader/> : <Form
                onValuesChange={handleValuesChange}
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div className={'clinic_line'} >
                </div>
                <div style={{margin:'44px 90px'}}>
                    <Row >
                        <Col lg={10}>
                            <div>
                                <div className={'clinic_ess_info_div'}>
                                    <div className={'Clinic_essentials_info_text'}>Main information</div>
                                    <div>Language</div>
                                    <div>
                                        <Radio.Group size={'large'} defaultValue="year"  className={'radio_grup_clinic_lng'}>
                                            <Radio.Button value="year">{t("Arabic")}</Radio.Button>
                                            <Radio.Button value="half">{t("English")}</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <FormInput label={t('Clinic Name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                                <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                            </div>


                        </Col>
                        <Col lg={14}>

                        </Col>
                    </Row>
                    <div className={'clinic_line'}></div>


                    <div>
                    <div className={'general_info_text'}>General</div>
                    <Row gutter={[60]}>
                        <Col lg={14}>
                            <div className={'general_inputs'}>
                                <div style={{width: '100%'}}>
                                    <FormInput label={t('Email')} name={'email'} initialValue={data?.email} rules={[{required: true}]} />
                                </div>
                                <div  style={{width: '100%'}}>
                                    <FormInput label={t('Website')} name={'website'} initialValue={data?.website} />
                                </div>


                            </div>
                            <div className={'language_div'}>
                                <FormInput inputProps={{mode:'multiple'}} label={t('languages')} name={'languages'} inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           initialValue={data?.languages?.map(e=>e.id)}
                                           initialData={data?.languages??[]}
                                           resource={'Country'}
                                />
                            </div>

                        </Col>
                        <Col lg={10}>
                            <div className={'general_inputs'}>
                                <div style={{width:'100%'}}>
                                    <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={data?.phone_country_code}
                                               handleMapItems={handleMapItems}
                                               resource={'Country'}/>
                                </div>
                                <div style={{width:'100%'}}>
                                    <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
                                </div>
                            </div>
                        </Col>


                    </Row>

                        <div>
                            Insurance companies
                        </div>
                        <div className={'checkbox-groups'}>
                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                Check all
                            </Checkbox>
                            <CheckboxGroup  value={checkedList} options={insuranceCompany} onChange={onChange} />

                        </div>


                    </div>

                    <div className={'clinic_line'}></div>

                    <div style={{marginTop: 50}}>
                        <MyMapComponent formRef={formRef} data={data}/>
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
export default ClinicTabEssentials;
