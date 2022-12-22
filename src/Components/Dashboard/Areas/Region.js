import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import React from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";

const resource = 'Region';

function Region() {

    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState


    const onFinish = (values) => {
        setLoading(true)
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                setData(response)
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
    return(
        <div className={'add_edit_content'}>
            <h3>{t('Add New Area')}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    ...data,
                    country_id:data?.country?.id
                }}
            >
                <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                <FormInput label={t('Country')} name={'country_id'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.country_id}
                           initialData={data?.region?[data.region]:[]}
                           resource={'Country'}/>

                <Space>
                    <Button className={'button_add'} type={'primary'} htmlType="submit">{t('Save')}</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default Region;
