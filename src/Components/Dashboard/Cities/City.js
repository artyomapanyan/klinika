
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Input, Space} from "antd";
import React, {useRef} from "react";
import ResourceSelectPaginated from "../../Fragments/ResourceSelectPaginated";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";

const resource = 'City';

function City() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
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

    console.log(data, 'dd')
    return(
        <div>
            <h3>{t('Add New City')}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
                initialValues={{
                    ...data,
                    region_id:data.region?.id
            }}
            >
                <Form.Item label={t('Name')} name={'name'}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t('Area')}
                    name="region_id"
                    rules={[
                        {
                            required: true,
                        }
                    ]}>

                   <ResourceSelectPaginated name={'region_id'} formRef={formRef} value={data.region?.id} resource={'Region'} initialData={data.region?[data.region]:[]}/>
                </Form.Item>

                <FormInput label={t('Area')} name={'region_id'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.region_id}
                           initialData={data?.region?[data.region]:[]}
                           resource={'Country'}/>

                <Space>
                    <Button type={'primary'} htmlType="submit">{t("Save")}</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default City;
