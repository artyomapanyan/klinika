import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Select, Space} from "antd";
import React from "react";
import {t} from "i18next";
import Resources from "../../../store/Resources";
import FormInput from "../../Fragments/FormInput";

const resource = 'NursingTask';

function NursingTask() {

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
            <h3>{t('Add New Nursuring Task')}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    ...data,
                }}
            >
                <FormInput label={t('name')} name={'name'} initialValue={data?.name} />

                <Form.Item label={t('Status')} name={'status'}>
                    <Select>
                        {Resources.Status.map((status)=><Select.Option value={status.id} key={status.id}>{status.name}</Select.Option>)}
                    </Select>
                </Form.Item>

                <Space>
                    <Button type={'primary'} htmlType="submit">{t('Save')}</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default NursingTask;
