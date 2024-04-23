import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import React, { useEffect, useRef, useState } from 'react'
import {t} from "i18next";
import Resources from "../../../store/Resources";
import FormInput from "../../Fragments/FormInput";
import CancelComponent from "../../Fragments/CancelComponent";

const resource = 'RadiologyTask';

function RadiologyTask() {
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
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
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
            createResource(resource, values, token).then((response) => {
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
    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)
        if(Object.keys(changed).length > 0) {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: true
            })
        }
    }

    let enName = <span><span style={{color: 'red'}}>* </span>{('EN name')}</span>
    let arName = <span><span style={{color: 'red'}}>* </span>{('AR name')}</span>

    return (
      <div>
          {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Radiology`)} - {language === 'ar' ? data?.translations?.name?.ar ? data?.translations?.name?.ar : data?.translations?.name?.en : data?.translations?.name?.en}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Radiology`)}</h3>}
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
                          <FormInput label={enName} name={['name', 'en']} initialValue={data?.translations?.name?.en} rules={[
                              {
                                  message: t('Please enter the EN name'),
                                  validator:(rule,value)=>{
                                      value=value.trim();
                                      if(value.length==0){
                                          return Promise.reject(t('Please enter the EN name'))
                                      }
                                      return Promise.resolve();
                                  }
                              }
                          ]}/>
                      </div>
                      <div style={{width: '50%'}} className={'input_rtl'} >
                          <FormInput  label={arName} name={['name', 'ar']} initialValue={data?.translations?.name?.ar} rules={[
                              {
                                  message: t('Please enter the AR name'),
                                  validator:(rule,value)=>{
                                      value=value.trim();
                                      if(value.length==0){
                                          return Promise.reject(t('Please enter the AR name'))
                                      }
                                      return Promise.resolve();
                                  }
                              }
                          ]}/>
                      </div>
                  </div>

                  <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                             rules={[{required: true}]}
                             initialValue={data?.status}
                             initialData={Resources.Status}
                  />

                  <div style={{display: 'flex', gap: 28}}>
                      <div dir='ltr' style={{width: '50%', marginLeft: -6}}>
                          <FormInput label={t('EN Description')} name={['description', 'en']} inputType={'textArea'} initialValue={data?.translations?.description?.en}/>
                      </div>
                      <div dir='rtl' style={{width: '50%'}}>
                          <FormInput rtl={true} label={t('AR Description')} name={['description', 'ar']} inputType={'textArea'} initialValue={data?.translations?.description?.ar}/>
                      </div>
                  </div>

                  {/*<FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>*/}

              </div>
              <Space className={'create_apdate_btns'}>
                  <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                  <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
              </Space>
          </Form>}
      </div>

    )
}
export default RadiologyTask;
