import React from "react";
import {Avatar, Button, Col, Divider, Form, Row} from "antd";
import {t} from "i18next";
import suffix_select_icon from "../../../../../../../dist/icons/suffix_select_icon.png";
import FormInput from "../../../../../../Fragments/FormInput";
import dayjs from "dayjs";
import calendar_black_icon from "../../../../../../../dist/icons/calendar_black_icon.png";
import Resources from "../../../../../../../store/Resources";
import DoctorImageUpload from "./DoctorImageUpload";

function TabGeneralInfo({formRef}) {
    return(
        <div className={'general_info_big_div'}>
            <Form>
                <Row gutter={80}>
                    <Col lg={3}>
                        {/*<DoctorImageUpload formRef={formRef} />*/}
                        <Avatar size={200}
                                shape="square"
                            // src={<img src={data?.clinic?.logo?.url}
                            //     alt="avatar" onError={({ currentTarget }) => {
                            // currentTarget.onerror = null; // prevents looping
                            // currentTarget.src=off_image_1;}}  />}
                        />
                        <div>
                            <Button className={'change_button'} type={'secondary'}>Change</Button>
                        </div>
                        <div className={'text_about_avatar'}>
                            Photo will change only for current user’s clinic profile
                        </div>

                    </Col>
                    <Col lg={21} className={'clinics_select_col'}>
                        <FormInput label={t('')} name={'clinics'}
                                   inputProps={{mode: 'multiple'}}
                                   suffixIcon={<div> <Divider type={"vertical"} style={{height: 30}}/> <span style={{color:'#635D6B', fontSize: '12',marginRight: 10 }}>Assign to clinic</span>  <img alt={'suffix_select_icon'} src={suffix_select_icon}/></div>}

                                   inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   initialValue={null}
                                   initialData={[]}
                                   resource={'Clinic'}

                        />
                        <Row gutter={20}>
                            <Col lg={6}>
                                <FormInput label={t('Name')} name={'name'}
                                           rules={[{required: true}]}/>
                            </Col>
                            <Col lg={6}>
                                <FormInput label={t('Surname')} name={'name'}
                                           rules={[{required: true}]}/>
                            </Col>
                            <Col lg={6}>
                                <FormInput label={t('Date of Birth')} name={'dob'}
                                           suffixIcon={<img alt={'calendar_black_icon'} src={calendar_black_icon}/>}

                                    //inputDisabled={true}
                                           inputType={'date'} rules={[

                                    {
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
                                <FormInput label={t('Gender')} name={['patient','gender']}
                                    //disabled={true}
                                           inputType={'resourceSelect'}
                                    //initialValue={formRef.current.getFieldValue(['patient','gender'])}
                                    //initialData={Resources?.Gender}
                                    // rules={[{required: !data?.patient_id}]}
                                />
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col lg={6}>
                                <FormInput label={t('Qualification:')} name={'qualification'}
                                           rules={[{required: true}]}/>
                            </Col>
                            <Col lg={6}>
                                <FormInput label={t('HCP registration number:')} name={'name'}
                                           rules={[{required: true}]}/>
                            </Col>
                            <Col lg={6}>
                                <FormInput label={t('License valid to')} name={'dob'}
                                           suffixIcon={<img alt={'calendar_black_icon'} src={calendar_black_icon}/>}

                                    //inputDisabled={true}
                                           inputType={'date'} rules={[

                                    {
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
                                <FormInput label={t('license upload')} name={'qualification'} />
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col lg={8}>
                                <FormInput label={t('Specialtie')} name={'specialty_id'}
                                           inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           initialValue={null}
                                           initialData={[]}
                                           resource={'Taxonomy'}
                                           resourceParams={{
                                               type: Resources.TaxonomyTypes.SPECIALTY,
                                               has_parent: 0
                                           }}
                                />
                            </Col>

                            <Col lg={16}>
                                <FormInput label={t('')} name={'specialty_id'}
                                           inputProps={{mode: 'multiple'}}
                                           suffixIcon={<div> <Divider type={"vertical"} style={{height: 30}}/> <span style={{color:'#635D6B', fontSize: '12',marginRight: 10 }}>Specialties </span>  <img alt={'suffix_select_icon'} src={suffix_select_icon}/></div>}

                                           inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           initialValue={null}
                                           initialData={[]}
                                           resource={'Taxonomy'}
                                           resourceParams={{
                                               type: Resources.TaxonomyTypes.SPECIALTY,
                                               has_parent: 0
                                           }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col lg={8}>
                                <FormInput label={t('Email')} name={'email'} rules={[{required: true}]}/>
                            </Col>

                            <Col lg={6}>
                                <FormInput label={t('Country')} name={'country_id'} inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           // initialValue={data?.country?.id}
                                           // initialData={data?.country?[data.country]:[]}
                                           resource={'Country'}/>
                            </Col>
                            <Col lg={6}>
                                <FormInput label={t('Phone number')} name={'phone_number'} rules={[{required: true}]}/>
                            </Col>

                        </Row>
                        <div style={{borderBottom: '1px solid #E1E2E9', margin: '5px'}}></div>
                        <div className={'doctor_bio_head_text'}>
                            Doctor bio
                        </div>
                        <div className={'doctor_bio_text'}>
                            The feeling of the world, therefore, reflects a sensitive gravitational paradox, but Sigwart considered the criterion of truth to be necessity and general significance, for which there is no support in the objective world.
                        </div>
                        <div style={{borderBottom: '1px solid #E1E2E9', marginLeft: '5px', marginTop: 20}}></div>
                        <div style={{marginTop: 20}}>
                            <FormInput label={t('Doctor description by clinic')} name={'description'} inputType={'textArea'}
                                // initialValue={data?.description}
                            />
                        </div>


                    </Col>
                </Row>
            </Form>

        </div>
    )
}

export default TabGeneralInfo;