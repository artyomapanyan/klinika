
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Select, Space} from "antd";
import React, {useRef} from "react";
import ResourceSelectPaginated from "../../Fragments/ResourceSelectPaginated";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";

const resource = 'LabTest';

function LabTest() {
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

    return(
        <div className={'add_edit_content'}>
            <h3>{t('Add New Lab Test')}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
                initialValues={{
                    ...data,
                    Lab_test:data.Lab_test?.id
                }}
            >
                <FormInput label={t('name')} name={'name'}/>

                <FormInput label={t('Area')} name={'Lab_test'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.region_id}
                           initialData={data?.Lab_test?[data.Lab_test]:[]}
                           resource={'LabTest'}/>

                <Form.Item label={t('Status')} name={'status'}>
                    <Select>
                        {Resources.Status.map((status)=><Select.Option value={status.id} key={status.id}>{status.name}</Select.Option>)}
                    </Select>
                </Form.Item>


                <Space>
                    <Button type={'primary'} htmlType="submit">{t("Save")}</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default LabTest;
