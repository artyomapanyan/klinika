
import {Button, Form, Space} from 'antd';
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../Preloader";
import {useDispatch, useSelector} from "react-redux";
import resourceLinks from "../../ResourceLinks";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import React, {useRef, useState} from "react";
import FileManager from "../../Fragments/FileManager";
import {InboxOutlined} from "@ant-design/icons";
import CancelComponent from "../../Fragments/CancelComponent";



const resource = 'Taxonomy';

function Specialty() {
    let language = useSelector((state) => state.app.current_locale)
    let dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})


    const onFinish = (values) => {
        setSaveLoading(true)
        values.type = Resources.TaxonomyTypes.SPECIALTY
        values.has_parent = 0


        if(values?.description) {
            values.description = JSON.stringify(values.description)
        }

        let nullDescription = {
            en: '',
            ar: ''
            }

        if(values?.description === '{}'){
            values.description = JSON.stringify(nullDescription)
        }
        values.title = JSON.stringify(values.title)



        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    setData(response)
                    navigate(resourceLinks['Specialty'])
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
                    navigate(resourceLinks['Specialty'])
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

    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)
        if(Object.keys(changed).length > 0) {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: true
            })
        }
    }

    const res = 'Specialty';

    let enTitle = <span><span style={{color: 'red'}}>* </span>{('EN title')}</span>
    let arTitle = <span><span style={{color: 'red'}}>* </span>{('AR title')}</span>
    return (
        <div>
            {data?.title ? <h3 className={'create_apdate_btns'}>{t(`Editing Specialty`)} - {language === 'ar' ? data?.translations?.title?.ar ? data?.translations?.title?.ar : data?.translations?.title?.en : data?.translations?.title?.en}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Specialty`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div  className={"add_edit_content"}>

                    <div style={{display: 'flex', gap: 20}}>
                        <div className={language === 'ar' ? 'input_ltr' : 'draft_ltr_div'} style={{width: '50%'}} dir='ltr'>
                            <FormInput label={enTitle} name={['title', 'en']} initialValue={data?.translations?.title?.en} rules={[
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


                    <div style={{display: 'flex', gap: 28}}>
                        <div dir='ltr' style={{width: '50%', marginLeft: -6}}>
                            <FormInput label={t('EN Description')} name={['description', 'en']} inputType={'textArea'} initialValue={data?.translations?.description?.en}/>
                        </div>
                        <div dir='rtl' style={{width: '50%'}}>
                            <FormInput rtl={true} label={t('AR Description')} name={['description', 'ar']} inputType={'textArea'} initialValue={data?.translations?.description?.ar}/>
                        </div>
                    </div>

                    {/*<FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>*/}

                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.Status}
                    />

                    <FileManager text1={t('Click or drag file to this area to upload')}
                                 text2={t('Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files')}
                                 name={'cover'}
                                 uploadIcon={<InboxOutlined/>}
                                 initialFileList={[data.cover]} limit={1} formRef={formRef} type={'drag'}/>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={res}/>
                </Space>
            </Form>}
        </div>

    )
}

export default Specialty;
