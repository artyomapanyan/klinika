
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import Preloader from "../../../Preloader";
import {Button, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import Resources from "../../../../store/Resources";
import CancelComponent from "../../../Fragments/CancelComponent";
import dayjs from "dayjs";

const resource = 'User';

function User() {
    let dispatch = useDispatch();
    let selectedRole = useSelector((state) => state.auth.selected_role);
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
        values.dob = values.dob.format('YYYY-MM-DD')
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

    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(${item.phone_code}) `:null
        item.id = item.phone_code
        return [name,item]
    }
console.log(data)

    return(
        <div>
            {data?.first ? <h3 className={'create_apdate_btns'}>{t(`Editing User - ${data?.first} ${data?.last}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new User`)}</h3>}
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
                    <FormInput inputType={'password'}  label={'Password Confirmation'} name={'password_confirmation'} rules={[{required: !data?.id}]} />
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
                    <FormInput label={t('Insurance company')} name={'insurance_company_id'} inputType={'resourceSelect'}
                               initialValue={data?.insurance_company?.id}
                               initialData={data?.insurance_company ? [data?.insurance_company] : []}
                               resource={'InsuranceCompany'}
                               resourceParams={{type:Resources.TaxonomyTypes.INSURANCE_TYPE}}
                    />
                    <FormInput label={t('Nationality number')} name={'nationality_number'}  initialValue={data?.nationality_number} rules={[{required: true}]} />
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
                            <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} rules={[{required: true}]}/>
                        </div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{width:'25%'}}>
                            <FormInput label={t('Country')} name={'country_id'}
                                       inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.address?.country?.id}
                                       initialData={data?.address?.country ? [data?.address?.country] : []}
                                       resource={'Country'}/>
                        </div>
                        <div style={{width:'25%', marginLeft:10}}>
                            <FormInput label={t('Area')} name={'region_id'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.address?.region?.id}
                                       initialData={data?.address?.region ? [data?.address?.region] : []}
                                       resource={'Region'}/>
                        </div>
                        <div style={{width:'25%', marginLeft:10}}>
                            <FormInput label={t('City')} name={'city_id'} inputType={'resourceSelect'}
                                       initialValue={data?.address?.city?.id}
                                       rules={[{required: true}]}
                                       initialData={data?.address?.city ? [data?.address?.city] : []}
                                       resource={'City'} />
                        </div>
                        <div style={{width:'25%', marginLeft:10}}>
                            <FormInput label={t('Address')} name={'address1'} initialValue={data?.address?.address1} rules={[{required: true}]}/>
                        </div>
                    </div>



                    {
                        selectedRole.key === 'super' || selectedRole.key === 'admin' ? <FormInput inputProps={{mode:'multiple'}} label={t('Roles')} name={'roles'} inputType={'resourceSelect'}
                                                                        rules={[{required: true}]}
                                                                        initialValue={data?.roles?.map(e=>e.id)}
                                                                        initialData={data?.roles??[]}
                                                                        resource={'Role'}
                        /> : <div></div>
                    }


                    <Space>
                        <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                        <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                    </Space>
                </div>

            </Form>}
        </div>
    )
}
export default User;
