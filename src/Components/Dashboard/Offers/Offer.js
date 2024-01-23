
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import Preloader from "../../Preloader";
import {Button, Checkbox, Col, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import {Row} from "antd/lib";
import DraftEditor from "../../Fragments/DraftEditor";
import CancelComponent from "../../Fragments/CancelComponent";
import dayjs from "dayjs";
import {InboxOutlined} from "@ant-design/icons";
import FileManager from "../../Fragments/FileManager";

const resource = 'Offer';

function Offer() {
    let dispatch = useDispatch()
    let language = useSelector((state) => state.app.current_locale)
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id,
        {}, null, null, {ignore_timezone: '1'})
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})

    // formRef?.current?.validateFields(['content_en']).then(e => {
    //     console.log('dddddd')
    // }).catch((c) => {
    //
    // })
    const onFinish = (values) => {




        setSaveLoading(true)
        values.expired_at = values?.expired_at?.format('YYYY-MM-DD')
        values.begins_at = values?.begins_at?.format('YYYY-MM-DD')
        values.top =values.top === true ? true : false;





        let a = {
            en: values?.content_en,
            ar: values?.content_ar

        }

        values.content = JSON.stringify(a)

        let nullDescription = {
            en: '',
            ar: ''
        }

        if(values?.content === '{}'){
            values.content = JSON.stringify(nullDescription)
        }
        values.title = JSON.stringify(values.title)
        values?.content ? values.content = values.content : values.content = data.content
        setData((prevState)=>({
            ...prevState,
            ...values
        }))

        if(values?.content) {
            values.content = values.content.replace('background-color:', '')
        }




        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
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
            createResource(resource, values, token, true).then((response) => {
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
 const handleValuesChange = (changed,all)=>{


            setData((prevData)=>({
                ...prevData,
                ...changed
            }))

     setChangeValuesState(changed)


     if(Object.keys(changed).length > 0) {
         dispatch({
             type: 'DASHBOARD_STATE',
             payload: true
         })
     }

     if(+formRef.current.getFieldValue('old_price') <= +formRef.current.getFieldValue('new_price')) {
         formRef?.current?.setFieldsValue({
             new_price: +formRef.current.getFieldValue('old_price')-1
         })
     }
 }

let enTitle = <span><span style={{color: 'red'}}>* </span>{('EN title')}</span>
let arTitle = <span><span style={{color: 'red'}}>* </span>{('AR title')}</span>
let enContent = <span><span style={{color: 'red'}}>* </span>{('EN content')}</span>
let arContent = <span><span style={{color: 'red'}}>* </span>{('AR content')}</span>
    return(
        <div >
            {data?.translations?.title ? <h3 className={'create_apdate_btns'}>{t(`Editing offer`)} - {language === 'ar' ? data?.translations?.title?.ar ? data?.translations?.title?.ar : data?.translations?.title?.en  : data?.translations?.title?.en}</h3 > : <h3 className={'create_apdate_btns'}>{t(`Add new offer`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <div style={{display: 'flex', gap: 20}}>
                        <div className={language === 'ar' ? 'input_ltr' : 'draft_ltr_div'} style={{width: '50%'}} dir='ltr'>
                            <FormInput label={enTitle} name={['title', 'en']} initialValue={data?.translations?.title?.en} rules={[
                                // {required: true},
                                {
                                    message: t('Please enter the EN title'),
                                    validator:(rule,value)=>{
                                        value=value.trim();
                                        if(value.length==0){
                                            return Promise.reject(t('Please enter the EN title'))
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}/>
                        </div>
                        <div style={{width: '50%'}} className={'input_rtl'} >
                            <FormInput  label={arTitle} name={['title', 'ar']} initialValue={data?.translations?.title?.ar} rules={[
                                {
                                    message: t('Please enter the AR title'),
                                    validator:(rule,value)=>{
                                        value=value.trim();
                                        if(value.length==0){
                                            return Promise.reject(t('Please enter the AR title'))
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}/>
                        </div>
                    </div>

                    {/*<FormInput label={t('Title')} name={'title'} initialValue={data?.title} rules={[{required: true}]}/>*/}

                    <div style={{display: 'flex', gap: 20}}>
                        <div className={language === 'ar' ? 'input_ltr' : 'draft_ltr_div'} style={{width: '50%'}} >
                            <Form.Item name={'content_en'} label={enContent} rules={[
                                {
                                    message: t('Please enter the EN content'),
                                    validator:(rule,value)=>{

                                        value=value.trim();
                                        if(value.length==0 || value == '<p></p>'){
                                            return Promise.reject(t('Please enter the EN content'))
                                        }
                                        return Promise.resolve();
                                    }
                                }]} initialValue={data?.translations?.content?.en}>
                                <DraftEditor initialValue={data?.translations?.content?.en} formRef={formRef} name={'content_en'} rtl={false}/>
                            </Form.Item>
                        </div>

                        <div style={{width: '50%'}} className={'rtl_editor'} >
                            <Form.Item name={'content_ar'} label={arContent} rules={[{
                                message: t('Please enter the AR content'),
                                validator:(rule,value)=>{
                                    value=value.trim();
                                    if(value.length==0 || value == '<p></p>'){
                                        return Promise.reject(t('Please enter the AR content'))
                                    }
                                    return Promise.resolve();
                                }
                            }]} initialValue={data?.translations?.content?.ar}>
                                <DraftEditor initialValue={data?.translations?.content?.ar} formRef={formRef} name={'content_ar'} rtl={true} />
                            </Form.Item>
                        </div>
                    </div>

                    {/*<Form.Item name={'content'} label={'content'} rules={[{required: true,},]} initialValue={data?.content}>*/}
                    {/*    <DraftEditor initialValue={data?.content} formRef={formRef} name={'content'} />*/}
                    {/*</Form.Item>*/}
                </div>
                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Old price')} name={'old_price'} inputType={'number'} initialValue={data?.old_price} rules={[
                                {required: true},
                                // {
                                //     validator:(rule,value)=>{
                                //         if(+value <= +newPrice){
                                //             return Promise.reject('New price cannot be bigger then old price')
                                //         }
                                //         return Promise.resolve();
                                //     }
                                // }

                            ]} />
                            <FormInput label={t('New price')} name={'new_price'}  initialValue={data?.new_price} inputType={'number'} rules={[
                                {required: true},
                                // {
                                //     validator:(rule,value)=>{
                                //         if(+value >= +oldPrice){
                                //             return Promise.reject('New price cannot be bigger then old price')
                                //         }
                                //         return Promise.resolve();
                                //     }
                                // }

                            ]} />
                            <FormInput label={t('Begins at')} name={'begins_at'}  initialValue={data?.begins_at?.date} inputType={'date'} rules={[
                                {required: true},
                                {
                                    validator:(rule,value)=>{
                                        if (formRef?.current.getFieldValue()?.expired_at) {
                                            if(formRef?.current.getFieldValue()?.expired_at <= formRef?.current.getFieldValue()?.begins_at) {
                                                return Promise.reject('Begins at cannot be greater than expired at')
                                            }
                                        }

                                        return Promise.resolve();
                                    }
                                }
                            ]} />

                            <FormInput label={t('Expired at')} name={'expired_at'} initialValue={data?.expired_at?.date} inputType={'date'} rules={[
                                {required: true},
                                {
                                    validator:(rule,value)=>{
                                        if(formRef?.current.getFieldValue()?.expired_at < formRef?.current.getFieldValue()?.begins_at) {
                                            return Promise.reject('Expired at cannot be greater than begins at')
                                        }

                                        return Promise.resolve();
                                    }
                                }
                            ]} />
                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.status}
                                       initialData={Resources.Status}
                            />
                            <FormInput label={t('Clinic')} name={'clinic_id'} inputType={'resourceSelect'}
                                       inputProps={{
                                           onChange:(e,dat)=> {
                                               setData((prevState)=>({
                                                   ...prevState,
                                                   doctors: undefined,
                                                   specialty_id: undefined,
                                                   sub_specialties: undefined,
                                                   category_id: undefined,
                                                   service_id: undefined,
                                                   sub_categories: undefined,
                                                   sub_services: undefined

                                               }))

                                               formRef?.current?.setFieldsValue({
                                                   doctors: undefined,
                                                   specialty_id: undefined,
                                                   sub_specialties: undefined,
                                                   category_id: undefined,
                                                   service_id: undefined,
                                                   sub_categories: undefined,
                                                   sub_services: undefined

                                               })

                                           }
                                       }}
                                       rules={[{required: true}]}
                                       initialValue={data?.clinic?.id}
                                       initialData={data?.clinic?[data.clinic]:[]}
                                       resource={'Clinic'}/>
                            <Form.Item label={t(`Top offer`)} name="top"  initialValue={data?.top}>
                                <Checkbox defaultChecked={true}/>
                            </Form.Item>
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Specialty')} name={'specialty_id'} inputType={'resourceSelect'}
                                       inputProps={{

                                           onChange:(e,dat)=> {
                                               setData((prevState)=>({
                                                   ...prevState,
                                                   sub_specialties: undefined,
                                                   doctors: undefined,
                                                   category_id: undefined,
                                                   service_id: undefined,
                                                   sub_categories: undefined,
                                                   sub_services: undefined

                                               }))

                                               formRef?.current?.setFieldsValue({
                                                   sub_specialties: undefined,
                                                   doctors: undefined,
                                                   category_id: undefined,
                                                   service_id: undefined,
                                                   sub_categories: undefined,
                                                   sub_services: undefined

                                               })

                                           }
                                       }}
                                       rules={[{required: true}]}
                                       disabled={!data?.clinic_id && !data?.clinic?.id}
                                       initialValue={data?.specialty_id?.id}
                                       initialData={data?.specialty_id ? [data.specialty_id] : []}
                                       resourceParams={{
                                           clinic: data?.clinic?.id ? data?.clinic?.id : data.clinic_id,
                                           has_doctor: 1,
                                           type:Resources.TaxonomyTypes.SPECIALTY, has_parent: 0}}
                                       resource={'Taxonomy'}/>

                            <FormInput inputProps={{
                                mode:'multiple',
                                onChange:(e,dat)=> {
                                    setData((prevState)=>({
                                        ...prevState,
                                        doctors: undefined,
                                        category_id: undefined,
                                        service_id: undefined,
                                        sub_categories: undefined,
                                        sub_services: undefined

                                    }))

                                    formRef?.current?.setFieldsValue({
                                        doctors: undefined,
                                        category_id: undefined,
                                        service_id: undefined,
                                        sub_categories: undefined,
                                        sub_services: undefined

                                    })

                                }
                            }} label={t('Sub specialties')} name={'sub_specialties'} inputType={'resourceSelect'}
                                       disabled={!data?.specialty_id}
                                       rules={[{required: true}]}
                                       initialValue={data?.sub_specialties?.map(e=>e.id)}
                                       initialData={data?.sub_specialties ??[]}
                                       resource={'Taxonomy'}
                                       resourceParams={{
                                           parent: data?.specialty_id?.id ? data?.specialty_id?.id : data?.specialty_id,
                                           type:Resources.TaxonomyTypes.SPECIALTY, has_parent: 1}}
                            />


                            <FormInput inputProps={{
                                mode:'multiple',
                                onChange:(e,dat)=> {
                                    setData((prevState)=>({
                                        ...prevState,


                                        category_id: undefined,
                                        service_id: undefined,
                                        sub_categories: undefined,
                                        sub_services: undefined

                                    }))

                                    formRef?.current?.setFieldsValue({


                                        category_id: undefined,
                                        service_id: undefined,
                                        sub_categories: undefined,
                                        sub_services: undefined

                                    })

                                }
                            }}
                                       disabled={!data?.sub_specialties || data?.sub_specialties?.length < 1}
                                       label={t('Doctors')} name={'doctors'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.doctors?.map(e=>e.id)}
                                       initialData={data?.doctors??[]}
                                       resource={'Doctor'}
                                       resourceParams={{
                                           clinic: data?.clinic?.id ? data?.clinic?.id : data?.clinic_id,
                                           specialty: data?.specialty_id?.id ? data?.specialty_id?.id : data?.specialty_id,
                                           status: 2,
                                       }}
                            />




                            <FormInput label={t('Category')} name={'category_id'} inputType={'resourceSelect'}
                                       inputProps={{
                                           onChange:(e,dat)=> {

                                               setData((prevState)=>({
                                                   ...prevState,
                                                   service_id: undefined,
                                                   sub_categories: undefined,
                                                   sub_services: undefined,
                                                   category: undefined
                                               }))

                                               formRef?.current?.setFieldsValue({
                                                   service_id: undefined,
                                                   sub_categories: undefined,
                                                   sub_services: undefined
                                               })

                                           }
                                       }}
                                       rules={[{required: true}]}
                                       disabled={!data?.doctors || data?.doctors?.length < 1}
                                       initialValue={data?.category?.id}
                                       initialData={data?.category ?[data.category]:[]}
                                       resource={'Category'}/>

                            <FormInput inputProps={{
                                mode:'multiple',
                                onChange:(e,dat)=> {

                                    setData((prevState)=>({
                                        ...prevState,
                                        service_id: undefined,
                                        sub_services: undefined,
                                        service: undefined
                                    }))

                                    formRef?.current?.setFieldsValue({
                                        service_id: undefined,
                                        sub_services: undefined
                                    })

                                }
                            }} label={t('Sub categories')} name={'sub_categories'} inputType={'resourceSelect'}

                                       rules={[{required: true}]}
                                       disabled={!data?.category_id && !data?.category?.id}
                                       resourceParams={{
                                           category: data?.category?.id ? data?.category?.id : data.category_id
                                       }}
                                       initialValue={data?.sub_categories?.map(e=>e.id) ?? null}
                                       initialData={data?.sub_categories ??[]}
                                       resource={'SubCategory'}
                            />


                            <FormInput label={t('Service')} name={'service_id'} inputType={'resourceSelect'}
                                       inputProps={{
                                           onChange:(e,dat)=> {

                                               setData((prevState)=>({
                                                   ...prevState,
                                                   sub_services: undefined
                                               }))

                                               formRef?.current?.setFieldsValue({
                                                   sub_services: undefined
                                               })

                                           }
                                       }}
                                       disabled={!data?.sub_categories}
                                       resourceParams={{
                                           sub_categories:data.sub_categories?.map(el=>el?.id ? el?.id : el)
                                       }}
                                       rules={[{required: true}]}
                                       initialValue={data?.service?.id ? data?.service?.id : null}
                                       initialData={data?.service ?[data.service]:[]}
                                       resource={'Service'}/>

                            <FormInput inputProps={{mode:'multiple'}} label={t('Sub services')} name={'sub_services'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       disabled={!data?.service_id && !data?.service?.id}
                                       resourceParams={{
                                           service: data?.service?.id ? data?.service?.id : data.service_id
                                       }}
                                       initialValue={data?.sub_services?.map(e=>e.id)}
                                       initialData={data?.sub_services ??[]}
                                       resource={'SubService'}
                            />
                        </Col>
                    </Row>
                    <FileManager text1={t('Cover')}
                                 text2={t('Download the file')}
                                 name={'cover'}
                                 uploadIcon={<InboxOutlined/>}
                                 initialFileList={[data?.cover]} limit={1} formRef={formRef} type={'drag'}/>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}
export default Offer;
