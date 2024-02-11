import {Avatar, Button, Col, Form, Row, Space, Tag} from "antd";
import {LeftOutlined, UserOutlined} from "@ant-design/icons";
import FormInput from "../../../../Fragments/FormInput";
import {t} from "i18next";
import React, {useRef, useState} from "react";
import Resources from "../../../../../store/Resources";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {postResource} from "../../../../Functions/api_calls";


function AppointmentCalendarDrawerLarge({openDrawer,doctor,specialty,data,setOpen,handleCreateAppointment,setData, finishLoading, setFinishLoading}) {
    const formRef = useRef();
    let language = useSelector((state) => state?.app?.current_locale);
    let token = useSelector((state) => state?.auth?.token);

    const [loading, setLoading] = useState(false)
    const [emailState, setEmailState] = useState('')


    const onFinish = (values) => {
        setFinishLoading(true)
        postResource('PublicIsEmailFree', 'PublicIsEmailFreeCustom', token, '', {
            email: data?.email ? data?.email : emailState
        }).then((response) => {
            if(response?.isEmailFree) {
                handleCreateAppointment(data,{
                    patient:values,
                })

            } else {
                setFinishLoading(false)
            }
        })


    }
    const handleMapItems = (item, name) => {
        name = item.phone_code ? `${item.phone_code} ` : null
        item.id = +item.phone_code
        return [name, item]
    }


    return(
        <div className={language === 'ar' ? 'KM_drawer' : ''} style={{height: '100vh'}}>
            <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{...data}}
                onValuesChange={(e,v)=>setData(prevState=>({
                    ...prevState,
                    ...v
                }))}
                ref={formRef}
            >
                <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems: 'center'}}>
                    <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems: 'center', width: '50%'}}>
                        <Space >
                            <Avatar size={50} icon={<UserOutlined />} style={{marginTop: 20}} />
                            <div style={{display:"block", marginTop: 26}}>
                                <div className={'dr_manager_divider_dr_name'}>{doctor.first} {doctor.last}</div>

                                <div>{specialty}</div>
                            </div>
                        </Space>
                        <Tag color="#ce4e99" size={'large'} style={{fontSize:14, fontWeight:600, height: 30, marginTop:20,  padding:'4px 10px', borderRadius:10}}>{data.time}</Tag>
                    </div>
                    <div align={'right'}>
                        <Button onClick={openDrawer} style={{color:'#774D9D', border:"none", fontSize:18, fontWeight: 600}}><LeftOutlined color={'#774D9D'} />{t('Back to short form')}</Button>
                    </div>
                </div>

            <Row gutter={[15, 15]}>

                <Col lg={12}>

                    <div>

                            <FormInput label={t('First name')} name={'first'}   rules={[{required: true}]} />
                            <FormInput label={t('Last name')} name={'last'} rules={[{required: true}]} />
                            <FormInput label={t('Email')} name={'email'}
                                       rules={[{required: true}]}
                                       onChange={(event) => {
                                           setEmailState(event?.target?.value)
                                       }}
                            />
                            <div style={{display:"flex", gap: 20, width:'100%'}}>
                                <div style={{width:110}}>
                                    <FormInput label={t('Code')} name={'phone_country_code'} inputType={'resourceSelect'}
                                               disableClear={true}
                                               rules={[{required: true}]}
                                               initialValue={data?.phone_country_code}
                                               handleMapItems={handleMapItems}
                                               customSearchKey={'phone_code'}
                                               resource={'Country'}
                                    />
                                </div>
                                <div style={{width:'100%'}}>
                                    <FormInput maxLength={10} label={t('Phone number')} name={'phone_number'} rules={[{required: true}]} />
                                </div>
                            </div>
                            <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'}
                                       initialData={Resources?.Gender}
                                       initialValue={data?.gender}
                                       rules={[{required: true}]}
                            />

                             {/*   <FileManager text1={'Insurance Card Front'}
                                             text2={'upload image'}
                                             uploadIcon={<img alt={'icons'} src={addimage}/>}
                                             name={'cover'} initialFileList={[]} formRef={formRef} type={'drag'}/>*/}
                            <div>
                                <Button loading={finishLoading} style={{width:'100%'}} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                            </div>

                    </div>
                </Col>
                <Col lg={12}>

                    <div >

                            {/*<FormInput label={t('Address')} name={'address'}  rules={[{required: true}]} />*/}
                            <FormInput label={t('Nationality')} name={'country_id'}
                                       inputType={'resourceSelect'}
                                       initialValue={data?.country_id}
                                       rules={[{required: true}]}
                                       initialData={data?.countries??[]}
                                       resource={'Country'}/>
                            <FormInput label={t('Date of Birth')}
                                       initialValue={data?.dob}
                                       inputType={'date'} name={'dob'} rules={[
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
                            <FormInput label={t('Nationality number')} name={'nationality_number'} rules={[
                                {required: true},
                                // {
                                //     validator:(rule,value)=>{
                                //         if(value?.length < 10){
                                //             return Promise.reject('min length 10')
                                //         }
                                //         return Promise.resolve();
                                //     }
                                // }


                            ]} />
                            <FormInput label={t('Identification number')} />
                            <FormInput inputProps={{mode:'multiple'}} label={t('Insurance companies')} name={'insurance_companies'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialData={data?.insurance_companies??[]}
                                       resource={'InsuranceCompany'}
                                       resourceParams={{type:Resources.TaxonomyTypes.INSURANCE_TYPE}}
                            />


                            <div >
                                <Button loading={loading} style={{width:'100%',}} size={'large'}  type={'secondary'} onClick={()=>setOpen(false)} >{t('Cancel')}</Button>
                            </div>


                    </div>

                </Col>
            </Row>
        </Form>

        </div>
    )
}
export default AppointmentCalendarDrawerLarge;