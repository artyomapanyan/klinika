import React, {useRef, useState} from 'react';
import {t} from "i18next";
import Preloader from "../Preloader";
import {Button, Form, Space} from "antd";
import FormInput from "../Fragments/FormInput";
import dayjs from "dayjs";
import Resources from "../../store/Resources";
import CancelComponent from "../Fragments/CancelComponent";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource} from "../Functions/api_calls";

let resource = 'UserUpdateSelf';
function UpdateSelf() {
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})
    let data = useSelector((state) => state.auth.user);



    const onFinish = (values) => {
        setSaveLoading(true)
        values.dob = values.dob.format('YYYY-MM-DD')


            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    dispatch({
                        type:'USER_UPDATE',
                        payload:response
                    })
                    navigate(-1)
                }
            }).finally(() => {
                setSaveLoading(false)
            })

    }

    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)

    }

    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(${item.phone_code}) `:null
        item.id = item.phone_code
        return [name,item]
    }
    return(
        <div>
            {data?.first ? <h3 className={'create_apdate_btns'}>{t(`Editing User - ${data?.first}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new User`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('First name')} name={'first'} initialValue={data?.first} rules={[{required: true}]} />
                    <FormInput label={t('Last')} name={'last'} initialValue={data?.last} rules={[{required: true}]} />
                    <FormInput label={t('Email')} name={'email'} initialValue={data?.email} rules={[{required: true}]} />
                    <FormInput inputType={'password'}  label={'Password'} name={'password'} rules={[{required: !data?.id}]} />
                    <FormInput inputType={'password'}  label={'Password Confirmation'} name={'password_confirmation'}  />
                    <FormInput label={t('Date of Birth')} name={'dob'} initialValue={data?.dob} inputType={'date'} rules={[
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
                    <FormInput label={t('Bio')} name={'bio'} initialValue={data?.bio} />
                    <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'}
                               initialValue={data?.gender}
                               initialData={Resources?.Gender}
                    />
                    <FormInput label={t('Nationality number')} name={'nationality_number'}  initialValue={data?.nationality_number} rules={[
                        {required: true},
                        {
                            validator:(rule,value)=>{
                                if(value?.length < 10){
                                    return Promise.reject('min length 10')
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
                    <div style={{display:"flex"}}>
                        <div style={{width:'25%'}}>
                            <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.phone_country_code}
                                       handleMapItems={handleMapItems}
                                       customSearchKey={'phone_code'}
                                       resource={'Country'}/>
                        </div>
                        <div style={{width:'100%', marginLeft:10}}>
                            <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
                        </div>
                    </div>
                    {/*<FormInput inputProps={{mode:'multiple'}} label={t('Roles')} name={'roles'} inputType={'resourceSelect'}*/}
                    {/*           rules={[{required: true}]}*/}
                    {/*           initialValue={data?.roles?.map(e=>e.id)}*/}
                    {/*           initialData={data?.roles??[]}*/}
                    {/*           resource={'Role'}*/}
                    {/*/>*/}


                    <Space>
                        <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                        <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                    </Space>
                </div>

            </Form>}
        </div>
    )
}

export default UpdateSelf;