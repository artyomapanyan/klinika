
import {Button, Form, Space} from 'antd';
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import resourceLinks from "../../ResourceLinks";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import React from "react";

const resource = 'InsuranceCompany';

function InsuranceCompany() {
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState

    const onFinish = (values) => {
        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    setData(response)
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource] + response.id)
                }

            }).finally(() => {
                setLoading(false)
            })
        }

    }

    return (
        <div className={"add_edit_content"}>
            {data?.name ? <h3>{t(`Editing Insuranse Company - ${data?.name}`)}</h3> : <h3>{t(`Add new Insuranse Company`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
            >
                <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />

                <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.status}
                           initialData={Resources.Status}
                />

                <Space>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>

    )
}

export default InsuranceCompany;
