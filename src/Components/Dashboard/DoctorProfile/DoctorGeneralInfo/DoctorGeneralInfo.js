import {Button, Col, Divider, Form, Row, Space} from "antd";
import DoctorImageUpload
    from "../../Clinics/Fragments/ManageDoctors/ClinicDoctorUpdate/ClinicDoctorTabs/DoctorImageUpload";
import FormInput from "../../../Fragments/FormInput";
import {t} from "i18next";
import suffix_select_icon from "../../../../dist/icons/suffix_select_icon.png";
import calendar_black_icon from "../../../../dist/icons/calendar_black_icon.png";
import dayjs from "dayjs";
import Resources from "../../../../store/Resources";
import React, {useEffect, useState} from "react";
import {postResource, updateResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";

import Preloader from "../../../Preloader";
import DoctorProfileImage from "../DoctorProfileImage/DoctorProfileImage";
import {InboxOutlined} from "@ant-design/icons";
import FileManager from "../../../Fragments/FileManager";


let resource = 'DoctorUpdateProfile';
function TabGeneralInfo({formRef, saveLoading, setSaveLoading, setAvatarDeleteType, setAllData}) {

    let token = useSelector((state) => state.auth.token);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [autoFillState, setAutoFillState] = useState(true);
    const [selectedSpecialties,setSelectedSpecialties] = useState([]);



    useEffect(() => {
        setLoading(true)
        postResource(resource, 'GetDoctorProfile', token, '').then((response) => {
            setData(response)
            setLoading(false)
            setAllData(response)
            setSelectedSpecialties(response?.specialties?.map(el => el.id))
        })
    }, [autoFillState])

    const onFinish = (values) => {
//values.dob = values.dob.format('YYYY-MM-DD')
        setSaveLoading(true)
        updateResource(resource, '', values, token).then(response => {
                if(response?.id){

                }
            }).finally(() => {
                setSaveLoading(false)
            })
    }

    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(${item.phone_code}) `:null
        item.id = item.phone_code
        return [name,item]
    }

    const onAutoFillYes = () => {
        setAutoFillState(false)
    }



    return(
        <div className={'general_info_big_div'}>
            {/*{*/}
            {/*    autoFillState ? <div className={'autofill_big_div'}>*/}

            {/*        <div>*/}
            {/*            <Space >*/}
            {/*                <Divider type={"vertical"} style={{height: 37, border: '2px solid #F3A632', borderRadius: 2}}></Divider>*/}
            {/*                <div>*/}
            {/*                    <div className={'autofill_bold_text'}>*/}
            {/*                        Auto fill your data*/}
            {/*                    </div>*/}
            {/*                    <div className={'autofill_text'}>*/}
            {/*                        You have already filled profile from another clinic. Do you want to pre-fill this data to current profile*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Space>*/}


            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <Button onClick={onAutoFillYes} style={{marginRight: 16}} className={'autofill_btn'} type={'primary'} >Yes</Button>*/}
            {/*            <Button className={'autofill_btn'} type={'secondary'} >No</Button>*/}
            {/*        </div>*/}
            {/*    </div> : <div></div>*/}
            {/*}*/}

            {
                loading ? <Preloader /> : <Form
                    ref={formRef}
                    onFinish={onFinish}
                >
                    <div className={'general_info_form'}>
                        <div >
                            <DoctorProfileImage formRef={formRef} data={data} setAvatarDeleteType={setAvatarDeleteType}/>
                            {/*<FileManager text1={'avatar'}*/}
                            {/*             text2={'Download the file'}*/}
                            {/*             name={'avatar'}*/}
                            {/*             uploadIcon={<InboxOutlined/>}*/}
                            {/*             initialFileList={[data?.avatar]} limit={1} formRef={formRef} type={'drag'}/>*/}

                        </div>
                        <div className={'clinics_select_col'}>

                            <Row gutter={20}>
                                <Col lg={6}>
                                    <FormInput label={t('Name')} name={'first'}
                                               initialValue={data?.first}
                                               rules={[{required: true}]}/>
                                </Col>
                                <Col lg={6}>
                                    <FormInput label={t('Surname')} name={'last'}
                                               initialValue={data?.last}
                                               rules={[{required: true}]}/>
                                </Col>
                                <Col lg={6}>
                                    <FormInput label={t('Date of Birth')} name={'dob'}
                                               suffixIcon={<img alt={'calendar_black_icon'} src={calendar_black_icon}/>}
                                               initialValue={data?.dob}
                                               inputType={'date'}
                                               rules={[
                                        {
                                            required: true,
                                            validator:(rule,value)=>{
                                                if(dayjs().diff(value,'year')<18){
                                                    return Promise.reject('min age 18')
                                                }
                                                return Promise.resolve();
                                            }
                                        }
                                    ]}/>
                                </Col>
                                <Col lg={6}>
                                    <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'}
                                               initialValue={data?.gender}
                                               initialData={Resources?.Gender}
                                               rules={[{required: true}]}
                                    />

                                </Col>
                            </Row>
                            {/*<Row gutter={20}>*/}
                            {/*    <Col lg={6}>*/}
                            {/*        <FormInput label={t('Qualification')} name={'qualification'}*/}
                            {/*        />*/}
                            {/*    </Col>*/}
                            {/*    <Col lg={6}>*/}
                            {/*        <FormInput label={t('HCP registration number:')} name={'name'}*/}
                            {/*        />*/}
                            {/*    </Col>*/}
                            {/*    <Col lg={6}>*/}
                            {/*        <FormInput label={t('License valid to')} name={'dob'}*/}
                            {/*                   suffixIcon={<img alt={'calendar_black_icon'} src={calendar_black_icon}/>}*/}

                            {/*            //inputDisabled={true}*/}
                            {/*                   inputType={'date'}*/}
                            {/*        />*/}
                            {/*    </Col>*/}
                            {/*    <Col lg={6}>*/}
                            {/*        <FormInput label={t('license upload')} name={'qualification'} />*/}
                            {/*    </Col>*/}
                            {/*</Row>*/}
                            <Row gutter={20}>
                                <Col lg={16} className={'doc_profile_specialties'}>
                                    <div style={{width: '100%'}}>
                                        <FormInput label={t('')} name={'specialties'}
                                            inputProps={{
                                            mode:'multiple',
                                            onChange:(e,dat)=> {
                                                setData((prevState)=>({
                                                    ...prevState,
                                                    sub_specialties: undefined,
                                                }))
            
                                                formRef?.current?.setFieldsValue({
                                                    sub_specialties: undefined,
                                                })
                                                setSelectedSpecialties(formRef?.current?.getFieldValue('specialties'))
                                            }
                                            }}
                                            suffixIcon={<div> <Divider type={"vertical"} style={{height: 30}}/> <span style={{color:'#635D6B', fontSize: '12',marginRight: 10 }}>{t('Specialties')} </span>  <img alt={'suffix_select_icon'} src={suffix_select_icon}/></div>}
                                            inputType={'resourceSelect'}
                                            rules={[{required: true}]}
                                            initialValue={data?.specialties?.map(e=>e?.id)}
                                            initialData={data?.specialties ??[]}
                                            resource={'Taxonomy'}
                                            customSearchKey={'title'}
                                            resourceParams={{
                                                type: Resources.TaxonomyTypes.SPECIALTY,
                                                has_parent: 0
                                            }}
                                        />
                                    </div>

                                </Col>
                                <Col lg={8} className={'doc_profile_specialties'}>
                                        <FormInput
											inputProps={{ mode: 'multiple' }}
											label={t('Sub specialties')}
											name={'sub_specialties'}
											inputType={'resourceSelect'}
											rules={[{ required: true }]}
											initialValue={data?.sub_specialties?.map(e => e?.id)}
											initialData={data?.sub_specialties ?? []}
											resource={'Taxonomy'}
											resourceParams={{
												type: Resources.TaxonomyTypes.SPECIALTY,
												has_parent: 1,
												parents: selectedSpecialties
											}}
											disabled={!selectedSpecialties.length}
										/>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col lg={8}>
                                    <FormInput label={t('Email')} name={'email'} rules={[{required: true}]} initialValue={data?.email}/>
                                </Col>

                                <Col lg={6}>
                                    <FormInput label={t('Country Code')} name={'phone_country_code'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={data?.phone_country_code ? data?.phone_country_code : '966'}
                                               handleMapItems={handleMapItems}
                                               customSearchKey={'phone_code'}
                                               resource={'Country'}/>
                                </Col>
                                <Col lg={6}>
                                    <FormInput label={t('Phone number')} maxLength={10} name={'phone_number'} rules={[{required: true}]} initialValue={data?.phone_number}/>
                                </Col>

                            </Row>
                            <div style={{display: 'flex', width: '100%', gap: 20}}>
                                <div style={{width:'50%'}}>
                                    <FormInput label={t('Plid')} name={'plid'} rules={[{required: true}]} initialValue={data?.plid}/>
                                </div>
                                <div style={{width:'50%'}}>
                                    <FormInput label={t('Doctor title id')} name={'doctor_title_id'} inputType={'resourceSelect'}
                                               rules={[{required: true}]}
                                               initialValue={data?.doctor_title?.id}
                                               initialData={data?.doctor_title?[data?.doctor_title]:[]}
                                               resource={'Taxonomy'}
                                               resourceParams={{type:Resources.TaxonomyTypes.DOCTOR_TITLE}}
                                    />
                                </div>
                            </div>




                            <div>
                                <FormInput label={t('Doctor description by clinic')} name={'bio'} inputType={'textArea'}
                                     initialValue={data?.bio}
                                />
                            </div>




                        </div>

                    </div>


                </Form>
            }


        </div>
    )
}

export default TabGeneralInfo;