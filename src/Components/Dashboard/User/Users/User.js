
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import resourceLinks from "../../../ResourceLinks";
import Preloader from "../../../Preloader";
import {Button, Form, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import Resources from "../../../../store/Resources";

const resource = 'User';

function User() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)


    const onFinish = (values) => {
        setSaveLoading(true)
        values.dob = values.dob.format('YYYY-MM-DD')
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }

    return(
        <div className={'add_edit_content'}>
            {data?.first ? <h3>{t(`Editing User - ${data?.first}`)}</h3> : <h3>{t(`Add new User`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <FormInput label={t('First')} name={'first'} initialValue={data?.first} rules={[{required: true}]} />
                <FormInput label={t('Last')} name={'last'} initialValue={data?.last} rules={[{required: true}]} />
                <FormInput label={t('Email')} name={'email'} initialValue={data?.email} rules={[{required: true}]} />
                <FormInput inputType={'password'}  label={'Password'} name={'password'} rules={[{required: !data?.id}]} />
                <FormInput inputType={'password'}  label={'Password Confirmation'} name={'password_confirmation'}  />
                <FormInput label={t('Date of Birth')} name={'dob'} initialValue={data?.dob} inputType={'date'} rules={[{required: true}]} />
                <FormInput label={t('Bio')} name={'bio'} initialValue={data?.bio} />
                <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'}
                           initialValue={data?.gender}
                           initialData={Resources?.Gender}
                />
                <FormInput label={t('Nationality number')} name={'nationality_number'} initialValue={data?.nationality_number} rules={[{required: true}]} />
                <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.status}
                           initialData={Resources.Status}
                />
                <FormInput label={t('Phone country code')} name={'phone_country_code'} initialValue={data?.phone_country_code} />
                <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
                <FormInput inputProps={{mode:'multiple'}} label={t('Roles')} name={'roles'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.roles?.map(e=>e.id)}
                           initialData={data?.roles??[]}
                           resource={'Role'}
                />


                <Space>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default User;
